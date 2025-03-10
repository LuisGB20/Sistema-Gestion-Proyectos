<script setup lang="ts">
import { ref } from "vue";
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;

const date = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

const Designacion = ref();
const Departamento = ref();
const CreadoPor = ref();
const items = ref(Array.from({ length: 10 }, (_, i) => ({ label: `Item #${i}`, value: i })));


</script>

<template>
  <h1 class="text-4xl font-bold text-CharcoalBlue">Agregar Usuario</h1>

  <div class="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-md mt-8">
    <h1 class="text-2xl font-semibold text-CharcoalBlue mb-4">Formulario de Registro</h1>

    <form>
      <!-- Primera fila: Nombre y Apellido -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-CharcoalBlue">Nombre</label>
          <input type="text" id="nombre" placeholder="Ingrese su nombre" 
                 class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md">
        </div>
        <div>
          <label for="apellido" class="block text-sm font-medium text-CharcoalBlue">Apellido</label>
          <input type="text" id="apellido" placeholder="Ingrese su apellido" 
                 class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md">
        </div>
      </div>

      <!-- Segunda fila: Número de Teléfono y Fecha -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="telefono" class="block text-sm font-medium text-CharcoalBlue">Número de Teléfono</label>
          <input type="tel" id="telefono" 
                 class="w-full mt-1 p-2 border border-CharcoalBlue text-CharcoalBlue rounded-md"
                 pattern="[0-9]*" 
                 inputmode="numeric"
                 oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                 maxlength="10"
                 placeholder="Ingrese su número">
        </div>

        <div>
    <label for="fecha" class="block text-sm font-medium text-CharcoalBlue">Fecha</label>
    <DatePicker v-model="date" :minDate="minDate" :maxDate="maxDate"  
                :manualInput="false"
                class="w-full mt-1 border border-CharcoalBlue rounded-md">
    </DatePicker>
  </div>
      </div>

      <!-- Tercera fila: Select para Designación, Departamento y Creado por -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label for="designacion" class="block text-sm font-medium text-CharcoalBlue">Designación</label>
          <div class="card flex justify-center">
        <Select v-model="Designacion" :options="items" optionLabel="label" optionValue="value"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Designación" class="w-full md:w-56" />
    </div>
        </div>
        <div>
          <label for="departamento" class="block text-sm font-medium text-CharcoalBlue">Departamento</label>
          <div class="card flex justify-center">
        <Select v-model="Departamento" :options="items" optionLabel="label" optionValue="value"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Departamento" class="w-full md:w-56" />
    </div>
        </div>
        <div>
          <label for="creado_por" class="block text-sm font-medium text-CharcoalBlue">Creado por</label>
          <div class="card flex justify-center">
        <Select v-model="CreadoPor" :options="items" optionLabel="label" optionValue="value"
            :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Creado por" class="w-full md:w-56" />
    </div>
        </div>
      </div>
    </form>
  </div>
</template>
