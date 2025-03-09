import api from '@/plugins/axios'
import { logService } from '@/services/logService'

//request generico para hacer peticiones a la API
export const genericRequest = async (url: string, method: string, body?: any) => {
  try {
    const response = await api({
      url: url,
      method: method,
      data: body,
    })
    return response.data
  } catch (error: any) {
    console.log(error)
    // await logService.log('error', `Error in genericRequest: ${error.message}`, {
    //   url,
    //   method,
    //   body,
    //   error,
    // })
    throw error
  }
}

export const genericRequestAutheticated = async (
  headers: any,
  url: string,
  method: string,
  body?: any,
) => {
  try {
    const response = await api({
      url: url,
      method: method,
      headers: headers,
      data: body,
    })
    return response.data
  } catch (error: any) {
    await logService.log('error', `Error in genericRequestAutheticated: ${error.message}`, {
      url,
      method,
      body,
      headers,
      error,
    })
    throw error
  }
}