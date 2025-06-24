<template>
  <q-card flat bordered>
    <q-card-section title class="text-center text-weight-bold">
      Attendances Chart
    </q-card-section>
    <div class="flex justify-evenly items-center q-gutter-md ">

      <BarChart :width="500" :height="500" ref="chart" :chartData="chartData" :options="chartOptions"
        :style="{ width: !$q.screen.lt.md ? '40 %' : '100%' }" />
      <BarChart :width="500" :height="500" :chartData="chartData2" :options="chartOptions"
        :style="{ width: !$q.screen.lt.md ? '40 %' : '100%' }" />

    </div>
    <div class="flex col justify-evenly items-center q-gutter-md q-mt-md">

      <BarChart :width="500" :height="500" :chartData="chartData3" :options="chartOptions"
        :style="{ width: !$q.screen.lt.md ? '40 %' : '100%' }" />
      <BarChart :width="500" :height="500" :chartData="chartData4" :options="chartOptions"
        :style="{ width: !$q.screen.lt.md ? '40 %' : '100%' }" />
    </div>
  </q-card>
</template>

<script setup>
import { DoughnutChart, PieChart, BarChart } from 'vue-chart-3'
import { Chart, Legend, registerables } from 'chart.js'
import { computed, onMounted, ref, watch } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useUtilStore } from 'src/stores/util-store'
import { useAttendanceStore } from 'src/stores/attendance-store'

const chartStore = useChartStore()
const utilStore = useUtilStore()
const attendanceStore = useAttendanceStore()

const chart = ref(null)

Chart.register(...registerables)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }

  },
  indexAxis: 'y',
  width: 500,
  height: 500,
  scales: {
    x: {
      ticks: {
        // Gunakan rotasi label,
        min: 0,
        max: 2,
        stepSize: 1,
        callback: (value) => {
          return value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) // mengatur format nilai x menjadi bulat saja tanpa koma
        }
      }
    },
    y: {
      ticks: {
        fontSize: 10, // Ubah ukuran font label
        rotation: 45
      },
      // fullSize: true,
      widest: true,
      padding: 0
    }
  }

}

const firstQuarterLabels = ref([])
const secondQuarterLabels = ref([])
const thirdQuarterLabels = ref([])
const fourthQuarterLabels = ref([])
const firstQuarterData = ref([])
const secondQuarterData = ref([])
const thirdQuarterData = ref([])
const fourthQuarterData = ref([])

const chartData = computed(() => ({
  labels: firstQuarterLabels.value,
  datasets: [
    {
      label: '# of Presences',
      data: firstQuarterData.value,
      backgroundColor: firstQuarterLabels.value.map((_, index) => utilStore.getColor(index))

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

const chartData2 = computed(() => ({
  labels: secondQuarterLabels.value,
  datasets: [
    {
      label: '# of Presences',
      data: secondQuarterData.value,
      backgroundColor: secondQuarterLabels.value.map((_, index) => utilStore.getColor(index))
    }
  ]
}))

const chartData3 = computed(() => ({
  labels: thirdQuarterLabels.value,
  datasets: [
    {
      label: '# of Presences',
      data: thirdQuarterData.value,
      backgroundColor: thirdQuarterLabels.value.map((_, index) => utilStore.getColor(index))
    }
  ]
}))

const chartData4 = computed(() => ({
  labels: fourthQuarterLabels.value,
  datasets: [
    {
      label: '# of Presences',
      data: fourthQuarterData.value,
      backgroundColor: fourthQuarterLabels.value.map((_, index) => utilStore.getColor(index))
    }
  ]
}))

watch(() => attendanceStore.chartData,
  () => {
    // await attendanceStore.getAllAttendances()

    const quarterDataLength = Math.ceil(attendanceStore.chartData.length / 4)
    firstQuarterLabels.value = attendanceStore.chartData.slice(0, quarterDataLength).map((item) => item.FullName.toUpperCase())
    secondQuarterLabels.value = attendanceStore.chartData.slice(quarterDataLength, quarterDataLength * 2).map((item) => item.FullName.toUpperCase())
    thirdQuarterLabels.value = attendanceStore.chartData.slice(quarterDataLength * 2, quarterDataLength * 3).map((item) => item.FullName.toUpperCase())
    fourthQuarterLabels.value = attendanceStore.chartData.slice(quarterDataLength * 3).map((item) => item.FullName.toUpperCase())

    firstQuarterData.value = attendanceStore.chartData.slice(0, quarterDataLength).map((item) => item.checkInCount)
    secondQuarterData.value = attendanceStore.chartData.slice(quarterDataLength, quarterDataLength * 2).map((item) => item.checkInCount)
    thirdQuarterData.value = attendanceStore.chartData.slice(quarterDataLength * 2, quarterDataLength * 3).map((item) => item.checkInCount)
    fourthQuarterData.value = attendanceStore.chartData.slice(quarterDataLength * 3).map((item) => item.checkInCount)
  })

</script>
