import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest"

export const getResources = async () => {
  return await genericRequest('Resource', 'GET')
}

export const getResource = async (id: string) => {
    return await genericRequest(`Resource/${id}`, 'GET')
  }

export const RegisterService = async (email: string, password: string, ConfirmPassword: string) => {
  return await genericRequest('Auth/register', 'POST', { email, password, ConfirmPassword })
}