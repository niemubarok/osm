<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">
    <div class="flex justify-center items-center q-pt-sm">
      <q-card style="width:fit-content; height: fit-content"
        :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 50dvw;'">

        <q-banner class="bg-primary text-black ">
          <div class="text-h6 flex row justify-between">Add SOT Group

            <q-btn round size="sm" icon="close" color="grey-9" v-close-popup />
          </div>
        </q-banner>
        <!-- {{ data }} -->
        <q-form @submit="onSubmit" @reset="onReset">
          <q-card-section>
            <!-- <q-input label-color="black" outlined v-model="models.participant.FullName" label="Full Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->
            <select-with-add-button label="Location" v-model="models.attendant.Location" :options="locationOptions"
              :new-option="locationOptions" no-options-message="No Location Available" class="q-mb-md" emit-value />

            <RequiredInputComponent label="Attendant 1 Name" v-model="models.attendant.Attendant1_EmployeeName" />

            <RequiredInputComponent label="Attendant 1 Phone Number"
              v-model="models.attendant.Attendant1_PhoneNumber" />

            <q-input type="file" stack-label label-color="black" outlined v-model="models.attendant.Attendant1_Picture"
              label="Attendant 1 Picture" accept=".jpg, .jpeg, .png" class="q-mb-md">
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>

            <RequiredInputComponent label="Attendant 2 Name" v-model="models.attendant.Attendant2_EmployeeName" />

            <RequiredInputComponent label="Attendant 2 Phone Number"
              v-model="models.attendant.Attendant2_PhoneNumber" />

            <q-input type="file" stack-label label-color="black" outlined v-model="models.attendant.Attendant2_Picture"
              label="Attendant 2 Picture" accept=".jpg, .jpeg, .png">
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>

            <q-editor v-model="models.attendant.Notes" min-height="5rem" class="q-my-md" :toolbar="[
              ['title'],
              ['unordered'],

              ['undo', 'redo'],]">
              <template v-slot:title>
                <q-chip square class="q-mr-xl bg-transparent">
                  Hazard / Risk
                </q-chip>
              </template>
            </q-editor>

            <q-editor v-model="models.attendant.CLSR_Observation" min-height="5rem" class="q-my-md" :toolbar="[
              ['title'],
              ['unordered'],

              ['undo', 'redo'],]">
              <template v-slot:title>
                <q-chip square class="q-mr-xl bg-transparent">
                  CLSR Obsertation
                </q-chip>
              </template>
            </q-editor>

            <RequiredInputComponent label="Bus Code" v-model="models.VehicleCode" class="q-mt-md" />
            <q-select outlined v-model="models.observer" :options="observerOptions" option-value="ObserverId"
              option-label="ObserverName" use-input use-chips multiple stack-label label="Observers"
              @filter="onFilterObserverOptions" hint="Choose Multiple Observers" behavior="dialog"
              @update:model-value="onSelectObserver" />
          </q-card-section>
          <q-card-actions align="right">
            <div>
              <q-btn label="Cancel" color="primary" text-color="dark" flat class="q-ml-sm" v-close-popup />
              <q-btn label="Save" type="submit" color="primary" text-color="dark" class="q-ml-sm" />
            </div>
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { ref, defineEmits, onMounted } from 'vue'
import { useSettingsStore } from 'src/stores/settings-store'
import { useParticipantStore } from 'src/stores/participant-store'
import SelectWithAddButton from './SelectWithAddButton.vue'
import RequiredInputComponent from './RequiredInputComponent.vue'
import { useSotStore } from 'src/stores/sot-store'
import { useUtilStore } from 'src/stores/util-store'

const settingStore = useSettingsStore()
const participantStore = useParticipantStore()
const sotStore = useSotStore()
const utilStore = useUtilStore()

const $q = useQuasar()
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})

const onEditorInput = (val) => {
  console.log(val)
}

