<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { GetProjectById } from '@/services/projects/projectService';
import type { ProjectModel } from '@/interfaces/Projects/ProjectModel';

// Components
import AddEmployeeToProject from '@/components/blocks/project/employees/AddEmployeeToProject.vue';
import CreateResourceForProject from '@/components/blocks/project/resources/CreateResourceForProject.vue';
import CreateTask from '@/components/blocks/project/task/CreateTask.vue';
import ChangeStatusForm from '@/components/blocks/project/ChangeStatusForm.vue';
import DeleteUserFromProjectForm from '@/components/blocks/project/employees/DeleteUserFromProjectForm.vue';

const route = useRoute();
const authStore = useAuthStore();

// State
const project = ref<ProjectModel | null>(null);
const tasks = ref<{
  id?: string;
  name: string;
  description: string;
  showActivities?: boolean;
  activities: { name: string; description: string }[];
  users: string[];
}[]>([]);
const resources = ref<{name: string; quantity: number}[]>([]);
const members = ref<{name: string; role: string; id: string}[]>([]);
const encharge = ref<string>("N/A");
const status = ref<string | null>(null);
const idProject = ref<string | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Fetch project data
onBeforeMount(async () => {
  try {
    idProject.value = authStore.employee?.projectId || null;
    
    if (!idProject.value) {
      error.value = "No se encontró un proyecto asignado";
      isLoading.value = false;
      return;
    }

    const getProject = await GetProjectById(idProject.value);
    
    if (getProject.success) {
      project.value = getProject.data.project;
      encharge.value = getProject.data.encharge?.[0] 
        ? `${getProject.data.encharge[0].employee.name} ${getProject.data.encharge[0].employee.lastName}` 
        : "N/A";
      
      members.value = getProject.data.employees.map(employee => ({
        name: `${employee.employee.name} ${employee.employee.lastName}`,
        role: employee.roles[0],
        id: employee.id
      }));
      
      resources.value = getProject.data.project.projectResources.map(resource => ({
        name: resource.resource.name,
        quantity: resource.quantity
      }));
      
      tasks.value = getProject.data.project.tasks.map(task => ({
        id: task.id,
        name: task.name,
        description: task.description,
        users: task.taskEmployees.map(act => `${act.employee.name} ${act.employee.lastName}`),
        activities: task.activities.map(act => ({ 
          name: act.name, 
          description: act.description 
        })),
        showActivities: false
      }));
      
      status.value = getProject.data.status;
    } else {
      error.value = "Error al cargar el proyecto";
    }
  } catch (err) {
    console.error("Error fetching project:", err);
    error.value = "Ocurrió un error al cargar el proyecto";
  } finally {
    isLoading.value = false;
  }
});

const toggleTasks = (index: number) => {
  tasks.value[index].showActivities = !tasks.value[index].showActivities;
};
</script>

<template>
  <div class="p-4 max-w-7xl mx-auto">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-DarkTeal"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else-if="project" class="space-y-6">
      <!-- Project header -->
      <div class="p-6 rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="flex-1">
          <h1 class="text-2xl font-semibold text-DarkTeal mb-2">{{ project.name }}</h1>
          <p class="text-gray-700">{{ project.description }}</p>
        </div>
        
        <div class="flex flex-col items-end gap-2 text-sm text-gray-600">
          <ChangeStatusForm 
            :id="route.params.id" 
            :status="status" 
            class="mb-2"
          />
          <div>
            <span class="font-medium">Estado:</span> {{ status }}
          </div>
          <div>
            <span class="font-medium">Encargado:</span> {{ encharge }}
          </div>
        </div>
      </div>

      <!-- Resources and Members -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Resources card -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">Recursos</h2>
            <CreateResourceForProject />
          </div>
          
          <div class="divide-y">
            <div 
              v-for="(resource, index) in resources" 
              :key="index"
              class="p-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-medium text-gray-900">{{ resource.name }}</h3>
                  <p class="text-sm text-gray-500">Cantidad: {{ resource.quantity }}</p>
                </div>
                <button class="text-DarkTeal hover:text-Teal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-if="resources.length === 0" class="p-4 text-center text-gray-500">
              No hay recursos asignados
            </div>
          </div>
        </div>

        <!-- Members card -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">Integrantes</h2>
            <AddEmployeeToProject />
          </div>
          
          <div class="divide-y">
            <div 
              v-for="(member, index) in members" 
              :key="index"
              class="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <div>
                <h3 class="font-medium text-gray-900">{{ member.name }}</h3>
                <p class="text-sm text-gray-500">Rol: {{ member.role }}</p>
              </div>
              
              <DeleteUserFromProjectForm 
                :id="member.id" 
                class="text-red-500 hover:text-red-700"
              />
            </div>
            
            <div v-if="members.length === 0" class="p-4 text-center text-gray-500">
              No hay integrantes asignados
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks card -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Tareas</h2>
          <CreateTask />
        </div>
        
        <div class="divide-y">
          <div 
            v-for="(task, index) in tasks" 
            :key="index"
            class="p-4 hover:bg-gray-50 transition-colors"
          >
            <div 
              @click="toggleTasks(index)" 
              class="cursor-pointer grid grid-cols-1 md:grid-cols-5 gap-4"
            >
              <div class="col-span-3">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 transition-transform duration-200" 
                    :class="{'transform rotate-90': task.showActivities}" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ task.name }}
                </h3>
                <p class="text-gray-600 mt-1 pl-7">{{ task.description }}</p>
              </div>
              
              <div class="col-span-2">
                <h4 class="font-medium text-gray-700">Asignados:</h4>
                <ul class="mt-1 space-y-1">
                  <li 
                    v-for="(user, i) in task.users" 
                    :key="i" 
                    class="text-sm text-gray-600 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    {{ user }}
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Activities -->
            <div 
              v-if="task.showActivities" 
              class="mt-4 pl-7"
              :class="{'max-h-60 overflow-y-auto': task.activities.length > 3}"
            >
              <div class="space-y-3">
                <div 
                  v-for="(activity, i) in task.activities" 
                  :key="i"
                  class="p-3 bg-gray-50 rounded-lg"
                >
                  <h4 class="font-medium text-gray-800">{{ activity.name }}</h4>
                  <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                </div>
              </div>
              
              <div class="mt-4 flex justify-end">
                <router-link 
                  v-if="task.id"
                  :to="{ name: 'tareas-detalle', params: { id: task.id } }" 
                  class="inline-flex items-center text-DarkTeal hover:text-Teal font-medium text-sm"
                >
                  Ver detalles
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          
          <div v-if="tasks.length === 0" class="p-4 text-center text-gray-500">
            No hay tareas creadas
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for dropdowns */
.collapse {
  transition: all 0.3s ease;
}

/* Custom scrollbar for activities */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>