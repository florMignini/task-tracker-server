import { Request, Response } from "express";

import { Task } from "../models/Task";
import Project from "../models/Project";

const addTask = async (req:any, res:Response) => {

const {project} = req.body;

//check if project exist
const projectFound = await Project.findById(project)

if(!projectFound){
    const error = new Error(`Project not found`)
    return res.status(404).json({msg: error.message})
}
//if creator is not user
if(projectFound.creator.toString() !== req.user._id.toString()) {
    const error = new Error(`access denied`)
    return res.status(403).json({msg: error.message})
}

try {
    const newTask = await Task.create(req.body)
    //keep task id in project task arr
    projectFound.tasks.push(newTask._id)
    await projectFound.save()
    res.status(201).json(newTask)
} catch (error) {
    console.log(error)
}
};

const getTask = async (req : any, res: Response) => {
const {id} = req.params;
const task = await Task.findById(id).populate("project")
if(!task){
    const error = new Error(`Task not found`)
    return res.status(404).json({msg: error.message})
}
if(task.project.creator.toString() !== req.user._id.toString()){
    const error = new Error(`access denied`)
    return res.status(403).json({msg: error.message})
}
    res.status(200).json(task)
};

const updateTask = async (req:any, res:Response) => {

    const {taskId}= req.params;

const task = await Task.findById(taskId).populate("project")
if(!task){
    const error = new Error(`Task not found`)
    return res.status(404).json({msg: error.message})
}
if(task.project.creator.toString() !== req.user._id.toString()){
    const error = new Error(`access denied`)
    return res.status(403).json({msg: error.message})
}

//update data
task.name = req.body.name || task.name;
task.description = req.body.description || task.description;
task.priority = req.body.priority || task.priority;
task.status = req.body.status || task.status;
task.deadline = req.body.deadline || task.deadline;
// task.completedBy = req.user._id;

try {
    const saveUpdatedTask = await task.save();
    res.status(200).json(saveUpdatedTask)
} catch (error) {
    console.log(error)
}
};

const deleteTask = async (req:any, res:Response) => {

    const {taskId} = req.params;
    const task = await Task.findById(taskId).populate("project")
    if(!task){
        const error = new Error(`Task not found`)
        return res.status(404).json({msg: error.message})
    }
    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error(`access denied`)
        return res.status(403).json({msg: error.message})
    }
    try {
        const project = await Project.findById(task.project) 
        project.tasks.pull(task._id)
        Promise.allSettled([await project.save(),await task.deleteOne()])
        
        res.status(200).json({msg:`task successfully deleted`})
    } catch (error) {
        
    }
};

const updateTaskStatus = async () => {};

export { addTask, getTask, deleteTask, updateTask, updateTaskStatus };
