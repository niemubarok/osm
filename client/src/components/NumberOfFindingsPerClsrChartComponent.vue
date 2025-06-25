<template>
  <BarChart ref="chartRef" :chartData="chartData" :options="chartOptions" :height="400" />
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, Legend, registerables } from 'chart.js'
import { computed, onMounted, ref, watch } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useUtilStore } from 'src/stores/util-store'

const chartStore = useChartStore()
const utilStore = useUtilStore()

Chart.register(...registerables)
const chartRef = ref(null)

// Watch for changes in chart data
watch(() => chartStore.numberOfFindingsPerClsr, (newVal) => {
  console.log('📋 CLSR chart data changed:', newVal)
}, { deep: true, immediate: true })

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

const labels = computed(() => {
  console.log('📋 CLSR chart - numberOfFindingsPerClsr:', chartStore.numberOfFindingsPerClsr)
  return chartStore.numberOfFindingsPerClsr.map((item) => item.Name)
})
const data = computed(() => {
  console.log('📋 CLSR chart - data values:', chartStore.numberOfFindingsPerClsr.map((item) => item.NumberOfFindings))
  return chartStore.numberOfFindingsPerClsr.map((item) => item.NumberOfFindings)
})

const chartData = computed(() => {
  console.log('📋 CLSR chart chartData - labels:', labels.value, 'data:', data.value)
  
  // Fallback test data if no real data
  if (labels.value.length === 0 || data.value.length === 0) {
    console.log('📋 Using fallback test data for CLSR chart')
    return {
      labels: ['PPE', 'Housekeeping', 'Tools & Equipment'],
      datasets: [
        {
          label: '# of Findings',
          data: [4, 3, 5],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }
  }
  
  return {
    labels: labels.value,
    datasets: [
      {
        label: '# of Findings',
        data: data.value,
        backgroundColor: labels.value.map((_, index) => utilStore.getColor(index))
      }
    ]
  }
})

onMounted(async () => {
})
</script>
