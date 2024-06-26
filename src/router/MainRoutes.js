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
      {
        name: 'Gastos',
        path: '/mis-gastos',
        component: () => import('@/views/gastos/GastosPage.vue')
      },
      {
        name: 'AgregarGasto',
        path: '/agregar-gasto',
        component: () => import('@/views/gastos/AddSpentPage.vue')
      },
      {
        name: 'Productos',
        path: '/productos',
        component: () => import('@/views/products/ProductsPage.vue')
      },
      {
        name: 'AgregarProducto',
        path: '/agregar-producto',
        component: () => import('@/views/products/AddProductsPage.vue')
      },
      {
        name: 'EditarProducto',
        path: '/editar-producto/:id',
        component: () => import('@/views/products/EditProductPage.vue')
      },
    ]
  };
  
  export default MainRoutes;
  