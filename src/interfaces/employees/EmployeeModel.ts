export interface createEmployeeModel {
  email: string,
  password: string,
  confirmPassword: string
  name: string
  lastName: string
  age: number
  sexo: string
  curp: string
  rfc: string
  salary: number
}

export interface EmployeeModel {
  id: string
  name: string
  lastName: string
  age: number
  sexo: string
  curp: string
  rfc: string
  salary: string
  isDeleted?: boolean
  createdAt?: string
  projectId?: string
  userId?: string
}
