const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/auth/LoginPage.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/auth/RegisterPage.vue')
        },
        {
            name: 'ForgotPassword',
            path: '/auth/forgotpassword',
            component: () => import('@/views/authentication/auth/ForgotPasswordPage.vue')
        },
        {
            name: 'ResetPassword',
            path: '/auth/resetpassword/:token',
            component: () => import('@/views/authentication/auth/ResetPasswordPage.vue')
        },
    ]
};

export default AuthRoutes;
