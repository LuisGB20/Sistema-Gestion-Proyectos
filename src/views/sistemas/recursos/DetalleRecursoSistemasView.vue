<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getResourceWithProjects } from '@/services/resources/recursosService';
import { formatDate } from '@/utils/formatDate';
import type { ProjectWithResourceModel } from '@/interfaces/resources/ProjectWithResourceModel';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const route = useRoute();
const resource = ref<ResourceModel>();
const projectsWithResource = ref<Array<ProjectWithResourceModel>>()

onMounted(async () => {
    const idResource = route.params.id.toString();
    const response = await getResourceWithProjects(idResource);
    resource.value = response.data.resource;
    projectsWithResource.value = response.data.projects;
});
</script>

<template>
    <main class="flex justify-center items-center py-8">
        <div class="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
            <!-- Encabezado -->
            <div class="mb-5">
                <p class="text-sm text-SteelBlue">Recurso ID-{{ resource?.id }}</p>
                <h1 class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl font-bold">
                    Detalles del recurso
                </h1>
            </div>

            <!-- Contenedor flexible -->
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Información del recurso -->
                <div class="w-full lg:w-1/2 space-y-4">
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
                        <p :class="resource?.isDeleted ? 'text-red-500' : 'text-DarkTeal'">
                            {{ resource?.isDeleted ? 'Eliminado' : 'Activo' }}
                        </p>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold">Fecha de Creación:</h2>
                        <p>{{ resource?.createdAt ? formatDate(resource.createdAt) : 'Fecha no disponible' }}</p>
                    </div>
                </div>

                <!-- Proyectos relacionados -->
                <div class="w-full lg:w-1/2">
                    <h2 class="text-lg font-semibold mb-4">Proyectos con este recurso</h2>
                    <div class="space-y-4 max-h-96 overflow-y-auto">
                        <div v-for="project in projectsWithResource" :key="project.id"
                            class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white rounded-lg p-4 shadow-lg flex justify-between items-center">
                            <div>
                                <span class="text-sm text-gray-300">Proyecto:</span>
                                <span class="block text-xl font-bold">{{ project.name }}</span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-300">Cant. Utilizada</span>
                                <span class="block text-xl font-bold">{{ project.usedQuantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
