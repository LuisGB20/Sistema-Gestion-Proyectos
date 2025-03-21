<script setup lang="ts">
import type { TaskModel } from '@/interfaces/tasks/TaskModel';
import { getTaskByProject } from '@/services/tasks/TaskService';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const toast = useToast();

const tasks = ref<Array<TaskModel>>([]);

const searchQuery = ref('');

const filteredTasks = () => {
    return tasks.value.filter(
        (task) =>
            task.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};

onMounted(async () => {
    const { id, projectId } = authStore.employee || {};
    if (!id || !projectId) {
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
        return;
    }

    const response = await getTaskByProject(projectId);

    tasks.value = response.data;
})
</script>

<template>
    <div class=" min-h-screen">
        <div class="bg-white p-6 rounded-2xl drop-shadow-2xl min-h-screen">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Tasks</h2>
        <div class="mb-6">
            <input v-model="searchQuery" type="text" placeholder="Search tasks..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="task in filteredTasks()" :key="task.id"
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">

                <!-- Título y Descripción -->
                <div class="border-b pb-4 mb-4">
                    <h4 class="text-lg font-semibold text-gray-900">{{ task.name }}</h4>
                    <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
                </div>

                <!-- Información General -->
                <div class="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-blue-600 mr-2"></i>
                        <span><strong>{{ task.estimatedHours }}h</strong> estimadas</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-hourglass-half text-blue-600 mr-2"></i>
                        <span><strong>{{ task.workedHours }}h</strong> trabajadas</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-calendar-day text-blue-600 mr-2"></i>
                        <span>Inicio: <strong>{{ new Date(task.startDate).toLocaleDateString() }}</strong></span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-calendar-check text-blue-600 mr-2"></i>
                        <span>Fin: <strong>{{ new Date(task.endTime).toLocaleDateString() }}</strong></span>
                    </div>
                </div>

                <!-- Actividades -->
                <div v-if="task.activities.length" class="mt-6">
                    <h5 class="text-sm font-semibold text-gray-800 mb-3">Actividades</h5>
                    <div class="space-y-3">
                        <div v-for="activity in task.activities" :key="activity.id"
                            class="p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm hover:bg-gray-100 transition">
                            <h6 class="text-xs font-semibold text-gray-900">{{ activity.name }}</h6>
                            <p class="text-xs text-gray-600">{{ activity.description }}</p>
                        </div>
                    </div>
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
</style>