const locationOptions = ref([
  {
    label: 'Kiln & Preheater NAR1',
    value: 1
  },
  {
    label: 'Kiln & Preheater NAR2',
    value: 2
  },
  {
    label: 'Workshop Heavy Equipment',
    value: 3
  },
  {
    label: 'GreenZone 1 & Lab GZ',
    value: 4
  },
  {
    label: 'Limestone Crusher NAR2',
    value: 5
  },
  {
    label: 'Nathabumi - GreenZone 2',
    value: 6
  },
  {
    label: 'Quarry Operation',
    value: 7
  },
  {
    label: 'Raw Mill NAR2 (Kapur Tohor)',
    value: 8
  },
  {
    label: 'Workshop Maintenance',
    value: 9
  },
  {
    label: 'Procurement Warehouse',
    value: 10
  },
  {
    label: 'Finish Mill NAR1',
    value: 11
  },
  {
    label: 'CCR & Laboratorium',
    value: 12
  },
  {
    label: 'Workshop EVE',
    value: 13
  },
  {
    label: 'Packhouse NAR2',
    value: 14
  },
  {
    label: 'Bag Plant',
    value: 15
  }
])

const observerOptions = ref([])

const onFilterObserverOptions = (val, update) => {
  update(async () => {
    if (val === '') {
      const participant = await participantStore.searchParticipantByName(val)
      observerOptions.value = participant.data
        .filter(v => !models.value.observer.some(o => o.ObserverId === v.ParticipantId))
        .map(v => {
          return { ObserverName: v.FullName, ObserverId: v.ParticipantId }
        })
    } else {
      const needle = val.toLowerCase()
      observerOptions.value = observerOptions.value
        .filter(v => v.ObserverName.toLowerCase().includes(needle))
    }
  })
}

const onSelectObserver = (val) => {
}

const models = ref({
  attendant: {
    Location: {
      value: props.data?.ZRef_LocationId,
      label: props.data?.LocationName
    },
    Attendant1_EmployeeName: props.data?.Attendant1_EmployeeName,
    Attendant1_PhoneNumber: props.data?.Attendant1_PhoneNumber,
    Attendant1_Picture: null,
    Attendant2_EmployeeName: props.data?.Attendant2_EmployeeName,
    Attendant2_PhoneNumber: props.data?.Attendant2_PhoneNumber,
    Attendant2_Picture: null,
    Notes: props.data?.Notes,
    CLSR_Observation: props.data?.CLSR_Observation
  },
  observer: [...props.data?.SotObserver],
  VehicleCode: props.data?.SotObserver[0]?.VehicleCode
})

const selectWithAddButtonRef = ref(null)

onMounted(async () => {
  // companies.value = await settingStore.getCompanies()
  // meetingSeatsOptions.value = await settingStore.getMeetingSeats()
})

const { dialogRef } = useDialogPluginComponent()

const emit = defineEmits(['save', 'hide', 'update:modelValue'])

