import { defineStore } from 'pinia';
import axios from 'axios';
import { router } from '@/router';
import { useAuthStore } from './authStore';
import { toast } from "vue3-toastify";

const baseUrl = `${process.env.VUE_APP_API_URL}/costos`;

export const useSpentStore = defineStore({
    id: 'spent',
    state: () => ({
        listSpents: []
    }),
    getters: {
        getUserId(){
            const data = useAuthStore()
            return data.user.id;
        }
    },
    actions: {
        async getSpents() {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/all-spents/${idUser}`);
            this.listSpents = result.data;
        },
        async getDetailSpent(idSpent){
            const result = await axios.get(`${baseUrl}/detail-spent/${idSpent}`);
            return result.data;
        },
        async addSpend(amount, description, currentDate, income, products){
            const idUser = this.getUserId;
            await axios.post(`${baseUrl}/create-spent`, { amount, description, currentDate, income, "user_id": idUser, products });
            router.push("/mis-gastos");
        },
        async editSpend(idSpent, amount, description, currentDate, income, products){
            await axios.put(`${baseUrl}/update-spent/${idSpent}`, { amount, description, currentDate, income, products });
            router.push("/mis-gastos");
        },
        async deleteSpent(idSpent){
            const result = await axios.delete(`${baseUrl}/delete-spent/${idSpent}`);
            this.listSpents = this.listSpents.filter(p => p.transaction_id !== idSpent);
            toast(result.data.message, {
                "theme": "auto",
                "type": "success",
                "dangerouslyHTMLString": true
            });
        }
    }
});