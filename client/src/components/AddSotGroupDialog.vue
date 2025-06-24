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

        <q-form @submit="onSubmit" @reset="onReset">
          <q-card-section>
            <!-- <q-input label-color="black" outlined v-model="models.participant.FullName" label="Full Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <select-with-add-button label="Location" v-model="models.attendant.ZRef_LocationId"
              :options="locationOptions" :new-option="locationOptions" @add-new="onAddNewMeetingSeat"
              @filter="onFilterMeetingSeats" no-options-message="No Location Available" class="q-mb-md" />

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

            <RequiredInputComponent label="Bus Code" v-model="models.observer.VehicleCode" class="q-mt-md" />

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

            <q-select outlined v-model="models.observer.ParticipantId" :options="observerOptions"
              option-value="ParticipantId" option-label="FullName" emit-value map-options use-input use-chips multiple
              stack-label label="Observers" @filter="onFilterObserverOptions" hint="Choose Multiple Observers"
              behavior="dialog" />

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
    } else {
      const needle = val.toLowerCase()
      observerOptions.value = observerOptions.value.filter(v => v.FullName.toLowerCase().indexOf(needle) > -1)
      // if (observerOptions.value.length < 1) {
      //   newVehicleOptions.value.Name = val
      // }
    }
  })
}

const models = ref({
  attendant: {
    ZRef_LocationId: '',
    Attendant1_EmployeeName: '',
    Attendant1_PhoneNumber: '',
    Attendant1_Picture: null,
    Attendant2_EmployeeName: '',
    Attendant2_PhoneNumber: '',
    Attendant2_Picture: null,
    Notes: '',
    CLSR_Observation: ''
  },
  observer: {
    ParticipantId: [],
    VehicleCode: ''
  }
})

const selectWithAddButtonRef = ref(null)

const companyOptions = ref([])
const meetingSeatsOptions = ref([])
const vehicleOptions = ref([])

const newVehicleOptions = ref({
  Code: '',
  PlatNumber: '',
  DriverName: '',
  DriverPhone: ''
})

const newMeetingSeatOptions = ref({
  SeatCode: '',
  SeatPosition: ''
})

const onAddNewMeetingSeat = async () => {
  await settingStore.addMeetingSeat(newMeetingSeatOptions.value)
  meetingSeatsOptions.value.push(newMeetingSeatOptions.value)
  newMeetingSeatOptions.value = {
    SeatCode: '',
    SeatPosition: ''
  }
}

const onFilterMeetingSeats = (val, update) => {
  update(async () => {
    if (val === '') {
      meetingSeatsOptions.value = await settingStore.getMeetingSeats()
    } else {
      const needle = val.toLowerCase()
      meetingSeatsOptions.value = meetingSeatsOptions.value.filter(v => v.SeatCode.toLowerCase().indexOf(needle) > -1)
      if (meetingSeatsOptions.value.length < 1) {
        newMeetingSeatOptions.value.SeatCode = val
      }
    }
  })
}

const newCompanyOption = ref({
  Code: '',
  Name: ''
})

const onAddNewCompany = async (data) => {
  if (data.Code === '' || data.Name === '') {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Please fill company code and name'
    })
    return
  }
  await settingStore.addCompany(newCompanyOption.value)
  companyOptions.value.push(newCompanyOption.value)
  // newCompanyOption.value = {
  //   Code: '',
  //   Name: ''
  // }
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Company added'
  })
}

const onFilterCompanies = (val, update) => {
  update(async () => {
    if (val === '') {
      companyOptions.value = await settingStore.getCompanies()
    } else {
      const needle = val.toLowerCase()
      companyOptions.value = companyOptions.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
      if (companyOptions.value.length < 1) {
        newCompanyOption.value.Name = val
      }
    }
  })
}

const onFilterVehicles = (val, update) => {
  update(async () => {
    if (val === '') {
      vehicleOptions.value = await settingStore.getVehicles()
    } else {
      const needle = val.toLowerCase()
      vehicleOptions.value = vehicleOptions.value.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
      if (vehicleOptions.value.length < 1) {
        newVehicleOptions.value.Name = val
      }
    }
  })
}

const onAddNewVehicle = async () => {
  await settingStore.addVehicle(newVehicleOptions.value)
  vehicleOptions.value.push(newVehicleOptions.value)
  newVehicleOptions.value = {
    Name: ''
  }
}

onMounted(async () => {
  // companies.value = await settingStore.getCompanies()
  // meetingSeatsOptions.value = await settingStore.getMeetingSeats()
})

const { dialogRef } = useDialogPluginComponent()

const emit = defineEmits(['save', 'hide'])

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
      Notes: '',
      CLSR_Observation: ''
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

    models.value.attendant.Attendant1_Picture = attendant1PictureBase64
    models.value.attendant.Attendant2_Picture = attendant2PictureBase64
    await sotStore.addSotGroup(models.value)
    await sotStore.getSotGroupList()
    onReset()
    // emit('save', models.value)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'SOT group added successfully!'
    })
    dialogRef.value.hide()
  } catch (error) {
    console.error('Error while adding participant:', error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error while adding participant, make sure all required fields are filled!'
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
