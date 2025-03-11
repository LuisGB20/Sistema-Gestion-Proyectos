<script setup lang="ts">
import { ref } from "vue";
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';

let today = new Date();
let prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
let nextMonth = today.getMonth() === 11 ? 0 : today.getMonth() + 1;
let prevYear = prevMonth === 11 ? today.getFullYear() - 1 : today.getFullYear();
let nextYear = nextMonth === 0 ? today.getFullYear() + 1 : today.getFullYear();

const minDate = ref(new Date(prevYear, prevMonth, today.getDate()));
const maxDate = ref(new Date(nextYear, nextMonth, today.getDate()));

const items = ref(Array.from({ length: 10 }, (_, i) => ({ label: `Item #${i + 1}`, value: i + 1 })));

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
    console.log('Formulario enviado correctamente');
  } else {
    console.log('Formulario no válido');
  }
};
</script>

<template>
  <main class="flex justify-center items-center min-h-screen bg-gradient-to-br p-6">
    <div class="relative w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-400/30">

      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-DarkTeal to-CharcoalBlue w-14 h-14 rounded-full flex justify-center items-center shadow-md">
        <span class="text-xl font-bold">👤</span>
      </div>

      <h1 class="text-3xl font-extrabold text-CharcoalBlue text-center mb-6">Agregar Usuario</h1>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">

    
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="nombre" class="block text-lg font-medium text-CharcoalBlue mb-1">Nombre:</label>
              <input 
                v-model="nombre"
                v-bind="nombreAttrs"
                id="nombre"
                type="text"
                class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                placeholder="Ingrese su nombre"
              />
              <p v-if="errors.nombre" class="text-red-400 text-sm mt-1">{{ errors.nombre }}</p>
            </div>

            <div>
              <label for="apellido" class="block text-lg font-medium text-CharcoalBlue mb-1">Apellido:</label>
              <input 
                v-model="apellido"
                v-bind="apellidoAttrs"
                id="apellido"
                type="text"
                class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                placeholder="Ingrese su apellido"
              />
              <p v-if="errors.apellido" class="text-red-400 text-sm mt-1">{{ errors.apellido }}</p>
            </div>
          </div>


          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="telefono" class="block text-lg font-medium text-CharcoalBlue mb-1">Teléfono:</label>
              <input 
                v-model="telefono"
                v-bind="telefonoAttrs"
                id="telefono"
                type="tel"
                maxlength="10"
                class="w-full p-3 bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
                placeholder="Ingrese su número"
              />
              <p v-if="errors.telefono" class="text-red-400 text-sm mt-1">{{ errors.telefono }}</p>
            </div>

            <div>
              <label for="fecha" class="block text-lg font-medium text-CharcoalBlue mb-1">Fecha:</label>
              <DatePicker  
                v-model="fecha"
                v-bind="fechaAttrs"
                :minDate="minDate"
                :maxDate="maxDate"
                class="w-full bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition"
              />
              <p v-if="errors.fecha" class="text-red-400 text-sm mt-1">{{ errors.fecha }}</p>
            </div>
          </div>

  
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-lg font-medium text-CharcoalBlue mb-1">Designación:</label>
              <Select v-model="designacion" :options="items" optionLabel="label" optionValue="value" v-bind="designacionAttrs"
                class="w-full bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition" />
              <p v-if="errors.designacion" class="text-red-400 text-sm mt-1">{{ errors.designacion }}</p>
            </div>

            <div>
              <label class="block text-lg font-medium text-CharcoalBlue mb-1">Departamento:</label>
              <Select v-model="departamento" :options="items" optionLabel="label" optionValue="value" v-bind="departamentoAttrs"
                class="w-full bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition" />
              <p v-if="errors.departamento" class="text-red-400 text-sm mt-1">{{ errors.departamento }}</p>
            </div>

            <div>
              <label class="block text-lg font-medium text-CharcoalBlue mb-1">Creado por:</label>
              <Select v-model="creadoPor" :options="items" optionLabel="label" optionValue="value" v-bind="creadoPorAttrs"
                class="w-full bg-transparent border border-CharcoalBlue rounded-lg shadow-sm text-CharcoalBlue focus:ring-2 focus:ring-DarkTeal focus:outline-none transition" />
              <p v-if="errors.creadoPor" class="text-red-400 text-sm mt-1">{{ errors.creadoPor }}</p>
            </div>
          </div>

  
          <div class="flex justify-center">
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300">
              Registrar Usuario
            </button>
          </div>

        </div>
      </form>
    </div>
  </main>
</template>
