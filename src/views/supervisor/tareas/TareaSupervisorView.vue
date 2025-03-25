<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/formatDate';
import type { TaskModel } from '@/interfaces/tasks/TaskModel';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/vue/16/solid';
import { getStatusActivityColor } from '@/utils/getStatusActivityColor';
import { translateStatusActivity } from '@/utils/statusActivity';
import { getTask } from '@/services/tasks/TaskService';

const route = useRoute();
const task = ref<TaskModel>();

onMounted(async () => {
    const taskId = route.params.id.toString();
    const response = await getTask(taskId);
    console.log(response)
    task.value = response.data;
});

const progressPercentage = computed(() => {
    if (!task.value) return 0;
    return Math.round((task.value.workedHours / task.value.estimatedHours) * 100);
});
</script>

<template>
    <main class="flex justify-center items-center py-6 lg:py-10 min-h-screen">
        <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 lg:p-8 border border-gray-200">
            <div class="mb-8">
                <!-- <p class="text-sm text-gray-500 font-medium">Tarea ID-{{ task?.id }}</p> -->
                <h1 class="text-3xl font-bold text-gray-800 mt-1">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-DarkTeal to-CharcoalBlue">
                        Detalles de la tarea
                    </span>
                </h1>
            </div>

            <!-- Contenedor principal -->
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sección izquierda - Información básica -->
                <div class="w-full lg:w-1/2 space-y-6">
                    <!-- Datos principales -->
                    <div class="space-y-4">
                        <div v-for="(label, key) in {
                            name: 'Nombre',
                            description: 'Descripción',
                            estimatedHours: 'Horas estimadas',
                            workedHours: 'Horas trabajadas',
                            projectId: 'ID del proyecto'
                        }" :key="key" class="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <h3 class="text-lg font-semibold text-gray-700">{{ label }}</h3>
                            <p class="text-gray-600 mt-1">
                                {{ task?.[key] ?? 'No disponible' }}
                            </p>
                        </div>
                    </div>

                    <!-- Barra de progreso -->
                    <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <ClockIcon class="w-5 h-5 text-blue-600 mr-2" />
                                <span class="text-sm text-gray-700">
                                    Progreso: {{ task?.workedHours }}h de {{ task?.estimatedHours }}h
                                </span>
                            </div>
                            <span class="text-sm font-medium text-teal-600">{{ progressPercentage }}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                class="bg-gradient-to-r from-teal-500 to-teal-700 h-2.5 rounded-full transition-all duration-500" 
                                :style="{ width: `${progressPercentage}%` }"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Sección derecha - Fechas y actividades -->
                <div class="w-full lg:w-1/2 space-y-6">
                    <!-- Fechas -->
                    <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Fechas</h2>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <CalendarDaysIcon class="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p class="text-sm text-gray-500">Fecha de inicio</p>
                                    <p class="text-gray-700 font-medium">
                                        {{ task?.startDate ? formatDate(task.startDate) : 'No disponible' }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <CalendarDaysIcon class="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p class="text-sm text-gray-500">Fecha de finalización</p>
                                    <p class="text-gray-700 font-medium">
                                        {{ task?.endTime ? formatDate(task.endTime) : 'No disponible' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actividades -->
                    <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-semibold text-gray-800">
                                Actividades
                            </h2>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {{ task?.activities?.length || 0 }}
                            </span>
                        </div>

                        <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
                            <div v-if="!task?.activities?.length" class="text-center py-4 text-gray-500">
                                No hay actividades asignadas
                            </div>
                            <div v-for="activity in task?.activities" :key="activity.id"
                                class="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                                <div class="flex justify-between items-start gap-2">
                                    <div class="flex-1 min-w-0">
                                        <h3 class="font-semibold text-gray-800 truncate">{{ activity.name }}</h3>
                                        <p v-if="activity.description" class="text-sm text-gray-600 mt-1 truncate">
                                            {{ activity.description }}
                                        </p>
                                    </div>
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                                        :class="getStatusActivityColor(activity.status)">
                                        {{ translateStatusActivity(activity.status) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>