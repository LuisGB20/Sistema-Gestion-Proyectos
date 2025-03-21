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
            {{ translateStatusActivity(activity.status) }}
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
        class="btn-cancel"
          label="Cancelar"
          text
          severity="secondary"
          @click="modalStore.isEmployeeActivityModalOpen = false"
        />
        <Button
        class="btn-submit"
          label="Marcar como completada"
          outlined
          severity="success"
          @click="markAsCompleted"
          :disabled="activity.status === 'COMPLETED'"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import { Avatar, Button, Dialog } from 'primevue';
import type { ActivityModel } from '@/interfaces/Activities/ActivityModel';
import { translateStatusActivity } from '@/utils/statusActivity';

// Props
const props = defineProps<{
  activity: ActivityModel;
}>();

const activity = computed(() => props.activity);

// Emit
const emit = defineEmits(['markAsCompleted']);

// Store
const modalStore = useModalStore();

// Función para marcar como completada
const markAsCompleted = () => {
  emit('markAsCompleted', props.activity.id);
  modalStore.isEmployeeActivityModalOpen = false;
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>