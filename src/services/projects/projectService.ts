import { genericRequest } from "@/utils/genericRequest"

const controller = "Project"

export const GetProject = async () => {
  return await genericRequest(`${controller}/GetAll`, 'GET')
}

export const GetProjectById = async (id : string) => {
  return await genericRequest(`${controller}/GetById/${id}`, 'GET')
}

export const CreateProject = async (name: string, description: string, status: number, employeeId: string) => {
  return await genericRequest(`${controller}/CreateProject`, 'POST', { name, description, status, employeeId })
}

export const UpdateProject = async (id: string, isDeleted: boolean, name: string, description: string, status: number) => {
  return await genericRequest(`${controller}`, 'PUT', {id, isDeleted, name, description, status })
}

export const DeleteProject = async (id: string) => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}
