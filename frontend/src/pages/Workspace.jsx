import { CirclePlus, UserPlus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";
import { taskService, workspaceService } from "../services/api";
import { sortTasksSmartly } from "../utils/taskUtils";

const blankTaskForm = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "medium",
  status: "todo",
  deadline: ""
};

const Workspace = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [taskForm, setTaskForm] = useState(blankTaskForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [updatingTask, setUpdatingTask] = useState("");

  const isOwner = useMemo(() => {
    const creatorId = workspace?.createdBy?._id || workspace?.createdBy;
    return creatorId === user?._id;
  }, [workspace, user]);

  const canManage = user?.role === "admin" && isOwner;

  const loadWorkspace = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [workspaceResponse, taskResponse] = await Promise.all([
        workspaceService.byId(id),
        taskService.all({ workspaceId: id })
      ]);

      setWorkspace(workspaceResponse.data);
      setTasks(sortTasksSmartly(taskResponse.data));
      setTaskForm((current) => ({
        ...current,
        assignedTo: current.assignedTo || workspaceResponse.data.members?.[0]?._id || ""
      }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Workspace could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  const updateTaskForm = (event) => {
    setTaskForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const addMember = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      const { data } = await workspaceService.addMember(id, memberEmail);
      setWorkspace(data);
      setMemberEmail("");
      setNotice("Member added.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Member could not be added.");
    }
  };

  const createTask = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      const { data } = await taskService.create({
        ...taskForm,
        workspaceId: id
      });

      setTasks((current) => sortTasksSmartly([data, ...current]));
      setTaskForm({
        ...blankTaskForm,
        assignedTo: workspace?.members?.[0]?._id || ""
      });
      setNotice("Task created.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Task could not be created.");
    }
  };

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
    return <div className="app-loader">Loading workspace...</div>;
  }

  if (!workspace) {
    return <p className="form-error">{error || "Workspace not found."}</p>;
  }

  return (
    <section className="page-grid">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>{workspace.title}</h1>
          {workspace.description ? <p className="title-copy">{workspace.description}</p> : null}
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {notice ? <p className="form-success">{notice}</p> : null}

      <section className="content-columns">
        <div className="panel-section">
          <div className="section-heading">
            <h2>Members</h2>
          </div>
          <div className="member-list">
            {workspace.members?.map((member) => (
              <span className="member-pill" key={member._id}>
                {member.name}
              </span>
            ))}
          </div>

          {canManage ? (
            <form className="inline-form stacked-on-small" onSubmit={addMember}>
              <input
                type="email"
                value={memberEmail}
                onChange={(event) => setMemberEmail(event.target.value)}
                placeholder="member@example.com"
                required
              />
              <button className="secondary-button" type="submit">
                <UserPlus size={18} />
                <span>Add</span>
              </button>
            </form>
          ) : null}
        </div>

        {canManage ? (
          <div className="panel-section">
            <div className="section-heading">
              <h2>Create Task</h2>
            </div>
            <form className="task-form-grid" onSubmit={createTask}>
              <input
                name="title"
                value={taskForm.title}
                onChange={updateTaskForm}
                placeholder="Task title"
                required
              />
              <select name="assignedTo" value={taskForm.assignedTo} onChange={updateTaskForm} required>
                {workspace.members?.map((member) => (
                  <option value={member._id} key={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <select name="priority" value={taskForm.priority} onChange={updateTaskForm}>
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>
              <select name="status" value={taskForm.status} onChange={updateTaskForm}>
                <option value="todo">Todo</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>
              <input
                name="deadline"
                type="datetime-local"
                value={taskForm.deadline}
                onChange={updateTaskForm}
                required
              />
              <textarea
                name="description"
                value={taskForm.description}
                onChange={updateTaskForm}
                placeholder="Description"
                rows={3}
              />
              <button className="primary-button" type="submit">
                <CirclePlus size={18} />
                <span>Create Task</span>
              </button>
            </form>
          </div>
        ) : null}
      </section>

      <section className="panel-section">
        <div className="section-heading">
          <h2>Tasks</h2>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task._id}
              onStatusChange={updateTaskStatus}
              updating={updatingTask === task._id}
            />
          ))}
          {!tasks.length ? <p className="empty-copy">No tasks in this workspace.</p> : null}
        </div>
      </section>
    </section>
  );
};

export default Workspace;
