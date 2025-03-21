<script setup lang="ts">
import ActivityModal from '@/components/blocks/activity/ActivityModal.vue';
import type { ActivityModel } from '@/interfaces/Activities/ActivityModel';
import { GetEmployeeActivities } from '@/services/activities/ActivityService';
import { useAuthStore } from '@/stores/authStore';
import { formatDate } from '@/utils/formatDate';
import { translateStatusActivity } from '@/utils/statusActivity';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

const toast = useToast();
const authStore = useAuthStore();

const activities = ref<ActivityModel[]>([]);

const searchQuery = ref('');

const filteredActivities = () => {
  return activities.value.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};


const getStatusColor = (status: string) => {
  switch (status) {
    case 'BEGIN':
      return 'bg-yellow-100 text-yellow-800';
    case 'ON_HOLD':
      return 'bg-blue-100 text-blue-800';
    case 'CANCELED':
      return 'bg-green-100 text-green-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

onMounted(async() => {
    const { id } = authStore.employee || {};
    if (!id) {
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
        return;
    }

    const response = await GetEmployeeActivities(id);

    activities.value = response.data;
    console.log(response)
})
</script>

<template>
    <ActivityModal />
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Mis Actividades</h2>
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar actividades..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="activity in filteredActivities()"
        :key="activity.id"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <h4 class="font-medium text-gray-800">{{ activity.name }}</h4>
          <span
            :class="['px-3 py-1 rounded-full text-xs', getStatusColor(activity.status)]"
          >
            {{ translateStatusActivity(activity.status) }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-2">{{ activity.description }}</p>
        <div class="mt-4 space-y-2">
          <div class="flex items-center text-sm text-gray-700">
            <i class="fas fa-tasks mr-2 text-blue-500"></i>
            <span>Tarea: {{ activity.task.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>