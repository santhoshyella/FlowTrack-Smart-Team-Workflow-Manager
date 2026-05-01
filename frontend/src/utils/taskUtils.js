const priorityRank = {
  high: 0,
  medium: 1,
  low: 2
};

const isOverdue = (task, now = new Date()) => {
  return task.status !== "done" && new Date(task.deadline) < now;
};

export const sortTasksSmartly = (tasks = []) => {
  const now = new Date();

  return [...tasks].sort((a, b) => {
    const overdueRankA = isOverdue(a, now) ? 0 : 1;
    const overdueRankB = isOverdue(b, now) ? 0 : 1;

    if (overdueRankA !== overdueRankB) {
      return overdueRankA - overdueRankB;
    }

    const priorityDifference = priorityRank[a.priority] - priorityRank[b.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(a.deadline) - new Date(b.deadline);
  });
};

export const statusLabels = {
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done"
};

export const priorityLabels = {
  high: "High",
  medium: "Medium",
  low: "Low"
};
