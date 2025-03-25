<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref } from 'vue';
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import { CreateProject } from '@/services/projects/projectService'

const isOpen = ref(false);
const modalStore = useModalStore();

const fields = [
  {
    id: 'projectType',label: 'Tipo de recursos',
    typeField: 'select',
    options: [
      { label: 'recursos 2' },
      { label: 'recursos 3' },
      { label: 'recursos 4' }
    ],
    placeholder: 'Seleccione un tipo'
  },
  {
    id: 'budget', label: 'Cantidad',
    typeField: 'number',
    placeholder: 'Ingrese la cantidad'
  }
];

const validationSchema = yup.object({

  projectType: yup
    .string()
    .required('El tipo de proyecto es obligatorio'),
  budget: yup
    .number()
    .required('El presupuesto es obligatorio')
    .positive('El presupuesto debe ser un número positivo')
});

const formData = ref({
  name: '',
  description: '',
  projectType: '',
  budget: null
});

const handleSubmit = async (values) => {
  console.log('Proyecto creado:', values);

  const res = await CreateProject(values.name, values.description, values.projectType, values.budget);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
};
</script>

<template>
  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class="lg:absolute md:absolute sm:absolute lg:ml-136 md:ml-60 sm:ml-50 rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">+</i>

  <div v-if="isOpen">
    <FormModal title="Crear Proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData" @submit="handleSubmit" />
  </div>
</template>

<style scoped></style>
