<!--<script setup lang="ts">-->
<!--import { useModalStore } from '@/stores/modalStore';-->
<!--import { computed, onMounted, ref, watch } from 'vue'-->
<!--import FormModal from '@/components/forms/CreateForm.vue';-->
<!--import * as yup from 'yup';-->
<!--import { CreateProject } from '@/services/projects/projectService'-->
<!--import { getResources } from '@/services/resources/recursosService.ts'-->
<!--import { AssignToProject } from '@/services/projectResources/projectResourceService.ts'-->

<!--const isOpen = ref(false);-->
<!--const modalStore = useModalStore();-->
<!--const props = defineProps<{ id: string }>();-->
<!--const projectResources = ref([]);-->

<!--watch(() => {-->
<!--  if ( modalStore.isCreateModalOpen && isOpen.value) {-->
<!--    fetchResources();-->
<!--  }-->
<!--});-->

<!--const fetchResources = async () => {-->
<!--  const data = await getResources();-->
<!--  console.log("data", data)-->
<!--  console.log("id", props.id)-->
<!--  if (data.success) {-->
<!--    fields[0].options = data.data.map((resource: any) => ({-->
<!--      label: `${resource.name}`,-->
<!--      value: resource.id-->
<!--    }));-->

<!--    projectResources.value = data.data;-->
<!--    console.log("projectResources", projectResources.value[0].quantity)-->
<!--  } else {-->
<!--    console.error('Error al obtener recursos:', data);-->
<!--  }-->
<!--}-->

<!--const fields = [-->
<!--  {-->
<!--    id: 'projectType',label: 'Tipo de recursos',-->
<!--    typeField: 'select',-->
<!--    options: [],-->
<!--    placeholder: 'Seleccione un tipo'-->
<!--  },-->
<!--  {-->
<!--    id: 'budget', label: 'Cantidad',-->
<!--    typeField: 'number',-->
<!--    placeholder: 'Ingrese la cantidad'-->
<!--  }-->
<!--];-->

<!--const max = computed(() =>-->
<!--  projectResources.value.length > 0-->
<!--    ? projectResources.value.find(resource => resource.id).quantity || 0-->
<!--    : 0-->
<!--);-->

<!--const validationSchema = yup.object({-->

<!--  projectType: yup-->
<!--    .string()-->
<!--    .required('El tipo de proyecto es obligatorio'),-->
<!--  budget: yup-->
<!--    .number()-->
<!--    .max(max )-->
<!--    .required('El presupuesto es obligatorio')-->
<!--    .positive('El presupuesto debe ser un número positivo')-->

<!--});-->


<!--const formData = ref({-->
<!--  name: '',-->
<!--  description: '',-->
<!--  projectType: '',-->
<!--  budget: null-->
<!--});-->

<!--const handleSubmit = async (values) => {-->
<!--  console.log('Proyecto creado:', values);-->

<!--  const res = await AssignToProject(props.id, values.projectType, values.budget);-->
<!--  console.log(res);-->
<!--  isOpen.value = false;-->
<!--  modalStore.isCreateModalOpen = false;-->
<!--};-->

<!--watch(() => {-->
<!--  if (!modalStore.isCreateModalOpen) {-->
<!--    isOpen.value = false;-->
<!--  }-->
<!--});-->

<!--</script>-->

<!--<template>-->
<!--  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class=" rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">+</i>-->

