import type { ResourceModel } from "@/interfaces/resources/ResourceModel"
import { genericRequest } from "@/utils/genericRequest"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"

const controller = "Resource"

export const getResources = async (): Promise<ResponseHelperArray<ResourceModel>> => {
  return await genericRequest(`${controller}`, 'GET')
}

export const getResource = async (id: string): Promise<ResponseHelper<ResourceModel>> => {
  return await genericRequest(`${controller}/${id}`, 'GET')
}

export const getResourceWithProjects = async (id: string) => {
  return await genericRequest(`${controller}/GetResourceWithProjects?Id=${id}`, 'GET')
}

export const createResource = async (name: string, description: string, quantity: number) => {
  return await genericRequest(`${controller}`, 'POST', {name, description, quantity})
}

export const updateResource = async (id: string, name: string, description: string, quantity: number) => {
  return await genericRequest(`${controller}/${id}`, 'PUT', {id, name, description, quantity})
}

export const deleteResource = async (id: string) => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}
