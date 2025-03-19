<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getResource, getResourceWithProjects } from '@/services/resources/recursosService';
import { formatDate } from '@/utils/formatDate';
import type { ProjectWithResourceModel } from '@/interfaces/resources/ProjectWithResourceModel';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const route = useRoute();
const resource = ref<ResourceModel>();
const projectsWithResource = ref<Array<ProjectWithResourceModel>>()

onMounted(async () => {
    const idResource = route.params.id.toString();
    const response = await getResourceWithProjects(idResource);
    console.log(response)
    resource.value = response.data.resource;
    projectsWithResource.value = response.data.projects;
    console.log(projectsWithResource.value)
})

</script>

<template>
    <main class="flex flex-col justify-center items-center">
        <div class="w-full bg-white shadow-lg rounded-lg p-6">
            <div class="mb-5">
                <p class="text-sm text-SteelBlue">Recurso ID-{{ resource?.id }}</p>
                <h1
                    class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-start text-3xl font-bold">
                    Detalles del recurso
                </h1>
            </div>

            <div class="flex justify-between space-x-5">
                <div class="w-1/2 p-4 space-y-4">
                    <div>
                        <h2 class="text-lg font-semibold">Nombre:</h2>
                        <p>{{ resource?.name }}</p>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold">Descripción:</h2>
                        <p>{{ resource?.description }}</p>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold">Cantidad:</h2>
                        <p>{{ resource?.quantity }}</p>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold">ID:</h2>
                        <p class="text-gray-500 text-sm break-words">{{ resource?.id }}</p>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold">Estado:</h2>
                        <p :class="resource?.isDeleted ? 'text-rojo-error' : 'text-DarkTeal'">
                            {{ resource?.isDeleted ? 'Eliminado' : 'Activo' }}
                        </p>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold">Fecha de Creación:</h2>
                        <p>{{ resource?.createdAt ? formatDate(resource.createdAt) : 'Fecha no disponible' }}</p>
                    </div>
                </div>
                <div class="w-1/2 p-4 space-y-4">
                    <h2 class="text-lg font-semibold mb-5">Proyectos con este recurso</h2>
                    <div class="space-y-5 max-h-[400px] overflow-y-auto">
                        <div v-for="project in projectsWithResource"
                            class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white rounded-lg p-4 shadow-lg flex items-center justify-between w-full space-x-6">
                            <div class="flex items-center space-x-4">
                                <div class="flex flex-col items-start">
                                    <span class="text-sm text-gray-300">Proyecto:</span>
                                    <span class="text-xl font-bold">{{ project.name }}</span>
                                </div>
                            </div>
                            <div class="flex items-center space-x-6">
                                <div class="flex flex-col items-center">
                                    <span class="text-sm text-gray-300">Cant. Utilizada</span>
                                    <span class="text-xl font-bold">{{ project.usedQuantity }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>