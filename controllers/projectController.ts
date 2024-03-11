import { Request, Response } from "express";
import Project from "../models/Project";
import { Task } from "../models/Task";
import { User } from "../models/User";

const createProject = async (req: any, res: Response) => {
  const newProject = new Project(req.body);
  newProject.creator = req.user._id;

  try {
    const newProjectSaved = await newProject.save();
    res.status(201).json(newProjectSaved);
  } catch (error) {
    console.log(error);
  }
};

const getAllProjects = async (req: any, res: Response) => {
  const projectsByUser = await Project.find({
    $or: [{ collaborator: { $in: req.user } }, { creator: { $in: req.user } }],
  }).select("-tasks");
  res.status(200).json(projectsByUser);
};

const getSingleProjectServer = async (req: any, res: Response) => {
  const { id } = req.params;

  const singleProject = await Project.findById(id)
    .populate("tasks", "name description deadline")
    .populate("collaborator", "name email profilePicture");

  if (!singleProject) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner & collaborators have access
  if (
    singleProject.creator.toString() !== req.user._id.toString() &&
    !singleProject.collaborator.some(
      (collaborator: any) =>
        collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }

  //get project tasks
  const tasks = await Task.find().where("project").equals(singleProject._id);

  res.status(200).json({ singleProject, tasks });
};

const editProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const singleProject = await Project.findById(id);
  if (!singleProject) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner can edit projects
  if (singleProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }

  singleProject.name = req.body.name || singleProject.name;
  singleProject.description = req.body.description || singleProject.description;
  singleProject.deadline = req.body.deadline || singleProject.deadline;
  singleProject.client = req.body.client || singleProject.client;

  try {
    const updatedProject = await singleProject.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const projectToDelete = await Project.findById(id);
  if (!projectToDelete) {
    const error = new Error(`Project not found`);
    return res.status(404).json({ msg: error.message });
  }
  //only owner can edit projects
  if (projectToDelete.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`user unauthorized`);
    return res.status(401).json({ msg: error.message });
  }
  try {
    await projectToDelete.deleteOne();
    res.status(200).json({ msg: `Project deleted` });
  } catch (error) {
    console.log(error);
  }
};

const addCollaborator = async (req: any, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;
  const projectById: any = await Project.findById(id);
  //project validation
  if (!projectById) {
    const error = new Error("Project not found");
    return res.status(404).json({
      msg: error.message,
    });
  }
  if (projectById?.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`User not allowed to add collaborators`);
    return res.status(403).json({
      msg: error.message,
    });
  }
  //email validation
  const userByEmail = await User.findOne({ email }).select(
    "-password -__v -token"
  );

  if (!userByEmail) {
    const error = new Error(`User not found`);
    return res.status(404).json({
      msg: error.message,
    });
  }
  //admin user can not be a added as collaborator
  if (projectById.creator.toString() === userByEmail._id.toString()) {
    const error = new Error(`Owner can not be added as collaborators`);
    return res.status(403).json({
      msg: error.message,
    });
  }
  //collaborators only can be added once
  if (projectById.collaborator.includes(userByEmail._id)) {
    const error = new Error(
      `User ${userByEmail.name} is already a collaborator`
    );
    return res.status(404).json({
      msg: error.message,
    });
  }
  //success path
  projectById.collaborator.push(userByEmail._id);
  await projectById.save();
  return res.status(200).json({
    msg: `${userByEmail.name} is now a collaborator`,
    userByEmail,
  });
};
const searchCollaborator = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userByEmail = await User.findOne({ email }).select(
    "-password -__v -token"
  );

  if (!userByEmail) {
    const error = new Error(`User not found`);
    return res.status(404).json({
      msg: error.message,
    });
  }
  return res.status(200).json(userByEmail);
};
const deleteCollaborator = async (req: any, res: Response) => {
  const { id } = req.params;

  const projectById: any = await Project.findById(id);
  //project validation
  if (!projectById) {
    const error = new Error("Project not found");
    return res.status(404).json({
      msg: error.message,
    });
  }
  if (projectById?.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`User not allowed to add collaborators`);
    return res.status(403).json({
      msg: error.message,
    });
  }
  //delete collaborator
  projectById.collaborator.pull(req.body.id);

  await projectById.save();
  return res.status(200).json({
    msg: `Collaborator deleted successfully`,
  });
};

export {
  createProject,
  getAllProjects,
  getSingleProjectServer,
  editProject,
  deleteProject,
  addCollaborator,
  searchCollaborator,
  deleteCollaborator,
};
function ISODate(): any {
  throw new Error("Function not implemented.");
}
