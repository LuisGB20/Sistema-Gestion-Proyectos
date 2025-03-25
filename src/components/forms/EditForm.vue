<script setup lang="ts">
import { useForm } from 'vee-validate';
import { defineProps, defineEmits, ref, computed, watch, reactive } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import type { FieldsForm } from '@/interfaces/forms/FieldsForm';
import { Button, Dialog } from 'primevue';
import * as yup from 'yup';

const modalStore = useModalStore();
const isSubmited = ref(false);
const isPasswordVisible = ref(false);

const props = defineProps<{
    title: string,
    fields: Array<FieldsForm>,
    validationSchema: yup.AnyObject,
    formData: Record<string, any>
}>();

const { validationSchema, formData } = props;
const title = computed(() => props.title);
const fields = computed(() => props.fields);

const formDataLocal = reactive({ ...formData });
const emit = defineEmits(["submit"]);

const { values, errors, validate, setFieldValue, setValues } = useForm({
    validationSchema,
    initialValues: formDataLocal
});

const resetFormData = () => {
    setValues(formDataLocal);
};

const handleSubmit = async () => {
    console.log(values)
    isSubmited.value = true;
    const isValid = await validate();
    if (isValid.valid) {
        emit("submit", values);
        modalStore.isEditModalOpen = false;
    }
};

const handleInput = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (target) {
        setFieldValue(fieldId, target.value);
    }
};

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

watch(
    () => props.formData,
    (newData) => {
        Object.assign(formDataLocal, newData);
        resetFormData();
    },
    { immediate: true }
);
</script>

<template>
    <Dialog v-model:visible="modalStore.isEditModalOpen" modal :header="title" :style="{ width: '30rem' }">
        <form @submit.prevent>
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
                <label :for="field.id" class="font-semibold block text-sm text-gray-700 mb-1">{{ field.label }}</label>
                
                <div v-if="field.typeField === 'password'" class="relative">
                    <input 
                        :id="field.id"
                        :value="values[field.id]"
                        @input="(e) => handleInput(field.id, e)"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none"
                        :placeholder="field.placeholder" 
                    />
                    <button type="button" @click="togglePasswordVisibility"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <i v-if="!isPasswordVisible" class="pi pi-eye-slash text-CharcoalBlue"></i>
                        <i v-else class="pi pi-eye text-DarkTeal"></i>
                    </button>
                </div>
                
                <input v-else-if="field.typeField === 'text' || field.typeField === 'number'"
                    :id="field.id"
                    :value="values[field.id]"
                    @input="(e) => handleInput(field.id, e)"
                    :type="field.typeField"
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none"
                    :placeholder="field.placeholder" />
                
                <textarea v-else-if="field.typeField === 'textarea'"
                    :id="field.id"
                    :value="values[field.id]"
                    @input="(e) => handleInput(field.id, e)"
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none"
                    :placeholder="field.placeholder"
                    rows="4"></textarea>
                
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
            <Button class="btn-cancel" label="Cancelar" text severity="secondary" @click="modalStore.isEditModalOpen = false" />
            <Button class="btn-submit" label="Guardar" outlined severity="secondary" @click="handleSubmit" />
        </template>
    </Dialog>
</template>
