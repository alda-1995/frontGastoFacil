<script setup>
import { TotalCard, TotalBill, TotalGrows, PopularBill, TotalIncome } from '@/components/dashboard/common';
import { useReportGastoStore } from '@/store/reportGastoStore';
import { onMounted } from 'vue';

const reportStore = useReportGastoStore();

onMounted(async () => {
    await reportStore.getTotalGasto()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    await reportStore.getTotalIncomes()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    await reportStore.getChartIncomes()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
});
</script>
<template>
    <v-row>
        <v-col cols="12" md="4">
            <total-card :amount="reportStore.totalDay" />
        </v-col>
        <v-col cols="12" md="4">
            <total-bill :amount-month="reportStore.totalMonth" :amount-year="reportStore.totalYear" />
        </v-col>
        <v-col cols="12" md="4">
            <total-income :total-income="reportStore.totalIncome" :total-spent="reportStore.totalSpent" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" lg="8">
            <template v-if="reportStore.spentSerieSpent.length > 0 && reportStore.spentSerieIncome.length > 0">
                <total-grows
                :amount-today="reportStore.totalDay"
                :amount-month="reportStore.totalMonth" :amount-year="reportStore.totalYear"
                :spent-data="reportStore.spentSerieSpent" :income-data="reportStore.spentSerieIncome" />
            </template>
        </v-col>
        <v-col cols="12" lg="4">
            <PopularBill />
        </v-col>
    </v-row>
</template>