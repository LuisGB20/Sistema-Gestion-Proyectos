<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';
import 'primeicons/primeicons.css';
import Footer from './components/layouts/Footer.vue';
import GuestHeader from './components/layouts/GuestHeader.vue';
import { useAuthStore } from './stores/authStore';
import AuthHeader from './components/layouts/AuthHeader.vue';
import { Toast } from 'primevue';
import Loading from '@/components/ui/Loading.vue';

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
  <div v-if="isInitializing">
    <Loading />
  </div>

  <template v-else>
    <Toast position="top-right" style="width: 20rem;" class="sm:!w-[20rem] md:!w-[30rem]" />
    <AuthHeader v-if="authStore.isLoggedIn" />
    <GuestHeader v-else />
    <RouterView />
    <Footer />
  </template>
</template>