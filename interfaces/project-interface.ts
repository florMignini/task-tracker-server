import { user } from "./user-interface";

export interface project extends Document{
    name: String,
    description: String,
    deadline: String | null,
    client: String,
    creator: user,
    collaborator: user[],
}