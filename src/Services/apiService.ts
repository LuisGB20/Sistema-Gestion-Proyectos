import { genericRequest, genericRequestAutheticated } from "@/Utils/genericRequest"

const base_url = import.meta.env.VITE_ENDPOINT_API ?? 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

export const peticionServicio = async (newItem: string) => {
    const body = { newItem }
    return await genericRequest(base_url + '/items', 'POST', body)
}


export const peticionServicioAutenticado = async (newItem: string) => {
    const body = { newItem }
    return await genericRequestAutheticated(headers, base_url + '/items', 'POST', body)
}