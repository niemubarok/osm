<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">

    <q-card style="width:fit-content; height: fit-content"
      :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 80dvw;'">
      <div>
        <q-avatar v-close-popup size="25px" font-size="20px" color="grey-9" text-color="white" icon="close"
          class="absolute-top-right z-top q-ma-sm cursor-pointer" />
      </div>

      <q-img :src spinner-color=" primary" spinner-size="82px" />
    </q-card>

  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { onUpdated, ref } from 'vue'
import { useUtilStore } from 'src/stores/util-store'
const props = defineProps({
  src: String
})
const qrCodeRef = ref(null)

defineEmits([
  ...useDialogPluginComponent.emits
])
onUpdated(() => {
  console.log('qrCodeRef onUpdated:', qrCodeRef.value)
})
const { dialogRef } = useDialogPluginComponent()
</script>

<style scoped>
:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
</style>
