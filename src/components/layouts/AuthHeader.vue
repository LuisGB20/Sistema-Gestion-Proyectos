<script setup lang="ts">
import { BellAlertIcon, BellIcon } from '@heroicons/vue/24/outline';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { RouterLink } from 'vue-router';
import type { User } from '@/interfaces/User';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const modalAbierto = ref(false);
const modalRef = ref<HTMLElement | null>(null);

type Roles = "admin" | "gerente" | "supervisor" | "recursos-humanos" | "sistemas" | "empleado"

// Enlaces basados en el rol del usuario
const enlacesPorRol = {
  admin: [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/proyectos', label: 'Proyectos' },
    { to: '/admin/recursos', label: 'Recursos' },
    { to: '/admin/logs', label: 'Logs' },
  ],
  gerente: [
    { to: '/gerente', label: 'Dashboard' },
    { to: '/gerente/proyectos', label: 'Proyectos' },
    { to: '/gerente/equipos', label: 'Equipos' },
    { to: '/gerente/empleados', label: 'Empleados' },
    { to: '/gerente/recursos', label: 'Recursos' },
  ],
  supervisor: [
    { to: '/supervisor', label: 'Dashboard' },
    { to: '/supervisor/proyecto', label: 'Proyecto' },
    { to: '/supervisor/equipo', label: 'Equipo' },
    { to: '/supervisor/recursos', label: 'Recursos' },
  ],
  'recursos-humanos': [
    { to: '/recursos-humanos', label: 'Dashboard' },
    { to: '/recursos-humanos/empleados', label: 'Empleados' },
  ],
  sistemas: [
    { to: '/sistemas', label: 'Dashboard' },
    { to: '/sistemas/recursos', label: 'Recursos' },
  ],
  empleado: [
    { to: '/empleado', label: 'Dashboard' },
    { to: '/empleado/proyecto', label: 'Proyecto' },
    { to: '/empleado/tareas', label: 'Tareas' },
    { to: '/empleado/actividades', label: 'Actividades' },
  ],
};

// Obtener los enlaces correspondientes al rol del usuario
const enlacesUsuario = computed(() => {
  const rol : Roles = user.value?.rol.toLowerCase().replace(' ', '-') as Roles;
  return enlacesPorRol[rol] || [];
});

const handleClickOutside = (event: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    modalAbierto.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="px-4 sm:px-6 py-4 flex justify-between items-center bg-white shadow-lg h-16 fixed top-0 left-0 w-full z-50">
    <div class="flex items-center space-x-4">
      <img src="../../assets/Icons/logo.png" alt="logo" class="size-10">
      <h1 class="font-bold text-2xl text-DarkTeal tracking-tight hidden sm:block">
        Sistema de Gestión de Proyectos
      </h1>
    </div>

    <div class="flex items-center space-x-4 sm:space-x-6 relative">
      <div @click.stop="modalAbierto = !modalAbierto" class="flex flex-row items-center text-sm font-medium text-white space-x-0
              bg-DarkTeal px-4 py-2 rounded-lg transition duration-300
              hover:bg-CharcoalBlue hover:text-white cursor-pointer relative mr-0">
        <p>Bienvenido</p>
        <p class="px-2">|</p>
        <p>{{ user?.rol }}</p>
        <i class="pi pi-user text-white ml-2"></i>
      </div>

      <div v-if="modalAbierto" ref="modalRef"
        class="absolute top-full right-0 mt-4 bg-white shadow-lg rounded-lg min-w-64 z-50 overflow-hidden">

        <div class="bg-DarkTeal text-white flex flex-col items-center p-4">
          <i class="pi pi-user mb-3"></i>
          <p class="text-lg font-semibold">{{ user?.rol }}</p>
          <p class="text-md font-normal">{{ user?.email }}</p>
        </div>

        <div class="bg-white flex flex-col p-4">
          <RouterLink v-for="(enlace, index) in enlacesUsuario" :key="index" :to="enlace.to"
            class="text-DarkTeal hover:bg-gray-100 px-4 py-2 rounded-lg transition duration-300">
            {{ enlace.label }}
          </RouterLink>
        </div>

        <div class="bg-white flex flex-col items-center p-4">
          <button @click="authStore.logout()" class="mt-4 w-full text-lg py-2 font-semibold rounded-lg border-2 border-DarkTeal bg-DarkTeal text-white
              transition duration-300 hover:bg-transparent hover:text-DarkTeal">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
