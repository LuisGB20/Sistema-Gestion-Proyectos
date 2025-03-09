import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegistroView from '@/views/Auth/RegistroView.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import InicioView from '@/views/InicioView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      children: []
    }
  ],
})

export default router
