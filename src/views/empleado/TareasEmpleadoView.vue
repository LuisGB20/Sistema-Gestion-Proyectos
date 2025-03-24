<script setup lang="ts">
import type { TaskModel } from '@/interfaces/tasks/TaskModel';
import { getTaskByProject } from '@/services/tasks/TaskService';
import { useAuthStore } from '@/stores/authStore';
import { CalendarDateRangeIcon, CalendarDaysIcon, ClockIcon, ChartPieIcon, MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
import { useToast } from 'primevue';
import { onMounted, ref, computed } from 'vue';

const authStore = useAuthStore();
const toast = useToast();
const tasks = ref<Array<TaskModel>>([]);
const searchQuery = ref('');

const filteredTasks = computed(() => {
    return tasks.value.filter(task =>
        task.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(async () => {
    const { id, projectId } = authStore.employee || {};
    if (!id || !projectId) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Inténtalo de nuevo más tarde', life: 3000 });
        return;
    }
    const response = await getTaskByProject(projectId);
    tasks.value = response.data;
});
</script>

<template>
    <main class="space-y-6">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-DarkTeal">Tareas del Proyecto</h1>
            <p class="text-gray-600 mt-2">Consulta y gestiona las tareas asignadas al proyecto</p>
        </div>

        <section class="bg-white shadow-lg rounded-lg p-4 lg:min-h-[500px]">
            <div class="mb-6 flex items-center justify-between gap-4">
                <div class="relative w-full max-w-lg">
                    <input v-model="searchQuery" type="text" placeholder="Buscar tareas..."
                        class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-DarkTeal transition duration-200" />
                    <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div v-if="filteredTasks.length === 0" class="text-center text-gray-500 py-6">
                <p>No se encontraron tareas que coincidan con tu búsqueda.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="task in filteredTasks" :key="task.id"
                    class="bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                    <div class="border-b pb-4 mb-4">
                        <h4 class="text-xl font-semibold">{{ task.name }}</h4>
                        <p class="text-sm opacity-80">{{ task.description }}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="flex items-center">
                            <ClockIcon class="w-5 h-5 text-white mr-2"/>
                            <span><strong>{{ task.estimatedHours }}h</strong> estimadas</span>
                        </div>
                        <div class="flex items-center">
                            <ChartPieIcon class="w-5 h-5 text-white mr-2"/>
                            <span><strong>{{ task.workedHours }}h</strong> trabajadas</span>
                        </div>
                        <div class="flex items-center">
                            <CalendarDaysIcon class="w-5 h-5 text-white mr-2"/>
                            <span>Inicio: <strong>{{ new Date(task.startDate).toLocaleDateString() }}</strong></span>
                        </div>
                        <div class="flex items-center">
                            <CalendarDateRangeIcon class="w-5 h-5 text-white mr-2"/>
                            <span>Fin: <strong>{{ new Date(task.endTime).toLocaleDateString() }}</strong></span>
                        </div>
                    </div>
                    <div v-if="task.activities.length" class="mt-6">
                        <h5 class="text-sm font-semibold mb-3">Actividades</h5>
                        <div class="space-y-3">
                            <div v-for="activity in task.activities" :key="activity.id"
                                class="p-3 bg-white text-gray-800 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                <h6 class="text-xs font-semibold">{{ activity.name }}</h6>
                                <p class="text-xs opacity-80">{{ activity.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
