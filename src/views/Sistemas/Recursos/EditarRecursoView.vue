<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useRoute, useRouter } from 'vue-router';
import { getResource, updateResource } from '@/Services/recursosService';
import type { Resource } from '@/interfaces/Resource';
import { useNotificationStore } from '@/stores/notificationsStore';
import { PencilIcon } from '@heroicons/vue/16/solid';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();
const resourceId = route.params.id.toString();
const resource = ref<Resource>();

// Creamos las validaciones
const { values, errors, defineField, validate } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    quantity: yup
      .number()
      .required('La cantidad es obligatoria')
      .min(1, 'La cantidad debe ser al menos 1')
      .max(1000, 'La cantidad no puede exceder 1000'),
  }),
});

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
});

const [description, descriptionAttrs] = defineField('description', {
  validateOnModelUpdate: false,
});

const [quantity, quantityAttrs] = defineField('quantity', {
  validateOnModelUpdate: false,
});

const loadResourceData = async () => {
  const response = await getResource(resourceId);
  if (response.success) {
    resource.value = response.data;
    name.value = resource.value.name;
    description.value = resource.value.description;
    quantity.value = resource.value.quantity;
  } else {
    toast.add({ severity: 'error', summary: 'Error en la Operación', detail: `${response.message}`, life: 3000 });
  }
};

onMounted(() => {
  loadResourceData();
});

const handleSubmit = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    const response = await updateResource(resourceId, name.value, description.value, quantity.value);
    if (!response.success) {
      toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
    } else {
      notificationStore.showSuccess = true;
      notificationStore.message = 'Recurso editado con exito';
      setTimeout(() => {
        router.push('/sistemas/recursos');
      }, 1500);
    }
  } else {
    return;
  }
};
</script>

<template>
  <main class="flex justify-center items-center min-h-screen">
      <div class="relative w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-400/30">

          <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-DarkTeal to-CharcoalBlue w-14 h-14 rounded-full flex justify-center items-center shadow-md">
              <span class="text-xl font-bold"><PencilIcon class="size-6 text-white"/></span>
          </div>

          <h1 class="text-3xl font-extrabold text-CharcoalBlue text-center mb-6">
              Editar Recurso
          </h1>

          <form @submit.prevent="handleSubmit">
              <div class="space-y-6">
                  <!-- Nombre -->
                  <div>
                      <label for="name" class="block text-lg font-medium text-CharcoalBlue mb-1">Nombre:</label>
                      <input
                          v-model="name"
                          v-bind="nameAttrs"
                          id="name"
                          type="text"
                          class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                          placeholder="Escribe el nombre"
                      />
                      <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                  </div>

                  <!-- Descripción -->
                  <div>
                      <label for="description" class="block text-lg font-medium text-CharcoalBlue mb-1">Descripción:</label>
                      <textarea
                          v-model="description"
                          v-bind="descriptionAttrs"
                          id="description"
                          rows="4"
                          class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                          placeholder="Descripción del recurso"
                      ></textarea>
                      <p v-if="errors.description" class="text-red-400 text-sm mt-1">{{ errors.description }}</p>
                  </div>

                  <!-- Cantidad -->
                  <div>
                      <label for="quantity" class="block text-lg font-medium text-CharcoalBlue mb-1">Cantidad:</label>
                      <input
                          v-model="quantity"
                          v-bind="quantityAttrs"
                          id="quantity"
                          type="number"
                          class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                          placeholder="0"
                      />
                      <p v-if="errors.quantity" class="text-red-400 text-sm mt-1">{{ errors.quantity }}</p>
                  </div>

                  <!-- Botón de Guardar -->
                  <div class="flex justify-center">
                      <button
                          type="submit"
                          class="w-full py-3 px-6 bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                      >
                          Guardar
                      </button>
                  </div>
              </div>
          </form>
      </div>
  </main>
</template>
