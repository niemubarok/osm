<template>
  <BarChart ref="chartRef" :chartData="chartData" :options="chartOptions" :height="400" />
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, Legend, registerables } from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useUtilStore } from 'src/stores/util-store'

const chartStore = useChartStore()
const utilStore = useUtilStore()

Chart.register(...registerables)
const chartRef = ref(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {

    legend: {
      display: false
    }
  },
  scales: {
    y: {
      ticks: {
        // rotation: 45
      }
    },
    x: {
      ticks: {
        stepSize: 1,
        callback: function (value) {
          return value.toFixed(0)
        }
        // rotation: 45
      }
    }
  },
  orientation: 'vertical',
  indexAxis: 'y'
}

const labels = computed(() => chartStore.numberOfFindingsPerClsr.map((item) => item.ClsrName))
const data = computed(() => chartStore.numberOfFindingsPerClsr.map((item) => item.NumberOfFindings))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: '# of Findings',
      data: data.value,
      backgroundColor: labels.value.map((_, index) => utilStore.getColor(index))

      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)'
      // ],
      // borderWidth: 1
    }
  ]
}))

onMounted(async () => {
})
</script>
