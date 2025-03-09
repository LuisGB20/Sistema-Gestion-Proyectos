<script setup lang="ts">
import SideBar from '@/components/layouts/Sidebar.vue';

</script>

<template>
    <div class="flex min-h-screen">
        <SideBar />

        <div class="flex-1 p-8 content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: calc(100% - 80px);
}
</style>