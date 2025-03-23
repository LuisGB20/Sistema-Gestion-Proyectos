export interface AdminDashboardDataModel {
    "activeusers": number,
    "totalProjects": number,
    "totalResources": number,
    "totalLogsByDay": number,
    "logsByMonths": Array<{
        "year": number,
        "month": number,
        "dataQuantity": number
    }>,
    "resourcesByMonths": Array<{
        "year": number,
        "month": number,
        "dataQuantity": number
    }>,
    "projectsByMonths": Array<{
        "year": number,
        "month": number,
        "dataQuantity": number
    }>
}