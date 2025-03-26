import { genericRequest } from "@/utils/genericRequest"

const controller = "Project"

export const GetStatusProject = async () => {
  return await genericRequest(`${controller}/GetAllStatus`, 'GET')
}

export const GetProject = async () => {
  return await genericRequest(`${controller}/GetAll`, 'GET')
}

export const GetProjectByUser = async () => {
  return await genericRequest(`${controller}/GetByUser`, 'GET')
}


export const GetProjectById = async (id : string) => {
  return await genericRequest(`${controller}/GetById/${id}`, 'GET')
}

export const CreateProject = async (name: string, description: string, status: number, employeeId: string) => {
  return await genericRequest(`${controller}/CreateProject`, 'POST', { name, description, status, employeeId })
}

export const UpdateProject = async (id: string, employeeId: string = 0, name: string, description: string, status: number) => {
  return await genericRequest(`${controller}/UpdateProject/${id}`, 'PUT', {name, description, status, employeeId})
}

export const ChangeStatusProject = async (id: string, status:string) => {
  return await genericRequest(`${controller}/ChangeStatus?id=${id}&status=${status}`, 'POST')
}

export const DeleteProject = async (project: string) => {
  return await genericRequest(`${controller}/${project}`, 'DELETE')
}
