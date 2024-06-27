import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useAuthStore } from '@/store/authStore';

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


router.beforeEach(async (to, from, next) => {
  const publicPages = ['/auth/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !auth.user) {
      // auth.returnUrl = to.fullPath;
      return next('/auth/login');
    } else next();
  } else {
    next();
  }
});