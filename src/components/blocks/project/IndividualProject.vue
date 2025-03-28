<script setup lang="ts">
import { formatDate } from '@/utils/formatDate.ts'
import type { BestProjectModel } from '@/interfaces/Projects/ProjectModel'
import EditProjectForm from '@/components/blocks/project/EditProjectForm.vue'
import ChangeStatusForm from '@/components/blocks/project/ChangeStatusForm.vue'
import DeleteProjectForm from '@/components/blocks/project/DeleteProjectForm.vue'

defineProps<{ project: BestProjectModel,   fetchOnUpdate : () => void }>();

</script>

<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">

    <div class="flex items-center space-x-2">
      <router-link :to="{ name: 'proyectos-detalle', params: { id: project.project.id } }">
        <h2 class="hover:text-slate-500 text-3xl font-semibold text-CharcoalBlue">{{ project.project.name }}</h2>
      </router-link>
      <EditProjectForm :project-id="project.project.id"  :fetch-on-update="() => fetchOnUpdate()"/>
    </div>

    <div class="flex justify-end gap-3 flex-col space-x-2 text-right text-sm text-gray-500">
      <ChangeStatusForm :id="project.project.id" :status="project.status"  :fetch-on-update="() => fetchOnUpdate() "/>
      <div>
        <p class="text-slate-700">Encargado: {{project.encharge && project.encharge.length > 0  ? `${project.encharge[0].employee.name} ${project.encharge[0].employee.lastName}`: "N/A" }}</p>
      </div>

    </div>
  </div>


  <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>


  <p class="mt-2 text-sm text-CharcoalBlue">{{ project.project.description }}</p>


  <div class="mt-6 text-xs text-blue-500 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">

    <div class="flex items-center space-x-2 flex-wrap max-w-full">
      <i class="pi pi-calendar-clock mr-1 text-blue-500" ></i>
      <span class="text-sm break-words">{{ formatDate(project.project.startDate) }}</span>
    </div>

    <DeleteProjectForm :project="project.project.id"   :fetch-on-update="() => fetchOnUpdate() "/>



  </div>
</template>

<style scoped>
</style>





<style scoped></style>
