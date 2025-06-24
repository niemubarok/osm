<template>
  <BarChart :chartData="testData" :options="chartOptions" :height="200" />
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useUtilStore } from 'src/stores/util-store'

Chart.register(...registerables)

const chartStore = useChartStore()
const utilStore = useUtilStore()

const labels = computed(() => chartStore.numberOfFindingsPerLocation.map((item) => item.Name))
const data = computed(() => chartStore.numberOfFindingsPerLocation.map((item) => item.NumberOfFindings))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }

  },
  orientation: 'vertical',
  indexAxis: 'y'
}

const testData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: '# of Findings',
      data: data.value,
      backgroundColor: labels.value.map((_, index) => utilStore.getColor(index)),
      borderColor: labels.value.map((_, index) => utilStore.getColor(index)),
      borderWidth: 1
    }
  ]
}))
</script>
