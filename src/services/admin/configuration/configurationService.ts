import { genericRequest } from '@/utils/genericRequest'
import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper'

const controller = 'Configurations'

export const GetConfiguration = async (property: string): Promise<ResponseHelper<string>> => {
  return await genericRequest(`${controller}/${property}`, 'GET')
}

export const UpdateConfiguration = async (
  property: string,
  value: string,
): Promise<ResponseHelper<string>> => {
  return await genericRequest(`${controller}/${property}`, 'PUT', JSON.stringify(value))
}
