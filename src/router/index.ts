import DashboardView from '@/views/admin/DashboardView.vue'
import equiposView from '@/views/admin/equipos/EquiposView.vue'
import LogsView from '@/views/admin/LogsView.vue'
import UsuariosView from '@/views/admin/usuarios/UsuariosView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import NotFoundView from '@/views/error/NotFoundView.vue'
import InicioView from '@/views/InicioView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TareasView from '@/views/admin/tareas/TareasView.vue'
import ActividadesView from '@/views/admin/actividades/ActividadesView.vue'
import PoliticasView from '@/views/legal/PoliticasView.vue'
import TerminosCondicionesView from '@/views/legal/TerminosCondicionesView.vue'
import PoliticasCookiesView from '@/views/legal/PoliticasCookiesView.vue'
import SubTareasView from '@/views/admin/subTareas/SubTareasView.vue'
import AgregarUsuarioView from '@/views/admin/agregarUsuario/AgregarUsuarioView.vue'
import Layout from '@/layouts/Layout.vue'
import DashboardSistemasView from '@/views/sistemas/DashboardSistemasView.vue'
import EmployeesView from '@/views/employees/EmployeesView.vue'
import ConfigView from '@/views/admin/configuraciones/ConfigView.vue'
import NotAuthorizedView from '@/views/error/NotAuthorizedView.vue'
import ProyectoView from '@/views/admin/proyectos/ProyectoView.vue'
import RecursosSistemasView from '@/views/sistemas/recursos/RecursosSistemasView.vue'
import DetalleRecursoSistemasView from '@/views/sistemas/recursos/DetalleRecursoSistemasView.vue'
import EstatusView from '@/views/valierTest/EstatusView.vue'
import DashboardSupervisorView from '@/views/supervisor/DashboardSupervisorView.vue'
import ProyectoSupervisorView from '@/views/supervisor/proyecto/ProyectoSupervisorView.vue'
import DashboardEmpleadoView from '@/views/empleado/DashboardEmpleadoView.vue'
import ProyectoEmpleadoView from '@/views/empleado/ProyectoEmpleadoView.vue'
import TareasEmpleadoView from '@/views/empleado/TareasEmpleadoView.vue'
import ActividadesEmpleadoView from '@/views/empleado/ActividadesEmpleadoView.vue'
import ListProyectosView from '@/views/admin/proyectos/ListProyectosView.vue'
import { useAuthStore } from '@/stores/authStore'
import DashboardRecursosHumanosView from '@/views/recursosHumanos/DashboardRecursosHumanosView.vue'
import RecursosAdminView from '@/views/admin/recursos/RecursosAdminView.vue'
import DetallesRecursoAdminView from '@/views/admin/recursos/DetallesRecursoAdminView.vue'

const router = createRouter({
  linkActiveClass: 'underline underline-offset-2',
  linkExactActiveClass: 'underline underline-offset-2',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test-paginas',
      component: ConfigView
    },
    {
      path: '/gestion-estatus',
      name: 'test-paginas',
      component: EstatusView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NoEncontrado',
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
      path: '/admin',
      name: 'admin',
      component: Layout,
      meta: { requiresAuth: true, roles: ['Admin'] },
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
          component: equiposView
        },

        {
          path: '/admin/proyectos',
          children: [
            {
              path: "",
              name: "Admin-proyectos",
              component: ListProyectosView
            },
            {
              path: ":id",
              name: "proyectos-detalle",
              component: ProyectoView,
            }
          ]
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
          children: [
            {
              path: '',
              name: 'admin-recursos',
              component: RecursosAdminView,
            },
            {
              path: ':id',
              name: 'admin-recursos-detalle',
              component: DetallesRecursoAdminView
            },
          ]
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
      path: '/supervisor',
      name: 'supervisor',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: [
        {
          path: '',
          name: 'supervisor-dash',
          component: DashboardSupervisorView,
        },
        {
          path: '/supervisor/proyecto',
          name: 'supervisor-proyecto',
          component: ProyectoSupervisorView,
        },
      ]
    },

    {
      path: '/sistemas',
      name: 'sistemas',
      component: Layout,
      meta: { requiresAuth: true, roles: ['Sistemas'] },
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
              path: ':id',
              name: 'recursos-detalle',
              component: DetalleRecursoSistemasView
            },
          ]
        }
      ]
    },
    {
      path: '/recursos-humanos',
      name: 'recursos-humanos',
      component: Layout,
      meta: { requiresAuth: true, roles: ['Recursos Humanos'] },
      children: [
        {
          path: '',
          name: 'recursos-humanos-dash',
          component: DashboardRecursosHumanosView,
        },
        {
          path: 'empleados',
          name: 'empleados',
          component: EmployeesView
        }
      ]
    },
    {
      path: '/empleado',
      name: 'empleado',
      component: Layout,
      meta: { requiresAuth: true, roles: ['Empleado'] },
      children: [
        {
          path: '',
          name: 'empleado-dash',
          component: DashboardEmpleadoView,
        },
        {
          path: '/empleado/proyecto',
          name: 'empleado-proyecto',
          component: ProyectoEmpleadoView,
        },
        {
          path: '/empleado/tareas',
          name: 'empleado-tareas',
          component: TareasEmpleadoView,
        },
        {
          path: '/empleado/actividades',
          name: 'empleado-actividades',
          component: ActividadesEmpleadoView,
        },
      ]
    },
  ],
})

// Guard de rutas para proteger con autenticación y roles
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isLoading) {
    await authStore.validateSession();
  }

  // Si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn) {
      next({ name: 'NoEncontrado' });
      return;
    }

    // Verificar si el rol está permitido para esta ruta
    if (to.matched.some(record => Array.isArray(record.meta.roles) && !record.meta.roles.includes(authStore.user?.rol))) {
      next({ name: 'Inicio' });  // Redirige si el rol no tiene acceso
      return;
    }

    next();  // Permitir acceso si pasa todas las verificaciones
  } else {
    next();  // Si la ruta no requiere autenticación, continuar
  }
});

export default router
