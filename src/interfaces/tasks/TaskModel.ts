import type { ActivityModel } from "../Activities/ActivityModel";

export interface TaskModel {
    id: string,
    projectId: string,
    name: string,
    description:string,
    estimatedHours: number,
    workedHours: number,
    startDate: Date,
    endTime: Date,
    activities: Array<ActivityModel>
  }