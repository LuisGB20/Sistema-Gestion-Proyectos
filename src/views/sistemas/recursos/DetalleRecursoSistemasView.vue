<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getResourceWithProjects } from '@/services/resources/recursosService';
import { formatDate } from '@/utils/formatDate';
import type { ProjectResource, ProjectWithResourceModel } from '@/interfaces/resources/ProjectWithResourceModel';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const route = useRoute();
const resource = ref<ResourceModel>();
const projectsWithResource = ref<Array<ProjectResource>>()

onMounted(async () => {
    const idResource = route.params.id.toString();
    const response = await getResourceWithProjects(idResource);
    resource.value = response.data.resource;
    projectsWithResource.value = response.data.projects;
});
</script>

<template>
    <main class="flex justify-center items-center py-4 lg:py-8">
        <div class="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 lg:p-6">
            <!-- Encabezado -->
            <div class="mb-5">
                <p class="text-sm text-SteelBlue">Recurso ID-{{ resource?.id }}</p>
                <h1 class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-2xl lg:text-3xl font-bold">
                    Detalles del recurso
                </h1>
            </div>

            <!-- Contenedor flexible -->
            <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <!-- Información del recurso -->
                <div class="w-full lg:w-1/2 space-y-3 lg:space-y-4">
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">Nombre:</h2>
                        <p class="text-sm lg:text-base">{{ resource?.name }}</p>
                    </div>
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">Descripción:</h2>
                        <p class="text-sm lg:text-base">{{ resource?.description }}</p>
                    </div>
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">Cantidad:</h2>
                        <p class="text-sm lg:text-base">{{ resource?.quantity }}</p>
                    </div>
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">ID:</h2>
                        <p class="text-gray-500 text-xs lg:text-sm break-words">{{ resource?.id }}</p>
                    </div>
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">Estado:</h2>
                        <p :class="resource?.isDeleted ? 'text-red-500' : 'text-DarkTeal'" class="text-sm lg:text-base">
                            {{ resource?.isDeleted ? 'Eliminado' : 'Activo' }}
                        </p>
                    </div>
                    <div>
                        <h2 class="text-base lg:text-lg font-semibold">Fecha de Creación:</h2>
                        <p class="text-sm lg:text-base">{{ resource?.createdAt ? formatDate(resource.createdAt) : 'Fecha no disponible' }}</p>
                    </div>
                </div>

                <!-- Proyectos relacionados -->
                <div class="w-full lg:w-1/2">
                    <h2 class="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Proyectos con este recurso</h2>
                    <div class="space-y-3 lg:space-y-4 max-h-96 overflow-y-auto">
                        <div v-for="(project, index) in projectsWithResource" :key="index"
                            class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white rounded-lg p-3 lg:p-4 shadow-lg flex justify-between items-center">
                            <div>
                                <span class="text-xs lg:text-sm text-gray-300">Proyecto:</span>
                                <span class="block text-base lg:text-xl font-bold">{{ project.name }}</span>
                            </div>
                            <div>
                                <span class="text-xs lg:text-sm text-gray-300">Cant. Utilizada</span>
                                <span class="text-center block text-base lg:text-xl font-bold">{{ project.usedQuantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>