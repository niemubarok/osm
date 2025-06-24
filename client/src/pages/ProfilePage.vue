<template>
  <q-page padding>

    <participant-detail-component :data="participantStore.participantProfile" />
  </q-page>
</template>

<script setup>
import ProfileComponent from 'src/components/ProfileComponent.vue'
import FlightAccomodationComponent from 'src/components/FlightAccomodationComponent.vue'
import HotelAccomodationComponent from 'src/components/HotelAccomodationComponent.vue'
import MeetingAttendanceComponent from 'src/components/MeetingAttendanceComponent.vue'
import MeetingSeat from 'src/components/MeetingSeatComponent.vue'
import ParticipantDetailComponent from 'src/components/ParticipantDetailComponent.vue'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import ls from 'localstorage-slim'

import { onMounted, ref } from 'vue'
import { useParticipantStore } from 'src/stores/participant-store'
import { useUtilStore } from 'src/stores/util-store'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRoute()
const utilStore = useUtilStore()
const participantStore = useParticipantStore()
const user = ls.get('user')

onMounted(async () => {
  try {
    const username = router.params?.username ? router.params?.username : utilStore.encodeUsername(user?.sAMAccountName)
    if (!username) {
      $q.notify({
        type: 'negative',
        message: 'Username not found'
      })
      return
    }
    await participantStore.getParticipantProfileByUserName(username)
  } catch (error) {
    console.error('🚀 ~ onMounted ~ error:', error)
  }
})
</script>
