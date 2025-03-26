import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { TaskModel } from "@/interfaces/tasks/TaskModel"
import { genericRequest } from "@/utils/genericRequest"

const controller = "Task"

export const getTaskByProject = async (id: string): Promise<ResponseHelperArray<TaskModel>> => {
  return await genericRequest(`${controller}/GetAllTaskFromProject?ProjectId=${id}`, 'GET')
}

export const getTask = async (id: string): Promise<ResponseHelper<TaskModel>> => {
  return await genericRequest(`${controller}/${id}`, 'GET')
}

export const GetTaskById = async (id: string): Promise<ResponseHelper<TaskModel>> => {
  return await genericRequest(`${controller}/GetTaskById?id=${id}`, 'GET')
}

export const CreateTask = async (data: TaskModel): Promise<ResponseHelper<TaskModel>> => {
  const { projectId, name, description, estimatedHours, workedHours, startDate, endTime } = data;
  return await genericRequest(`${controller}`, 'POST', { projectId, name, description, estimatedHours, workedHours, startDate, endTime });
}

// export const updateResource = async (data: ResourceModel): Promise<ResponseHelper<ResourceModel>> => {
//   const { id, name, description, quantity } = data;
//   return await genericRequest(`${controller}/${id}`, 'PUT', { id, name, description, quantity })
// }

export const deleteTask = async (id: string): Promise<ResponseHelper<TaskModel>> => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}

export const AssignEmployeeToTask = async (taskId: string, employeeId: string): Promise<ResponseHelper<TaskModel>> => {
  return await genericRequest(`${controller}/AssignEmployee?taskId=${taskId}&employeeId=${employeeId}`, 'POST')
}

