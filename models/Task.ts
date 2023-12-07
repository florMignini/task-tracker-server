import mongoose from "mongoose";
import { task } from "../interfaces";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    deadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    status: {
      type: String,
      enum: ["To do", "In-Progress", "Done"],
    },
    priority: {
      type: String,
      enum: ["Low", "High", "Medium"],
      require: true,
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

export const Task =
  mongoose.models.Task || mongoose.model<task>("Task", taskSchema);
