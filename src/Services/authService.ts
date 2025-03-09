import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest"

export const LoginService = async (email: string, password: string) => {
  return await genericRequest('Auth/login', 'POST', { email, password })
}

export const RegisterService = async (email: string, password: string, ConfirmPassword: string) => {
  return await genericRequest('Auth/register', 'POST', { email, password, ConfirmPassword })
}

// export const LogoutService = async (token: string) => {
//   try {
//     return await genericRequestAutheticated(headers, 'Auth/logout', 'POST', { token })
//   } catch (error) {
//     await handleError(error, 'logout')
//   }
// }