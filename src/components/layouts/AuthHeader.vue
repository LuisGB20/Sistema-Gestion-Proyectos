<script setup lang="ts">
import { BellAlertIcon, BellIcon } from '@heroicons/vue/24/outline';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const notificaciones = ref(false);
const modalAbierto = ref(false);
const modalRef = ref<HTMLElement | null>(null);


const handleClickOutside = (event: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    modalAbierto.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="px-6 py-4 flex justify-between items-center bg-white shadow-lg">
    <div class="flex items-center space-x-4">
      <img src="../../assets/Icons/logo.png" alt="logo" class="size-10">
      <h1 class="font-bold text-2xl text-DarkTeal tracking-tight">Sistema de Gestión de Proyectos</h1>
    </div>

    <div class="flex items-center space-x-6 relative">
      <div class="relative">
        <button @click="notificaciones = !notificaciones"
          class="text-DarkTeal cursor-pointer transition-all duration-300 ease-in-out">
          <div v-if="!notificaciones">
            <BellIcon class="w-6 h-6 text-DarkTeal" />
          </div>
          <div v-else>
            <BellAlertIcon class="w-6 h-6 text-red-500" />
          </div>
        </button>
      </div>


      <div @click.stop="modalAbierto = !modalAbierto" class="flex flex-row items-center text-sm font-medium text-white space-x-0
              bg-DarkTeal px-4 py-2 rounded-lg transition duration-300
              hover:bg-CharcoalBlue hover:text-white cursor-pointer relative mr-0">
        <p>Bienvenido</p>
        <p class="px-2">|</p>
        <p>{{ user?.rol }}</p>
        <i class="pi pi-user text-white ml-2"></i>
      </div>


      <div v-if="modalAbierto" ref="modalRef"
      class="absolute top-full right-0 mt-4 bg-white shadow-lg rounded-lg w-48 z-50 overflow-hidden">


      <div class="flex flex-col justify-end">

          <div class="bg-DarkTeal text-white flex flex-col items-center p-4">
            <i class="pi pi-user mb-3"></i>
            <p class="text-lg font-semibold">{{ user?.rol }}</p>
            <p class="text-md font-normal">{{ user?.email }}</p>
          </div>


          <div class="bg-white flex flex-col items-center p-4">
            <button @click="authStore.logout()" class="mt-4 w-full text-lg py-2 font-semibold rounded-lg border-2 border-DarkTeal bg-DarkTeal text-white
                transition duration-300 hover:bg-transparent hover:text-DarkTeal">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>
