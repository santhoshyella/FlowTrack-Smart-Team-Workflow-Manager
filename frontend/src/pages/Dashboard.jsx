import { BarChart3, CirclePlus, Clock3, Flame, ListChecks, TimerReset } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import WorkspaceCard from "../components/WorkspaceCard";
import { useAuth } from "../context/AuthContext";
import { taskService, workspaceService } from "../services/api";
import { sortTasksSmartly } from "../utils/taskUtils";

const emptySummary = {
  total: 0,
  todo: 0,
  inProgress: 0,
  done: 0,
  overdue: 0,
  nearDeadline: 0,
  highPriority: 0
};

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(emptySummary);
  const [workspaces, setWorkspaces] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [workspaceForm, setWorkspaceForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [updatingTask, setUpdatingTask] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [summaryResponse, workspaceResponse, taskResponse] = await Promise.all([
        taskService.analytics(),
        workspaceService.all(),
        taskService.all()
      ]);

      setSummary(summaryResponse.data);
      setWorkspaces(workspaceResponse.data);
      setTasks(sortTasksSmartly(taskResponse.data));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Dashboard data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const metrics = useMemo(
    () => [
      { label: "Total", value: summary.total, icon: BarChart3, tone: "blue" },
      { label: "Todo", value: summary.todo, icon: ListChecks, tone: "gray" },
      { label: "In progress", value: summary.inProgress, icon: Clock3, tone: "green" },
      { label: "Overdue", value: summary.overdue, icon: TimerReset, tone: "red" },
      { label: "Near deadline", value: summary.nearDeadline, icon: Clock3, tone: "yellow" },
      { label: "High priority", value: summary.highPriority, icon: Flame, tone: "orange" }
    ],
    [summary]
  );

  const updateWorkspaceForm = (event) => {
    setWorkspaceForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const createWorkspace = async (event) => {
    event.preventDefault();
    setNotice("");
    setError("");

    try {
      const { data } = await workspaceService.create(workspaceForm);
      setWorkspaces((current) => [data, ...current]);
      setWorkspaceForm({ title: "", description: "" });
      setNotice("Workspace created.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Workspace could not be created.");
    }
  };

  const handleRunAgent = async () => {
    setAiLoading(true);
    setNotice("");
    setError("");

    try {
      const response = await taskService.runAgent();
      setNotice(`Antigravity Agent ran successfully! Optimized ${response.data.updatedTasksCount} tasks.`);
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Antigravity AI Agent encountered an error.");
    } finally {
      setAiLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    setUpdatingTask(taskId);
    setError("");

    try {
      const { data } = await taskService.updateStatus(taskId, status);
      setTasks((current) => sortTasksSmartly(current.map((task) => (task._id === taskId ? data : task))));
      const { data: freshSummary } = await taskService.analytics();
      setSummary(freshSummary);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Task status could not be updated.");
    } finally {
      setUpdatingTask("");
    }
  };

  if (loading) {
    return <div className="app-loader">Loading dashboard...</div>;
  }

  return (
    <section className="page-grid">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">{user?.role}</p>
          <h1>Dashboard</h1>
        </div>
        {user?.role === "admin" ? (
          <button
            className="ai-trigger-button"
            disabled={aiLoading}
            onClick={handleRunAgent}
          >
            <span>{aiLoading ? "✨ Agent is thinking..." : "✨ Run Antigravity AI Agent"}</span>
          </button>
        ) : null}
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {notice ? <p className="form-success">{notice}</p> : null}

      <section className="metric-grid" aria-label="Task analytics">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article className={`metric-card tone-${metric.tone}`} key={metric.label}>
              <Icon size={20} />
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          );
        })}
      </section>

      {user?.role === "admin" ? (
        <section className="panel-section">
          <div className="section-heading">
            <h2>Create Workspace</h2>
          </div>
          <form className="inline-form" onSubmit={createWorkspace}>
            <input
              name="title"
              value={workspaceForm.title}
              onChange={updateWorkspaceForm}
              placeholder="Workspace title"
              required
            />
            <input
              name="description"
              value={workspaceForm.description}
              onChange={updateWorkspaceForm}
              placeholder="Description"
            />
            <button className="primary-button" type="submit">
              <CirclePlus size={18} />
              <span>Create</span>
            </button>
          </form>
        </section>
      ) : null}

      <section className="content-columns">
        <div className="panel-section">
          <div className="section-heading">
            <h2>Workspaces</h2>
          </div>
          <div className="workspace-grid">
            {workspaces.map((workspace) => (
              <WorkspaceCard workspace={workspace} key={workspace._id} />
            ))}
            {!workspaces.length ? <p className="empty-copy">No workspaces yet.</p> : null}
          </div>
        </div>

        <div className="panel-section">
          <div className="section-heading">
            <h2>Smart Task Queue</h2>
          </div>
          <div className="task-list compact-list">
            {tasks.slice(0, 6).map((task) => (
              <TaskCard
                task={task}
                key={task._id}
                onStatusChange={updateTaskStatus}
                updating={updatingTask === task._id}
              />
            ))}
            {!tasks.length ? <p className="empty-copy">No tasks yet.</p> : null}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
