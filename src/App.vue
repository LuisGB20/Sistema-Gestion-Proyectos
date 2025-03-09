<script setup lang="ts">
import {  RouterView } from 'vue-router'
import 'primeicons/primeicons.css'

import Footer from './components/layouts/Footer.vue';
import GuestHeader from './components/layouts/GuestHeader.vue';
import { useAuthStore } from './stores/authStore';
import AuthHeader from './components/layouts/AuthHeader.vue';

const authStore = useAuthStore();
</script>

<template>
  <AuthHeader v-if="authStore.isLoggedIn" />
  <GuestHeader v-else />
  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
