import express from "express";
import { checkAuth } from "../middleware/check-auth.ts";
import {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/index.ts";

const router = express.Router();

router.post("/", checkAuth, addTask);

router
  .route("/:taskId")
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

router.post("/status/:taskId", checkAuth, updateTaskStatus);

export default router;
