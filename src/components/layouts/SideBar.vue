<script setup lang="ts">
import { ChartBarIcon, DocumentTextIcon, FolderIcon, Square3Stack3DIcon, UserGroupIcon, UsersIcon, BriefcaseIcon, PuzzlePieceIcon } from '@heroicons/vue/16/solid';
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { GetRoleNameService } from '@/services/auth/authService'
import { logService } from '@/services/logRequests/logService'

const route = useRoute();
const rol = ref('sistemas');


onMounted(async () => {
    try {
        const response = await GetRoleNameService();
        console.log("rol", response);
        if (response.success) {
            rol.value = response.message
        }
        console.log("rol", rol.value);

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
        await logService.log('error', errorMessage, { error, email });
    }
});

// Rutas disponibles para cada rol
const routes = [
    {
        role: 'admin',
        links: [
            { to: '/admin', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/admin/usuarios', label: 'Usuarios', icon: UsersIcon },
            { to: '/admin/equipos', label: 'equipos', icon: UserGroupIcon },
            { to: '/admin/proyectos', label: 'Proyectos', icon: FolderIcon },
            { to: '/admin/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/admin/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
            { to: '/admin/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
            { to: '/admin/logs', label: 'Logs', icon: DocumentTextIcon },
        ]
    },
    {
        role: 'gerente',
        links: [
            { to: '/gerente', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/gerente/proyectos', label: 'Proyectos', icon: FolderIcon },
            { to: '/gerente/equipos', label: 'equipos', icon: UserGroupIcon },
            { to: '/gerente/empleados', label: 'Empleados', icon: UsersIcon },
            { to: '/gerente/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/gerente/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
            { to: '/gerente/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
        ]
    },
    {
        role: 'supervisor',
        links: [
            { to: '/gerente', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/gerente/proyecto', label: 'Proyecto', icon: FolderIcon },
            { to: '/gerente/equipo', label: 'Equipo', icon: UserGroupIcon },
            { to: '/gerente/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/gerente/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
            { to: '/gerente/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
        ]
    },
    {
        role: 'sistemas',
        links: [
            { to: '/sistemas', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/sistemas/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
            { to: '/recursos-humanos/empleados', label: 'Empleados', icon: UsersIcon },

        ]
    },
    {
        role: 'empleado',
        links: [
            { to: '/empleado', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/empleado/proyecto', label: 'Proyecto', icon: FolderIcon },
            { to: '/empleado/equipo', label: 'Equipo', icon: UserGroupIcon },
            { to: '/empleado/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/empleado/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
        ]
    },
];

const indexRoutes = computed(() => routes.findIndex(r => r.role.toLowerCase() === rol.value.toLowerCase()));

const userLinks = computed(() => (indexRoutes.value !== -1 ? routes[indexRoutes.value].links : []));

</script>

<template>
    <nav
        class="bg-white font-semibold w-[220px] text-CharcoalBlue py-6 px-5 flex flex-col items-center shadow-[10px_0_15px_rgba(0,0,0,0.1)]">
        <ul>
            <li v-for="link in userLinks" class="mb-4 text-center">
                <RouterLink :to="link.to" activeClass="!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white"
                    exactActiveClass="!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white"
                    class="flex text-lg py-2 px-4 rounded-lg hover:bg-linear-to-r hover:from-DarkTeal hover:to-CharcoalBlue hover:text-white transition duration-200">
                    <component :is="link.icon" class="size-6" />
                    <span class="ml-3">{{ link.label }}</span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>
