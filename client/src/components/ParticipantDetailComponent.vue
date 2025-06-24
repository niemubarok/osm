<template>
  <q-card flat style="width: 100%;height: max-content" class="shadow-1 no-border relative-position  no-wrap ">

    <q-card-section class="scroll" :style="$q.screen.lt.sm ? 'height: 90dvh' : '80dvh'">
      <div class="flex justify-center q-gutter-sm">

        <div class=" column justify-between items-start" :class="{ 'full-width q-pl-sm': $q.screen.lt.sm }">
          <profile-component :data="participantStore.participantProfile" class="col-auto" />
          <!-- </div> -->
          <meeting-attendance-component :data="participantStore.participantProfile" class="col full-width q-mt-sm" />
        </div>
        <!-- :style="{ width: $q.screen.lt.sm ? '100%' : '' }" style=" min-width: 200px; " -->

        <div v-if="$q.screen.lt.sm" class="column justify-between items-center q-gutter-y-sm "
          :class="{ 'full-width q-pl-sm': $q.screen.lt.sm }" style="height:fit-content">
          <!-- <div> -->

          <SotGroupCardComponent :Participant="participantStore.participantProfile" />
          <!-- </div> -->
          <!-- <meeting-attendance-component :data="participantStore.participantProfile"
            :style="{ width: $q.screen.lt.sm ? '100%' : '' }" style=" min-width: 200px; " class="col" /> -->

        </div>

        <div class="column justify-between items-start" :class="{ 'full-width q-pl-sm': $q.screen.lt.sm }">

          <flight-accomodation-component :data="participantStore.participantProfile" :style="{
            width: $q.screen.lt.sm ? '100%' : 'fit-content',
          }" class="col" />
          <meeting-seat :data="participantStore.participantProfile"
            :style="{ width: $q.screen.lt.sm ? '100%' : '100%' }" style="min-width: 200px;" class=" q-mt-sm col-auto" />
        </div>
        <!-- height: $q.screen.lt.sm ? 'fit-content' : '55dvh', -->
        <div class="column justify-between items-start" :class="{ 'full-width q-pl-sm': $q.screen.lt.sm }">
          <hotel-accomodation-component :data="participantStore.participantProfile"
            :style="{ width: $q.screen.lt.sm ? '100%' : '30%' }" style=" min-width: 200px;" class="col" />
          <q-card flat bordered :style="{ width: $q.screen.lt.sm ? '100%' : '30%' }" style="min-width: 200px;"
            class="col-auto q-mt-sm">
            <!-- <q-card-section title> -->
            <div class="bg-grey-3">
              <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="Vehicle Detail" />
            </div>
            <!-- </q-card-section> -->

            <vehicle-component :data="participantStore.participantProfile" />
          </q-card>
        </div>
        <div v-if="!$q.screen.lt.sm" class="flex  justify-between q-gutter-x-sm "
          :class="{ 'full-width': $q.screen.lt.sm }">
          <!-- <meeting-attendance-component :data="participantStore.participantProfile" :style="{
            width: $q.screen.lt.sm ? '100%' : '',
            height: $q.screen.lt.lg ? 'fit-content' : '60dvh'
          }" style=" min-width: 200px; " /> -->
          <div :style="{ width: $q.screen.lt.sm ? '100%' : '' }">

            <SotGroupCardComponent :Participant="participantStore.participantProfile" />
          </div>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import ProfileComponent from 'src/components/ProfileComponent.vue'
import FlightAccomodationComponent from 'src/components/FlightAccomodationComponent.vue'
import HotelAccomodationComponent from 'src/components/HotelAccomodationComponent.vue'
import MeetingSeat from 'src/components/MeetingSeatComponent.vue'
import VehicleComponent from './VehicleComponent.vue'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import MeetingAttendanceComponent from 'src/components/MeetingAttendanceComponent.vue'
import SotGroupCardComponent from './SotGroupCardComponent.vue'
import { useParticipantStore } from 'src/stores/participant-store'

const props = defineProps({
  username: String || Object

})

const participantStore = useParticipantStore()

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// onMounted(async () => {
//   await participantStore.getParticipantProfileByUserName(props.username)
// })
</script>

<style scoped>
.q-dialog-card {
  /* min-width: fit-content; */
  max-width: 100dvw;
}

:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
</style>
