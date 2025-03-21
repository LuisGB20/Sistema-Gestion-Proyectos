<template>
    <div class="card flex justify-center">
      <Dialog
        v-model:visible="modalStore.isEmployeeActivityModalOpen"
        modal
        header="Información de la actividad"
        :style="{ width: '25rem' }"
      >
        <template #header>
          <div class="inline-flex items-center justify-center gap-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span class="font-bold whitespace-nowrap">{{ activity.name }}</span>
          </div>
        </template>
  
        <!-- Detalles de la actividad -->
        <div class="space-y-4">
          <div>
            <label class="font-semibold">Descripción:</label>
            <p class="text-surface-600 dark:text-surface-400 mt-1">
              {{ activity.description }}
            </p>
          </div>
  
          <div>
            <label class="font-semibold">Estado:</label>
            <p class="text-surface-600 dark:text-surface-400 mt-1">
              {{ getStatusText(activity.status) }}
            </p>
          </div>
  
          <div>
            <label class="font-semibold">Tarea asociada:</label>
            <p class="text-surface-600 dark:text-surface-400 mt-1">
              {{ activity.task.name }}
            </p>
          </div>
  
          <div v-if="activity.task.startDate">
            <label class="font-semibold">Fecha de inicio:</label>
            <p class="text-surface-600 dark:text-surface-400 mt-1">
              {{ new Date(activity.task.startDate).toLocaleDateString() }}
            </p>
          </div>
  
          <div v-if="activity.task.endTime">
            <label class="font-semibold">Fecha de fin:</label>
            <p class="text-surface-600 dark:text-surface-400 mt-1">
              {{ new Date(activity.task.endTime).toLocaleDateString() }}
            </p>
          </div>
        </div>
  
        <!-- Botón para marcar como completada -->
        <template #footer>
          <Button
            label="Cancelar"
            text
            severity="secondary"
            @click="modalStore.closeEmployeeActivityModal"
          />
          <Button
            label="Marcar como completada"
            outlined
            severity="success"
            @click="markAsCompleted"
            :disabled="activity.status === 2"
          />
        </template>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useModalStore } from '@/stores/modalStore';
  import { Avatar, Button, Dialog } from 'primevue';
  
  // Props
  const props = defineProps({
    activity: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        name: '',
        description: '',
        status: 0, // 0: Pendiente, 1: En progreso, 2: Completada
        task: {
          id: '',
          name: '',
          startDate: null,
          endTime: null,
        },
      }),
    },
  });
  
  // Emit
  const emit = defineEmits(['markAsCompleted']);
  
  // Store
  const modalStore = useModalStore();
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'En progreso';
      case 2:
        return 'Completada';
      default:
        return 'Desconocido';
    }
  };
  
  // Función para marcar como completada
  const markAsCompleted = () => {
    emit('markAsCompleted', props.activity.id);
    modalStore.closeEmployeeActivityModal();
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>