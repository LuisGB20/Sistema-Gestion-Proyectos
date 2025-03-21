import type { ActivityModel } from "@/interfaces/Activities/ActivityModel"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import { genericRequest } from "@/utils/genericRequest"

const controller = "Activity"

export const GetEmployeeActivities = async (id: string): Promise<ResponseHelper<ActivityModel>> => {
  return await genericRequest(`${controller}/GetEmployeeActivities?EmployeeId=${id}`, 'GET')
}

export const MarkAsCompletedActivity = async (id: string): Promise<ResponseHelper<ActivityModel>> => {
  return await genericRequest(`${controller}/MarkAsCompletedActivity?ActivityId=${id}`, 'GET')
}