const onReset = () => {
  models.value = {
    attendant: {
      ZRef_LocationId: '',
      Attendant1_EmployeeName: '',
      Attendant1_PhoneNumber: '',
      Attendant1_Picture: null,
      Attendant2_EmployeeName: '',
      Attendant2_PhoneNumber: '',
      Attendant2_Picture: null,
      Notes: ''
    },
    observer: {
      ParticipantId: [],
      VehicleCode: ''
    }
  }
}
const onSubmit = async () => {
  // if (!models.value) {
  //   console.error('models.value is null or undefined')
  //   $q.notify({
  //     color: 'red-5',
  //     textColor: 'white',
  //     icon: 'warning',
  //     message: 'Fill all required fields'
  //   })
  //   return
  // }
  // const requiredFields = [
  //   { field: 'attendant.FullName', label: 'Full Name' },
  //   { field: 'attendant.PositionName', label: 'Position Name' },
  //   { field: 'attendant.Email', label: 'Email' },
  //   { field: 'attendant.CompanyId', label: 'Company' },
  //   { field: 'attendant.Unit', label: 'Unit' },
  //   { field: 'attendant.PhoneNumber', label: 'Phone Number' },
  //   { field: 'attendant.UserName', label: 'User Name' }
  // ]

  // const missingFields = requiredFields.filter(field => !models.value[field.field])

  // if (missingFields.length > 0) {
  //   const missingFieldsLabels = missingFields.map(field => field.label)
  //   $q.notify({
  //     color: 'red-5',
  //     textColor: 'white',
  //     icon: 'warning',
  //     message: `Fill all required fields: ${missingFieldsLabels.join(', ')}`
  //   })
  //   return
  // }

  try {
    let attendant1PictureBlob = null
    let attendant2PictureBlob = null

    try {
      if (models.value?.attendant?.Attendant1_Picture?.[0]) {
        const blobParts = models.value.attendant.Attendant1_Picture[0] instanceof Blob
          ? [models.value.attendant.Attendant1_Picture[0]]
          : models.value.attendant.Attendant1_Picture[0]
        attendant1PictureBlob = new Blob(blobParts, { type: 'image/png' })
      }
    } catch (error) {
      console.error('Error slicing Attendant1_Picture', error)
    }

    try {
      if (models.value?.attendant?.Attendant2_Picture?.[0]) {
        const blobParts = models.value.attendant.Attendant2_Picture[0] instanceof Blob
          ? [models.value.attendant.Attendant2_Picture[0]]
          : models.value.attendant.Attendant2_Picture[0]
        attendant2PictureBlob = new Blob(blobParts, { type: 'image/png' })
      }
    } catch (error) {
      console.error('Error slicing Attendant2_Picture', error)
    }

    let attendant1PictureBase64 = ''
    let attendant2PictureBase64 = ''

    try {
      if (attendant1PictureBlob) {
        attendant1PictureBase64 = await utilStore.blobToBase64(attendant1PictureBlob)
      }
    } catch (error) {
      console.error('Error converting Attendant1_Picture to base64', error)
    }

    try {
      if (attendant2PictureBlob) {
        attendant2PictureBase64 = await utilStore.blobToBase64(attendant2PictureBlob)
      }
    } catch (error) {
      console.error('Error converting Attendant2_Picture to base64', error)
    }

    if (models.value.attendant.Attendant1_Picture !== null) {
      models.value.attendant.Attendant1_Picture = attendant1PictureBase64
    }
    if (models.value.attendant.Attendant2_Picture !== null) {
      models.value.attendant.Attendant2_Picture = attendant2PictureBase64
    }

    const dataToUpdate = {
      attendant: {
        ZRef_LocationId: models.value.attendant.Location.value,
        Attendant1_EmployeeName: models.value.attendant.Attendant1_EmployeeName,
        Attendant1_PhoneNumber: models.value.attendant.Attendant1_PhoneNumber,
        Attendant1_Picture: models.value.attendant.Attendant1_Picture,
        Attendant2_EmployeeName: models.value.attendant.Attendant2_EmployeeName,
        Attendant2_PhoneNumber: models.value.attendant.Attendant2_PhoneNumber,
        Attendant2_Picture: models.value.attendant.Attendant2_Picture,
        Notes: models.value.attendant.Notes,
        CLSR_Observation: models.value.attendant.CLSR_Observation
      },

      observer: {
        // SotParticipantId: models.value.observer[0]?.SotParticipantId,
        ParticipantId: models.value.observer.map((observer) => observer?.ObserverId),
        VehicleCode: models.value?.VehicleCode
      }
    }
    await sotStore.updateSotGroup(props.data?.SotId, dataToUpdate)
    await sotStore.getSotGroupList()
    onReset()
    // emit('save', models.value)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'SOT group edited successfully!'
    })
    dialogRef.value.hide()
  } catch (error) {
    console.error('Error while adding participant:', error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `Error while adding participant, ${error}`
    })
  }
}

const show = () => {
  dialogRef.value.show()
}

const onDialogHide = () => {
  emit('hide')
}

</script>

<style scoped>
:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
</style>
