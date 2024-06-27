import { defineStore } from 'pinia';
import axios from 'axios';
import { router } from '@/router';

const baseUrl = `${process.env.VUE_APP_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    getters: {},
    actions: {
        async login(email, password) {
            const user = await axios.post(`${baseUrl}/login`, { email, password });
            this.user = user.data.token;
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});
