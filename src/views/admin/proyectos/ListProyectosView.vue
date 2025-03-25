<script setup lang='ts'>
import { ref, computed, onBeforeMount } from 'vue'

import ListOfProject from '@/components/blocks/project/ListOfProject.vue'
import { GetProject } from '@/services/projects/projectService'
import CreateProjectForm from '@/components/blocks/project/CreateProjectForm.vue'


const itemsPerPage = 6;
const currentPage = ref(1);


const projects = ref([]);

onBeforeMount(async () => {
  try {
    const projectsFetch = await GetProject();
    console.log("Respuesta de la API:", projectsFetch);

    if (projectsFetch.success) {
      projects.value = projectsFetch.data;

    } else {
      console.warn("No se pudieron obtener los proyectos.");
    }
  } catch (error) {
    console.error("Error en onBeforeMount:", error);
  }
});



const totalPages = computed(() => Math.ceil(projects.value.length / itemsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return projects.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="flex flex-col items-center pt-10">

  
    <div class="flex items-center justify-between w-full px-4 mb-8 flex-wrap md:flex-nowrap">
      <h1 class="text-4xl md:text-5xl font-bold text-CharcoalBlue">Proyectos</h1>
      <CreateProjectForm />
    </div>

    <div class="overflow-y-auto max-h-screen w-full mb-8">
      <ListOfProject :projects="paginatedProjects" />
    </div>


    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-md mt-8 flex-wrap justify-center">
        <li>
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 h-8 bg-DarkTeal text-white border border-CharcoalBlue rounded-s-lg hover:bg-DarkTeal">
            Anterior
          </button>
        </li>
        <li v-for="page in totalPages" :key="page">
          <button
            @click="currentPage = page"
            :class="{ 'bg-DarkTeal text-white': currentPage === page }"
            class="px-3 h-8 border border-CharcoalBlue hover:bg-DarkTeal">
            {{ page }}
          </button>
        </li>
        <li>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 h-8 bg-DarkTeal text-white border border-CharcoalBlue rounded-e-lg hover:bg-DarkTeal">
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>