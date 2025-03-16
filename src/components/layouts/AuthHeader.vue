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
    <header class="px-10 py-3 flex justify-between items-center bg-white drop-shadow-lg">
        <!-- <img src="../../assets/Icons/logo.png" alt="logo" class="mr-4"> -->
        <h1 class="font-bold text-xl text-DarkTeal mr-auto">Sistema de Gestión de Proyectos</h1>

        <div class="flex ml-auto space-x-8">
            <BellIcon v-if="!notificaciones" class="size-8 my-auto text-DarkTeal cursor-pointer" />
            <BellAlertIcon v-else class="size-8 my-auto text-DarkTeal cursor-pointer" />
            <div class="flex">
                <div class="flex flex-col items-end mr-4 text-sm font-medium">
                    <p>{{ user?.name }}</p>
                    <p>{{ user?.rol }}</p>
                </div>
                <button
                    @click="authStore.logout()"
                    class="flex text-lg py-2 font-semibold px-4 rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white transition duration-250 ease-in
                    hover:bg-transparent hover:border-DarkTeal hover:text-transparent hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue w-full justify-center items-center cursor-pointer">
                    Cerrar sesión
                </button>
            </div>
        </div>
    </header>
</template>
