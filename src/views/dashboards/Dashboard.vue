<script setup>
import { TotalCard, TotalBill, TotalGrows, PopularBill } from '@/components/dashboard/common';
</script>
<template>
    <v-row>
        <v-col cols="12" md="4">
            <total-card />
        </v-col>
        <v-col cols="12" md="4">
            <total-bill />
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