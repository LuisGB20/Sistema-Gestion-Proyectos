export interface ResourceDashboardDataModel {
        "totalResources": number,
        "assignedResources": number,
        "projectsWithResources": number,
        "mostUsedResource": string,
        "resourcesByMonth": Array<{
            "year": number,
            "month": number,
            "resourceQuantityMonth": number
        }>
}