import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegistroView from '@/views/Auth/RegistroView.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import InicioView from '@/views/InicioView.vue'
import ProyectosView from '@/views/Admin/ProyectosView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TareasView from '@/views/Admin/TareasView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import ContactoView from '@/views/ContactoView.vue'
import PoliticasView from '@/views/legal/PoliticasView.vue'
import TerminosCondicionesView from '@/views/legal/TerminosCondicionesView.vue'

const router = createRouter({
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
      path: '/politicas',
      name: 'politicas',
      component: PoliticasView
    },
    {
      path: '/terminos-condiciones',
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
          path: '/Admin/Proyectos',
          name: 'proyectos',
          component: ProyectosView,
        },
        {
          path: '/Admin/Tareas',
          name: 'tareas',
          component: TareasView,
        },
      ]
    }
  ],
})

export default router
