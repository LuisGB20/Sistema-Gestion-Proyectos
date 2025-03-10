import AdminLayout from '@/layouts/Layout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import EquiposView from '@/views/admin/Equipos/EquiposView.vue'
import LogsView from '@/views/admin/LogsView.vue'
import UsuariosView from '@/views/admin/Usuarios/UsuariosView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegistroView from '@/views/Auth/RegistroView.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import InicioView from '@/views/InicioView.vue'
import ProyectosView from '@/views/admin/Proyectos/ProyectosView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TareasView from '@/views/admin/Tareas/TareasView.vue'
import ActividadesView from '@/views/admin/Actividades/ActividadesView.vue'
import RecursosView from '@/views/admin/Recursos/RecursosView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import ContactoView from '@/views/ContactoView.vue'
import PoliticasView from '@/views/legal/PoliticasView.vue'
import TerminosCondicionesView from '@/views/legal/TerminosCondicionesView.vue'
import SubTareasView from '@/views/Admin/SubTareas/SubTareasView.vue'
import AgregarUsuarioView from '@/views/Admin/AgregarUsuario/AgregarUsuarioView.vue'

const router = createRouter({
  linkActiveClass: '!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white',
  linkExactActiveClass: '!bg-linear-to-r !from-DarkTeal !to-CharcoalBlue !text-white hover:!text-transparent',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: NotFoundView
    },
    {
      path: '/',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: SobreNosotrosView
    },
    {
      path: '/contactanos',
      name: 'contactanos',
      component: ContactoView
    },
    {
      path: '/politicas-de-privacidad',
      name: 'politicas',
      component: PoliticasView
    },
    {
      path: '/terminos-y-condiciones',
      name: 'terminos-condiciones',
      component: TerminosCondicionesView
    },
    {
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: [
        {
          path: '',
          name: 'admin-dash',
          component: DashboardView
        },
        {
          path: '/admin/usuarios',
          name: 'admin-usuarios',
          component: UsuariosView
        },
        {
          path: '/admin/agregar-usuario',
          name: 'admin-agregar-usuario',
          component: AgregarUsuarioView,
        },
        {
          path: '/admin/equipos',
          name: 'admin-equipos',
          component: EquiposView
        },
        {
          path: '/admin/proyectos',
          name: 'admin-proyectos',
          component: ProyectosView,
        },
        {
          path: '/admin/tareas',
          name: 'admin-tareas',
          component: TareasView,
        },
        {
          path: '/admin/sub-tareas',
          name: 'admin-sub-tareas',
          component: SubTareasView,
        },
        {
          path: '/admin/actividades',
          name: 'admin-actividades',
          component: ActividadesView,
        },
        {
          path: '/admin/recursos',
          name: 'admin-recursos',
          component: RecursosView,
        },
        {
          path: '/admin/logs',
          name: 'admin-logs',
          component: LogsView
        },
      ]
    }
  ],
})

export default router
