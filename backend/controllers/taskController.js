const Task = require("../models/Task");
const User = require("../models/User");
const Workspace = require("../models/Workspace");

const NEAR_DEADLINE_MS = 48 * 60 * 60 * 1000;
const priorityRank = {
  high: 0,
  medium: 1,
  low: 2
};

const isTaskOverdue = (task, now = new Date()) => {
  return task.status !== "done" && new Date(task.deadline) < now;
};

const getDeadlineState = (task, now = new Date()) => {
  const deadline = new Date(task.deadline);

  if (task.status === "done") {
    return "complete";
  }

  if (deadline < now) {
    return "overdue";
  }

  if (deadline.getTime() - now.getTime() <= NEAR_DEADLINE_MS) {
    return "near";
  }

  return "normal";
};

const sortTasksSmartly = (tasks) => {
  const now = new Date();

  return tasks.sort((a, b) => {
    const aOverdue = isTaskOverdue(a, now) ? 0 : 1;
    const bOverdue = isTaskOverdue(b, now) ? 0 : 1;

    if (aOverdue !== bOverdue) {
      return aOverdue - bOverdue;
    }

    const priorityDifference = priorityRank[a.priority] - priorityRank[b.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(a.deadline) - new Date(b.deadline);
  });
};

const decorateTask = (task) => ({
  ...task,
  deadlineState: getDeadlineState(task),
  isOverdue: getDeadlineState(task) === "overdue"
});

const getWorkspaceIdsForAdmin = async (userId) => {
  const workspaces = await Workspace.find({ createdBy: userId }).select("_id");
  return workspaces.map((workspace) => workspace._id);
};

const ensureWorkspaceOwner = async (workspaceId, userId) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    return { error: { status: 404, message: "Workspace not found." } };
  }

  if (workspace.createdBy.toString() !== userId.toString()) {
    return { error: { status: 403, message: "Only the workspace creator can manage tasks." } };
  }

  return { workspace };
};

const createTask = async (req, res) => {
  const { title, description, workspaceId, assignedTo, status, priority, deadline } = req.body;

  if (!title || !workspaceId || !assignedTo || !deadline) {
    return res.status(400).json({
      message: "Title, workspace, assigned user, and deadline are required."
    });
  }

  const parsedDeadline = new Date(deadline);

  if (Number.isNaN(parsedDeadline.getTime())) {
    return res.status(400).json({ message: "Deadline must be a valid date." });
  }

  const { workspace, error } = await ensureWorkspaceOwner(workspaceId, req.user._id);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  const assignee = await User.findById(assignedTo).select("name email role");

  if (!assignee) {
    return res.status(404).json({ message: "Assigned user was not found." });
  }

  const isWorkspaceMember = workspace.members.some(
    (memberId) => memberId.toString() === assignee._id.toString()
  );

  if (!isWorkspaceMember) {
    return res.status(400).json({ message: "Assigned user must be a workspace member first." });
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim() || "",
    workspaceId,
    assignedTo,
    status: ["todo", "in-progress", "done"].includes(status) ? status : "todo",
    priority: ["low", "medium", "high"].includes(priority) ? priority : "medium",
    deadline: parsedDeadline
  });

  const populatedTask = await Task.findById(task._id)
    .populate("assignedTo", "name email role")
    .populate("workspaceId", "title description");

  res.status(201).json(decorateTask(populatedTask.toObject()));
};

const getTasks = async (req, res) => {
  const { workspaceId, mine } = req.query;
  const filter = {};

  if (req.user.role === "admin" && mine !== "true") {
    const workspaceIds = await getWorkspaceIdsForAdmin(req.user._id);
    const allowedWorkspaceIds = workspaceIds.map((id) => id.toString());

    if (workspaceId && !allowedWorkspaceIds.includes(workspaceId)) {
      return res.status(403).json({ message: "You cannot view tasks in this workspace." });
    }

    filter.workspaceId = workspaceId ? workspaceId : { $in: workspaceIds };
  } else {
    filter.assignedTo = req.user._id;

    if (workspaceId) {
      filter.workspaceId = workspaceId;
    }
  }

  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email role")
    .populate("workspaceId", "title description")
    .lean();

  res.json(sortTasksSmartly(tasks).map(decorateTask));
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  if (!["todo", "in-progress", "done"].includes(status)) {
    return res.status(400).json({ message: "Status must be todo, in-progress, or done." });
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  const isAssignedMember = task.assignedTo.toString() === req.user._id.toString();

  if (req.user.role === "admin") {
    const workspace = await Workspace.findById(task.workspaceId).select("createdBy");

    if (!workspace || workspace.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You cannot update this task." });
    }
  } else if (!isAssignedMember) {
    return res.status(403).json({ message: "Members can update only assigned tasks." });
  }

  task.status = status;
  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate("assignedTo", "name email role")
    .populate("workspaceId", "title description")
    .lean();

  res.json(decorateTask(updatedTask));
};

const getTaskAnalytics = async (req, res) => {
  const filter = {};

  if (req.user.role === "admin") {
    const workspaceIds = await getWorkspaceIdsForAdmin(req.user._id);
    filter.workspaceId = { $in: workspaceIds };
  } else {
    filter.assignedTo = req.user._id;
  }

  const tasks = await Task.find(filter).lean();
  const now = new Date();
  const summary = {
    total: tasks.length,
    todo: 0,
    inProgress: 0,
    done: 0,
    overdue: 0,
    nearDeadline: 0,
    highPriority: 0
  };

  tasks.forEach((task) => {
    if (task.status === "todo") {
      summary.todo += 1;
    }

    if (task.status === "in-progress") {
      summary.inProgress += 1;
    }

    if (task.status === "done") {
      summary.done += 1;
    }

    if (task.priority === "high") {
      summary.highPriority += 1;
    }

    const state = getDeadlineState(task, now);

    if (state === "overdue") {
      summary.overdue += 1;
    }

    if (state === "near") {
      summary.nearDeadline += 1;
    }
  });

  res.json(summary);
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  getTaskAnalytics
};
