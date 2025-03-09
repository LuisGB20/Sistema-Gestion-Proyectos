<script setup lang="ts">
import { ChartBarIcon, DocumentTextIcon, FolderIcon, Square3Stack3DIcon, UserGroupIcon, UsersIcon } from '@heroicons/vue/16/solid';

// Rutas disponibles para cada rol
const routes = [
    {
        role: 'admin',
        links: [
            { to: '/admin', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/admin/usuarios', label: 'Usuarios', icon: UsersIcon },
            { to: '/admin/equipos', label: 'Equipos', icon: UserGroupIcon },
            { to: '/admin/proyectos', label: 'Proyectos', icon: FolderIcon },
            { to: '/admin/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
            { to: '/admin/logs', label: 'Logs', icon: DocumentTextIcon },
        ]
    },
    {
        role: 'jefe',
        links: [
            { to: '/jefe', label: 'Panel de Jefe', icon: ChartBarIcon }
        ]
    },
    {
        role: 'empleado',
        links: [
            { to: '/empleado', label: 'Panel de Empleado', icon: UserGroupIcon }
        ]
    },
];

const userLinks = routes[0].links;

console.log(userLinks)

</script>

<template>
    <nav class="bg-white font-semibold text-CharcoalBlue py-6 px-5 flex flex-col items-center shadow-[10px_0_15px_rgba(0,0,0,0.1)]">
        <ul>
            <li v-for="link in userLinks" class="mb-4 text-center">
                <router-link :to="link.to"
                    class="flex text-lg py-2 px-4 rounded-lg hover:bg-linear-to-r hover:from-DarkTeal hover:to-CharcoalBlue hover:text-white transition duration-200">
                    <component :is="link.icon" class="size-6" />
                    <span class="ml-3">{{ link.label }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
