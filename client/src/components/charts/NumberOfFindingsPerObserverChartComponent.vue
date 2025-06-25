<template>
  <BarChart :chartData="chartData" :options="chartOptions" :height="500" />
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

// Watch for changes in chart data
watch(() => chartStore.numberOfFindingsPerObserver, (newVal) => {
  console.log('👥 Observer chart data changed:', newVal)
}, { deep: true, immediate: true })

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }

  },
  orientation: 'vertical',
  indexAxis: 'y',
  scales: {
    y: {
      ticks: {
        // Gunakan rotasi label,
        min: 0,
        max: 2,
        stepSize: 1,
        font: {
          size: 10
        }
      },
      labelRotation: 45
    }
  }
}

const labels = computed(() => {
  console.log('👥 Observer chart - numberOfFindingsPerObserver:', chartStore.numberOfFindingsPerObserver)
  return chartStore.numberOfFindingsPerObserver.map((item) => item.ObserverName)
})
const data = computed(() => {
  console.log('👥 Observer chart - data values:', chartStore.numberOfFindingsPerObserver.map((item) => item.NumberOfFindings))
  return chartStore.numberOfFindingsPerObserver.map((item) => item.NumberOfFindings)
})

const chartData = computed(() => {
  console.log('👥 Observer chart chartData - labels:', labels.value, 'data:', data.value)
  
  // Fallback test data if no real data
  if (labels.value.length === 0 || data.value.length === 0) {
    console.log('👥 Using fallback test data for observer chart')
    return {
      labels: ['Dr. Ahmad Wijaya', 'Ir. Siti Nurhaliza', 'Bambang Sutrisno'],
      datasets: [
        {
          label: '# of Findings',
          data: [2, 3, 4],
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
