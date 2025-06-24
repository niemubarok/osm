<template>
  <q-card flat bordered v-for="participant in participants" :key="participant" class=" relative q-ma-sm" :style="{
    width: $q.screen.lt.sm ? '90%' : '25%',
  }" style="min-width: 45dvh;">

    <q-card-section class="bg-white">
      <div class="flex justify-end">
        <q-btn flat outline dense size="sm" color="primary" text-color="black" icon="airline_seat_recline_normal"
          :label="participant?.SeatCode" class="bg-transparent absolute-top-left q-ma-sm no-pointer-events"
          style="border: 1px solid grey;" />
        <div class="text-right" style="margin-bottom: -10px" @click="onClickGenerateQrCode(participant?.UserName)">
          <q-btn flat color="dark" icon="qr_code">
            <q-tooltip>Generate QR Code</q-tooltip>
          </q-btn>

        </div>
        <q-btn flat color="dark" icon="more_vert">
          <q-tooltip>more</q-tooltip>
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="onClickParticipantDetail(participant?.UserName)">
                <q-item-section>View Profile</q-item-section>

              </q-item>
              <q-separator />
              <q-item clickable @click="onEditParticipant(participant)">
                <q-item-section>edit</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="onDeleteParticipant(participant?.ParticipantId)">
                <q-item-section class="text-red">delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div style="z-index: 1">
        <q-item>
          <!-- <q-item-section avatar>
            <q-avatar square size="100px" font-size="52px" color="teal" text-color="white" class="q-mb-md"
              style="border-radius: 10px;">
              <q-img :ratio="1" src="https://i.pravatar.cc/150?img=32" />
            </q-avatar>
          </q-item-section> -->
          <q-item-section>

            <q-item-label>{{ participant?.FullName }}</q-item-label>
            <q-separator spaced color="primary" />
            <q-item-label caption>
              <q-icon color="grey-8" name="account_tree" />
              {{ participant?.PositionName }}
            </q-item-label>
            <q-item-label caption>
              <q-icon color="grey-8" name="work" />
              {{ participant?.Unit }}
            </q-item-label>
            <q-item-label caption>
              <q-icon color="grey-8" name="corporate_fare" />
              {{ participant?.CompanyName }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import QrCodeDialog from 'src/components/QrCodeDialog.vue'
import { useParticipantStore } from 'src/stores/participant-store'
import { useUtilStore } from 'src/stores/util-store'
import { useComponentStore } from 'src/stores/component-store'
import ParticipantDetailDialog from './ParticipantDetailDialog.vue'
import EditParticipantDialog from './EditParticipantDialog.vue'
import { useQuasar } from 'quasar'
import CryptoJS from 'crypto-js'

const $q = useQuasar()

const participantStore = useParticipantStore()
const utilStore = useUtilStore()
const componentStore = useComponentStore()
const qrCodeValue = ref('')

const encodedUserName = ref('')
// const userName = 'RENI.WULANDARI'

// const encodeUsername = (username) => {
//   const secretKey = process.env.SECRET_KEY
//   const encryptedUserName = CryptoJS.AES.encrypt(
//     username,
//     secretKey
//   ).toString()
//   return btoa(encryptedUserName)
// }
// const onClickGenerateQrCode = (username) => {
//   const encodedUserName = encodeUsername(username)

//   const url = `${window.location.origin}/profile/${encodedUserName}`
//   qrCodeValue.value = url
//   $q.dialog({
//     component: QrCodeDialog,
//     componentProps: {
//       qrCodeValue: url
//     }
//   })
// }

const onClickParticipantDetail = async (username) => {
  const encodedUserName = utilStore.encodeUsername(username)
  // await participantStore.getParticipantProfileByUserName(encodedUserName)
  const participantDetailDialog = $q.dialog({
    component: ParticipantDetailDialog,
    componentProps: {
      username: encodedUserName
    }
  })
  participantDetailDialog.update()
}

const onEditParticipant = async (data) => {
  // const encodedUserName = utilStore.encodeUsername(username)
  // await participantStore.editParticipant(data)

  $q.dialog({
    component: EditParticipantDialog,
    componentProps: {
      data
    }
  })
}

const onDeleteParticipant = (id) => {
  if (!id) {
    console.error('onDeleteParticipant: id is null or undefined')
    return
  }

  $q.dialog({
    title: 'Delete Confirmation',
    message: 'All data related to this participant will be deleted. Are you sure you want to delete this participant?',
    cancel: true,
    persistent: true,
    ok: { color: 'red', label: 'Delete' }

  })
    .onOk(async () => {
      try {
        await participantStore.deleteParticipant(id)
        if (componentStore.searchModels.participants.length) {
          await participantStore.searchParticipantByName(componentStore.searchModels.participants, 1)
        }
        participantStore.participants = []
        await participantStore.getAllParticipants(1)
        // on delete success
        $q.notify({
          color: 'green-4',
          textColor: 'black',
          icon: 'cloud_done',
          message: 'Success'
        })
      } catch (error) {
        console.error('onDeleteParticipant: error deleting participant', error)
        $q.notify({
          color: 'red-4',
          textColor: 'black',
          icon: 'error',
          message: 'Error deleting participant'
        })
      }
    })
}

// const onDeleteParticipant = async (id) => {
//   await participantStore.deleteParticipant(id)
// }

const props = defineProps({
  participants: Object
})

const route = useRoute()

const qrcodeDialog = ref(false)

const onClickGenerateQrCode = (username) => {
  const encodedUserName = utilStore.encodeUsername(username)

  const url = `${window.location.origin}/profile/${encodedUserName}`
  $q.dialog({
    component: QrCodeDialog,
    componentProps: {
      qrCodeValue: url
    }
  })
}
</script>

<style lang="scss" scoped>
.q-dialog__backdrop.fixed-full {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px);
}

.glass {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.301);
  border-radius: 20px;
  border: 1px solid rgba(14, 13, 13, 0.125);
}
</style>
