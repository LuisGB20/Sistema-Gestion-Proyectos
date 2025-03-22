<script setup lang="ts">
import { formatDate } from '@/utils/formatDate.ts'
import type { ProjectModel } from '@/interfaces/Projects/ProjectModel';

defineProps<{ project: ProjectModel }>();

</script>

<template>


    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <h2 class="text-3xl font-semibold text-CharcoalBlue">{{ project.name }}</h2>
        <i class="pi pi-pen-to-square text-CharcoalBlue ml-4"></i>
      </div>
      <div class="px-2 py-2 bg-DarkTeal text-white text-sm rounded-2xl">
        <h2>Estado: {{project.status}}</h2>
      </div>

    </div>
    <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
    <p class="mt-2 text-sm text-CharcoalBlue">{{project.description}}</p>
    <div class="mt-6 text-xs text-red-500 flex items-center justify-between space-x-2">

      <div class="whitespace-nowrap">
        <i class="pi pi-calendar-clock mr-1" style="color: red"></i>
        <span class=" text-sm">{{ formatDate(project.startDate) }}</span>
      </div>

      <router-link :to="{ name: 'proyectos-detalle', params: { id: project.id } }">
        <button class=" px-1 py-1 bg-LightGray text-black hover:bg-SteelBlue text-sm rounded-2xl text-center" style="max-width: 90px; white-space: normal;" >
          Ver Detalles
        </button>
      </router-link>

      

    </div>



</template>

<style scoped></style>
