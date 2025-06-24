<template>
  <q-banner class="bg-primary text-center ">
    <span class=" text-weight-bolder text-h6">
      SOT DASHBOARD

    </span>
    <q-btn flat class="float-right" color="secondary" @click="onCLickFullScreen"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
    <!-- :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"  -->
  </q-banner>
  <!-- <q-card flat bordered v-if="sotStore.ImageFileName !== ''" class="relative-position">
    <q-btn round dense color="red" icon="close" @click="onClickCancel" class="absolute-top-right z-top q-ma-sm" />
    <q-img :src="sotStore.ImageFileName" spinner-color="primary" spinner-size="82px" />
    <div class="bg-transparent q-pa-md fixed-bottom flex justify-center full-width">

      <q-input v-model="sotStore.Description" type="textarea" color="black" label="Description" autofocus autogrow
        class=" q-px-md q-mb-sm bg-semi-transparent rounded-borders " style="width:90%" clearable>

        <template v-slot:append>
          <q-btn square color="primary" text-color="black" icon="send" @click="onSubmit"
            class="rounded-borders q-ml-md " />
        </template>

</q-input>

</div>
</q-card> -->
  <!-- <div v-else style="width:50dvw; height:50dvh;">
    <camera-component />
  </div> -->
  <div class="flex col q-gutter-sm justify-center text-center q-ma-md ">
    <q-card flat bordered v-for="info in cardInfo" :key="info.title" class="q-ma-xs col q-py-sm">
      <div class="q-ma-sm ">{{ info.title }}</div>

      <q-card-section class="no-padding">
        <growing-number :value="info.value.value" class="text-h5" />
      </q-card-section>
    </q-card>

  </div>

  <div class="row q-col-gutter-x-xs q-col-gutter-y-xs">
    <div class="col-12 col-sm-6">
      <div
        v-for="chart in charts.filter(c => c.title === 'Number of Findings by Observer' || c.title === 'Observation Type')"
        :key="chart.title">
        <q-card flat bordered class="q-ma-sm">
          <q-card-section title>
            {{ chart.title }}
          </q-card-section>
          <q-card-section>
            <component :is="chart.component" :title="chart.title" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-12 col-sm-6">
      <div
        v-for="chart in charts.filter(c => c.title !== 'Number of Findings by Observer' && c.title !== 'Observation Type')"
        :key="chart.title">
        <q-card flat bordered class="q-ma-sm">
          <q-card-section title>
            {{ chart.title }}
          </q-card-section>
          <q-card-section>
            <component :is="chart.component" :title="chart.title" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import CameraComponent from 'src/components/CameraComponent.vue'
import { useSotStore } from 'src/stores/sot-store'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import SotChartComponent from 'src/components/SotChartComponent.vue'
import NumberOfFindingsPerObserverChartComponent from 'src/components/charts/NumberOfFindingsPerObserverChartComponent.vue'
import NumberOfFindingsPerLocationChartComponent from 'src/components/charts/NumberOfFindingsPerLocationChartComponent.vue'
import ObservationTypeChartComponent from 'src/components/charts/ObservationTypeChartComponent.vue'
import NumberOfFindingsPerClsrChartComponent from 'src/components/NumberOfFindingsPerClsrChartComponent.vue'
import GrowingNumber from 'src/components/GrowingNumber.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useChartStore } from 'src/stores/chart-store'
import { useQuasar } from 'quasar'
import { useComponentStore } from 'src/stores/component-store'

const $q = useQuasar()

const componentStore = useComponentStore()

const onCLickFullScreen = () => {
  $q.fullscreen.toggle()
  componentStore.showHeader = !componentStore.showHeader
  componentStore.leftDrawerOpen = !componentStore.leftDrawerOpen
}
const chartStore = useChartStore()

const sotStore = useSotStore()

const onClickCancel = () => {
  sotStore.ImageFileName = ''
  sotStore.Description = ''
}

const cardInfo = [
  {
    title: 'Total Observers',
    value: ref(0)

  },
  {
    title: 'Total Findings',
    value: ref(0)

  },
  {
    title: 'Safes',
    value: ref(0)

  },
  {
    title: 'Unsafes',
    value: ref(0)
    // suffix: ' %'

  }
]

const charts = [
  {
    title: 'Observation Type',
    component: ObservationTypeChartComponent,
    data: chartStore.observationType

  },
  {
    title: 'Number of Findings by Location',
    component: NumberOfFindingsPerLocationChartComponent,
    data: chartStore.numberOfFindingsPerLocation
  },
  {
    title: 'Number of Findings by Clsr',
    component: NumberOfFindingsPerClsrChartComponent,
    data: chartStore.numberOfFindingsPerClsr
  },
  {
    title: 'Number of Findings by Observer',
    component: NumberOfFindingsPerObserverChartComponent,
    data: chartStore.numberOfFindingsPerObserver.map
  }

]
onMounted(async () => {
  await chartStore.getChartData()
  cardInfo[0].value.value = chartStore.totalObservers
  cardInfo[1].value.value = chartStore.totalFindings
  cardInfo[2].value.value = chartStore.totalSafe
  cardInfo[3].value.value = chartStore.totalUnsafe
})

let intervalId

const refreshData = async () => {
  await chartStore.getChartData()
  cardInfo[0].value.value = chartStore.totalObservers
  cardInfo[1].value.value = chartStore.totalFindings
  cardInfo[2].value.value = chartStore.totalSafe
  cardInfo[3].value.value = chartStore.totalUnsafe
}

tryOnMounted(() => {
  refreshData()
  intervalId = setInterval(() => {
    refreshData()
    // Tambahkan notifikasi saat refresh
    // $q.notify({
    //   type: 'info',
    //   message: 'Data Updated',
    //   position: 'top'
    // })
  }, 60000)
})

tryOnUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

</script>

<style scoped></style>
