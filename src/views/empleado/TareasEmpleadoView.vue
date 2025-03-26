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
const showDetails = ref(false)

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
    <main class="space-y-6 px-4 md:px-8">
        <div class="text-center">
            <h1 class="text-4xl font-semibold text-DarkTeal">Tareas del Proyecto</h1>
            <p class="text-gray-600 mt-2">Consulta y gestiona las tareas asignadas al proyecto</p>
        </div>

        <section class="bg-white shadow-lg rounded-lg p-6">
            <div class="mb-6 relative">
                <input v-model="searchQuery" type="text" placeholder="Buscar tareas..."
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-DarkTeal transition duration-200" />
                <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div v-if="filteredTasks.length === 0" class="text-center text-gray-500 py-6">
                <p>No se encontraron tareas que coincidan con tu búsqueda.</p>
            </div>

            <div v-else>
                <ul>
                    <li v-for="task in filteredTasks" :key="task.id" class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm mb-4 hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer" @click="showDetails = !showDetails">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <h4 class="text-xl font-semibold text-DarkTeal">{{ task.name }}</h4>
                            <span class="text-sm text-gray-600">{{ new Date(task.startDate).toLocaleDateString() }} - {{ new Date(task.endTime).toLocaleDateString() }}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">{{ task.description }}</p>

                        <div v-if="showDetails" class="mt-4 text-sm text-gray-700 space-y-3">
                            <div class="flex items-center gap-3">
                                <ClockIcon class="w-5 h-5 text-DarkTeal"/>
                                <span><strong>{{ task.estimatedHours }}h</strong> estimadas | <strong>{{ task.workedHours }}h</strong> trabajadas</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <ChartPieIcon class="w-5 h-5 text-DarkTeal"/>
                                <span><strong>{{ task.workedHours }}</strong> trabajadas</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <CalendarDaysIcon class="w-5 h-5 text-DarkTeal"/>
                                <span>Inicio: <strong>{{ new Date(task.startDate).toLocaleDateString() }}</strong></span>
                            </div>
                            <div class="flex items-center gap-3">
                                <CalendarDateRangeIcon class="w-5 h-5 text-DarkTeal"/>
                                <span>Fin: <strong>{{ new Date(task.endTime).toLocaleDateString() }}</strong></span>
                            </div>

                            <div v-if="task.activities?.length" class="mt-4">
                                <h5 class="text-sm font-semibold text-DarkTeal mb-3">Actividades</h5>
                                <div class="space-y-2">
                                    <div v-for="activity in task.activities" :key="activity.id"
                                        class="p-3 bg-gray-50 text-gray-800 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                        <h6 class="text-xs font-semibold">{{ activity.name }}</h6>
                                        <p class="text-xs text-gray-600">{{ activity.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>
