const MainRoutes = {
    path: '/main',
    meta: {
      requiresAuth: true
    },
    redirect: '/main/dashboard/default',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('@/views/dashboards/Dashboard.vue')
      },
      {
        name: 'Default',
        path: '/dashboard/default',
        component: () => import('@/views/dashboards/Dashboard.vue')
      },
    ]
  };
  
  export default MainRoutes;
  