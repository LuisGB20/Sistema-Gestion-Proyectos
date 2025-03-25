<script setup lang="ts">
// import { onBeforeMount, ref } from 'vue';
// import { GetProjectById } from '@/services/projects/projectService';
// import { useRoute } from 'vue-router';
import Tag from "primevue/tag";


// const route = useRoute();
// const taskss = ref<{ id: number; name: string; description:string; showActivities?: boolean; activities: { name: string; description: string }[], users: string[] }[]>([]);

// onBeforeMount(async () => {
//   const id = route.params.id as string;

//   try {
//     const getProject = await GetProjectById(id);
//     console.log("getProject", getProject);

//     if (getProject.success) {

//       taskss.value = getProject.data.tasks.map((task: any) => ({
//         id:task.id,
//         name: task.name,
//         description: task.description,
//         users: task.taskEmployees.map((act: any) => `${act.employee.name} ${act.employee.lastName}`),
//         activities: task.activities.map((act: any) => ({ name: act.name, description: act.description })),
//         showActivities: false
//       }));

//       console.log("tareas", taskss.value);
//     }
//   } catch (error) {
//     console.error("Error fetching project:", error);
//   }
// });

// const toggleTasks = (index: number) => {
//   taskss.value[index].showActivities = !taskss.value[index].showActivities;
// };
const timeSpent = "2M : 0W : 0D";
const deadline = "2M : 0W : 0D";
const totalTasks = 50;
const totalFiles = 15;
const tasks = [
  {
    id: 1,
    title: "Realizar un Sistema de Pago Automático que habilite el diseño",
    taskId: "#402235",
    status: "Abierto",
    createdBy: "Yash Ghori",
    timeSpent: "00 : 30 : 00",
    tags: [
      { severity: "danger", value: "Cancelado", bgClass: "bg-red-200", textClass: "text-red-900" },
      { severity: "success", value: "Completado", bgClass: "bg-green-200", textClass: "text-green-900" }
    ]
  },
  {
    id: 2,
    title: "Realizar un Sistema de Pago Automático que habilite el diseño",
    taskId: "#402235",
    status: "Abierto",
    createdBy: "Yash Ghori",
    timeSpent: "00 : 30 : 00",
    tags: [
      { severity: "danger", value: "Cancelado", bgClass: "bg-red-200", textClass: "text-red-900" },
      { severity: "success", value: "Completado", bgClass: "bg-green-200", textClass: "text-green-900" }
    ]
  },

];

import type { ActivityModel } from '@/interfaces/Activities/ActivityModel';
import { GetEmployeeActivities, MarkAsCompletedActivity } from '@/services/activities/ActivityService';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue';
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';
import { getStatusActivityColor } from '@/utils/getStatusActivityColor';
import ActivityModal from '@/components/blocks/activity/ActivityModal.vue';

const activitySelected = ref<ActivityModel>({} as ActivityModel);
const activities = ref<ActivityModel[]>([]);
const toast = useToast();
const modalStore = useModalStore();
const authStore = useAuthStore();
const searchQuery = ref('');
const statusFilter = ref('');

const filteredActivities = computed(() => {
  return activities.value.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus = statusFilter.value ? activity.status === statusFilter.value : true;

    return matchesSearch && matchesStatus;
  });
});

  onMounted(async () => {
  const { id } = authStore.employee || {};
  if (!id) {
    toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
    return;
  }

  const response = await GetEmployeeActivities(id);
  console.log("Misael", response);
  activities.value = response.data;
});

const showActivityData = (data: ActivityModel) => {
  activitySelected.value = data;
  modalStore.isEmployeeActivityModalOpen = true;
};

const updateActivityStatus = async (activityId: string) => {
  const response = await MarkAsCompletedActivity(activityId);
  const activityModifiedIndex = activities.value.findIndex(x => x.id == activityId);
  toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'La tarea ha sido marcada como completada correctamente', life: 3000 });
  activities.value.splice(activityModifiedIndex, 1, response.data);
};


</script>

<template>
  <div class="flex flex-col pt-10 px-4 sm:px-10 w-full">
    <div class="flex items-center justify-between w-full pr-4 sm:pr-10 flex-wrap sm:flex-nowrap md:flex-nowrap">
      <div class="flex items-center space-x-4">
        <h1 class="text-3xl sm:text-4xl font-bold text-CharcoalBlue">Tareas</h1>
        <p class="px-2 py-1 bg-DarkTeal text-white rounded-2xl font-semibold">En Camino</p>
      </div>

      <div class="flex items-center space-x-4 flex-wrap sm:flex-nowrap md:flex-nowrap mt-4 sm:mt-0">
        <div class="flex flex-col items-center sm:items-start md:w-auto">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Tiempo Gastado</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">{{ timeSpent }}</p>
          </div>
        </div>

        <div class="flex flex-col items-center sm:items-start md:w-auto mt-4 sm:mt-0">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Fecha Límite</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">{{ deadline }}</p>
          </div>
        </div>

        <button class="text-white bg-DarkTeal px-4 py-2 mt-6 sm:mt-0 md:ml-4 rounded-md shadow-md w-full sm:w-auto">Asignar Tarea</button>
      </div>
    </div>

    <div class="overflow-y-auto max-h-screen w-full mt-6">
      <div class="space-y-4 w-full">

        <ActivityModal :activity="activitySelected" @mark-as-completed="(value) => updateActivityStatus(value)" />

          <div v-if="filteredActivities.length === 0" class="text-center text-gray-500 py-6">
        <p>No se encontraron tareas que coincidan con tu búsqueda.</p>
      </div>

        <div v-for="activity in filteredActivities" :key="activity.id" @click="showActivityData(activity)">
        <span :class="['px-3 py-1 rounded-full text-xs', getStatusActivityColor(activity.status)]">
              {{ translateStatusActivity(activity.status) }}
            </span>
          </div>

        <div v-for="task in tasks" :key="task.id" class="bg-gray-50 rounded-lg p-4 shadow-md flex flex-col sm:flex-row md:flex-row items-center justify-between w-full">
          <div class="flex items-center space-x-4 mb-4 sm:mb-0 md:mb-0">
            <i class="pi pi-lightbulb text-CharcoalBlue"></i>
            <div>
              <h2 class="text-xl font-semibold text-CharcoalBlue mb-2">{{ task.title }}</h2>
              <p class="text-sm text-CharcoalBlue">
                {{ task.taskId }} Abierto hace 10 días por {{ task.createdBy }}
                <Tag v-for="(tag, index) in task.tags" :key="index" :severity="tag.severity" :value="tag.value" :class="`ml-4 px-2 py-1 ${tag.bgClass} ${tag.textClass} rounded-2xl`"></Tag>
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-4 md:justify-end w-full md:w-auto">
            <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center">
              <i class="pi pi-clock text-black mr-2"></i>
              <p class="font-semibold">{{ task.timeSpent }}</p>
            </div>
            <i class="pi pi-envelope text-CharcoalBlue"></i>
          </div>
        </div>
      </div>

      <div class="flex items-start space-x-2 mt-8">
        <i class="pi pi-envelope text-CharcoalBlue"></i>
        <span class="text-xs text-CharcoalBlue mr-8">{{ totalTasks }} Tareas</span>
        <i class="pi pi-folder text-CharcoalBlue"></i>
        <span class="text-xs text-CharcoalBlue">{{ totalFiles }} Archivos</span>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }

  .overflow-y-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
