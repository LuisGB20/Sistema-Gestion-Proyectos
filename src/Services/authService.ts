import type { LoginResponse } from "@/interfaces/Login"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import { genericRequest } from "@/utils/genericRequest"

const controller = "Auth"


export const LoginService = async (email: string, password: string): Promise<ResponseHelper<LoginResponse>> => {
  return await genericRequest(`${controller}/login`, 'POST', { email, password })
}

export const LogoutService = async () => {
  return await genericRequest(`${controller}/logout`, 'POST')
}


export const RefreshTokenService = async (): Promise<ResponseHelper<boolean>> => {
  return await genericRequest(`${controller}/refresh`, 'POST')
}

export const ValidateSession = async () => {
  return await genericRequest(`${controller}/validate-session`, 'GET')
}

export const GetRoleNameService = async () => {
  return await genericRequest(`Validation/get-role`, 'GET')
}

