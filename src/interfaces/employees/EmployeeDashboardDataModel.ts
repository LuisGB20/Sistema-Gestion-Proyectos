import type { ActivityModel } from "../Activities/ActivityModel"

export interface EmployeeDashboardDataModel {
    pendingTasks: number,
    completedTasks: number,
    tasksAssignedToEmployee: number,
    activitiesByMonths: Array<{
        "year": number,
        "month": number,
        "activityCount": number
    }>,
    lastActivities: Array<ActivityModel>
}
