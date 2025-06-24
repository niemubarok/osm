<template>
  <DoughnutChart :chartData="chartData" :options="chartOptions" :height="100" />
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { position } from 'html2canvas/dist/types/css/property-descriptors/position'

const chartStore = useChartStore()

Chart.register(...registerables)

const safe = computed(() => chartStore.totalSafe)
const unsafe = computed(() => chartStore.totalUnsafe)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }

  }
}

const chartData = computed(() => ({
  labels: ['Safe', 'Unsafe'],
  datasets: [
    {
      // label: '# of Votes',
      data: [safe.value, unsafe.value],
      backgroundColor: [
        '#C5DC57',
        '#FFE0E6'
      ]
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)'
      // ],
      // borderWidth: 1
    }
  ]
}))

</script>
