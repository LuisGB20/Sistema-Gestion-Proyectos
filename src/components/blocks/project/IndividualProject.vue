<script setup lang="ts">
import { formatDate } from '@/utils/formatDate.ts'
import type { ProjectModel } from '@/interfaces/Projects/ProjectModel';
import EditProjectForm from '@/components/blocks/project/EditProjectForm.vue'

defineProps<{ project: ProjectModel }>();

</script>

<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
    
    <div class="flex items-center space-x-2">
      <h2 class="text-3xl font-semibold text-CharcoalBlue">{{ project.name }}</h2>
      <EditProjectForm :project-id="project.id" />
    </div>
    <div class="px-2 py-2 bg-DarkTeal text-white text-sm rounded-2xl">
      <h2>Estado: {{ project.status }}</h2>
    </div>
  </div>


  <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>


  <p class="mt-2 text-sm text-CharcoalBlue">{{ project.description }}</p>


  <div class="mt-6 text-xs text-red-500 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">

    <div class="flex items-center space-x-2 flex-wrap max-w-full">
      <i class="pi pi-calendar-clock mr-1" style="color: red"></i>
      <span class="text-sm break-words">{{ formatDate(project.startDate) }}</span>
    </div>

    <router-link :to="{ name: 'proyectos-detalle', params: { id: project.id } }">
      <button
        class="px-5 py-1 bg-gray-500 text-white hover:bg-SteelBlue text-sm rounded-2xl text-center"
        style="max-width: 140px; white-space: normal;">
        Ver Detalles
      </button>
    </router-link>
  </div>
</template>

<style scoped>
</style>





<style scoped></style>
