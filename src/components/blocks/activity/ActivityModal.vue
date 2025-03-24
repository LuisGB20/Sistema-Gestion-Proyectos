<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import { Button, Dialog } from 'primevue';
import type { ActivityModel } from '@/interfaces/Activities/ActivityModel';
import { translateStatusActivity } from '@/utils/statusActivity';

// Props
const props = defineProps<{
  activity: ActivityModel;
}>();

const activity = computed(() => props.activity);

// Store
const modalStore = useModalStore();

// Función para marcar como completada
const markAsCompleted = () => {
  emit('markAsCompleted', activity.value.id);
  modalStore.isEmployeeActivityModalOpen = false;
};
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="modalStore.isEmployeeActivityModalOpen" v-if="activity" modal
      header="Detalles de la actividad" :style="{ width: '30rem' }">

      <div class="space-y-4">
        <div>
          <label class="font-semibold text-CharcoalBlue">Nombre:</label>
          <p class="text-DarkTeal mt-1 text-lg font-medium">
            {{ activity.name }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Descripción:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ activity.description }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Estado:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ translateStatusActivity(activity.status) }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-gray-800">Tarea asociada:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ activity.task.name }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between gap-4 mt-6">
          <Button class="btn-cancel" label="Cancelar" text severity="secondary"
            @click="modalStore.isEmployeeActivityModalOpen = false" />
          <Button class="btn-submit" :class="{
            '!bg-transparent !border-2 !border-CharcoalBlue !border-dashed !text-CharcoalBlue !cursor-not-allowed': activity.status === 'COMPLETED'
          }" label="Terminar" severity="success" @click="markAsCompleted" :disabled="activity.status === 'COMPLETED'" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
