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
    id: 'name', label: 'Nombre del Proyecto',
    typeField: 'text',
    placeholder: 'Ingrese el nombre'
  },
  {
    id: 'description',
    label: 'Descripción',
    typeField: 'textarea',
    placeholder: 'Ingrese una descripción'
  },
];

const validationSchema = yup.object({
  name: yup.
  string().
  required('El nombre es obligatorio'),
  description: yup.
  string().
  required('La descripción es obligatoria'),
});

const formData = ref({
  name: '',
  description: ''
});

const handleSubmit = async (values) => {
  console.log('Proyecto creado:', values);

  const res = await CreateProject(values.name, values.description);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
};
</script>

<template>


  <i @click="isOpen= true; modalStore.isCreateModalOpen = true" class="rounded-full h-5 w-5 bg-blue-500 flex items-center justify-center text-white cursor-pointer">+</i>

  <div v-if="isOpen">
    <FormModal title="Crear Proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData"
               @submit="handleSubmit" />

  </div>
</template>

<style scoped></style>
