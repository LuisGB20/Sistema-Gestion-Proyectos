import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { TaskModel } from "@/interfaces/tasks/TaskModel"
import { genericRequest } from "@/utils/genericRequest"

const controller = "Task"

export const getTaskByProject = async (id: string): Promise<ResponseHelperArray<TaskModel>> => {
  return await genericRequest(`${controller}/GetAllTaskFromProject?ProjectId=${id}`, 'GET')
}
