export interface createEmployeeModel {
  email: string,
  password: string,
  confirmPassword: string
  name: string
  lastName: string
  age: number
  sexo: number
  curp: string
  rfc: string
  salary: string
}

export interface EmployeeModel {
  id: string
  name: string
  lastName: string
  age: number
  sexo: number
  curp: string
  rfc: string
  salary: string
  isDeleted?: boolean
  createdAt?: string
  projectId?: string
  userId?: string
}
