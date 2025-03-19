<script setup lang='ts'>
import { ref, computed, onBeforeMount } from 'vue'
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { GetProject } from '@/services/projectService.ts'
import DateTimeFormat = Intl.DateTimeFormat
import { formatDate } from '../../../utils/formatDate.ts'
import CreateProjectForm from '@/components/blocks/Project/CreateProjectForm.vue'
import ListOfProject from '@/components/blocks/Project/ListOfProject.vue'


const itemsPerPage = 6;
const currentPage = ref(1);

const projects = ref([]);

onBeforeMount( async () => {

  const projectsFetch = await GetProject();
  console.log(projects);

  if(projectsFetch.success){
    projects.value = projectsFetch.data;
    console.log(projects.value)
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

    <div class="flex items-center justify-between w-full pr-10 mb-8">
        <h1 class="text-4xl font-bold text-CharcoalBlue">Proyectos</h1>
      <CreateProjectForm></CreateProjectForm>
    </div>


    <div class="overflow-y-auto max-h-screen w-full">

    <ListOfProject :projects="paginatedProjects" />

    </div>

    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-md mt-8">
        <li>
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 h-8 bg-slate-700 text-white border border-CharcoalBlue rounded-s-lg hover:bg-slate-500 hover:text-white">Anterior</button>
        </li>
        <li v-for="page in totalPages" :key="page">
          <button @click="currentPage = page" :class="{'bg-DarkTeal text-white': currentPage === page}" class="px-3 h-8 border border-CharcoalBlue hover:bg-slate-500 hover:text-white">{{ page }}</button>
        </li>
        <li>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 h-8 bg-slate-700 text-white border border-CharcoalBlue rounded-e-lg hover:bg-slate-500 hover:text-white">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
