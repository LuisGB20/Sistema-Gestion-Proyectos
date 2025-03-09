<script setup lang='ts'>

import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Button from 'primevue/button';

</script>

<template>
  <div class="flex flex-col items-center pt-10 ">
    <h1 class="text-4xl font-bold text-CharcoalBlue mb-6 self-start">Proyectos</h1>

    <Button
      label="Crear"

      class="absolute right-10 text-white px-4 py-2 rounded-md shadow-md"
    />
    <div class="overflow-y-auto max-h-screen w-full">

      <!-- Primera fila de cuadros -->
      <div class="flex space-x-4 justify-center w-full">
        <!-- Primer cuadro -->
        <div class="w-95 bg-gray-200 rounded-lg p-4 shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <h2 class="text-3xl font-semibold text-CharcoalBlue">Título 1</h2>
              <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
            </div>
            <div class="px-4 py-3 bg-red-200 text-red-900 text-sm rounded-2xl">
              <Tag severity="danger" value="Danger"></Tag>
            </div>
          </div>
          <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
          <p class="mt-2 text-sm text-CharcoalBlue">
            Para cocinar bien, usa ingredientes frescos, controla la temperatura y sazona con precisión. ¡Experimenta con sabores!
          </p>
          <div class="mt-10 text-xs text-red-500 flex items-center space-x-2 ">
            <i class="pi pi-hourglass" style="color: red"></i>
            <span>8 DE MARZO, 2025</span>
          </div>
          <div class="mt-4 flex items-center justify-between">
              <div class="card flex justify-center space-x-2">
                <AvatarGroup class="w-50 h-8 flex">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
                    <Avatar label="+2" shape="circle" class='bg-red-200 rounded-2xl w-50 h-8 text-red-500' />
                </AvatarGroup>
              </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-envelope text-CharcoalBlue"></i>
              <span class="text-xs text-CharcoalBlue">14 mensajes</span>
            </div>
          </div>
        </div>

                <!-- Segundo cuadro -->
                <div class="w-95 bg-gray-200 rounded-lg p-4 shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <h2 class="text-3xl font-semibold text-CharcoalBlue">Título 1</h2>
              <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
            </div>
            <div class="px-4 py-3 bg-red-200 text-red-900 text-sm rounded-2xl">
              <Tag severity="danger" value="Danger" rounded></Tag>
            </div>
          </div>
          <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
          <p class="mt-2 text-sm text-CharcoalBlue">
            Para cocinar bien, usa ingredientes frescos, controla la temperatura y sazona con precisión. ¡Experimenta con sabores!
          </p>
          <div class="mt-10 text-xs text-red-500 flex items-center space-x-2 ">
            <i class="pi pi-hourglass" style="color: red"></i>
            <span>8 DE MARZO, 2025</span>
          </div>
          <div class="mt-4 flex items-center justify-between">
              <div class="card flex justify-center space-x-2">
                <AvatarGroup class="w-50 h-8 flex">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
                    <Avatar label="+2" shape="circle" class='bg-red-200 rounded-2xl w-50 h-8 text-red-500' />
                </AvatarGroup>
              </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-envelope text-CharcoalBlue"></i>
              <span class="text-xs text-CharcoalBlue">14 mensajes</span>
            </div>
          </div>
        </div>

                <!-- Tecer cuadro -->
                <div class="w-95 bg-gray-200 rounded-lg p-4 shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <h2 class="text-3xl font-semibold text-CharcoalBlue">Título 1</h2>
              <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
            </div>
            <div class="px-4 py-3 bg-red-200 text-red-900 text-sm rounded-2xl">
              <Tag severity="danger" value="Danger" rounded></Tag>
            </div>
          </div>
          <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
          <p class="mt-2 text-sm text-CharcoalBlue">
            Para cocinar bien, usa ingredientes frescos, controla la temperatura y sazona con precisión. ¡Experimenta con sabores!
          </p>
          <div class="mt-10 text-xs text-red-500 flex items-center space-x-2 ">
            <i class="pi pi-hourglass" style="color: red"></i>
            <span>8 DE MARZO, 2025</span>
          </div>
          <div class="mt-4 flex items-center justify-between">
              <div class="card flex justify-center space-x-2">
                <AvatarGroup class="w-50 h-8 flex">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
                    <Avatar label="+2" shape="circle" class='bg-red-200 rounded-2xl w-50 h-8 text-red-500' />
                </AvatarGroup>
              </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-envelope text-CharcoalBlue"></i>
              <span class="text-xs text-CharcoalBlue">14 mensajes</span>
            </div>
          </div>
        </div>

      </div>



    </div> 


    <nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-sm mt-8">
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Anterior</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">3</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Siquiente</a>
    </li>
  </ul>
</nav>


  </div>

</template>

<style scoped>
  .overflow-y-auto::-webkit-scrollbar {
    display: none; /* Oculta la barra de desplazamiento */
  }

  .overflow-y-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
