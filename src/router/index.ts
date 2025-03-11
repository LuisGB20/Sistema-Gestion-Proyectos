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
import NotAuthorizedView from '@/views/Error/NotAuthorizedView.vue'
import PoliticasCookiesView from '@/views/legal/PoliticasCookiesView.vue'
import SubTareasView from '@/views/Admin/SubTareas/SubTareasView.vue'
import AgregarUsuarioView from '@/views/Admin/AgregarUsuario/AgregarUsuarioView.vue'
import Layout from '@/layouts/Layout.vue'
import RecursosSistemasView from '@/views/Sistemas/Recursos/RecursosSistemasView.vue'
import DetalleRecursoSistemasView from '@/views/Sistemas/Recursos/DetalleRecursoSistemasView.vue'
import AgregarRecursoView from '@/views/Sistemas/Recursos/AgregarRecursoView.vue'
import EditarRecursoView from '@/views/Sistemas/Recursos/EditarRecursoView.vue'
import DashboardSistemasView from '@/views/Sistemas/DashboardSistemasView.vue'

const router = createRouter({
  linkActiveClass: 'underline underline-offset-2',
  linkExactActiveClass: 'underline underline-offset-2',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'No-encontrado',
      component: NotFoundView
    },
    {
      path: '/acceso-denegado',
      name: 'No-autorizado',
      component: NotAuthorizedView
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
      name: 'politicas-privacidad',
      component: PoliticasView
    },
    {
      path: '/terminos-y-condiciones',
      name: 'terminos-condiciones',
      component: TerminosCondicionesView
    },
    {
      path: '/politicas-de-cookies',
      name: 'politicas-cookies',
      component: PoliticasCookiesView
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
      component: Layout,
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
    },
    {
      path: '/gerente',
      name: 'gerente',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: []
    },
    {
      path: '/sistemas',
      name: 'sistemas',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: [
        {
          path: '',
          name: 'sistemas-dash',
          component: DashboardSistemasView,
        },
        {
          path: 'recursos',
          children: [
            {
              path: '',
              name: 'sistemas-recursos',
              component: RecursosSistemasView,
            },
            {
              path: 'agregar',
              name: 'sistemas-recursos-agregar',
              component: AgregarRecursoView
            },
            {
              path: 'editar/:id',
              name: 'recursos-editar',
              component: EditarRecursoView
            },
            {
              path: ':id',
              name: 'recursos-detalle',
              component: DetalleRecursoSistemasView
            },
          ]
        }
      ]
    }
  ],
})

export default router
