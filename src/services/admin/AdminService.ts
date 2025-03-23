import { genericRequest } from "@/utils/genericRequest"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { AdminDashboardDataModel } from "@/interfaces/admin/AdminDashboardDataModel"

const controller = "Admin"


export const GetAdminDashboardData = async () : Promise<ResponseHelper<AdminDashboardDataModel>> => {
    return await genericRequest(`${controller}/GetAdminDashboardData`, 'GET');
}