<script setup lang='ts'>
import { ref, computed } from 'vue';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { UserCircleIcon } from '@heroicons/vue/24/outline';


const itemsPerPage = 6;
const currentPage = ref(1);
const projects = ref(Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Título ${i + 1}`,
  description: "Para cocinar bien, usa ingredientes frescos, controla la temperatura y sazona con precisión. ¡Experimenta con sabores!",
  date: "8 DE MARZO, 2025",
  messages: 14
})));


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
        <Button
          label="Crear Proyecto"
          class="text-white px-4 py-2 rounded-md shadow-md"
        />
    </div>


    <div class="overflow-y-auto max-h-screen w-full">

      <div class="grid grid-cols-3 gap-4 w-full">
  <div v-for="project in paginatedProjects" :key="project.id" class="bg-gray-50 rounded-lg p-4 h-65 shadow-md">

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <h2 class="text-3xl font-semibold text-CharcoalBlue">{{ project.title }}</h2>
              <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
            </div>
            <div class="px-4 py-3 bg-red-200 text-red-900 text-sm rounded-2xl">
              <Tag severity="danger" value="Danger"></Tag>
            </div>
          </div>
          <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
          <p class="mt-2 text-sm text-CharcoalBlue">Para cocinar bien, usa ingredientes frescos, controla la temperatura y sazona con precisión. ¡Experimenta con sabores!</p>
          <div class="mt-8 text-xs text-red-500 flex items-center space-x-2">
            <i class="pi pi-hourglass" style="color: red"></i>
            <span>{{ project.date }}</span>
          </div>
          <div class="flex items-start space-x-2 mt-4 ml-60">
            <i class="pi pi-envelope text-CharcoalBlue"></i>
            <span class="text-xs text-CharcoalBlue">{{ project.messages }} mensajes</span>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm mt-8">
        <li>
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 h-8 bg-CharcoalBlue border border-CharcoalBlue rounded-s-lg hover:bg-DarkTeal">Anterior</button>
        </li>
        <li v-for="page in totalPages" :key="page">
          <button @click="currentPage = page" :class="{'bg-CharcoalBlue': currentPage === page}" class="px-3 h-8 border border-CharcoalBlue hover:bg-DarkTeal">{{ page }}</button>
        </li>
        <li>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 h-8 bg-CharcoalBlue border border-CharcoalBlue rounded-e-lg hover:bg-DarkTeal">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
