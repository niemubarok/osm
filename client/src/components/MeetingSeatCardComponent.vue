<template>
  <q-card v-for="(seat, index) in meetingSeatStore.seats" :key="index" flat bordered
    class="q-gutter-sm bg-grey-2 q-ma-sm " :style="{
      width: $q.screen.lt.sm ? '100%' : '250px',
    }" @mouseleave="cardModels[index] = false" @touchend="cardModels[index] = false">
    <!-- <div class="bg-grey-3">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="PROFILE" />
    </div>
    <q-separator /> -->

    <!-- <q-card-section> -->
    <!-- <q-menu v-model="cardModels[index]" auto-close anchor="top end" self="center middle"
      class="no-scroll tooltip bg-grey-1 text-black shadow-1 " style="border:1px solid grey;width:fit-content;height:50px;
      border-radius: 5px;">
      <div>
        <q-item>
          <q-item-section class="text-weight-bold no-wrap text-center">
            {{ seat?.ParticipantName }}
          </q-item-section>
        </q-item>
      </div>
    </q-menu> -->

    <q-item class="text-center cursor-pointer" style="padding:0px;">

      <q-item-section avatar>

        <q-chip square class="bg-primary text-center text-weight-bold">{{ seat?.SeatCode }}</q-chip>
      </q-item-section>
      <q-item-section>
        <q-item-label caption class="text-center">
          <!-- <q-icon color="grey-8" name="picture_in_picture" /> -->
          {{ seat?.ParticipantName || 'N/A' }}
        </q-item-label>
      </q-item-section>

    </q-item>

  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import { useMeetingSeatStore } from 'src/stores/meeting-seat-store'
import ParticipantDetailDialog from './ParticipantDetailDialog.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const meetingSeatStore = useMeetingSeatStore()

const cardModels = ref([])

const onHoverCard = (index) => {
  // setTimeout(() => {
  cardModels.value[index] = true
  // }, 500)
}

const onLeaveCard = (index) => {
  cardModels.value[index] = false
}

const onClickCard = async (seatcode) => {
  // await participantStore.getParticipantProfileByUserName(username)
  // const participantDetailDialog = $q.dialog({
  //   component: ParticipantDetailDialog,
  //   componentProps: {
  //     username
  //   }
  // })
  // participantDetailDialog.update()
}

const props = defineProps({
  seats: Object
})

const route = useRoute()

const qrcodeDialog = ref(false)

onMounted(async () => {
  await meetingSeatStore.getMeetingSeats()
})
</script>

<style>
.q-dialog__backdrop {
  background-color: rgba(49, 48, 48, 0.192) !important;
}

.tooltip-arrow {
  /* position: absolute; */
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #363841;
  bottom: -40px;
  /*left: 50%; */
  transform: translateX(-50%);
}

.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;

}
</style>
