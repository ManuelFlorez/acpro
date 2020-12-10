import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import AdminLayout from "@/layout/dashboard/AdminLayout.vue";
import DocenteLayout from "@/layout/dashboard/DocenteLayout.vue";

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/pages/Login.vue");
const DashboardAdmin = () => import(/* webpackChunkName: "common" */ "@/pages/DashboardAdmin.vue");
//const DashboardDocente = () => import(/* webpackChunkName: "common" */ "@/pages/DashboardDocente.vue");
const NuevoUsuario = () => import("@/pages/NuevoUsuario.vue");
const RegistrarActividad = () => import("@/pages/RegistrarActividad.vue");
const ListarActividad = () => import("@/pages/ListarActividad.vue");


const routes = [
  {
    path: "/", component: Login,
  },
  {
    path: "/docente", component: DocenteLayout,
    redirect: "/docente/perfil",
    children: [
      {
        path: "profile",
        name: "perfil",
        component: Profile
      },
      {
        path: 'registrar_actividad',
        name: 'registrar_actividad',
        component: RegistrarActividad
      },
      {
        path: 'listar_actividad',
        name: 'listar_actividad',
        component: ListarActividad
      }
    ]
  },
  {
    path: "/admin", component: AdminLayout,
    redirect: "/admin/dasboard",
    children: [
      {
        path: "dasboard",
        name: "grafica",
        component: DashboardAdmin
      },
      {
        path: "profile",
        name: "perfil",
        component: Profile
      },
      {
        path: "lista-usuarios",
        name: "lista-usuarios",
        component: TableList
      },
      {
        path: 'nuevo_usuario',
        name: 'nuevo_usuario',
        component: NuevoUsuario
      },
      {
        path: 'registrar_actividad',
        name: 'registrar_actividad',
        component: RegistrarActividad
      },
      {
        path: 'listar_actividad',
        name: 'listar_actividad',
        component: ListarActividad
      }
    ]
  },
  {
    path: "/s",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
