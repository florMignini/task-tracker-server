import express from "express";
import { Server as appServer } from "http";
import cors from "cors";
//db import
import connectDB from "../config/db";
//routes imports
import userRoutes from "../routes/userRoutes.ts";
import projectRoutes from "../routes/projectRoutes.ts";
import taskRoutes from "../routes/taskRoutes.ts";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
//DB connection
connectDB();

const http = new appServer(app)

//cors config
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whiteList.includes(origin)) {
      /* is allow to consult */
      callback(null, true);
    } else {
      /* is not allowed */
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//Router configuration
app.use("/user", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

const server = http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

/* SOCKET IO */
import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

// open connection
io.on("connection", (socket) => {
  console.log(`connected to  socket.io`);

  //create events
  socket.on("from project", (ProjectId) => {
    //project reference
    socket.join(ProjectId);
  });

  //new task event
  socket.on("new task", (task) => {
    const project = task.project;
    socket.to(project).emit("task added", task);
  });

  //delete task event
  socket.on("delete task", (task) => {
  const project = task.project;
  socket.to(project).emit("task deleted", task);
  })

  //update task event
  socket.on("update task", (task) => {
  const project = task.project._id;
  socket.to(project).emit("task updated", task);
  })

  // update state event
  socket.on("update state", (stateUpdated)=>{
  const project = stateUpdated.project._id;
  socket.to(project).emit("state updated", stateUpdated);
  })
});
