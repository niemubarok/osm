<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">
    <div class="flex justify-center items-center fit">
      <q-card :style="$q.screen.lt.sm ? 'width: 100dvw' : ' width: 95dvw;'" style="height: max-content" bordered
        class="shadow-1 relative-position  no-wrap ">
        <div>
          <q-avatar size="25px" font-size="20px" color="grey-9" text-color="white" icon="close"
            class="absolute-top-right z-top q-ma-md cursor-pointer" v-close-popup>
            <q-tooltip>
              Close
            </q-tooltip>
          </q-avatar>
        </div>
        <q-banner class="bg-primary ">
          <span class=" text-black text-subtitle1 text-weight-bolder">
            Participant Detail

          </span>
        </q-banner>
        <div class="flex justify-center items-center full-width ">
          <q-card :style="$q.screen.lt.sm ? 'width: 100dvw' : ' width: 95dvw;'" style="height: max-content" bordered
            class="shadow-1 relative-position  no-wrap ">
            <participant-detail-component :username="props.username" />
          </q-card>

        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import ProfileComponent from 'src/components/ProfileComponent.vue'
import FlightAccomodationComponent from 'src/components/FlightAccomodationComponent.vue'
import HotelAccomodationComponent from 'src/components/HotelAccomodationComponent.vue'
import MeetingSeat from 'src/components/MeetingSeatComponent.vue'
import VehicleDetailComponent from './VehicleDetailComponent.vue'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import MeetingAttendanceComponent from 'src/components/MeetingAttendanceComponent.vue'
import ParticipantDetailComponent from './ParticipantDetailComponent.vue'
import { useParticipantStore } from 'src/stores/participant-store'

const props = defineProps({
  username: {
    type: String,
    required: true
  }
})

const participantStore = useParticipantStore()

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

onMounted(async () => {
  await participantStore.getParticipantProfileByUserName(props.username)
})
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
