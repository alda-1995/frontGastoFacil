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
        listSpents: [],
        totalIncome: null,
        totalSpent: null,
        spentSerieSpent: [],
        spentSerieIncome: [],
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
            this.totalDay = result.data.totalDay;
            this.totalMonth = result.data.totalMonth;
            this.totalYear = result.data.totalYear;
        },
        async getTotalGastoByMonth(mes) {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/get-spents-month/${mes}/${idUser}`);
            this.listSpents = result.data;
        },
        async getTotalIncomes() {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/get-total-incomes/${idUser}`);
            this.totalIncome = result.data.income;
            this.totalSpent = result.data.spent;
        },
        async getChartIncomes() {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/get-charts-incomes/${idUser}`);
            this.spentSerieSpent = result.data.gasto;
            this.spentSerieIncome = result.data.ingreso;
        },
    }
});