import { genericRequest } from "@/utils/genericRequest"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { EmployeeModel } from "@/interfaces/employees/EmployeeModel"

const controller = "Employee"

export const getEmployees = async (): Promise<ResponseHelperArray<EmployeeModel>> => {
  return await genericRequest(`${controller}`, 'GET')
}

export const getEmployee = async (id: string): Promise<ResponseHelper<EmployeeModel>> => {
  return await genericRequest(`${controller}/${id}`, 'GET')
}

export const createEmployee = async (data: EmployeeModel): Promise<ResponseHelper<EmployeeModel>> => {
  const { name, age, sexo, curp, salary, createdAt, isDeleted } = data;
  return await genericRequest(`${controller}`, 'POST', { name, age, sexo, curp, salary, createdAt, isDeleted})
}

export const updateEmployee = async (data: EmployeeModel): Promise<ResponseHelper<EmployeeModel>> => {
  const { id, name, age, sexo, curp, salary, createdAt, isDeleted } = data;

  return await genericRequest(`${controller}/${id}`, 'PUT', { name, age, sexo, curp, salary, createdAt, isDeleted })
}

export const deleteEmployee = async (id: string): Promise<ResponseHelper<EmployeeModel>> => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}
