<script setup>
import { ref, computed, defineProps } from 'vue';
import { ArrowDownLeftCircleIcon, ShoppingCartIcon, CircleArrowDownLeftIcon } from 'vue-tabler-icons';

const props = defineProps({
  amountMonth: {
    type: String,
    default: '',
  },
  amountYear: {
    type: String,
    default: '',
  },
})

const tab = ref('1');
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat">
          <ShoppingCartIcon stroke-width="1.5" width="20" />
        </v-btn>
        <div class="ml-auto z-1">
          <v-tabs v-model="tab" class="theme-tab" density="compact" end>
            <v-tab value="1" hide-slider color="transparent">Mes</v-tab>
            <v-tab value="2" hide-slider color="transparent">Año</v-tab>
          </v-tabs>
        </div>
      </div>
      <v-window v-model="tab" class="z-1">
        <v-window-item value="1">
          <h2 class="text-h1-me font-weight-medium">
            ${{ amountMonth }}
            <!-- <CircleArrowDownLeftIcon stroke-width="1.5" width="28" class="text-white" /> -->
          </h2>
          <span class="subtitle-1-me text-white">Total del mes</span>
        </v-window-item>
        <v-window-item value="2">
          <h2 class="text-h1-me font-weight-medium">
            ${{ amountYear }}
            <!-- <ArrowDownLeftCircleIcon stroke-width="1.5" width="28" class="text-white" /> -->
          </h2>
          <span class="subtitle-1-me text-white">Total por año</span>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
