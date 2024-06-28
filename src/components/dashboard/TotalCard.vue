<script setup>
import { defineProps } from 'vue';
import iconCard from '@/assets/images/icons/icon-card.svg';

const props = defineProps({
    amount: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
        <v-card-text>
            <div class="d-flex align-start mb-6">
                <v-btn icon rounded="sm" color="darksecondary" variant="flat">
                    <img :src="iconCard" width="25" />
                </v-btn>
            </div>
            <h2 class="text-h1-me font-weight-medium">
                ${{amount}} <CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" />
            </h2>
            <span class="subtitle-1-me text-white">Total Gastado</span>
        </v-card-text>
    </v-card>
</template>
