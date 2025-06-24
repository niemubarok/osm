<template>
  <q-page padding>
    <div class="flex q-gutter-sm " :class="{ 'q-pl-md': $q.screen.gt.sm }">
      <profile-component :data="participantStore.participantProfile" />
      <flight-accomodation-component :data="participantStore.participantProfile" :style="{
        width: $q.screen.lt.sm ? '100%' : '25%',
      }" style="min-width: fit-content;" />
      <div class="column justify-center items-center" :class="{ 'full-width q-pl-sm': $q.screen.lt.sm }">

        <hotel-accomodation-component :data="participantStore.participantProfile"
          :style="{ width: $q.screen.lt.sm ? '100%' : '30%' }" style=" min-width: 200px;" class="col" />

        <meeting-seat :data="participantStore.participantProfile" :style="{ width: $q.screen.lt.sm ? '100%' : '30%' }"
          style="min-width: 200px;" class="col-auto q-mt-sm" />
      </div>

      <qr-code-component v-if="$q.screen.gt.sm" :style="{ width: $q.screen.lt.sm ? '100%' : '35%' }"
        style="height: 100%; min-width: 200px;" />
    </div>
  </q-page>
</template>

<script setup>
import ProfileComponent from 'src/components/ProfileComponent.vue'
import FlightAccomodationComponent from 'src/components/FlightAccomodationComponent.vue'
import HotelAccomodationComponent from 'src/components/HotelAccomodationComponent.vue'
import MeetingSeat from 'src/components/MeetingSeatComponent.vue'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import ls from 'localstorage-slim'

import { onMounted } from 'vue'
import { useParticipantStore } from 'src/stores/participant-store'
import { useRoute } from 'vue-router'

const router = useRoute()

const participantStore = useParticipantStore()
// const user = ls.get('user')

onMounted(async () => {
  // console.log('🚀 ~ user:', user)
  console.log('🚀 ~ onMounted ~ router.params.username:', router.params.username)

  await participantStore.getParticipantProfileByUserName(router.params.username)

  // console.log("🚀 ~ onMounted ~  router.currentRoute:", router.params.id);
})
</script>
