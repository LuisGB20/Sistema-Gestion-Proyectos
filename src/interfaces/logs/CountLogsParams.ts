import type { AuditLogLevel, HttpMethod } from "./Logs";

export interface CountLogsParams {
  level?: AuditLogLevel;
  httpMethod?: HttpMethod;
}

export interface CountLogsTypes {
  informationCount: number;
  warningCount: number;
  errorCount: number;
  successCount: number;
}
