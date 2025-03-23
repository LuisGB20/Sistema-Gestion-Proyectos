<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue';
</script>

<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 p-10 w-auto">
            <router-view></router-view>
        </div>
    </div>
</template>