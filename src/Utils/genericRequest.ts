import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper';
import api from '@/plugins/axios'
import { logService } from '@/services/logService'

export const genericRequest = async <T, B = unknown>(
  url: string,
  method: string,
  body?: B
): Promise<ResponseHelper<T>> => {
  try {
    const response = await api({
      url: url,
      method: method,
      data: body,
    });

    return response.data as ResponseHelper<T>;
  } catch (error: unknown) {
    await logService.log('error', `Error in genericRequest: ${error}`, {
      url,
      method,
      body,
      error,
    });

    return {
      success: false,
      message: 'Error desconocido',
      data: null as T,
    };
  }
};
