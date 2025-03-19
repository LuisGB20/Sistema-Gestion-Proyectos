<script setup lang='ts'>
import Tag from 'primevue/tag';

import Button from 'primevue/button';
</script>

<template>
  <div class="flex flex-col pt-10 pl-10 w-full">

    <div class="flex items-center justify-between w-full pr-10">

      <div class="flex items-center space-x-4">
        <h1 class="text-4xl font-bold text-CharcoalBlue">Recursos</h1>

        <Tag severity="success" value="En camino" class="px-3 py-1  bg-green-200 text-green-900 rounded-2xl"></Tag>
      </div>




<div class="flex items-center space-x-4">

  <div class="flex flex-col items-center">
    <p class="text-sm font-semibold text-CharcoalBlue mb-2">Tiempo Gastado</p>
    <div class="px-2 py-2 bg-green-200 text-green-900 rounded-2xl flex items-center">
      <i class="pi pi-clock text-green-900 mr-2"></i>
      <Tag severity="success" value="2M : 0W : 0D"></Tag>
    </div>
  </div>


  <div class="flex flex-col items-center">
    <p class="text-sm font-semibold text-CharcoalBlue mb-2">Fecha Límite</p>
    <div class="px-2 py-2 bg-green-200 text-green-900 rounded-2xl flex items-center">
      <i class="pi pi-clock text-green-900 mr-2"></i>
      <Tag severity="success" value="2M : 0W : 0D"></Tag>
    </div>
  </div>

  <Button
    label="Recursos"
    class="text-white px-4 py-2 mt-6 rounded-md shadow-md"
  />

</div>


    </div>

    <!-- Contenedor de Tareas -->
    <div class="overflow-y-auto max-h-screen w-full mt-6">
      <div class="space-y-4 w-full">
        <!-- Tarjeta de Proyecto -->
        <div class="bg-gray-50 rounded-lg p-4 shadow-md flex items-center justify-between w-full">

          <div class="flex items-center space-x-4">
            <i class="pi pi-lightbulb text-CharcoalBlue"></i>
            <div>
              <h2 class="text-1xl font-semibold text-CharcoalBlue mb-2">Realizar un Sistema de Pago Automático que habilite el diseño</h2>
              <p class="text-sm text-CharcoalBlue">
                #402235 Abierto hace 10 días por Yash Ghori
                <Tag severity="success" value="Cancelado" class="ml-4 px-2 py-1 bg-red-200 text-red-900 rounded-2xl"></Tag>
                <Tag severity="danger" value="Completado" class="ml-4 px-2 py-1 bg-green-200 text-green-900 rounded-2xl"></Tag>
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="px-2 py-2 bg-green-200 text-green-900 rounded-2xl flex items-center mr-8">
              <i class="pi pi-clock text-green-900 mr-2"></i>
              <Tag severity="success" value="00 : 30 : 00"></Tag>
            </div>
            <i class="pi pi-envelope text-CharcoalBlue mr-8"></i>
          </div>
        </div>

                <!-- Tarjeta de Proyecto -->
                <div class="bg-gray-50 rounded-lg p-4 shadow-md flex items-center justify-between w-full">

                <div class="flex items-center space-x-4">
                  <i class="pi pi-lightbulb text-CharcoalBlue"></i>
                  <div>
                    <h2 class="text-1xl font-semibold text-CharcoalBlue mb-2">Realizar un Sistema de Pago Automático que habilite el diseño</h2>
                    <p class="text-sm text-CharcoalBlue">
                      #402235 Abierto hace 10 días por Yash Ghori
                      <Tag severity="success" value="Cancelado" class="ml-4 px-2 py-1 bg-red-200 text-red-900 rounded-2xl"></Tag>
                      <Tag severity="danger" value="Completado" class="ml-4 px-2 py-1 bg-green-200 text-green-900 rounded-2xl"></Tag>
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="px-2 py-2 bg-green-200 text-green-900 rounded-2xl flex items-center mr-8">
                    <i class="pi pi-clock text-green-900 mr-2"></i>
                    <Tag severity="success" value="00 : 30 : 00"></Tag>
                  </div>
                  <i class="pi pi-envelope text-CharcoalBlue mr-8"></i>
                </div>
                </div>


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
