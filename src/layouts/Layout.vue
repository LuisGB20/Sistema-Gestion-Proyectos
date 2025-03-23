<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue';
</script>

<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 p-10 w-auto mt-16">
            <router-view></router-view>
        </div>
    </div>
</template>