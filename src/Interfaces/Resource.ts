import type { Project } from "./Project";

export interface Resource {
    id: string,
    name: string,
    description: string,
    quantity: number
    isDeleted: boolean
}