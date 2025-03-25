<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { GetProjectById } from '@/services/projects/projectService';
import { useRoute } from 'vue-router';
import AddEmployeeToProject from '@/components/blocks/project/employees/AddEmployeeToProject.vue'
import CreateResourceForProject
  from '@/components/blocks/project/resources/CreateResourceForProject.vue'




const route = useRoute();
const project = ref<Project | null>(null);
const tasks = ref<{ id: number; name: string; description:string; showActivities?: boolean; activities: { name: string; description: string }[], users: string[] }[]>([]);
const resources = ref<{name: string; quantity: number}[]>([]);
const members = ref<string[]>([]);

onBeforeMount(async () => {
  const id = route.params.id as string;
  console.log("projectId", id);

  try {
    const getProject = await GetProjectById(id);
    console.log("getProject", getProject);

    if (getProject.success) {
      project.value = getProject.data;
      members.value = getProject.data.employee.map((employee: any) => `${employee.name} ${employee.lastName}`);
      resources.value = getProject.data.projectResources.map((resource: any) => ({ name : resource.resource.name, quantity: resource.quantity}) );
      tasks.value = getProject.data.tasks.map((task: any) => ({
        id:task.id,
        name: task.name,
        description: task.description,
        users: task.taskEmployees.map((act: any) => `${act.employee.name} ${act.employee.lastName}`),
        activities: task.activities.map((act: any) => ({ name: act.name, description: act.description })),
        showActivities: false
      }));

      console.log("tareas", tasks.value);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
});

const toggleTasks = (index: number) => {
  tasks.value[index].showActivities = !tasks.value[index].showActivities;
};

const showModal = ref(false);
const memberToRemoveIndex = ref<number | null>(null);

const confirmRemoveMember = (index: number) => {
  memberToRemoveIndex.value = index;
  showModal.value = true;
};


const removeMember = () => {
  if (memberToRemoveIndex.value !== null) {
    members.value.splice(memberToRemoveIndex.value, 1);
  }
  showModal.value = false;
};
</script>

<template>
  <div class="p-4">
    <div v-if="project" class="p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-white mb-4">
      <div>
        <p class="text-2xl font-semibold text-DarkTeal">Nombre: {{ project.name }}</p>
        <p class="text-md pl-5">Descripción: {{ project.description }}</p>
      </div>
      <div class="text-right text-sm text-gray-500 mt-4 md:mt-0">
        Encargado: Empleado 1
      </div>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <!-- Recursos -->
      <div class="p-4 rounded-lg bg-white">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold mb-2">Recursos</h3>
          <CreateResourceForProject />
        </div>
        <ul class="list-disc pl-5">
          <li v-for="(resource, index) in resources" :key="index">{{ resource.name }} ( cantidad: {{ resource.quantity }} )</li>
        </ul>
      </div>


      <div class="p-4 rounded-lg bg-white">
  <div class="flex justify-between items-center">
    <h3 class="text-lg font-semibold mb-2">Integrantes</h3>
    <AddEmployeeToProject />
  </div>
  <ul class="list-disc pl-5">
    <li v-for="(member, index) in members" :key="index" class="flex justify-between items-center">
      <span>{{ member }}</span>
      <button
          @click="confirmRemoveMember(index)"
          class="px-4 py-2 bg-red-500 rounded-2xl text-white text-sm"
        >
          Eliminar
        </button>
    </li>
  </ul>
</div>


    </div>

      <!-- Modal de eliminacion de integrantes -Misael -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold mb-4">¿Estás seguro?</h2>
      <p>¿Quieres eliminar a <strong>{{ members[memberToRemoveIndex] }}</strong> del proyecto?</p>
      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="showModal = false"
          class="px-4 py-2 bg-gray-300 rounded-lg text-black"
        >
          Cancelar
        </button>
        <button
          @click="removeMember"
          class="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>


    <div class="p-4 rounded-lg bg-white mb-4">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Lista de tareas</p>
        <div class="text-right text-sm text-gray-500">Detalles</div>
      </div>
      <div class="mt-4 max-h-72 overflow-y-auto">
        <div v-for="(task, index) in tasks" :key="index" class="p-4 rounded-lg bg-slate-100 mt-4">
          <div @click="toggleTasks(index)" class="cursor-pointer grid grid-cols-1 md:grid-cols-5 gap-4">

            <div class="col-span-3">
              <h3 class="text-md font-semibold cursor-pointer">
                {{ task.name }}
              </h3>
              <p class="pl-5">{{ task.description }}</p>
            </div>

            <div class="col-span-2">
              <h3 class="text-md font-semibold cursor-pointer">
                Integrantes
              </h3>
              <ul v-for="(user, i) in task.users" :key="i" class="list-disc pl-10">
                <li class="text-md">{{ user }}</li>

              </ul>

            </div>

          </div>

          <div v-if="task.showActivities" class="mt-4" :style="task.activities.length > 4 ? 'max-height: 140px; overflow-y: auto;' : ''">
            <div class="grid grid-cols-1 gap-4">
              <div v-for="(activity, i) in task.activities" :key="i" class="p-4 rounded-lg bg-white">
                <p class="text-md font-semibold">{{ activity.name }}</p>
                <p class="pl-5">{{ activity.description }}</p>
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <router-link :to="{ name: 'tareas-detalle', params: { id: task.id } }">
      <button
        class="text-sm text-DarkTeal bg-white px-2 py-2 rounded-2xl"
        style="max-width: 140px; white-space: normal;">
        Ver más...
      </button>
    </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

