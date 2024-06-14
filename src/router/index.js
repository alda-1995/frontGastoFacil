import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/error/Error404Page.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});

export default router
