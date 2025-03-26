<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { defineProps, ref, watch } from 'vue'
import * as yup from 'yup';

import {
  RemoveProject,
} from '@/services/employees/EmployeeService'
import FormModal from '@/components/forms/CreateForm.vue';

const modalStore = useModalStore();

const isOpen = ref(false);
const props = defineProps<{ employeeId: string}>();


const handleSubmit = async (values) => {
  console.log('Integrante Eliminado:', props.employeeId);

  // Llamada a RemoveProject con los props del componente
  const res = await RemoveProject(props.employeeId, props.role);
  console.log('Misael', res);  // Aquí deberías ver el objeto de respuesta

  // Verifica la respuesta
  if (res && res.success) {
    console.log('Integrante eliminado correctamente:', res.message);
  } else {
    console.log('No se pudo eliminar el integrante');
  }

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
};


watch(() => {
  if (!modalStore.isCreateModalOpen) {
    isOpen.value = false;
  }
})


</script>

<template>
  <div @click="isOpen = true; modalStore.isCreateModalOpen = true;">
    <div class="px-2 py-2 hover:bg-red-600 bg-red-700 text-white px-5 text-sm rounded-2xl cursor-pointer">
      <h2>Eliminar</h2>
    </div>
  </div>

  <div class="absolute" v-if="isOpen">
    <FormModal title="Eliminar Integrantes" :fields="[]" :validationSchema="[]" :formData="[]"
                @submit="handleSubmit" />
  </div>
</template>
