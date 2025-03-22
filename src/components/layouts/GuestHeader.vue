<script setup lang="ts">
import { ref } from 'vue';
import LinkComponent from '../ui/LinkButton.vue';
import { Bars4Icon } from '@heroicons/vue/16/solid';

const menuAbierto = ref(false);
</script>

<template>
    <header class="px-6 py-3 flex items-center bg-white drop-shadow-lg md:px-10">
        <img src="../../assets/Icons/logo.png" alt="logo" class="size-8 sm:size-10 mr-2">
        <h1 class="font-bold text-lg hidden sm:block sm:text-xl md:text-2xl text-[#124E66] flex-1 whitespace-nowrap">
            Sistema de Gestión de Proyectos
        </h1>

        <!-- Botón de menú hamburguesa (solo visible en móviles) -->
        <button @click="menuAbierto = !menuAbierto" class="ml-auto md:hidden">
            <Bars4Icon class="size-6 text-DarkTeal"/>
        </button>

        <!-- Botón de iniciar sesión (visible en pantallas grandes) -->
        <div class="hidden md:block ml-auto">
            <LinkComponent to="/iniciar-sesion" texto="Iniciar sesión" class="text-sm sm:text-base px-4 py-2" />
        </div>
    </header>

    <!-- Menú desplegable en móviles -->
    <div v-if="menuAbierto" class="bg-white drop-shadow-md p-4 flex flex-col items-center md:hidden">
        <LinkComponent to="/iniciar-sesion" texto="Iniciar sesión"
            class="text-sm sm:text-base px-4 py-2 w-full text-center" />
    </div>
</template>
