<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref, watch } from 'vue';
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import { CreateTask } from '@/services/tasks/TaskService';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const isOpen = ref(false);
const modalStore = useModalStore();
const route = useRoute();
const projectId: string = route.params.id ? route.params.id.toString() : authStore.employee?.projectId;

const props = defineProps<{ fetchOnUpdate: () => void }>();

const fields = [
  { id: 'name', label: 'Nombre de la Tarea', typeField: 'text', placeholder: 'Ingrese el nombre de la tarea' },
  { id: 'description', label: 'Descripción', typeField: 'textarea', placeholder: 'Ingrese la descripción de la tarea' },
  { id: 'estimatedHours', label: 'Horas Estimadas', typeField: 'number', placeholder: 'Ingrese las horas estimadas' },
  { id: 'workedHours', label: 'Horas Trabajadas', typeField: 'number', placeholder: 'Ingrese las horas trabajadas' }
];

const validationSchema = yup.object({
  name: yup.string().required('Debe ingresar el nombre de la tarea'),
  description: yup.string().required('Debe ingresar la descripción de la tarea'),
  estimatedHours: yup.number().required('Debe ingresar las horas estimadas').min(0, 'Las horas estimadas deben ser mayores o iguales a 0'),
  workedHours: yup.number().required('Debe ingresar las horas trabajadas').min(0, 'Las horas trabajadas deben ser mayores o iguales a 0')
});

const formData = ref({
  name: '',
  description: '',
  estimatedHours: 0,
  workedHours: 0
});

const handleSubmit = async (values: any) => {
  console.log('Tarea creada:', values);

  const taskData = {
    projectId,
    name: values.name,
    description: values.description,
    estimatedHours: values.estimatedHours,
    workedHours: values.workedHours,
    startDate: new Date().toISOString(),
    endTime: new Date().toISOString()
  };

  const res = await CreateTask(taskData);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
  props.fetchOnUpdate();
};

watch(() => {
  if (isOpen.value || modalStore.isCreateModalOpen) {
    formData.value = { name: '', description: '', estimatedHours: 0, workedHours: 0 }; // Reset form
  }
});

watch(() => {
  if (!modalStore.isCreateModalOpen) {
    isOpen.value = false;
  }
});
</script>

<template>
  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class="rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">+</i>

  <div class="absolute" v-if="isOpen">
    <FormModal
      title="Crear Tarea"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>
