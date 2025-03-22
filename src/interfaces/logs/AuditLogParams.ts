import type { AuditLogLevel, HttpMethod } from "./Logs";

export interface GetAuditLogsParams {
  level?: AuditLogLevel;
  httpMethod?: HttpMethod;
  offset?: number;
  pageSize?: number;
}
