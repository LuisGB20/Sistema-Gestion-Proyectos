<script setup lang="ts">
import { BellAlertIcon, BellIcon } from '@heroicons/vue/24/outline';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';

const notificaciones = ref(false);

</script>

<template>
        <header class="px-10 py-3 flex justify-between items-center bg-white drop-shadow-lg">
        <!-- <img src="../../assets/Icons/logo.png" alt="logo" class="mr-4"> -->
        <h1 class="font-bold text-xl text-DarkTeal mr-auto">Sistema de Gestión de Proyectos</h1>
      
        <div class="flex ml-auto space-x-8">
            <BellIcon v-if="!notificaciones" class="size-8 my-auto text-DarkTeal cursor-pointer"/>
            <BellAlertIcon v-else class="size-8 my-auto text-DarkTeal cursor-pointer"/>
            <div class="flex">
                <div class="flex flex-col items-end mr-4 text-sm font-medium">
                    <p>Misael Rosado</p>
                    <p>Equipo 1</p>
                </div>
                <img src="https://media-mia3-1.cdn.whatsapp.net/v/t61.24694-24/469945648_585385057537391_9188294114190043314_n.jpg?ccb=11-4&oh=01_Q5AaIIUY9ePuq7PLlqiqRAF2GIROvVSZ1NeH6GlhoOyA4gQ5&oe=67D98109&_nc_sid=5e03e0&_nc_cat=102" alt="perfil" class="rounded-full w-12">
            </div>
        </div>
    </header>
</template>