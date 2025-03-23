<script setup lang="ts">
import { ChartBarIcon, DocumentTextIcon, FolderIcon, Square3Stack3DIcon, UserGroupIcon, UsersIcon, BriefcaseIcon, PuzzlePieceIcon } from '@heroicons/vue/16/solid';
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { GetRoleNameService } from '@/services/auth/authService'

const rol = ref('');
const isCollapsed = ref(true);

onMounted(async () => {
    try {
        const response = await GetRoleNameService();
        if (response.success) {
            console.log(response)
            rol.value = response.message
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
        console.error(errorMessage);
    }
});

// Rutas disponibles para cada rol
const routes = [
    {
        role: 'admin',
        links: [
            { to: '/admin', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/admin/usuarios', label: 'Usuarios', icon: UsersIcon },
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
            { to: '/supervisor', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/supervisor/proyecto', label: 'Proyecto', icon: FolderIcon },
            { to: '/supervisor/equipo', label: 'Equipo', icon: UserGroupIcon },
            { to: '/supervisor/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/supervisor/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
            { to: '/supervisor/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
        ]
    },
    {
        role: 'Recursos Humanos',
        links: [
            { to: '/recursos-humanos', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/recursos-humanos/empleados', label: 'Empleados', icon: UsersIcon },
        ]
    },
    {
        role: 'sistemas',
        links: [
            { to: '/sistemas', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/sistemas/recursos', label: 'Recursos', icon: Square3Stack3DIcon },
        ]
    },
    {
        role: 'empleado',
        links: [
            { to: '/empleado', label: 'Dashboard', icon: ChartBarIcon },
            { to: '/empleado/proyecto', label: 'Proyecto', icon: FolderIcon },
            { to: '/empleado/tareas', label: 'Tareas', icon: BriefcaseIcon },
            { to: '/empleado/actividades', label: 'Actividades', icon: PuzzlePieceIcon },
        ]
    },
];

const indexRoutes = computed(() => routes.findIndex(r => r.role.toLowerCase() === rol.value.toLowerCase()));

const userLinks = computed(() => (indexRoutes.value !== -1 ? routes[indexRoutes.value].links : []));

const sidebar = ref<HTMLElement | null>(null);

function manejarMouseEnter(): void {
    isCollapsed.value = false;
}

function manejarMouseLeave(): void {
    isCollapsed.value = true;
}

onMounted(() => {
    if (sidebar.value) {
        sidebar.value.addEventListener('mouseover', manejarMouseEnter);
        sidebar.value.addEventListener('mouseout', manejarMouseLeave);
    }
});
</script>

<template>
    <nav ref="sidebar"
    class="sticky top-16 left-0 h-screen group bg-white font-semibold w-[80px] text-CharcoalBlue py-6 px-5 flex flex-col items-center shadow-2xl transition-all duration-300 lg:hover:w-[220px]">
    <ul>
            <li v-for="link in userLinks" class="mb-4 text-center">
                <RouterLink :to="link.to" activeClass="!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white"
                    exactActiveClass="!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white"
                    class="flex text-lg py-2 px-4 rounded-lg hover:bg-linear-to-r hover:from-DarkTeal hover:to-CharcoalBlue hover:text-white transition duration-100">
                    <component :is="link.icon" class="size-6" />
                    <span
                        :class="{ 'ml-3': !isCollapsed }"
                        class="hidden lg:block opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                        {{ !isCollapsed ? link.label : '' }}
                    </span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>