<script setup lang="ts">
import { useForm } from 'vee-validate';
import { defineProps, defineEmits, ref, computed, onMounted } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import type { FieldsForm } from '@/Interfaces/forms/FieldsForm';
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

const {title, fields, validationSchema, formData} = props;

const formDataLocal = JSON.parse(JSON.stringify(formData));

const emit = defineEmits(["submit"]);

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
    } else{
        return
    }
};


const handleInput = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
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
                <input
                    v-if="field.typeField !== 'textarea'"
                    :id="field.id"
                    v-model="values[field.id]"
                    @input="(e) => handleInput(field.id, e)"
                    :type="field.typeField"
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none"
                    :placeholder="field.placeholder"
                />
                <textarea
                    v-else
                    :id="field.id"
                    v-model="values[field.id]"
                    @input="(e) => handleInput(field.id, e)"
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue"
                    :placeholder="field.placeholder"
                    rows="4"
                ></textarea>
                <p v-if="errors[field.id] && isSubmited" class="text-rojo-error text-sm mt-1">{{ errors[field.id] }}</p>
            </div>
        </form>
        <template #footer>
            <Button class="btn-cancel" label="Cancelar" text severity="secondary" @click="modalStore.isCreateModalOpen = false" />
            <Button class="btn-submit" label="Guardar" outlined severity="secondary" @click="handleSubmit" />
        </template>
    </Dialog>
</template>
