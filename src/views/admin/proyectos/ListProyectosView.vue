<script setup lang='ts'>
import { ref, computed, onBeforeMount } from 'vue';

import ListOfProject from '@/components/blocks/project/ListOfProject.vue';
import { GetProject } from '@/services/projects/projectService';
import CreateProjectForm from '@/components/blocks/project/CreateProjectForm.vue';

const itemsPerPage = 6;
const currentPage = ref(1);
const projects = ref([]);

onBeforeMount(async () => {
  try {
    const projectsFetch = await GetProject();
    console.log('Respuesta de la API:', projectsFetch);

    if (projectsFetch.success) {
      projectsFetch.data.sort((a, b) => new Date(b.project.startDate).getTime() - new Date(a.project.startDate).getTime());
      projects.value = projectsFetch.data;
    } else {
      console.warn('No se pudieron obtener los proyectos.');
    }
  } catch (error) {
    console.error('Error en onBeforeMount:', error);
  }
});

const totalPages = computed(() => Math.ceil(projects.value.length / itemsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return projects.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const proyectoCreado = (value: object) => {
  projects.value.push(value);
}
</script>

<template>
  <main class="p-6 sm:p-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h1
        class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl sm:text-4xl font-extrabold drop-shadow-md w-full sm:w-auto text-center sm:text-start">
        Lista de Proyectos
      </h1>
      <CreateProjectForm @submit="value => proyectoCreado(value)" />
    </div>

    <div class="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-100">
      <ListOfProject :projects="paginatedProjects" />
    </div>

    <nav aria-label="Page navigation" class="flex justify-center mt-8">
      <ul class="inline-flex items-center space-x-2 text-md">
        <li>
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-DarkTeal text-white rounded-lg shadow-md hover:bg-opacity-80 disabled:opacity-50">
            Anterior
          </button>
        </li>
        <li v-for="page in totalPages" :key="page">
          <button @click="currentPage = page" :class="{ 'bg-DarkTeal text-white': currentPage === page }"
            class="px-4 py-2 border border-gray-300 rounded-lg shadow-md hover:bg-DarkTeal hover:text-white">
            {{ page }}
          </button>
        </li>
        <li>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-DarkTeal text-white rounded-lg shadow-md hover:bg-opacity-80 disabled:opacity-50">
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  </main>
</template>
