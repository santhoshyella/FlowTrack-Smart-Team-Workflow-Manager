import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import { taskService } from "../services/api";
import { sortTasksSmartly, statusLabels } from "../utils/taskUtils";

const statuses = ["todo", "in-progress", "done"];
const priorities = ["all", "high", "medium", "low"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTask, setUpdatingTask] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await taskService.all();
      setTasks(sortTasksSmartly(data));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Tasks could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    return sortTasksSmartly(tasks).filter((task) => {
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  const updateTaskStatus = async (taskId, status) => {
    setUpdatingTask(taskId);
    setError("");

    try {
      const { data } = await taskService.updateStatus(taskId, status);
      setTasks((current) => sortTasksSmartly(current.map((task) => (task._id === taskId ? data : task))));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Task status could not be updated.");
    } finally {
      setUpdatingTask("");
    }
  };

  if (loading) {
    return <div className="app-loader">Loading tasks...</div>;
  }

  return (
    <section className="page-grid">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Smart Sorting</p>
          <h1>Task Board</h1>
        </div>
        <button className="secondary-button" type="button" onClick={loadTasks}>
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="toolbar-row">
        <div className="segmented-control" aria-label="Status filter">
          {["all", ...statuses].map((status) => (
            <button
              type="button"
              className={statusFilter === status ? "active" : ""}
              key={status}
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>

        <select
          aria-label="Priority filter"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          {priorities.map((priority) => (
            <option value={priority} key={priority}>
              {priority === "all" ? "All priorities" : `${priority[0].toUpperCase()}${priority.slice(1)}`}
            </option>
          ))}
        </select>
      </section>

      <section className="board-grid">
        {statuses.map((status) => {
          const columnTasks = filteredTasks.filter((task) => task.status === status);

          return (
            <div className="board-column" key={status}>
              <div className="column-heading">
                <h2>{statusLabels[status]}</h2>
                <span>{columnTasks.length}</span>
              </div>
              <div className="task-list">
                {columnTasks.map((task) => (
                  <TaskCard
                    task={task}
                    key={task._id}
                    onStatusChange={updateTaskStatus}
                    updating={updatingTask === task._id}
                  />
                ))}
                {!columnTasks.length ? <p className="empty-copy">No tasks.</p> : null}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default TaskBoard;
