<script setup>
import { ref, computed, defineProps } from 'vue';
import { ChevronUpIcon, ChevronDownIcon } from 'vue-tabler-icons';

const props = defineProps({
  listProducts: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <div class="d-flex align-center">
          <h4 class="text-h4-me mt-1">Productos populares</h4>
        </div>
        <div class="mt-4">
          <div class="d-inline-flex align-center justify-space-between w-100" v-for="(product, i) in listProducts" :key="i">
            <div>
              <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                {{ product.name }}
              </h6>
            </div>
            <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">${{ product.gastos_sum_amount }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
