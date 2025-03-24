import type { EmployeeModel } from '@/interfaces/employees/EmployeeModel.ts'

export interface ProjectModel {
    id: string,
    name: string,
    description: string,
    status: string,
    startDate: Date,
    endTime: Date
}

export interface BestProjectModel {
  project: ProjectModel
  status: string
  employees: BestEmployeeModel[]
  encharge: BestEmployeeModel[]
}

export interface BestEmployeeModel {
  employee: EmployeeModel
  role: string
}
