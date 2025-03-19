<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref } from 'vue';
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import { CreateProject } from '@/services/projects/projectService'
import Button from 'primevue/button'

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


  modalStore.isCreateModalOpen = false; // Cerrar modal después de crear
};
</script>

<template>

  <Button @click="modalStore.isCreateModalOpen = true" label="Crear Proyecto"
    class="text-white px-4 py-2 rounded-md shadow-md" />

  <FormModal title="Crear Proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData"
    @submit="handleSubmit" />

</template>

<style scoped></style>
