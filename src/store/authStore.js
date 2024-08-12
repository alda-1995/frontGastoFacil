import { defineStore } from 'pinia';
import axios from 'axios';
import { router } from '@/router';

const baseUrl = `${process.env.VUE_APP_API_URL}/auth`;
const baseUrlPassword = `${process.env.VUE_APP_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token')),
        returnUrl: null,
        emailReset: null
    }),
    getters: {},
    actions: {
        async login(email, password) {
            const result = await axios.post(`${baseUrl}/login`, { email, password });
            this.user = result.data.user;
            this.token = result.data.token;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', JSON.stringify(this.token));
            router.push('/');
        },
        async register(name, email, password) {
            const result = await axios.post(`${baseUrl}/create-user`, { name, email, password });
            this.user = result.data.user;
            this.token = result.data.token;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', JSON.stringify(this.token));
            router.push('/');
        },
        async forgotPassword(email) {
            const result = await axios.post(`${baseUrlPassword}/password/email`, { email });
            router.push({ name: 'ResetPassword', params: { token: result.data.token} });
            this.emailReset = email;
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.push('/auth/login');
        }
    }
});
