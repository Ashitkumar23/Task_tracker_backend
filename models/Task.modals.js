import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project.modals",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

export const Task = mongoose.model("Task",taskSchema)