import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { RecursosHumanosDashboardDataModel } from "@/interfaces/rh/RecursosHumanosDashboardDataModel"
import { genericRequest } from "@/utils/genericRequest"


export const GetRecursosHumanosDataDashboard = async (): Promise<ResponseHelper<RecursosHumanosDashboardDataModel>> => {
    return await genericRequest(`Employee/GetRHDasboarData`, 'GET')
  }