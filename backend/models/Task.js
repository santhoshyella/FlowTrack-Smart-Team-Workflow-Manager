const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      trim: true,
      maxlength: 900,
      default: ""
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    deadline: {
      type: Date,
      required: true
    },
    aiSubTasks: {
      type: [String],
      default: []
    },
    aiRiskScore: {
      type: Number,
      default: 0
    },
    aiSummary: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ workspaceId: 1, deadline: 1 });

module.exports = mongoose.model("Task", taskSchema);
