<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { defineProps, ref, watch } from 'vue'
import * as yup from 'yup';
import {
  ChangeStatusProject,
  CreateProject,
  GetStatusProject
} from '@/services/projects/projectService'
import FormModal from '@/components/forms/CreateForm.vue';

const modalStore = useModalStore();
const isOpen = ref(false);
const props = defineProps<{ id: string, status: string }>();

const fields = [
  {
    id: 'name', label: 'Estatus', typeField: 'select', placeholder: 'Seleccione un empleado', options: []
  },
];

const fetchStatus = async () => {

  const data = await GetStatusProject();

  console.log("data", data)
  if (data.success) {

    fields[0].options = data.data.map((data: any) => ({
      label: data[1],
      value: data[0]
    }));

    console.log(data.data[0][1])
  } else {
    console.error('Error al obtener empleados:', data);
  }
};

// Carga los empleados cuando se abre el modal
watch(() => {
  if ( modalStore.isCreateModalOpen) {
    fetchStatus();
  }
});


const validationSchema = yup.object({
  name: yup.string().required('Debe seleccionar un estado'),
});

const formData = ref({
  name: ''
});

const handleSubmit = async (values) => {
  console.log('Proyecto creado:', values);

  const res = await ChangeStatusProject(props.id , values.name);
  console.log(res);

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


  <div @click="modalStore.isCreateModalOpen = true; isOpen = true"  >
    <div class="cursor-pointer hover:bg-slate-600 px-2 py-2 bg-DarkTeal px-5 text-white text-sm rounded-2xl">
      <h2>Estado: {{ status }}</h2>
    </div>
  </div>

  <div class="absolute" v-if="isOpen">
    <FormModal title="Cambiar status del proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData"
                @submit="handleSubmit" />
  </div>



</template>

<style scoped></style>
