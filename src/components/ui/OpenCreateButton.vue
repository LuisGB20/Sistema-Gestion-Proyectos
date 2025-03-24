<template>
    <button @click="modalStore.isCreateModalOpen = true"
        class="w-full sm:w-auto flex items-center justify-center text-base sm:text-lg py-2 sm:py-2.5 px-3 sm:px-4 font-semibold 
        rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white 
        transition duration-150 ease-in-out hover:bg-white hover:text-DarkTeal hover:border-DarkTeal cursor-pointer"
        aria-label="Agregar recurso">
        Agregar
    </button>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();
</script>
