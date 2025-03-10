<script setup lang='ts'>
import Tag from 'primevue/tag';
import Button from 'primevue/button';
</script>

<template>
  <div class="flex flex-col pt-10 pl-10 w-full">

    <div class="flex items-center justify-between w-full pr-10">
        <h1 class="text-4xl font-bold text-CharcoalBlue">Sub Tareas</h1>
        <Button
          label="Asignar Tarea"
          class="text-white px-4 py-2 rounded-md shadow-md"
        />
    </div>

    <!-- Contenedor de Tareas -->
    <div class="overflow-y-auto max-h-screen w-full mt-6">

      <!-- Primer rectángulo (fondo grande) -->
      <div class="bg-gray-50 rounded-lg p-6 shadow-md w-full space-y-4 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <i class="pi pi-lightbulb text-CharcoalBlue"></i>
            <div>
              <h2 class="text-xl font-semibold text-CharcoalBlue mb-2">Realizar un Sistema de Pago Automático que habilite el diseño</h2>
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

        <!-- Aquí empiezan los demás rectángulos dentro del primer rectángulo -->
        <div class="space-y-4 w-full">
          <!-- Segundo rectángulo -->
          <div class="bg-white rounded-lg p-4 shadow-md flex items-center justify-between w-full">
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
