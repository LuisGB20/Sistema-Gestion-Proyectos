<script setup lang="ts">
import { ref } from "vue";
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;


const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

const items = ref(Array.from({ length: 10 }, (_, i) => ({ label: `Item #${i}`, value: i })));

const { values, errors, defineField, validate } = useForm({
  validationSchema: yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    apellido: yup.string().required('El apellido es obligatorio'),
    telefono: yup.string().matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos').required('El teléfono es obligatorio'),
    fecha: yup.date().required('La fecha es obligatoria').min(minDate.value, 'La fecha no puede ser anterior a hoy').max(maxDate.value, 'La fecha no puede ser posterior a mañana'),
    designacion: yup.number().required('La designación es obligatoria'),
    departamento: yup.number().required('El departamento es obligatorio'),
    creadoPor: yup.number().required('El campo "Creado por" es obligatorio'),
  }),
});

const [nombre, nombreAttrs] = defineField('nombre');
const [apellido, apellidoAttrs] = defineField('apellido');
const [telefono, telefonoAttrs] = defineField('telefono');
const [fecha, fechaAttrs] = defineField('fecha');
const [designacion, designacionAttrs] = defineField('designacion');
const [departamento, departamentoAttrs] = defineField('departamento');
const [creadoPor, creadoPorAttrs] = defineField('creadoPor');


const handleSubmit = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    // Aquí puedes manejar lo que quieras después de una validación exitosa
    console.log('Formulario enviado correctamente');
  } else {
    console.log('Formulario no válido');
  }
};
</script>

<template>
  <h1 class="text-4xl font-bold text-CharcoalBlue">Agregar Usuario</h1>

  <div class="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-md mt-8">
    <h1 class="text-2xl font-semibold text-CharcoalBlue mb-4">Formulario de Registro</h1>

    <form  @submit.prevent="handleSubmit">
      <!-- Primera fila: Nombre y Apellido -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-CharcoalBlue">Nombre</label>
          <input type="text" id="nombre" placeholder="Ingrese su nombre" v-model="nombre" v-bind="nombreAttrs"
                 class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md" >
                 <p v-if="errors.nombre" class="text-red-500">{{ errors.nombre }}</p>
        </div>
        <div>
          <label for="apellido" class="block text-sm font-medium text-CharcoalBlue">Apellido</label>
          <input type="text" id="apellido" placeholder="Ingrese su apellido" v-model="apellido" v-bind="apellidoAttrs"
                 class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md" >
                 <p v-if="errors.apellido" class="text-red-500">{{ errors.apellido }}</p>
        </div>
      </div>

      <!-- Segunda fila: Número de Teléfono y Fecha -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
  <label for="telefono" class="block text-sm font-medium text-CharcoalBlue">Número de Teléfono</label>
  <input 
    type="tel" 
    id="telefono" 
    v-model="telefono" 
    v-bind="telefonoAttrs"
    class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md"
    maxlength="10"
    placeholder="Ingrese su número"
    pattern="[0-9]{10}"
    inputmode="numeric"
    @input="telefono = telefono.replace(/[^0-9]/g, '')"  
  >
  <p v-if="errors.telefono" class="text-red-500">{{ errors.telefono }}</p>
</div>


        <div>
    <label for="fecha" class="block text-sm font-medium text-CharcoalBlue">Fecha</label>
    <DatePicker  :minDate="minDate" :maxDate="maxDate" v-model="fecha" v-bind="fechaAttrs" 
                :manualInput="false"
                class="w-full mt-1 border border-CharcoalBlue rounded-md">
    </DatePicker>
    <p v-if="errors.fecha" class="text-red-500">{{ errors.fecha }}</p>
  </div>
      </div>

      <!-- Tercera fila: Select para Designación, Departamento y Creado por -->
      <div class="grid grid-cols-3 gap-15 mb-4">
        <div >
          <label for="designacion" class="block text-sm font-medium text-CharcoalBlue">Designación</label>
          <div class="card flex flex-col justify-center">
        <Select v-model="designacion" :options="items" optionLabel="label" optionValue="value"  v-bind="designacionAttrs"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Designación" class="w-full md:w-56" />
            <p v-if="errors.designacion" class="text-red-500">{{ errors.designacion }}</p>
    </div>
        </div>

        <div>
          <label for="departamento" class="block text-sm font-medium text-CharcoalBlue">Departamento</label>
          <div class="card flex flex-col justify-center">
        <Select v-model="departamento" :options="items" optionLabel="label" optionValue="value" v-bind="departamentoAttrs"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Departamento" class="w-full md:w-56" />
            <p v-if="errors.departamento" class="text-red-500">{{ errors.departamento }}</p>
    </div>
        </div>

        <div>
          <label for="creado_por" class="block text-sm font-medium text-CharcoalBlue">Creado por</label>
          <div class="card flex flex-col justify-center">
        <Select v-model="creadoPor" :options="items" optionLabel="label" optionValue="value" v-bind="creadoPorAttrs"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Creado por" class="w-full md:w-56" />
            <p v-if="errors.creadoPor" class="text-red-500">{{ errors.creadoPor }}</p>
    </div>
        </div>

      </div>

      <div class="flex justify-center mt-4">
        <button type="submit" class="px-4 py-2 bg-DarkTeal text-white rounded-md">Registrar Usuario</button>
      </div>
    </form>
  </div>
</template>
