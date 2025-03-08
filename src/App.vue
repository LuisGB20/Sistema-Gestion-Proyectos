<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'primeicons/primeicons.css'

import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
