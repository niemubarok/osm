<template>
  <BarChart :chartData="testData" :options="chartOptions" :height="200" />
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed, watch } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useUtilStore } from 'src/stores/util-store'

Chart.register(...registerables)

const chartStore = useChartStore()
const utilStore = useUtilStore()

// Watch for changes in chart data
watch(() => chartStore.numberOfFindingsPerLocation, (newVal) => {
  console.log('🗺️ Location chart data changed:', newVal)
}, { deep: true, immediate: true })

const labels = computed(() => {
  console.log('🗺️ Location chart - numberOfFindingsPerLocation:', chartStore.numberOfFindingsPerLocation)
  return chartStore.numberOfFindingsPerLocation.map((item) => item.Name)
})
const data = computed(() => {
  console.log('🗺️ Location chart - data values:', chartStore.numberOfFindingsPerLocation.map((item) => item.NumberOfFindings))
  return chartStore.numberOfFindingsPerLocation.map((item) => item.NumberOfFindings)
})

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

const testData = computed(() => {
  console.log('🗺️ Location chart testData - labels:', labels.value, 'data:', data.value)
  
  // Fallback test data if no real data
  if (labels.value.length === 0 || data.value.length === 0) {
    console.log('🗺️ Using fallback test data for location chart')
    return {
      labels: ['Office Area', 'Production A', 'Warehouse'],
      datasets: [
        {
          label: '# of Findings',
          data: [3, 5, 2],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 1
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
        backgroundColor: labels.value.map((_, index) => utilStore.getColor(index)),
        borderColor: labels.value.map((_, index) => utilStore.getColor(index)),
        borderWidth: 1
      }
    ]
  }
})
</script>
