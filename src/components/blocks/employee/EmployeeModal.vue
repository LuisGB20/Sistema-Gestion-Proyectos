<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import { Dialog } from 'primevue';
import type { EmployeeModel } from '@/interfaces/employees/EmployeeModel';

// Props
const props = defineProps<{
  employee: EmployeeModel;
}>();

const employee = computed(() => props.employee);

// Emit
const emit = defineEmits(['markAsCompleted']);

// Store
const modalStore = useModalStore();
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="modalStore.isEmployeeDataModalOpen" v-if="employee" modal
      header="Detalles del empleado" :style="{ width: '30rem' }">

      <div class="space-y-4">
        <div>
          <label class="font-semibold text-CharcoalBlue">Nombre:</label>
          <p class="text-DarkTeal mt-1 text-lg font-medium">
            {{ employee.name }} {{ employee.lastName }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Edad:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.age }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Sexo:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.sexo === 0 ? 'Masculino' : 'Femenino' }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">CURP:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.curp }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">RFC:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.rfc }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Salario:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            ${{ employee.salary }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">ID de Usuario:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.userId }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">ID de Proyecto:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.projectId }}
          </p>
        </div>

        <div>
          <label class="font-semibold text-CharcoalBlue">Fecha de Creación:</label>
          <p class="text-DarkTeal mt-1 text-base font-medium">
            {{ employee.createdAt }}
          </p>
        </div>
      </div>
    </Dialog>
  </div>
</template>
