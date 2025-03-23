<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getResource, getResourceWithProjects } from '@/services/resources/recursosService';
import { formatDate } from '@/utils/formatDate';
import type { ProjectResource, ProjectWithResourceModel } from '@/interfaces/resources/ProjectWithResourceModel';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const route = useRoute();
const resource = ref<ResourceModel>();
const projectsWithResource = ref<Array<ProjectResource>>();

onMounted(async () => {
    const idResource = route.params.id.toString();
    const response = await getResourceWithProjects(idResource);
    console.log(response);
    resource.value = response.data.resource;
    projectsWithResource.value = response.data.projects;
    console.log(projectsWithResource.value);
});
</script>

<template>
    <main class="flex flex-col justify-center items-center p-6">
        <div class="w-full max-w-6xl bg-white rounded-lg shadow-sm">
            <div class="p-8 border-b border-LightGray">
                <p class="text-sm text-Gunmetal">Recurso ID-{{ resource?.id }}</p>
                <h1
                    class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl font-bold">
                    Detalles del recurso
                </h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div class="space-y-8">
                    <div>
                        <h2 class="text-sm font-medium text-SteelBlue uppercase tracking-wider">Nombre</h2>
                        <p class="text-xl font-semibold text-Gunmetal mt-2">{{ resource?.name }}</p>
                    </div>

                    <div>
                        <h2 class="text-sm font-medium text-SteelBlue uppercase tracking-wider">Descripción</h2>
                        <p class="text-xl font-semibold text-Gunmetal mt-2">{{ resource?.description }}</p>
                    </div>

                    <div>
                        <h2 class="text-sm font-medium text-SteelBlue uppercase tracking-wider">Cantidad</h2>
                        <p class="text-xl font-semibold text-Gunmetal mt-2">{{ resource?.quantity }}</p>
                    </div>

                    <div>
                        <h2 class="text-sm font-medium text-SteelBlue uppercase tracking-wider">Estado</h2>
                        <p :class="resource?.isDeleted ? 'text-rojo-error' : 'text-green-800'"
                            class="text-xl font-semibold mt-2">
                            {{ resource?.isDeleted ? 'Eliminado' : 'Activo' }}
                        </p>
                    </div>

                    <div>
                        <h2 class="text-sm font-medium text-SteelBlue uppercase tracking-wider">Fecha de Creación</h2>
                        <p class="text-xl font-semibold text-Gunmetal mt-2">{{ resource?.createdAt ?
                            formatDate(resource.createdAt) : 'Fecha no disponible' }}</p>
                    </div>
                </div>

                <div class="space-y-8">
                    <h2
                        class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl font-bold">
                        Proyectos con este recurso
                    </h2>
                    <div class="space-y-6 max-h-[500px] overflow-y-auto pr-4">
                        <div v-if="!projectsWithResource || projectsWithResource.length === 0"
                            class="p-6 border border-LightGray rounded-lg text-center">
                            <p class="text-base text-Gunmetal">No hay proyectos asociados a este recurso.
                            </p>
                        </div>
                        <div v-for="(project, index) in projectsWithResource" :key="index"
                            class="p-6 border border-LightGray rounded-lg hover:bg-gray-50 transition-colors">
                            <div class="space-y-1">
                                <h3 class="text-xl font-semibold text-Gunmetal">{{ project.name }}</h3>
                                <p class="text-sm text-SteelBlue">Cantidad utilizada: {{ project.usedQuantity }}</p>
                                <p class="text-sm text-SteelBlue">Id: {{ project.projectId }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>