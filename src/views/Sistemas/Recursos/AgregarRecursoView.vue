<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { createResource } from '@/services/recursosService';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import router from '@/router';

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

const toast = useToast();

const handleSubmit = async () => {
    const isValid = await validate();
    if (isValid.valid) {
        const response = await createResource(name.value, description.value, quantity.value);
        if (!response.success) {
            toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: '¡Bienvenido!', detail: 'Inicio de sesión exitoso.', life: 3000 });
            setTimeout(() => {
                router.push(`/${response.data.user.rol.toLowerCase()}`)
            }, 1500)
        }
    } else {
        return;
    }
}

</script>

<template>
    <main class="flex flex-col justify-center items-center">
        <div class="w-full bg-white shadow-lg rounded-lg p-6">
            <h1
                class="inline text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-start text-3xl font-bold">
                Detalles del recurso
            </h1>

            <!-- Formulario de Agregar -->
            <form @submit="handleSubmit(onSubmit)">
                <div class="space-y-4">
                    <!-- Nombre -->
                    <div>
                        <label class="text-lg font-semibold" for="name">Nombre:</label>
                        <input v-model="name" id="name" type="text"
                            class="w-full p-2 border border-gray-300 rounded-md" />
                        <p v-if="nameError" class="text-red-600 text-sm">{{ nameError }}</p>
                    </div>

                    <!-- Descripción -->
                    <div>
                        <label class="text-lg font-semibold" for="description">Descripción:</label>
                        <textarea v-model="description" id="description" rows="4"
                            class="w-full p-2 border border-gray-300 rounded-md" />
                        <p v-if="descriptionError" class="text-red-600 text-sm">{{ descriptionError }}</p>
                    </div>

                    <!-- Cantidad -->
                    <div>
                        <label class="text-lg font-semibold" for="quantity">Cantidad:</label>
                        <input v-model="quantity" id="quantity" type="number"
                            class="w-full p-2 border border-gray-300 rounded-md" />
                        <p v-if="quantityError" class="text-red-600 text-sm">{{ quantityError }}</p>
                    </div>

                    <!-- Botón de Enviar -->
                    <div class="flex justify-end">
                        <button type="submit" class="bg-DarkTeal text-white py-2 px-4 rounded-lg mt-4">
                            Agregar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>