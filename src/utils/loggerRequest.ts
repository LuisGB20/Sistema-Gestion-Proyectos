import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper'
import loggerApi from '@/plugins/logger'

export const loggerRequest = async <T, B = unknown>(
  url: string,
  method: string,
  body?: B,
): Promise<ResponseHelper<T>> => {
  try {
    const response: ResponseHelper<T> = await loggerApi({
      url: url,
      method: method,
      data: body,
    })

    return response as ResponseHelper<T>
  } catch (error: unknown) {
    const messageError = error instanceof Error ? error.message : 'Ocurrió un error desconocido'
    return {
      success: false,
      message: messageError,
      data: null as T,
    }
  }
}
