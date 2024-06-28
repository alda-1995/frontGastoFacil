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
            <total-income />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" lg="8">
            <TotalGrows />
        </v-col>
        <v-col cols="12" lg="4">
            <PopularBill />
        </v-col>
    </v-row>
</template>