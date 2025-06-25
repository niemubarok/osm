<template>
  <q-page padding>
    <!-- <div class="flex col justify-evenly items-center q-my-xl">
    </div> -->
    <div class="text-h4 text-center">
      Welcome
    </div>
    <div class="text-h6 text-center">
      {{ user?.displayName }}
    </div>

    <div v-if="userStore.hasAccess('ATTENDANCES_CHART')">
      <AttendancesChart />
    </div>

    <div>

      <!-- <div>
        <q-img @click="imageViewerModel = true" src="~/assets/images/clsr.png" fit="contain" :ratio="16 / 9"
          spinner-color="primary" spinner-size="82px" />
      </div>

      <q-dialog v-model="imageViewerModel" ref="dialogRef" :maximized="true" content-class="dialog__backdrop">

        <q-card style="width:fit-content; height: fit-content"
          :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 80dvw;'">
          <div>
            <q-avatar v-close-popup size="25px" font-size="20px" color="grey-9" text-color="white" icon="close"
              class="absolute-top-right z-top q-ma-sm cursor-pointer" />
          </div>

          <q-img src="~/assets/images/clsr.png" fit="contain" spinner-color=" primary" spinner-size="82px" />
        </q-card>

      </q-dialog> -->

    </div>

    <!-- <div>
    <q-card class="bg-primary q-mt-lg">
      <q-card-section class="flex flex-center">
        <div class="text-h6 full-width text-center"><q-icon size="100px" name="person" color="grey-9" /></div>

      <div class="text-h6 text-center">PROFILE</div>
      </q-card-section>
    </q-card>
    </div> -->

    <add-button v-if="userStore.hasAccess('ADD_SOT')" title="Add SOT" tooltip="Add SOT" @click="onClickAddButton"
      label="Add SOT" />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { useUserStore } from 'stores/user-store'
import ls from 'localstorage-slim'
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'
import AttendancesChart from 'src/components/AttendancesChart.vue'
import AddButton from 'src/components/AddButton.vue'

import { useSotStore } from 'src/stores/sot-store'
import { useAttendanceStore } from 'src/stores/attendance-store'
import { useUserStore } from 'src/stores/user-store'
import { useComponentStore } from 'src/stores/component-store'

const router = useRouter()
const attendanceStore = useAttendanceStore()
const userStore = useUserStore()

const sotStore = useSotStore()
const componentStore = useComponentStore()

const onClickAddButton = () => {
  sotStore.showCamera = true
  componentStore.showHeader = false
  router.push('/sot/findings')
}

const imageViewerModel = ref(false)

const onClickProfile = () => {
  router.push('/profile')
}

const user = ls.get('user')

onMounted(async () => {
  await attendanceStore.getChartData()
})
// const userStore = useUserStore();
</script>
