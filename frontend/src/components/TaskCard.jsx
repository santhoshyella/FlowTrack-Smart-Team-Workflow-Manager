import { CalendarDays, CircleDot, UserRound } from "lucide-react";

const priorityLabels = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

const statusLabels = {
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done"
};

const getDeadlineState = (task) => {
  if (task.deadlineState) {
    return task.deadlineState;
  }

  if (task.status === "done") {
    return "complete";
  }

  const now = new Date();
  const deadline = new Date(task.deadline);
  const hoursUntilDue = (deadline.getTime() - now.getTime()) / (60 * 60 * 1000);

  if (deadline < now) {
    return "overdue";
  }

  if (hoursUntilDue <= 48) {
    return "near";
  }

  return "normal";
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
};

const TaskCard = ({ task, onStatusChange, updating = false }) => {
  const deadlineState = getDeadlineState(task);
  const assignee = typeof task.assignedTo === "object" ? task.assignedTo?.name : "Unassigned";
  const workspace = typeof task.workspaceId === "object" ? task.workspaceId?.title : "";

  return (
    <article className={`task-card deadline-${deadlineState}`}>
      <div className="task-card-header">
        <div>
          <p className="eyebrow">{workspace}</p>
          <h3>{task.title}</h3>
        </div>
        <span className={`priority-badge priority-${task.priority}`}>
          {priorityLabels[task.priority] || task.priority}
        </span>
      </div>

      {task.description ? <p className="task-description">{task.description}</p> : null}

      <div className="task-meta-grid">
        <span>
          <UserRound size={16} />
          {assignee}
        </span>
        <span>
          <CalendarDays size={16} />
          {formatDate(task.deadline)}
        </span>
        <span>
          <CircleDot size={16} />
          {statusLabels[task.status]}
        </span>
      </div>

      {task.aiSummary || (task.aiSubTasks && task.aiSubTasks.length > 0) ? (
        <div className="task-ai-analysis">
          <div className="ai-analysis-header">
            <span className="ai-pill">✨ Antigravity AI</span>
            {task.aiRiskScore !== undefined && (
              <span className={`ai-risk-badge risk-${task.aiRiskScore > 75 ? "high" : task.aiRiskScore > 40 ? "medium" : "low"}`}>
                Risk: {task.aiRiskScore}%
              </span>
            )}
          </div>

          {task.aiSummary ? (
            <p className="ai-summary">{task.aiSummary}</p>
          ) : null}

          {task.aiSubTasks && task.aiSubTasks.length > 0 ? (
            <div className="ai-subtasks-container">
              <p className="ai-subtasks-title">AI Suggested Milestones:</p>
              <ul className="ai-subtasks-list">
                {task.aiSubTasks.map((subTask, idx) => (
                  <li key={idx} className="ai-subtask-item">
                    <input type="checkbox" readOnly checked={task.status === "done"} disabled />
                    <span>{subTask}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="task-actions">
        <select
          aria-label={`Update status for ${task.title}`}
          value={task.status}
          disabled={updating}
          onChange={(event) => onStatusChange?.(task._id, event.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </article>
  );
};

export default TaskCard;
