<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { updateResource } from '@/services/recursosService'; // Asumo que tienes una función para actualizar
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const route = useRoute();
const router = useRouter();

// Obteniendo el ID de la URL para buscar el recurso a editar
const resourceId = route.params.id; // Asumiendo que el ID se pasa en la URL

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

// Definimos los campos
const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
});

const [description, descriptionAttrs] = defineField('description', {
  validateOnModelUpdate: false,
});

const [quantity, quantityAttrs] = defineField('quantity', {
  validateOnModelUpdate: false,
});

// Aquí puedes simular la carga de datos del recurso
const loadResourceData = async () => {
  // Simula la obtención de datos del recurso por su ID
  const resource = await getResourceById(resourceId); // Asegúrate de tener esta función

  if (resource) {
    name.value = resource.name;
    description.value = resource.description;
    quantity.value = resource.quantity;
  }
};

// Ejecutamos la carga de datos al montar el componente
onMounted(() => {
  loadResourceData();
});

const handleSubmit = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    const response = {};
    if (!response.success) {
      toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
    } else {
      toast.add({ severity: 'success', summary: '¡Recurso actualizado!', detail: 'El recurso se actualizó con éxito.', life: 3000 });
      setTimeout(() => {
        router.push('/recursos'); // Redirige después de editar
      }, 1500);
    }
  } else {
    return;
  }
};
</script>

<template>
  <main class="flex flex-col justify-center items-center">
    <div class="w-full bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-DarkTeal text-start text-4xl font-bold mb-5">
        Editar Recurso
      </h1>

      <!-- Formulario de Edición -->
      <form @submit="handleSubmit(onSubmit)">
        <div class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="text-lg font-semibold" for="name">Nombre:</label>
            <input
              v-model="name"
              id="name"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p v-if="nameError" class="text-red-600 text-sm">{{ nameError }}</p>
          </div>

          <!-- Descripción -->
          <div>
            <label class="text-lg font-semibold" for="description">Descripción:</label>
            <textarea
              v-model="description"
              id="description"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p v-if="descriptionError" class="text-red-600 text-sm">{{ descriptionError }}</p>
          </div>

          <!-- Cantidad -->
          <div>
            <label class="text-lg font-semibold" for="quantity">Cantidad:</label>
            <input
              v-model="quantity"
              id="quantity"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p v-if="quantityError" class="text-red-600 text-sm">{{ quantityError }}</p>
          </div>

          <!-- Botón de Enviar -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-DarkTeal text-white py-2 px-4 rounded-lg mt-4"
            >
              Actualizar
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
