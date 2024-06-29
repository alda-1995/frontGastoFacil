<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { SelectField } from '@/components/controls/common';

const props = defineProps({
  spentData: {
    type: Array,
    default: () => [],
  },
  amountToday: {
    type: String,
    default: '',
  },
  amountMonth: {
    type: String,
    default: '',
  },
  amountYear: {
    type: String,
    default: '',
  },
  incomeData: {
    type: Array,
    default: () => [],
  },
})

const totalSpent = ref(props.amountToday);
const selectTotal = ref('Today');
const itemsFilter = [
  { name: 'Hoy', value: 'Today' },
  { name: 'Mes', value: 'Month' },
  { name: 'Año', value: 'Year' }
];

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 480,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      stacked: true
    },
    colors: ['#E53935', '#1E88E5'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    },
    tooltip: {
      theme: 'dark'
    }
  };
});

const lineChart = {
  series: [
    {
      name: 'Gasto',
      data: props.spentData
    },
    {
      name: 'Ingreso',
      data: props.incomeData
    },
  ]
};

watch(selectTotal, async (selectTotal) => {
  switch (selectTotal) {
    case "Month":
      totalSpent.value = props.amountMonth;
      break;
    case "Year":
      totalSpent.value = props.amountYear;
    default:
      totalSpent.value = props.amountToday;
      break;
  }
})
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="subtitle-2-me text-disabled font-weight-bold">Total gastado</span>
            <h3 class="text-h3-me mt-1">${{ totalSpent }}</h3>
          </v-col>
          <!-- <v-col cols="12" sm="3">
            <select-field label="Filtrar total:" v-model="selectTotal" :items="itemsFilter" />
          </v-col> -->
        </v-row>
        <div class="mt-4">
          <apexchart type="bar" height="480" :options="chartOptions" :series="lineChart.series"> </apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
