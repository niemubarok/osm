<template>
  <div v-if="sotStore.src !== ''" class="relative-position"
    :style="$q.screen.lt.md ? 'width: 100dvw;height:100%' : 'width: 60dvw;margin:0 auto'">
    <!-- <q-btn round dense color="red" icon="close" @click="onClickCancel" class="absolute-top-right z-top q-ma-md" /> -->
    <q-img :src="sotStore.src" spinner-color="primary" spinner-size="82px" class="fixed-top-center q-mt-md" />
    <!-- <q-card-section> -->
    <div class="bg-black-semi-transparent q-pa-md  flex justify-center fixed-bottom">
      <div class="column" :style="!$q.screen.lt.sm ? 'width:50dvw' : 'width:100dvw'">

        <q-input v-model="sotStore.Description" type="textarea" :rows="5" color="black" label="Description" autofocus
          autogrow class=" q-px-md q-mb-sm bg-white rounded-borders " clearable @clear="onClearDescription">

          <template v-slot:append>
            <q-btn v-if="!isListening" flat dense color="primary" text-color="black" icon="mic"
              @click="startListening" />
            <q-btn v-else flat dense color="primary" text-color="black" icon="stop" @click="stop" />

            <q-popup-proxy v-if="isListening" :offset="[10, 10]">
              <q-card>
                <q-card-section>
                  <div class="text-subtitle2">Transcript:</div>
                  <div>{{ phrases }}</div>
                </q-card-section>
              </q-card>
            </q-popup-proxy>

          </template>

        </q-input>

        <!-- CLSR -->
        <q-chip size="lg" square clickable :color="sotStore.Description === null ? 'grey-8' : 'positive'"
          text-color="black" @click="onCLSRClick" class="q-py-md q-pr-md  glossy rounded-borders full-width shadow-2 "
          :disable="sotStore.Description === '' || sotStore.Description === null">
          <div v-if="sotStore.ClsrId" class="relative-position ">
            <q-img square width="40px" :src="clsrImage" fit="contain" style="margin-left: -10px;" class="q-mr-sm">
            </q-img>
            <q-badge size="xs" color="grey-10" label="CLSR"
              style="font-size: xx-small;margin-top: -10px;margin-left: -15px;" class="absolute-top-left" />
          </div>
          <span class="text-body2 full-width text-weight-bolder " :class="clsrName ? 'text-left' : 'text-center'">

            {{
              clsrName
                ? clsrName :
                'Choose CLSR'
            }}
          </span>
        </q-chip>

        <q-btn-toggle v-model="sotStore.IsSafe" push glossy
          :toggle-color="sotStore.IsSafe === 1 ? 'green-10' : 'negative'" color="grey-3" text-color="grey-8"
          toggle-text-color="white" :options="[
            { label: 'safe', value: 1, slot: 'safe', class: 'col-6' },
            { label: 'unsafe', value: 0, slot: 'unsafe', class: 'col-6 ' },
          ]" size="md" class="q-my-sm full-width rounded-borders">
          <template v-slot:safe>
            <q-tooltip>safe</q-tooltip>
          </template>

          <template v-slot:unsafe>
            <q-tooltip>unsafe</q-tooltip>
          </template>

        </q-btn-toggle>
        <div class="flex row full-width justify-between">

          <q-btn square dense label="Cancel" color="grey-8" text-color="black" icon="close" @click="onClickCancel"
            class="rounded-borders q-py-sm col-3" />
          <q-btn square glossy label="Submit"
            :color="sotStore.Description === null || sotStore.IsSafe === null || sotStore.ClsrId === null || sotStore.ClsrId === '' ? 'grey-8' : 'positive'"
            text-color="black" icon="save" @click="onSubmit" class="rounded-borders q-py-sm col-6"
            :disable="sotStore.Description === '' || sotStore.Description === null || sotStore.IsSafe === null || sotStore.ClsrId === null || sotStore.ClsrId === ''">
            <q-tooltip v-if="sotStore.Description === '' || sotStore.Description === null"
              content-style="font-size: 12px" class="bg-red">
              Please Fill Description
            </q-tooltip>
            <q-tooltip v-if="sotStore.IsSafe === null" content-style="font-size: 12px" class="bg-red">
              Please Select Safe or Unsafe
            </q-tooltip>
            <q-tooltip v-if="sotStore.ClsrId === null || sotStore.ClsrId === ''" content-style="font-size: 12px"
              class="bg-red">
              Please Select Clsr
            </q-tooltip>

          </q-btn>

        </div>
      </div>

      <!-- <div class="column justify-center q-ml-sm">

      </div> -->

    </div>
    <!-- </q-card-section> -->
  </div>
  <div class="flex items-center justify-center " style="height: 100dvh;" v-else>

    <CameraComponent ref="cameraRef" />
  </div>

  <q-dialog v-model="clsrDialogModel" class="z-top" maximized>
    <q-card class="bg-grey-8 q-pa-sm full-width" style="height: 100dvh;">
      <q-banner inline-actions class="bg-primary text-black">
        Choose CLSR
        <template v-slot:action>
          <q-btn dense flat :color="listStyle === 'grid' ? 'black' : 'grey-8'" icon="view_cozy"
            @click="listStyle = 'grid'" />
          <q-btn dense flat :color="listStyle === 'list' ? 'black' : 'grey-8'" icon="list" @click="listStyle = 'list'"
            class="q-ml-sm" />
        </template>
      </q-banner>
      <div class="flex justify-center q-gutter-sm ">
        <q-list v-if="listStyle === 'list'" dense class="bg-grey-8" style="width: 100%;height: fit-content;">
          <q-item v-for="clsr in clsrContent" :key="clsr.Id" class="q-pa-sm" :style="{ 'background-color': clsr.color }"
            clickable v-ripple @click="onSelectClsr(clsr)">

            <q-item-section avatar>
              <!-- <div class="rounded-borders q-ma-xs bg-primary text-weight-bolder text-center" style="width: 40px;"> -->
              <q-img :src="clsr.image" fit="contain"></q-img>
              <!-- </div> -->
              <q-separator />
            </q-item-section>
            <q-item-section>
              <q-item-label caption style="font-size: 12px">{{ clsr.Name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="flex justify-center q-gutter-sm ">
          <template v-for="clsr in clsrContent" :key="clsr.Id">
            <div>
              <q-card style="width:70px;height: 100px;" :style="{ 'background-color': clsr.color }"
                class="q-pa-sm items-center text-center justify-center  cursor-pointer" @click="onSelectClsr(clsr)">

                <!-- <q-card-section> -->
                <div>

                  <q-chip square color="primary" class="text-weight-bolder" :label="clsr.Id" />
                </div>
                <div class="" style="font-size: xx-small">{{ clsr.Name
                  }}</div>
                <!-- </q-card-section> -->
              </q-card>
            </div>

          </template>
        </div>
      </div>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { useSpeechRecognition } from '@vueuse/core'
import CameraComponent from './CameraComponent.vue'
import { useSotStore } from 'src/stores/sot-store'
import { inject, onMounted, ref, watch } from 'vue'
import { useComponentStore } from 'src/stores/component-store'

const sotStore = useSotStore()
const cameraRef = ref(null)
const clsrDialogModel = ref(false)
const listStyle = ref('list')
const clsrName = ref('')
const clsrImage = ref('')
const componentStore = useComponentStore()

const onClickCancel = () => {
  // camera
  sotStore.ImageData = ''
  sotStore.src = ''
  sotStore.Description = ''
  sotStore.IsSafe = null
  sotStore.showCamera = false
  sotStore.ClsrId = null
  clsrName.value = ''
  componentStore.showHeader = true
}

// const clsrContent = ref([
//   {
//     label: 'Pekerjaan dilakukan sesuai prosedur',
//     value: 1
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan APD',
//     value: 2
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan peralatan yang sesuai',
//     value: 3
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan bahan yang sesuai',
//     value: 4
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan cara yang sesuai',
//     value: 5
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan waktu yang sesuai',
//     value: 6
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan tenaga yang sesuai',
//     value: 7
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan peralatan yang sesuai',
//     value: 8
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan bahan yang sesuai',
//     value: 9
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan cara yang sesuai',
//     value: 10
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan waktu yang sesuai',
//     value: 11
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan tenaga yang sesuai',
//     value: 12
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan peralatan yang sesuai',
//     value: 13
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan bahan yang sesuai',
//     value: 14
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan cara yang sesuai',
//     value: 15
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan waktu yang sesuai',
//     value: 16
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan tenaga yang sesuai',
//     value: 17
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan peralatan yang sesuai',
//     value: 18
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan bahan yang sesuai',
//     value: 19
//   },
//   {
//     label: 'Pekerjaan dilakukan dengan menggunakan cara yang sesuai',
//     value: 20
//   }
// ])

const lang = ref('id-ID')

const {
  isSupported,
  isListening,
  isFinal,
  result,
  start,
  stop

} = useSpeechRecognition({ lang, continuous: true, interimResults: true, maxAlternatives: 1 })

const descriptionModel = ref('')
const phrases = ref([])

watch(result, (newResult) => {
  // if (result.value !== newResult) {
  console.log('🚀 ~ watch ~ phrases.value.length:', phrases.value)
  phrases.value = newResult
  // }
})

watch(isListening, (newIsListening) => {
  if (newIsListening) {
    console.log('🚀 ~ watch ~ isListening:', isListening.value)
  } else {
    // if (Array.isArray(sotStore.Description)) {
    //   sotStore.Description.push(phrases.value)
    //   sotStore.Description = sotStore.Description.join('\n')
    // } else {
    sotStore.Description = sotStore.Description !== '' ? sotStore.Description + '\n' + [phrases.value] : [phrases.value]
    phrases.value = []
    // }
  }
})

const startListening = () => {
  // phrases.value.push(sotStore.Description)
  start()
}

const onClearDescription = () => {
  sotStore.Description = ''
  phrases.value = []
}

const clsrContent = ref([])
const onSelectClsr = (value) => {
  sotStore.ClsrId = value.Id
  clsrName.value = value.Name
  clsrImage.value = value.image
  clsrDialogModel.value = false
}
const Colors = [
  '#FFFFFF',
  '#FFFFF0',
  '#FFF0F0',
  '#FFF5CC',
  '#FFE4E1',
  '#FFF2CC',
  '#FFE0B2',
  '#FFF8DC',
  '#FFE4C4',
  '#FFECB3',
  '#FFF0F5',
  '#FFF2F2',
  '#FFF0FF',
  '#FFF8F8',
  '#FFF2F5',
  '#FFF7F7',
  '#FFF3F3',
  '#FFF6F6',
  '#FFF9F9',
  '#FFFAFA'
]

const onCLSRClick = async () => {
  clsrContent.value = await sotStore.getClsrList()
  clsrContent.value = clsrContent.value.map((item) => {
    return {
      ...item,
      color: Colors[item.Id - 1],
      image: `/images/clsr/${item.Id}.png`
    }
  })
  clsrDialogModel.value = true
}

// const randomColor = () => {
//   const lightColors = [
//     '#FFFFFF',
//     '#FFFFF0',
//     '#FFF0F0',
//     '#FFF5CC',
//     '#FFE4E1',
//     '#FFF2CC',
//     '#FFE0B2',
//     '#FFF8DC',
//     '#FFE4C4',
//     '#FFECB3',
//     '#FFF0F5',
//     '#FFF2F2',
//     '#FFF0FF',
//     '#FFF8F8',
//     '#FFF2F5',
//     '#FFF7F7',
//     '#FFF3F3',
//     '#FFF6F6',
//     '#FFF9F9',
//     '#FFFAFA'
//   ]

//   lightColors
//   return lightColors[clsr.Id]
// }

const onSubmit = async () => {
  await sotStore.addSotFinding()
  await sotStore.getSotFindingsById()
  // sotStore.Description = sotStore.Description.join(' ')
  onClickCancel()
}

onMounted(async () => {

})

</script>

<style scoped>
.q-input ::v-deep .q-field__native {
  white-space: pre-wrap;
}
</style>
