import axios from "axios";
import { useAuthStore } from "@/store/authStore";

axios.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.statusText === "Unauthorized") {
            const authStore = useAuthStore();
            authStore.logout();
        }
        return Promise.reject(error);
    }
);

export default axios;