<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue';

</script>

<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 p-10 content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: calc(100% - 220px);
    min-height: 100vh;
}
</style>
