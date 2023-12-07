
import { project } from "./project-interface";

export interface task extends Document{
    name: String,
    description: String,
    deadline: Date | null,
    status: String,
    priority: String,
    project: project
}