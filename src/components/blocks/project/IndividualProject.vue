<script setup lang="ts">
import { formatDate } from '@/utils/formatDate.ts';
import type { BestProjectModel } from '@/interfaces/Projects/ProjectModel';
import EditProjectForm from '@/components/blocks/project/EditProjectForm.vue';
import ChangeStatusForm from '@/components/blocks/project/ChangeStatusForm.vue';
import DeleteProjectForm from '@/components/blocks/project/DeleteProjectForm.vue';
import { translateStatus } from '@/utils/statusProject';

defineProps<{ project: BestProjectModel }>();
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="flex items-center gap-3">
        <router-link 
          :to="{ name: 'proyectos-detalle', params: { id: project.project.id } }" 
          class="text-2xl font-semibold text-CharcoalBlue hover:text-blue-600 transition"
        >
          {{ project.project.name }}
        </router-link>
        <EditProjectForm :project-id="project.project.id" />
      </div>

      <div class="flex flex-col items-end text-gray-600 text-sm gap-1">
        <ChangeStatusForm :id="project.project.id" :status="translateStatus(project.status)" />
        <!-- <p class="text-gray-700 font-medium">
          <span class="text-gray-500">Encargado:</span> 
          {{ project.encharge?.length ? `${project.encharge[0].employee.name} ${project.encharge[0].employee.lastName}` : "N/A" }}
        </p> -->
      </div>
    </div>

    <!-- Separador -->
    <div class="border-t border-gray-300"></div>

    <!-- Descripción -->
    <p class="text-gray-800 text-sm leading-relaxed">
      {{ project.project.description }}
    </p>

    <!-- Pie de información -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <i class="pi pi-calendar-clock text-blue-500"></i>
        <span>{{ formatDate(project.project.startDate) }}</span>
      </div>
      <DeleteProjectForm :project="project.project.id" />
    </div>
  </div>
</template>
