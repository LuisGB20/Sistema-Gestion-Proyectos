<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getResourceWithProjects } from '@/services/resources/recursosService';
import { formatDate } from '@/utils/formatDate';
import type { ProjectResource } from '@/interfaces/resources/ProjectWithResourceModel';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const route = useRoute();
const resource = ref<ResourceModel>();
const projectsWithResource = ref<ProjectResource[]>([]);

onMounted(async () => {
    const idResource = route.params.id.toString();
    const response = await getResourceWithProjects(idResource);
    resource.value = response.data.resource;
    projectsWithResource.value = response.data.projects;
});
</script>

<template>
    <main class="flex justify-center items-center py-6 lg:py-10">
        <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 lg:p-8">
            <!-- Encabezado -->
            <div class="mb-6">
                <p class="text-sm text-SteelBlue">Recurso ID-{{ resource?.id }}</p>
                <h1 class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl font-bold">
                    Detalles del recurso
                </h1>
            </div>

            <!-- Contenedor flexible -->
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Información del recurso -->
                <div class="w-full lg:w-1/2 space-y-4">
                    <div v-for="(label, key) in {
                        name: 'Nombre',
                        description: 'Descripción',
                        quantity: 'Cantidad',
                        id: 'ID',
                        isDeleted: 'Estado',
                        createdAt: 'Fecha de Creación'
                    }" :key="key">
                        <h2 class="text-lg font-semibold">{{ label }}:</h2>
                        <p :class="key === 'isDeleted' ? (resource?.isDeleted ? 'text-red-500' : 'text-DarkTeal') : 'text-gray-700'" 
                           class="text-base">
                            {{ key === 'createdAt' ? formatDate(resource?.createdAt || '') : resource?.[key] ?? 'No disponible' }}
                        </p>
                    </div>
                </div>

                <!-- Proyectos relacionados -->
                <div class="w-full lg:w-1/2">
                    <h2 class="text-lg font-semibold mb-4">Proyectos con este recurso</h2>
                    <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
                        <div v-for="(project, index) in projectsWithResource" :key="index"
                            class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white rounded-2xl p-4 shadow-md flex justify-between items-center">
                            <div>
                                <span class="text-sm text-gray-300">Proyecto:</span>
                                <span class="block text-lg font-bold">{{ project.name }}</span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-300">Cant. Utilizada</span>
                                <span class="block text-lg font-bold text-center">{{ project.usedQuantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
