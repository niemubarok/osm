<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">
    <div class="flex justify-center items-center full-width">

      <q-card style="width:fit-content; height: fit-content"
        :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 30dvw;'">
        <div>
          <q-avatar v-close-popup size="25px" font-size="20px" color="grey-9" text-color="white" icon="close"
            class="absolute-top-right z-top q-ma-sm cursor-pointer" />
        </div>
        <q-card-section class="flex justify-center content-center full-width full-height ">
          <q-responsive :ratio="1" class="col">
            <div ref="qrCodeRef" class="flex justify-center items-center relative">
              <!-- <LogoSBIWithoutText class="absolute-center bg-white" style="width: 20%;" /> -->

              <QrCodeComponent :value="qrCodeValue" class="full-width" />
            </div>
          </q-responsive>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn icon-right="open_in_new" color="primary" text-color="dark" label="Go to profile page"
            :href="qrCodeValue" target="_blank" />
          <q-btn icon-right="download" color="primary" text-color="dark" label="Download QRCode"
            @click="downloadQrCode" />

          <!-- <q-btn flat label="Action 2" /> -->
        </q-card-actions>
      </q-card>
    </div>

  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import { nextTick, onUpdated, ref } from 'vue'
import html2canvas from 'html2canvas'
import { useUtilStore } from 'src/stores/util-store'
import LogoSBI from './LogoSBI.vue'
import LogoSBIWithoutText from './LogoSBIWithoutText.vue'

const utilStore = useUtilStore()

const props = defineProps({
  qrCodeValue: String
})
const qrCodeRef = ref(null)

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])
onUpdated(() => {
  console.log('qrCodeRef onUpdated:', qrCodeRef.value)
})
const { dialogRef } = useDialogPluginComponent()

const downloadQrCode = () => {
  console.log('🚀 ~ html2canvas ~ qrCodeRef.value?.$el:', qrCodeRef.value)
  const decodedUserName = utilStore.decodeUsername(props.qrCodeValue.split('/').pop())
  nextTick(() => {
    html2canvas(qrCodeRef.value).then(canvas => {
      const link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = `${decodedUserName}.png`
      link.click()
    })
  })
}
</script>

<style scoped>
:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
</style>
