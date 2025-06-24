<template>

  <!-- <Camera ref="camera" :resolution="resolution" autoplay @loading="onLoading" @error="onError" :playsinline="true"
    class="full-width " /> -->
  <!-- <CameraJebreet ref="camera" facingModeCamera="environment" custom :size="100">

  </CameraJebreet> -->

  <!-- <div v-for="camera of cameras" :key="camera.deviceId" class="px-2 py-1 cursor-pointer"
    :class="{ 'text-primary': currentCamera === camera.deviceId }" @click="currentCamera = camera.deviceId">
    {{ camera.label }}
  </div> -->

  <video ref="video" muted autoplay style="height: 100dvh" />

  <!-- <q-page-sticky position="bottom" expand> -->
  <div class="fixed-bottom flex justify-center bg-black-semi-transparent full-width q-pa-md">
    <q-btn round size="xl" dense icon="camera" text-color="black" color="primary" @click="onSnapshot" class="text-h5 ">
      <q-tooltip>
        Take Photo

      </q-tooltip>
    </q-btn>

    <q-page-sticky position="bottom-left" :offset="[18, 18]" expand>

      <q-btn flat icon="arrow_back" text-color="primary" color="primary" @click="onCancel" class="text-h6 " />
      <q-tooltip>
        Cancel

      </q-tooltip>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" expand>

      <q-btn flat icon="switch_camera" text-color="primary" color="primary" @click="switchCamera" class="text-h6 " />
      <q-tooltip>
        Switch Camera

      </q-tooltip>
    </q-page-sticky>
  </div>
  <!-- </q-page-sticky> -->

  <template v-if="isLoading">
    <div class="flex column flex-center " style="height: 80dvh; width: 100dvw">
      <q-spinner-cube color="primary" size="4em" />
      <div class="q-mt-md">Loading Camera...</div>
    </div>
  </template>

  <!-- <q-page-sticky position="bottom-center" :offset="[18, 18]"> -->

  <!-- </q-page-sticky> -->
</template>

<script setup>
import { useSotStore } from 'src/stores/sot-store'
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import Camera from 'simple-vue-camera'
import CameraJebreet from 'vue3-camera-jebreet'
import { useQuasar } from 'quasar'
import { useDevicesList, useUserMedia } from '@vueuse/core'
import { useComponentStore } from 'src/stores/component-store'

const componentStore = useComponentStore()
const currentCamera = ref(null)
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  // eslint-disable-next-line space-before-function-paren
  onUpdated() {
    const backCamera = cameras.value.find(camera => camera.label.toLowerCase().includes('back'))
    if (backCamera) {
      currentCamera.value = backCamera.deviceId
      console.log('🚀 ~ onUpdated ~ currentCamera.value:', backCamera.deviceId)
    }
    // else {
    //   console.log('available camera')

    //   currentCamera.value = cameras.value[0]?.deviceId
    // }
    // if (!cameras.value.find(i => {
    //   return i.label.toLocaleLowerCase().includes('rear') || i.label.toLocaleLowerCase().includes('back')
    // }))
  }
})

const switchCamera = () => {
  enabled.value = false
  setTimeout(() => {
    const currentCameraId = currentCamera.value
    const newCameraId = cameras.value.find(camera => {
      return camera.deviceId !== currentCameraId
    })
    currentCamera.value = newCameraId.deviceId
    enabled.value = true
  }, 100)
}

const video = ref(null)
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } }
})

watchEffect(() => {
  if (video.value) { video.value.srcObject = stream.value }
})

// watch(currentCamera, (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     const newStream = useUserMedia({
//       constraints: { video: { deviceId: newValue } }
//     })
//     video.value.srcObject = newStream.value
//     enabled.value = true
//   }
// })

const $q = useQuasar()

const sotStore = useSotStore()
const camera = ref(null)

// watch(
//   () => camera.value?.result,
//   (newValue) => {
//     console.log(newValue)
//   }
// )

const onCancel = () => {
  camera.value?.stop()
  sotStore.ImageData = ''
  sotStore.src = ''
  sotStore.Description = ''
  sotStore.IsSafe = null
  sotStore.showCamera = false
  componentStore.showHeader = true
}

const onSnapshot = async () => {
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0)
  const dataURL = canvas.toDataURL()
  sotStore.ImageData = dataURL
  sotStore.src = dataURL
}

const isLoading = ref(true)

// const onError = (error) => {
// }

onUnmounted(() => {
  camera.value?.stop()
})

onMounted(() => {
  const cameraBelakang = cameras.value.find(camera => camera.label.toLowerCase().includes('back'))
  if (cameraBelakang) {
    currentCamera.value = cameraBelakang.deviceId
  }
  setTimeout(() => {
    enabled.value = true
    isLoading.value = false
  }, 1000)
})

</script>
