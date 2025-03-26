import { genericRequest } from "@/utils/genericRequest"

const controller = "ProjectResource"

export const AssignToProject = async (projectId: string, rosourceId: string, quantity: string ) => {
  return await genericRequest(`${controller}/AssignToProject?projectId=${projectId}&resourceId=${rosourceId}&quantity=${quantity}`, 'POST' )
}
