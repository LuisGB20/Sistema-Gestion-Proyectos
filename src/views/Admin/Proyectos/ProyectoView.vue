<script setup lang="ts">

import { onBeforeMount, onMounted, ref } from 'vue'
  import { GetProject, GetProjectById } from '@/services/projectService.ts'
import { useRoute } from 'vue-router'

  const route = useRoute();

  const project = ref({} as Project);

  onBeforeMount(async() => {
    const id = route.params.id; // Obtener el ID desde la URL
    console.log("projectId", id);

    try {
      const getProject = await GetProjectById(id); // Llamar a la API

      console.log("getProject", getProject);

      if (getProject.success) {
        project.value = getProject.data;
      }
    } catch (error) {
      console.error("error fetching project:", error);
    }
  });

</script>

<template>

  <div>

    <h1 class="text-slate-700 text-4xl " >{{project.name}}</h1>

    <h2>Detalles del Proyecto con ID: {{ route.params.id }}</h2>

    <div v-if="project">

      <p>Nombre: {{ project.name }}</p>

      <p>Descripción: {{ project.description }}</p>

    </div>

  </div>

</template>

<style scoped>

</style>
