<script setup lang="ts">
import Tag from "primevue/tag";
</script>

<template>
  <div class="flex flex-col pt-10 px-4 sm:px-10 w-full">


    <div class="flex items-center justify-between w-full pr-4 sm:pr-10 flex-wrap sm:flex-nowrap md:flex-nowrap">

      <div class="flex items-center space-x-4">
        <h1 class="text-3xl sm:text-4xl font-bold text-CharcoalBlue">Tareas</h1>
        <p class="px-2 py-1 bg-DarkTeal text-white rounded-2xl font-semibold">En Camino</p>
      </div>

      <div class="flex items-center space-x-4 flex-wrap sm:flex-nowrap md:flex-nowrap mt-4 sm:mt-0">


        <div class="flex flex-col items-center sm:items-start md:w-auto">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Tiempo Gastado</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">2M : 0W : 0D</p>
          </div>
        </div>


        <div class="flex flex-col items-center sm:items-start md:w-auto mt-4 sm:mt-0">
          <p class="text-sm font-semibold text-CharcoalBlue mb-2">Fecha Límite</p>
          <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center w-full sm:w-auto">
            <i class="pi pi-clock text-black mr-2"></i>
            <p class="font-semibold">2M : 0W : 0D</p>
          </div>
        </div>


        <button
          class="text-white bg-DarkTeal px-4 py-2 mt-6 sm:mt-0 md:ml-4 rounded-md shadow-md w-full sm:w-auto"
        >Asignar Tarea</button>

      </div>
    </div>


    <div class="overflow-y-auto max-h-screen w-full mt-6">
      <div class="space-y-4 w-full">


        <div class="bg-gray-50 rounded-lg p-4 shadow-md flex flex-col sm:flex-row md:flex-row items-center justify-between w-full">
          <div class="flex items-center space-x-4 mb-4 sm:mb-0 md:mb-0">
            <i class="pi pi-lightbulb text-CharcoalBlue"></i>
            <div>
              <h2 class="text-xl font-semibold text-CharcoalBlue mb-2">Realizar un Sistema de Pago Automático que habilite el diseño</h2>
              <p class="text-sm text-CharcoalBlue">
                #402235 Abierto hace 10 días por Yash Ghori
                <Tag severity="danger" value="Cancelado" class="ml-4 px-2 py-1 bg-red-200 text-red-900 rounded-2xl"></Tag>
                <Tag severity="success" value="Completado" class="ml-4 px-2 py-1 bg-green-200 text-green-900 rounded-2xl"></Tag>
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-4 md:justify-end w-full md:w-auto">
            <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center">
              <i class="pi pi-clock text-black mr-2"></i>
              <p class="font-semibold">00 : 30 : 00</p>
            </div>
            <i class="pi pi-envelope text-CharcoalBlue"></i>
          </div>
        </div>


        <div class="bg-gray-50 rounded-lg p-4 shadow-md flex flex-col sm:flex-row md:flex-row items-center justify-between w-full">
          <div class="flex items-center space-x-4 mb-4 sm:mb-0 md:mb-0">
            <i class="pi pi-lightbulb text-CharcoalBlue"></i>
            <div>
              <h2 class="text-xl font-semibold text-CharcoalBlue mb-2 ">Realizar un Sistema de Pago Automático que habilite el diseño</h2>
              <p class="text-sm text-CharcoalBlue">
                #402235 Abierto hace 10 días por Yash Ghori
                <Tag severity="danger" value="Cancelado" class="ml-4 px-2 py-1 bg-red-200 text-red-900 rounded-2xl"></Tag>
                <Tag severity="success" value="Completado" class="ml-4 px-2 py-1 bg-green-200 text-green-900 rounded-2xl"></Tag>
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-4 md:justify-end w-full md:w-auto">
            <div class="px-2 py-2 bg-LightGray text-black rounded-2xl flex items-center">
              <i class="pi pi-clock text-black mr-2"></i>
              <p class="font-semibold">00 : 30 : 00</p>
            </div>
            <i class="pi pi-envelope text-CharcoalBlue"></i>
          </div>
        </div>

      </div>


      <div class="flex items-start space-x-2 mt-8">
        <i class="pi pi-envelope text-CharcoalBlue"></i>
        <span class="text-xs text-CharcoalBlue mr-8">50 Tareas</span>
        <i class="pi pi-folder text-CharcoalBlue"></i>
        <span class="text-xs text-CharcoalBlue">15 Archivos</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }

  .overflow-y-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
