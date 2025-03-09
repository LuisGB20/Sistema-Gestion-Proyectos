<script setup lang="ts">
import Button from 'primevue/button';
import LinkComponent from '../LinkComponent.vue';


</script>

<template>
    <header class="px-10 py-3 flex justify-between items-center bg-white drop-shadow-lg">
        <!-- <img src="../../assets/Icons/logo.png" alt="logo" class="mr-4"> -->
        <h1 class="font-bold text-xl text-[#124E66] mr-auto">Sistema de Gestión de Proyectos</h1>
      
        <div class="flex ml-auto space-x-3">
            <LinkComponent to="/iniciar-sesion" texto="Iniciar sesión" />
            <LinkComponent to="/registro" texto="Registrarse" />
        </div>
    </header>
</template>