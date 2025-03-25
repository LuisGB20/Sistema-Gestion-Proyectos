<script setup lang="ts">
import ActivityModal from '@/components/blocks/activity/ActivityModal.vue';
import type { ActivityModel } from '@/interfaces/Activities/ActivityModel';
import { GetEmployeeActivities, MarkAsCompletedActivity } from '@/services/activities/ActivityService';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { getStatusActivityColor } from '@/utils/getStatusActivityColor';
import { translateStatusActivity } from '@/utils/statusActivity';
import { CalendarDaysIcon, MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const toast = useToast();
const authStore = useAuthStore();
const modalStore = useModalStore();
const activities = ref<ActivityModel[]>([]);
const activitySelected = ref<ActivityModel>({} as ActivityModel);
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
  <ActivityModal :activity="activitySelected" @mark-as-completed="(value) => updateActivityStatus(value)" />

  <main class="space-y-8 px-4 md:px-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-DarkTeal">Actividades asignadas</h1>
      <p class="text-gray-600 mt-2">Consulta y gestiona tus tareas asignadas</p>
    </div>

    <section class="bg-white shadow-lg rounded-lg p-6 lg:min-h-[500px]">
      <div class="mb-6 flex flex-col md:flex-row gap-6 justify-between items-center">
        <div class="relative w-full md:w-1/2 lg:w-1/3">
          <input v-model="searchQuery" type="text" placeholder="Buscar tareas..."
            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-DarkTeal transition duration-200 text-lg" />
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <select v-model="statusFilter"
          class="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-DarkTeal transition duration-200 text-lg">
          <option value="">Todos los estados</option>
          <option value="BEGIN">Pendiente</option>
          <option value="ON_HOLD">En espera</option>
          <option value="CANCELED">Cancelada</option>
          <option value="COMPLETED">Completada</option>
        </select>
      </div>

      <div v-if="filteredActivities.length === 0" class="text-center text-gray-500 py-6">
        <p>No se encontraron tareas que coincidan con tu búsqueda.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="activity in filteredActivities" :key="activity.id" @click="showActivityData(activity)"
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col mb-6 lg:mb-8 xl:mb-10">
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-semibold text-gray-800 text-lg truncate w-3/4">{{ activity.name }}</h4>
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

    </section>
  </main>
</template>
