import type { EmployeeModel } from "../employees/EmployeeModel";

export interface RecursosHumanosDashboardDataModel{
    activeEmployees: number,
    employeesWithoutProject: number,
    employeeMostNeedit: EmployeeModel,
    lastEmployeeAdded: EmployeeModel,
    employeesByMonths: Array<{
        "year": number,
        "month": number,
        "dataQuantity": number
    }>
}