<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import 'primeicons/primeicons.css';
import Footer from './components/layouts/Footer.vue';
import GuestHeader from './components/layouts/GuestHeader.vue';
import { useAuthStore } from './stores/authStore';
import AuthHeader from './components/layouts/AuthHeader.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { Toast } from 'primevue';

const authStore = useAuthStore();
const isInitializing = ref(true);

onBeforeMount(async () => {
  try {
    await authStore.initialize();
  } catch (error) {
    console.error('error inicializando sesión:', error);
  } finally {
    isInitializing.value = false;
  }
});
</script>

<template>
  <div v-if="isInitializing" class="loading-overlay">
    <ProgressSpinner />
  </div>

  <template v-else>
    <Toast />
    <AuthHeader v-if="authStore.isLoggedIn" />
    <GuestHeader v-else />
    <RouterView />
    <Footer />
  </template>
</template>

<style scoped>
.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>