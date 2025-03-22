export interface AuditEntitiesModel {
  action: string;
  idEntity: string;
  tableName: string;
  oldValue?: string;
  newValue?: string;
  user: string;
  role: string;
  ipAddress: string;
  rowVersion: string;
  userEmail?: string;
}
