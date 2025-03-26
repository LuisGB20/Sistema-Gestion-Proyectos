<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { defineProps, ref, watch } from 'vue'
import * as yup from 'yup';
import {
  DeleteProject,
} from '@/services/projects/projectService'
import FormModal from '@/components/forms/CreateForm.vue';

const modalStore = useModalStore();

const isOpen = ref(false);

const props = defineProps<{ id: string}>();


const handleSubmit = async (values) => {
  console.log('Proyecto creado:', values);

  const res = await DeleteProject(props.id);
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
  <div @click="isOpen = true; modalStore.isCreateModalOpen = true;">
    <div class="px-2 py-2 hover:bg-red-600 bg-red-700 text-white px-5 text-sm rounded-2xl cursor-pointer">
      <h2>Eliminar</h2>
    </div>
  </div>

  <div class="absolute" v-if="isOpen">
    <FormModal title="Esta seguro de eliminar del proyecto" :fields="[]" :validationSchema="[]" :formData="[]"
               @submit="handleSubmit" />
  </div>
</template>
