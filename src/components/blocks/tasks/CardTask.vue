<template>
    <div class="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 class="font-semibold text-lg">{{ title }}</h3>
        <p class="text-gray-600">{{ days }} Days</p>
        <p class="text-gray-700 mt-2">{{ description }}</p>
        <div class="flex mt-3">
            <span class="text-sm text-gray-500">{{ progress }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    days: string;
    description: string;
    progress: string;
}>();
</script>