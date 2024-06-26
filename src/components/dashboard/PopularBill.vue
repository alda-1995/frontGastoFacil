<script setup>
import { ref, computed } from 'vue';

// import icons
import { ChevronUpIcon, ChevronDownIcon } from 'vue-tabler-icons';

// chart 1
const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 95,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: {
        enabled: true
      }
    },
    colors: ['#5e35b1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Ticket '
        }
      },
      marker: {
        show: false
      }
    }
  };
});

// chart 1
const lineChart1 = {
  series: [
    {
      data: [0, 15, 10, 50, 30, 40, 25]
    }
  ]
};

const productsList = ref([
  {
    name: 'Comida',
    price: 1000,
    ingreso: false
  },
]);
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <div class="d-flex align-center">
          <h4 class="text-h4-me mt-1">Más comprados</h4>
          <div class="ml-auto">
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" size="small" icon rounded="sm" variant="text" v-bind="props">
                  <DotsIcon stroke-width="1.5" width="25" />
                </v-btn>
              </template>
              <v-sheet rounded="md" width="150" class="elevation-10">
                <v-list>
                  <v-list-item value="1">
                    <v-list-item-title>Hoy</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="2">
                    <v-list-item-title>Mes</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="3">
                    <v-list-item-title>Año</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-menu>
          </div>
        </div>
        <div class="mt-4">
          <v-list lines="two" class="py-0">
            <v-list-item v-for="(product, i) in productsList" :key="i" :value="product" color="secondary" rounded="sm">
              <template v-slot:append>
                <div class="bg-lightsuccess rounded-sm d-flex align-center justify-center ml-3"
                  style="width: 20px; height: 20px" v-if="product.ingreso">
                  <ChevronUpIcon stroke-width="1.5" width="20" class="text-success" />
                </div>
                <div class="bg-lighterror rounded-sm d-flex align-center justify-center ml-3"
                  style="width: 20px; height: 20px" v-else>
                  <ChevronDownIcon stroke-width="1.5" width="20" class="text-error" />
                </div>
              </template>
              <div class="d-inline-flex align-center justify-space-between w-100">
                <div>
                  <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                    {{ product.name }}
                  </h6>
                </div>
                <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">${{ product.price }}</div>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
