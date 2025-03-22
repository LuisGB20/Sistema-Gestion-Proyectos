import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper";
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray";
import type { AuditEntitiesModel } from "@/interfaces/logs/AuditEntitiesModel";
import type { GetAuditLogsParams } from "@/interfaces/logs/AuditLogParams";
import type { CountLogsParams, CountLogsTypes } from "@/interfaces/logs/CountLogsParams";
import type { LogModel, LogModelWithUserEmail } from "@/interfaces/logs/LogModel";
import { AuditLogLevel, HttpMethod } from "@/interfaces/logs/Logs";
import { loggerRequest } from "@/utils/loggerRequest";

const controller = "AuditLog";

export const GetAuditLogs = async ({
  level = AuditLogLevel.INFO,
  httpMethod = HttpMethod.GET,
  offset = 0,
  pageSize = 10,
}: GetAuditLogsParams): Promise<ResponseHelperArray<LogModelWithUserEmail>> => {
  return await loggerRequest(
    `${controller}/GetAuditLogs?level=${level}&httpMethod=${httpMethod}&offset=${offset}&pageSize=${pageSize}`,
    'GET'
  );
};

// Por tipo de log especifico
export const GetCountLogs = async ({
  level = AuditLogLevel.INFO,
  httpMethod = HttpMethod.GET,
}: CountLogsParams): Promise<ResponseHelper<number>> => {
  return await loggerRequest(
    `${controller}/GetCountLogs?level=${level}&httpMethod=${httpMethod}`,
    'GET'
  );
};

export const GetAllCountLogsTypes = async (): Promise<ResponseHelper<CountLogsTypes>> => {
  return await loggerRequest(`${controller}/GetAuditLogsCount`, 'GET');
}

export const CreateLog = async (form: LogModel) => {
  return await loggerRequest(`${controller}`, 'POST', form)
}


export const GetAuditEntities = async (): Promise<ResponseHelperArray<AuditEntitiesModel>> => {
  return await loggerRequest(`${controller}/GetAuditEntities`, 'GET')
}
