<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { GetProjectById } from '@/services/projects/projectService'
import { useRoute } from 'vue-router'

const route = useRoute();
const project = ref({} as Project);

// Datos de las tareas para cada actividad
const tasks = ref([
  'Actividad 1', 'Actividad 2', 'Actividad 3', 'Actividad 4'
]);

// Datos de las actividades
const activities = ref([
  { name: 'Tareas 1', showTasks: false, tasks: tasks.value },
  { name: 'Tareas 2', showTasks: false, tasks: tasks.value },
  { name: 'Tareas 3', showTasks: false, tasks: tasks.value },
  { name: 'Tareas 4', showTasks: false, tasks: tasks.value },
]);


const resources = ref([
  'Recurso 1', 'Recurso 2', 'Recurso 3'
]);

const members = ref([
  'Empleado 1', 'Empleado 2', 'Empleado 3'
]);

onBeforeMount(async () => {
  const id = route.params.id;
  console.log("projectId", id);

  try {
    const getProject = await GetProjectById(id);

    console.log("getProject", getProject);

    if (getProject.success) {
      project.value = getProject.data;
      // members.value = getProject.data.employee;
    }
  } catch (error) {
    console.error("error fetching project:", error);
  }
});


const toggleTasks = (index: number) => {
  activities.value[index].showTasks = !activities.value[index].showTasks;
};
</script>

<template>
  <div class="p-4">
    <div v-if="project" class=" p-4 rounded-lg flex justify-between items-center bg-white mb-4">
      <div>
        <p class="text-lg font-semibold text-DarkTeal">Nombre: {{ project.name }}</p>
        <p class="text-md">Descripción: {{project.description}}</p>
      </div>

      <div class="text-right text-sm text-gray-500">
        Encargado: Empleado 1
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">

      <div class=" p-4 rounded-lg bg-white">
        <h3 class="text-lg font-semibold mb-2">Recursos</h3>
        <ul class="list-disc pl-5">
          <li v-for="(resource, index) in resources" :key="index">{{ resource }}</li>
        </ul>
      </div>


      <div class=" p-4 rounded-lg bg-white">
        <h3 class="text-lg font-semibold mb-2">Integrantes</h3>
        <ul class="list-disc pl-5">
          <li v-for="(member, index) in members" :key="index">{{ member }}</li>
          <!-- <li v-for="(employee, index) in members" :key="index">
            Nombre: {{ employee.name }} Apellido: {{ employee.lastName }} Edad: {{ employee.age }}
</li> -->
        </ul>
      </div>
    </div>


    <div class=" p-4 rounded-lg bg-white mb-4">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Lista De tareas</p>
        <div class="text-right text-sm text-gray-500">Detalles</div>
      </div>


      <div class="mt-4" style="max-height: 300px; overflow-y: auto;">
        <div v-for="(activity, index) in activities" :key="index" class=" p-4 rounded-lg bg-slate-100 mt-4">
          <h3 class="text-md font-semibold cursor-pointer" @click="toggleTasks(index)">
            {{ activity.name }}
          </h3>


          <div v-if="activity.showTasks" class="mt-4" :style="activity.tasks.length > 4 ? 'max-height: 140px; overflow-y: auto;' : ''">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(task, taskIndex) in activity.tasks" :key="taskIndex" class=" p-4 rounded-lg bg-white">
                <p>{{ task }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Aquí puedes personalizar el estilo si lo necesitas */
</style>
