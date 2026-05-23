const User = require("../models/User");
const Workspace = require("../models/Workspace");

const uniqueIds = (ids) => {
  return Array.from(new Set(ids.filter(Boolean).map((id) => id.toString())));
};

const toId = (value) => {
  return value?._id ? value._id.toString() : value?.toString?.() || "";
};

const canOpenWorkspace = (workspace, user) => {
  if (!workspace || !user) {
    return false;
  }

  const userId = user._id.toString();
  const isCreator = toId(workspace.createdBy) === userId;
  const isMember = workspace.members.some((memberId) => toId(memberId) === userId);

  return isCreator || isMember;
};

const createWorkspace = async (req, res) => {
  const { title, description, members = [] } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Workspace title is required." });
  }

  const memberIds = uniqueIds([...members, req.user._id]);
  const workspace = await Workspace.create({
    title: title.trim(),
    description: description?.trim() || "",
    createdBy: req.user._id,
    members: memberIds
  });

  const populatedWorkspace = await workspace.populate([
    { path: "createdBy", select: "name email role" },
    { path: "members", select: "name email role" }
  ]);

  res.status(201).json(populatedWorkspace);
};

const getWorkspaces = async (req, res) => {
  const userId = req.user._id;
  const filter = { $or: [{ createdBy: userId }, { members: userId }] };

  const workspaces = await Workspace.find(filter)
    .populate("createdBy", "name email role")
    .populate("members", "name email role")
    .sort({ updatedAt: -1 });

  res.json(workspaces);
};

const getWorkspaceById = async (req, res) => {
  const workspace = await Workspace.findById(req.params.id)
    .populate("createdBy", "name email role")
    .populate("members", "name email role");

  if (!workspace) {
    return res.status(404).json({ message: "Workspace not found." });
  }

  if (!canOpenWorkspace(workspace, req.user)) {
    return res.status(403).json({ message: "You cannot access this workspace." });
  }

  res.json(workspace);
};

const addMember = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Member email is required." });
  }

  const workspace = await Workspace.findById(req.params.id);

  if (!workspace) {
    return res.status(404).json({ message: "Workspace not found." });
  }

  if (workspace.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only the workspace creator can add members." });
  }

  const member = await User.findOne({ email: email.toLowerCase().trim() });

  if (!member) {
    return res.status(404).json({ message: "No user found with this email." });
  }

  const alreadyAdded = workspace.members.some(
    (memberId) => memberId.toString() === member._id.toString()
  );

  if (!alreadyAdded) {
    workspace.members.push(member._id);
    await workspace.save();
  }

  const populatedWorkspace = await workspace.populate([
    { path: "createdBy", select: "name email role" },
    { path: "members", select: "name email role" }
  ]);

  res.json(populatedWorkspace);
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  addMember
};
