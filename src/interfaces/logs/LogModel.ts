import { AuditLogLevel, HttpMethod } from './Logs';

export interface LogModel {
  id?: string;
  message: string;
  httpMethod: HttpMethod;
  endpoint: string;
  level: AuditLogLevel;
  userId?: string;
  timeStamp: Date;
  IsDeleted?: boolean;
  createdAt?: string;
}

export interface LogModelWithUserEmail extends LogModel {
  userEmail: string;
}
