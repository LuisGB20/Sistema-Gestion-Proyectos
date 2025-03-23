import type { ResourceModel } from "./ResourceModel"

export interface ProjectWithResourceModel {
        projects: Array<ProjectResource>
        resource: ResourceModel
}

export interface ProjectResource {
        projectId: string
        name: string,
        usedQuantity: number
}