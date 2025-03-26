<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useConfirm, useToast } from 'primevue';
import { useAuthStore } from '@/stores/authStore';
import { deleteTask, getTaskByProject } from '@/services/tasks/TaskService';
import { getStatusActivityColor } from '@/utils/getStatusActivityColor';
import { translateStatusActivity } from '@/utils/statusActivity';
import type { TaskModel } from '@/interfaces/tasks/TaskModel';
import { CalendarDaysIcon } from '@heroicons/vue/16/solid';
import DataTable from '@/components/ui/DataTable.vue';
import { formatDate } from '@/utils/formatDate';
import router from '@/router';

const toast = useToast();
const authStore = useAuthStore();
const tasks = ref<TaskModel[]>([]);
    const confirm = useConfirm();

const formData = ref<TaskModel>({
    id: '',
    projectId: '',
    name: '',
    description:'',
    estimatedHours: 0,
    workedHours: 0,
    startDate: '',
    endTime: '',
});

const showTask = (data: TaskModel) => {
    router.push(`/supervisor/tareas/${data.id}`);
};

// const addResource = async (data: ResourceModel) => {
//     const response = await createResource(data);
//     console.log(response)
//     if (!response.success) {
//         toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
//     } else {
//         toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso agregado con exito', life: 3000 });
//         resources.value.push(response.data)
//     }
// };


// const showEditModal = (data: ResourceModel) => {
//     modalStore.isEditModalOpen = true;
//     formData.value = data;
// }


// const editResource = async (data: ResourceModel) => {
//     const response = await updateResource(data);
//     if (!response.success) {
//         toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
//     } else {
//         toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso editado con exito', life: 3000 });
//         modalStore.isEditModalOpen = false;
//         const resourceIndex = resources.value.findIndex(r => r.id == data.id);
//         resources.value.splice(resourceIndex, 1, response.data);
//     }
// };


const confirmDelete = (data: TaskModel) => {
    confirm.require({
        message: '¿Quieres eliminar este registro?',
        header: `${data.name}`,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: false
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            confirmDeleteTask(data.id)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la operación', life: 3000 });
        }
    });
};

const confirmDeleteTask = async (id: string) => {
    const response = await deleteTask(id);
    if (response.success) {
        toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso eliminado', life: 3000 });
        const indexResource = tasks.value.findIndex(r => r.id == id);
        tasks.value.splice(indexResource, 1);
    } else {
        toast.add({ severity: 'error', summary: '¡Algo ha salido mal!', detail: `${response.message}`, life: 3000 });
    }
};


onMounted(async () => {
  const { projectId } = authStore.employee || {};
  if (!projectId) {
    toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
    return;
  }

  const response = await getTaskByProject(projectId);
  const formatResponse: Array<TaskModel> = response.data.map((task) => {
    return {
        ...task,
        startDate: formatDate(task.startDate)
    };
});
  console.log(formatResponse)
  tasks.value = formatResponse;
});

</script>

<template>
    <main class="space-y-8 px-4 md:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-DarkTeal">Tareas Asignadas</h1>
        <p class="text-gray-600 mt-2">Consulta y gestiona las tareas asignadas del proyecto</p>
      </div>

      <div class="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white">
            <DataTable 
                class="w-full table-auto"
                :columns="['name', 'description', 'estimatedHours', 'workedHours', 'startDate']" 
                :columnsEs="['Nombre', 'Descripción', 'Horas estimadas', 'Horas trabajadas', 'Fecha de inicio']"
                :data="tasks" 
                @show-element="data => showTask(data)" 
                @edit-element="data => showEditModal(data)"
                @confirm-delete="data => confirmDelete(data)" 
            />
        </div>
    </main>
  </template>