<script setup lang="ts">
import { useForm } from 'vee-validate';
import { defineProps, defineEmits, ref, reactive } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import type { FieldsForm } from '@/interfaces/forms/FieldsForm';
import { Button, Dialog } from 'primevue';
import * as yup from 'yup';

const modalStore = useModalStore();

const isSubmited = ref(false);

const props = defineProps<{
    title: string,
    fields: Array<FieldsForm>,
    validationSchema: yup.AnyObject,
    formData: Record<string, any>
}>();

const { title, fields, validationSchema, formData } = props;

// Creamos una copia reactiva de formData para evitar problemas de solo lectura.
const formDataLocal = reactive({ ...formData });

const emit = defineEmits(["submit"]);

// Usamos useForm para manejar la validación y los valores del formulario.
const { values, errors, validate, setFieldValue } = useForm({
    validationSchema,
    initialValues: formDataLocal
});

const handleSubmit = async () => {
    isSubmited.value = true;
    const isValid = await validate();
    if (isValid.valid) {
        emit("submit", values);
        modalStore.isCreateModalOpen = false;
    } else {
        return;
    }
};

// Función para manejar los cambios en los campos del formulario.
const handleInput = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (target) {
        setFieldValue(fieldId, target.value);
    }
};
</script>

<template>
    <Dialog v-model:visible="modalStore.isCreateModalOpen" modal :header="title" :style="{ width: '30rem' }">
        <form @submit.prevent>
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
                <label :for="field.id" class="font-semibold block text-sm text-CharcoalBlue mb-1">{{ field.label }}</label>

                <!-- Campo de tipo Input -->
                <input v-if="field.typeField === 'text' || field.typeField === 'password' || field.typeField === 'number'" 
                    :id="field.id" 
                    :value="values[field.id]" 
                    @input="(e) => handleInput(field.id, e)" 
                    :type="field.typeField" 
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none" 
                    :placeholder="field.placeholder" />

                <!-- Campo de tipo Textarea -->
                <textarea v-else-if="field.typeField === 'textarea'" 
                    :id="field.id" 
                    :value="values[field.id]" 
                    @input="(e) => handleInput(field.id, e)" 
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue" 
                    :placeholder="field.placeholder" 
                    rows="4"></textarea>

                <!-- Campo de tipo Select -->
                <select v-else-if="field.typeField === 'select'" 
                    :id="field.id" 
                    :value="values[field.id]" 
                    @change="(e) => handleInput(field.id, e)" 
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none">
                    <option disabled value="">{{ field.placeholder }}</option>
                    <option v-for="(option, optionIndex) in field.options" :key="optionIndex" :value="option.value">{{ option.label }}</option>
                </select>

                <p v-if="errors[field.id] && isSubmited" class="text-rojo-error text-sm mt-1">{{ errors[field.id] }}</p>
            </div>
        </form>

        <template #footer>
            <Button class="btn-cancel" label="Cancelar" text severity="secondary" @click="modalStore.isCreateModalOpen = false" />
            <Button class="btn-submit" label="Guardar" outlined severity="secondary" @click="handleSubmit" />
        </template>
    </Dialog>
</template>