<!--  <div class="absolute" v-if="isOpen">-->
<!--    <FormModal title="Asignar Recursos a proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData" @submit="handleSubmit" />-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped></style>-->

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { computed, reactive, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { getResources } from '@/services/resources/recursosService.ts';
import { AssignToProject } from '@/services/projectResources/projectResourceService.ts';
import { Button, Dialog } from 'primevue';

const isOpen = ref(false);
const modalStore = useModalStore();
const props = defineProps<{ id: string,  fetchOnUpdate : () => void }>();
const projectResources = ref<any[]>([]);
const isSubmited = ref(false);
const isPasswordVisible = ref(false);

// **Estado del formulario**
const formData = reactive({
  projectType: '',
  budget: null
});

// **Emitir cambios del formulario**
const emit = defineEmits(["update:formData"]);

// **Campos del formulario**
const fields = ref([
  {
    id: 'projectType',
    label: 'Tipo de recursos',
    typeField: 'select',
    options: [],
    placeholder: 'Seleccione un tipo'
  },
  {
    id: 'budget',
    label: 'Cantidad',
    typeField: 'number',
    placeholder: 'Ingrese la cantidad'
  }
]);

// **Obtener la lista de recursos y actualizar opciones**
const fetchResources = async () => {
  const data = await getResources();
  if (data.success) {
    projectResources.value = data.data;
    fields.value[0].options = data.data.map((resource: any) => ({
      label: resource.name,
      value: resource.id
    }));
  } else {
    console.error('Error al obtener recursos:', data);
  }
};

// **Cálculo de la cantidad máxima basada en `projectType`**
const max = computed(() => {
  const selectedResource = projectResources.value.find(resource => resource.id == formData.projectType);
  return selectedResource ? selectedResource.quantity : 0;
});

// **Esquema de validación con Yup**
const validationSchema = computed(() =>
  yup.object({
    projectType: yup.string().required('El tipo de recurso es obligatorio'),
    budget: yup
      .number()
      .max(max.value, `La cantidad no puede ser mayor a ${max.value}`)
      .required('La cantidad es obligatoria')
      .positive('Debe ser un número positivo')
  })
);

// **Configuración de `vee-validate`**
const { values, errors, validate, setFieldValue } = useForm({
  validationSchema,
  initialValues: formData
});

// **Observar cambios en `values` y emitir actualización**
watch(values, (newValues) => {
  Object.assign(formData, newValues);
  emit("update:formData", newValues);
}, { deep: true });

// **Manejar envío del formulario**
const handleSubmit = async () => {
  isSubmited.value = true;
  const isValid = await validate();
  if (isValid.valid) {
    const res = await AssignToProject(props.id, values.projectType, values.budget);
    console.log('Asignando recursos al proyecto:', res);
    isOpen.value = false;
    modalStore.isCreateModalOpen = false;

    props.fetchOnUpdate();
  }
};

// **Manejar cambios en los campos del formulario**
const handleInput = (fieldId: string, event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (target) {
    setFieldValue(fieldId, target.value || "");
  }
};

// **Observar cambios en la apertura del modal y cargar datos**
watch(() => modalStore.isCreateModalOpen, async (newVal) => {
  if (newVal) {
    await fetchResources();
  } else {
    isOpen.value = false;
  }
});

// **Alternar visibilidad de contraseña**
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <!-- Botón para abrir el modal -->
  <i
    @click="isOpen = true; modalStore.isCreateModalOpen = true"
    class="rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">
    +
  </i>

  <!-- Modal de asignación de recursos -->
  <div v-if="isOpen" class="absolute">
    <Dialog v-model:visible="isOpen" modal header="Asignar Recursos a Proyecto" :style="{ width: '30rem' }">
      <form @submit.prevent>
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label :for="field.id" class="font-semibold block text-sm text-CharcoalBlue mb-1">{{ field.label }}</label>

          <!-- Input para contraseñas -->
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

          <!-- Inputs de texto y número -->
          <input v-else-if="field.typeField === 'text' || field.typeField === 'number'"
                 :id="field.id"
                 :value="values[field.id] || ''"
                 @input="(e) => handleInput(field.id, e)"
                 :type="field.typeField"
                 class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none"
                 :placeholder="field.placeholder" />

          <!-- Textarea -->
          <textarea v-else-if="field.typeField === 'textarea'"
                    :id="field.id"
                    :value="values[field.id] || ''"
                    @input="(e) => handleInput(field.id, e)"
                    class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue"
                    :placeholder="field.placeholder"
                    rows="4"></textarea>

          <!-- Select -->
          <select v-else-if="field.typeField === 'select'"
                  :id="field.id"
                  :value="values[field.id] || ''"
                  @change="(e) => handleInput(field.id, e)"
                  class="w-full p-2 border rounded-md text-DarkTeal border-DarkTeal focus:border-2 focus:border-CharcoalBlue outline-none">
            <option disabled value="">{{ field.placeholder }}</option>
            <option v-for="(option, optionIndex) in field.options" :key="optionIndex" :value="option.value">{{ option.label }}</option>
          </select>

          <p v-if="errors[field.id] && isSubmited" class="text-rojo-error text-sm mt-1">{{ errors[field.id] }}</p>
        </div>
      </form>

      <template #footer>
        <Button class="btn-cancel" label="Cancelar" text severity="secondary"
                @click="modalStore.isCreateModalOpen = false" />
        <Button class="btn-submit" label="Guardar" outlined severity="secondary" @click="handleSubmit" />
      </template>
    </Dialog>
  </div>

</template>
