import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper';
import api from '@/plugins/axios'

export const genericRequest = async <T, B = unknown>(
  url: string,
  method: string,
  body?: B
): Promise<ResponseHelper<T>> => {
  try {
    const response: ResponseHelper<T> = await api({
      url: url,
      method: method,
      data: body,
    });
    return response as ResponseHelper<T>;
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: 'error desconocido',
      data: null as T,
    };
  }
};
