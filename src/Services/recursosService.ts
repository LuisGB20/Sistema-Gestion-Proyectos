import type { Resource } from "@/Interfaces/Resource"
import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest"

export const getResources = async () => {
  return await genericRequest('Resource', 'GET')
}

export const getResource = async (id: string) => {
  return await genericRequest(`Resource/${id}`, 'GET')
}

export const getResourceWithProjects = async (id: string) => {
  return await genericRequest(`Resource/GetResourceWithProjects?Id=${id}`, 'GET')
}

export const createResource = async (name: string, description: string, quantity: number) => {
  return await genericRequest(`Resource`, 'POST', {name, description, quantity})
}

export const updateResource = async (id: string, name: string, description: string, quantity: number) => {
  return await genericRequest(`Resource/${id}`, 'PUT', {id, name, description, quantity})
}

export const deleteResource = async (id: string) => {
  return await genericRequest(`Resource/${id}`, 'DELETE')
}