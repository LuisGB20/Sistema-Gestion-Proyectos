<script setup lang="ts">
import { onMounted, ref } from "vue";
import { formatDate } from "@/utils/formatDate";
import type { ProjectModel } from "@/interfaces/Projects/ProjectModel";
import { GetEmployeeProject, GetEmployeesFromProject } from "@/services/employees/EmployeeService";
import { useAuthStore } from "@/stores/authStore";
import { translateStatus } from "@/utils/statusProject";
import type { EmployeeBasicModel } from "@/interfaces/employees/EmployeeBasicModel";
import { useToast } from "primevue";

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
    project.value = responseProject.data

    const responseEmployeesFromProject = await GetEmployeesFromProject(projectId);
    console.log(responseEmployeesFromProject)
    employees.value = responseEmployeesFromProject.data;

})

</script>

<template>
    <main class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-800">Gestión del Proyecto</h1>

        <section class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-700">{{ project?.name }}</h2>
            <p class="mt-2 text-gray-600">{{ project?.description }}</p>
            <div class="mt-4 text-sm">
                <p><span class="font-semibold">Estado:</span> {{ project?.status ? translateStatus(project.status) :
                    'Estatus no disponible' }}</p>
                <p><span class="font-semibold">Inicio:</span> {{ project?.startDate ? formatDate(project?.startDate) :
                    'Fecha no disponible' }}</p>
                <p><span class="font-semibold">Fin:</span> {{ project?.endTime ? formatDate(project?.endTime) : 'Fecha no disponible'}}</p>
            </div>
        </section>

        <section class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-700 mb-4">Empleados Asignados</h2>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Apellidos</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.email" class="hover:bg-gray-50">
                            <td class="border border-gray-300 px-4 py-2">{{ employee.name }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ employee.lastName }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ employee.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>
