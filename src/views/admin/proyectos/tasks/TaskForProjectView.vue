<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { GetTaskById } from '@/services/tasks/TaskService.ts';
import { MarkAsCompletedActivity } from '@/services/activities/ActivityService';
import { formatDate } from '../../../../utils/formatDate.ts';
import { useToast } from 'primevue';
import CreateActivityForTask from '@/components/blocks/project/task/activity/CreateActivityForTask.vue';
import ActivityModal from '@/components/blocks/activity/ActivityModal.vue';
import { useModalStore } from '@/stores/modalStore.ts';
import type { ActivityModel } from '@/interfaces/Activities/ActivityModel.ts';

interface Employee {
  id: string;
  name: string;
  lastName: string;
}

interface TaskEmployee {
  employeeId: string;
  taskId: string;
  employee: Employee;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  status: number;
  employee: Employee;
  task?: {
    name: string;
  };
}

interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  estimatedHours: number;
  workedHours: number;
  startDate: string;
  endTime: string;
  taskEmployees: TaskEmployee[];
  activities: Activity[];
  showActivities?: boolean;
}

const route = useRoute();
const tasks = ref<Task[]>([]);
const toast = useToast();
const modalStore = useModalStore();
const activitySelected = ref<ActivityModel>({} as ActivityModel);

onBeforeMount(async () => {
  const id = route.params.idTarea as string;

  try {
    const getProject = await GetTaskById(id);
    console.log("getProject", getProject);

    if (getProject.success) {
      tasks.value = [getProject.data].map((task) => ({
        id: task.id,
        projectId: task.projectId,
        name: task.name,
        description: task.description,
        estimatedHours: task.estimatedHours,
        workedHours: task.workedHours,
        startDate: task.startDate,
        endTime: task.endTime,
        taskEmployees: task.taskEmployees.map((te) => ({
          employeeId: te.employeeId,
          taskId: te.taskId,
          employee: {
            id: te.employee.id,
            name: te.employee.name,
            lastName: te.employee.lastName
          }
        })),
        activities: task.activities.map((a) => ({
          id: a.id,
          name: a.name,
          description: a.description,
          status: a.status,
          employee: a.employee,
          task: a.task
        })),
        showActivities: false
      }));
      console.log("tasks", tasks.value);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
});

const updateActivityStatus = async (activityId: string) => {
  try {
    const response = await MarkAsCompletedActivity(activityId);
    console.log("response", response);
    const taskIndex = tasks.value.findIndex(task => task.activities.some(activity => activity.id === activityId));
    if (taskIndex !== -1) {
      const activityIndex = tasks.value[taskIndex].activities.findIndex(activity => activity.id === activityId);
      if (activityIndex !== -1) {
        tasks.value[taskIndex].activities.splice(activityIndex, 1, response.data);
        toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'La actividad ha sido marcada como completada correctamente', life: 3000 });
      }
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo marcar la actividad como completada', life: 3000 });
  }
};

const showActivityData = (data: ActivityModel, event: Event) => {
  event.stopPropagation();
  activitySelected.value = data;
  modalStore.isEmployeeActivityModalOpen = true;
};
</script>

<template>
  <ActivityModal :activity="activitySelected" @mark-as-completed="(value) => updateActivityStatus(value)" />

  <div class="flex flex-col pt-10 px-4 sm:px-10 w-full">
    <div class="flex items-center justify-between w-full pr-4 sm:pr-10 flex-wrap sm:flex-nowrap md:flex-nowrap">
      <div class="flex items-center space-x-4">
        <div class="flex flex-col">
          <h1 class="text-3xl sm:text-4xl font-bold text-CharcoalBlue">{{ tasks[0]?.name }}</h1>
          <p class="pl-5">{{ tasks[0]?.description }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-4 flex-wrap sm:flex-nowrap md:flex-nowrap mt-4 sm:mt-0">
        <div class="flex flex-col items-center sm:items-start md:w-auto">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Tiempo Gastado</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">{{ tasks[0]?.workedHours }} horas</p>
          </div>
        </div>

        <div class="flex flex-col items-center sm:items-start md:w-auto mt-4 sm:mt-0">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Fecha Límite</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">{{ formatDate(tasks[0]?.endTime) }}</p>
          </div>
        </div>

        <div v-if="tasks[0]?.taskEmployees.length > 0">
          <i class="pi pi-clock text-black mr-2 bg-transparent opacity-0 "></i>
          <CreateActivityForTask :employees="tasks[0]?.taskEmployees?.map(te => te.employee)" :taskId="route.params.idTarea" />
        </div>

      </div>
    </div>

    <div class="overflow-y-auto max-h-screen w-full mt-6">
      <div class="space-y-4 w-full">
        <div
          v-for="(activity, index) in tasks[0]?.activities"
          :key="activity.id"
          class="bg-gray-50 rounded-lg p-6 shadow-md flex flex-col sm:flex-row items-center justify-between w-full"
          @click="showActivityData(activity, $event)"
        >
          <div class="flex items-center space-x-6 mb-4 sm:mb-0">
            <i class="pi pi-lightbulb text-CharcoalBlue text-2xl"></i>

            <div>
              <h2 class="text-xl font-semibold text-CharcoalBlue mb-1">
                {{ activity.name }}
              </h2>

              <p class="text-sm text-CharcoalBlue mb-1">
                {{ activity.description }}
              </p>

              <p class="text-sm text-CharcoalBlue font-medium">
                Encargado:
                <span class="font-semibold">{{ activity.employee.name }} {{ activity.employee.lastName }}</span>
              </p>

              <p v-if="activity.task" class="text-sm text-CharcoalBlue font-medium">
                Tarea:
                <span class="font-semibold">{{ activity.task.name }}</span>
              </p>

              <button
                @click="showActivityData({
                          id: activity.id,
                          name: activity.name,
                          description: activity.description,
                          status: activity.status,
                          taskId: activity.taskId,
                          employeeId: activity.employeeId,
                          isDeleted: activity.isDeleted,
                          createdAt: activity.createdAt,
                          task: tasks[0]
                        }, $event)"
                class="text-white bg-DarkTeal px-4 py-2 mt-3 rounded-md shadow-md transition-all duration-300 hover:bg-teal-700"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>

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
