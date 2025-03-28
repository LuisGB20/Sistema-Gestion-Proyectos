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
import { translateStatusActivity } from '../../../../utils/statusActivity.ts'
import { getStatusActivityColor } from '@/utils/getStatusActivityColor.ts'

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
  status: string;
  taskId: string;
  employeeId: string;
  isDeleted: boolean;
  createdAt: Date;
  employee: Employee;
  task: TaskModel;
}

interface TaskModel {
  id: string;
  projectId: string;
  name: string;
  description: string;
  estimatedHours: number;
  workedHours: number;
  startDate: Date | string;
  endTime: Date | string;
}

const route = useRoute();
const tasks = ref<TaskModel[]>([]);
const toast = useToast();
const modalStore = useModalStore();
const activitySelected = ref<ActivityModel>({} as ActivityModel);

const fetchTasks = async () => {
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
          taskId: a.taskId,
          employeeId: a.employeeId,
          isDeleted: a.isDeleted,
          createdAt: a.createdAt,
          employee: a.employee,
          task: {
            id: task.id,
            projectId: task.projectId,
            name: task.name,
            description: task.description,
            estimatedHours: task.estimatedHours,
            workedHours: task.workedHours,
            startDate: task.startDate,
            endTime: task.endTime
          }
        })),
        showActivities: false
      }));
      console.log("tasks", tasks.value);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

onBeforeMount(fetchTasks);

const updateActivityStatus = async (activityId: string) => {
  try {
    const response = await MarkAsCompletedActivity(activityId);
    console.log("response", response);
    await fetchTasks();
    toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'La actividad ha sido marcada como completada correctamente', life: 3000 });
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
          <CreateActivityForTask :employees="tasks[0]?.taskEmployees?.map(te => te.employee)" :taskId="route.params.idTarea"  :fetch-on-update="() => fetchTasks"/>
        </div>

      </div>
    </div>

    <div class="overflow-y-auto max-h-screen w-full mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(activity, index) in tasks[0]?.activities"
          :key="activity.id"
          @click="showActivityData(activity, $event)"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
        >
          <div class="flex flex-col md:flex-row justify-between items-start mb-4">
            <h4 class="font-semibold text-gray-800 text-lg truncate w-2/3">{{ activity.name }}</h4>
            <span :class="['px-3 py-1 rounded-full text-xs', getStatusActivityColor(activity.status)]">
              {{ translateStatusActivity(activity.status) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-2 mb-4 truncate">{{ activity.description }}</p>
          <div class="flex items-center text-sm text-gray-700">
            <CalendarDaysIcon class="w-5 h-5 text-CharcoalBlue mr-2" />
            <span>Tarea: {{ activity.task.name }}</span>
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
