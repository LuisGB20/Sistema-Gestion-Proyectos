<script setup lang="ts">
import { onMounted, ref } from "vue";
import { formatDate } from "@/utils/formatDate";
import type { ProjectModel } from "@/interfaces/Projects/ProjectModel";
import { GetEmployeeProject, GetEmployeesFromProject } from "@/services/employees/EmployeeService";
import { useAuthStore } from "@/stores/authStore";
import { translateStatus } from "@/utils/statusProject";
import type { EmployeeBasicModel } from "@/interfaces/employees/EmployeeBasicModel";
import { useToast } from "primevue";
import { CalendarIcon, CheckBadgeIcon, ClipboardDocumentCheckIcon, ClockIcon, DocumentTextIcon, UserGroupIcon, UserIcon } from "@heroicons/vue/16/solid";

const authStore = useAuthStore();
const toast = useToast();
const project = ref<ProjectModel>();
const employees = ref<Array<EmployeeBasicModel>>()

onMounted(async () => {
    const { id, projectId } = authStore.employee || {};

    if (!id || !projectId) {
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
        return;
    }

    const responseProject = await GetEmployeeProject(id);
    project.value = responseProject.data;

    const responseEmployeesFromProject = await GetEmployeesFromProject(projectId);
    employees.value = responseEmployeesFromProject.data;
})
</script>

<template>
    <main class="space-y-8 px-4 md:px-8">
        <div class="text-center mb-6">
            <h1 class="text-4xl font-semibold text-DarkTeal flex justify-center items-center gap-4">
                Gestión del Proyecto
            </h1>
            <p class="text-lg text-gray-500 mt-3">Visualiza el progreso y la información relevante de tu proyecto</p>
        </div>

        <section class="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-100">
            <h2 class="text-2xl md:text-3xl font-bold text-DarkTeal flex items-center gap-3 mb-4">
                <DocumentTextIcon class="size-7 text-CharcoalBlue" />
                {{ project?.name }}
            </h2>
            <p class="text-lg text-gray-700 mb-6">{{ project?.description }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div class="flex items-center gap-3 text-lg">
                    <CheckBadgeIcon class="size-6 text-CharcoalBlue hidden md:block" />
                    <p><span class="font-medium">Estado:</span> {{ project?.status ? translateStatus(project.status) : 'No disponible' }}</p>
                </div>
                <div class="flex items-center gap-3 text-lg">
                    <CalendarIcon class="size-6 text-CharcoalBlue hidden md:block" />
                    <p><span class="font-medium">Inicio:</span> {{ project?.startDate ? formatDate(project.startDate) : 'No disponible' }}</p>
                </div>
                <div class="flex items-center gap-3 text-lg">
                    <ClockIcon class="size-6 text-CharcoalBlue hidden md:block" />
                    <p><span class="font-medium">Fin:</span> {{ project?.endTime ? formatDate(project.endTime) : 'No disponible' }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-100">
            <h2 class="text-2xl md:text-3xl font-bold text-DarkTeal flex items-center gap-3 mb-6">
                <UserGroupIcon class="size-7 text-CharcoalBlue" />
                Compañeros
            </h2>

            <div v-if="employees?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="employee in employees" :key="employee.email" class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:bg-gray-50">
                    <div class="flex items-center gap-4">
                        <UserIcon class="w-8 h-8 text-CharcoalBlue hidden md:block" />
                        <div>
                            <p class="font-medium text-lg">{{ employee.name }} {{ employee.lastName }}</p>
                            <p class="text-sm text-gray-500">{{ employee.email }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="overflow-x-auto rounded-lg border border-gray-100 shadow-md hidden md:block">
                <table class="w-full table-auto text-sm md:text-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-6 py-4 text-left">Nombre</th>
                            <th class="px-6 py-4 text-left">Apellidos</th>
                            <th class="px-6 py-4 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.email" class="border-b border-gray-100 hover:bg-gray-50">
                            <td class="px-6 py-4 flex items-center gap-3">
                                <UserIcon class="w-5 h-5 text-CharcoalBlue" />
                                {{ employee.name }}
                            </td>
                            <td class="px-6 py-4">{{ employee.lastName }}</td>
                            <td class="px-6 py-4">{{ employee.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>
