<template>
    <button @click="modalStore.isCreateModalOpen = true"
        class="flex text-lg py-2 font-semibold px-4 rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white transition duration-150 ease-in
        hover:bg-transparent hover:border-DarkTeal hover:text-transparent hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue cursor-pointer">
        Agregar
    </button>
</template>

<script setup lang="ts">
    import { useModalStore } from '@/stores/modalStore';

    const modalStore = useModalStore();
</script>