<script setup lang="ts">
import { BellAlertIcon, BellIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import LinkComponent from '../ui/LinkButton.vue';

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const user = computed(() => authStore.user);


const notificaciones = ref(false);

</script>

<template>
    <header class="px-6 py-4 flex justify-between items-center bg-white shadow-lg rounded-lg">
      <div class="flex items-center space-x-4">
        <img src="../../assets/Icons/logo.png" alt="logo" class="size-10">
        <h1 class="font-bold text-2xl text-DarkTeal tracking-tight">Sistema de Gestión de Proyectos</h1>
      </div>
  
      <div class="flex items-center space-x-6">
        <div class="relative">
          <button @click="notificaciones = !notificaciones" class="text-DarkTeal cursor-pointer transition-all duration-300 ease-in-out">
            <div v-if="!notificaciones">
              <BellIcon class="w-6 h-6 text-DarkTeal" />
            </div>
            <div v-else>
              <BellAlertIcon class="w-6 h-6 text-red-500" />
            </div>
          </button>
        </div>
  
        <div class="flex items-center space-x-4">
          <div class="flex flex-col items-end text-sm font-medium text-gray-700">
            <p class="font-semibold">{{ user?.email }}</p>
            <p>{{ user?.rol }}</p>
          </div>
  
          <button
            @click="authStore.logout()"
            class="flex items-center space-x-2 text-lg py-2 px-2 font-semibold rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white transition duration-250 ease-in hover:bg-transparent hover:border-DarkTeal hover:text-transparent hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue">
            <span class="pi pi-sign-out" style="font-size: 1.8rem"></span>
            <!-- <span>Cerrar sesión</span> -->
          </button>
        </div>
      </div>
    </header>
  </template>