import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

const baseUrl = `${process.env.VUE_APP_API_URL}/reports-costos`;

export const useReportGastoStore = defineStore({
    id: 'reportGasto',
    state: () => ({
        totalDay: null,
        totalMonth: null,
        totalYear: null,
        listSpents: []
    }),
    getters: {
        getUserId(){
            const data = useAuthStore()
            return data.user.id;
        }
    },
    actions: {
        async getTotalGasto() {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/get-spents-totals/${idUser}`);
            console.log(result.data);
            this.totalDay = result.data.totalDay;
            this.totalMonth = result.data.totalMonth;
            this.totalYear = result.data.totalYear;
        },
        async getTotalGastoByMonth(mes) {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/get-spents-month/${mes}/${idUser}`);
            this.listSpents = result.data;
        }
    }
});