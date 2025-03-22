import type { TaskModel } from "../tasks/TaskModel";

export interface ActivityModel {
    id: string,
    name: string,
    description: string,
    status: string,
    taskId: string,
    employeeId:string,
    isDeleted: boolean,
    createdAt: Date
    task: TaskModel
  }