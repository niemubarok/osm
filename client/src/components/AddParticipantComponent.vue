<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">
    <div class="flex justify-center items-center q-pt-sm">
      <q-card style="width:fit-content; height: fit-content"
        :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 50dvw;'">

        <q-banner class="bg-primary text-black ">
          <div class="text-h6 flex row justify-between">Add Participant

            <q-btn round size="sm" icon="close" color="grey-9" v-close-popup />
          </div>
        </q-banner>

        <q-form @submit="onSubmit" @reset="onReset">
          <q-card-section>
            <!-- <q-input label-color="black" outlined v-model="models.participant.FullName" label="Full Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <RequiredInputComponent autofocus label="Full Name" v-model="models.participant.FullName" />

            <RequiredInputComponent label="Position Name" v-model="models.participant.PositionName" />

            <!-- <q-input label-color="black" outlined v-model="models.participant.PositionName" label="Position Name"
              lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']" /> -->
            <!-- <q-input label-color="black" outlined v-model="models.participant.Email" label="Email" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <RequiredInputComponent label="Email" v-model="models.participant.Email" />
            {{ models.participant.CompanyId }}
            <select-with-add-button label="Company Name" v-model="models.participant.CompanyId"
              :options="companyOptions" option-value="id" option-label="Name" :new-option="newCompanyOption"
              @add-new="onAddNewCompany" @filter="onFilterCompanies" class="q-mb-sm" required />

            <RequiredInputComponent label="Unit" v-model="models.participant.Unit" />
            <!-- <q-input label-color="black" outlined v-model="models.participant.Unit" label="Unit" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" class="q-mt-md" /> -->

            <!-- <q-input label-color="black" outlined v-model="models.participant.PhoneNumber" label="Phone Number"
              lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <RequiredInputComponent label="Phone Number" v-model="models.participant.PhoneNumber" />
            <RequiredInputComponent label="User Name" v-model="models.participant.UserName" />

            <!-- <q-input label-color="black" outlined v-model="models.participant.UserName" label="User Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <select-with-add-button label="Meeting Seat" v-model="models.MeetingSeatId" :options="meetingSeatsOptions"
              option-value="Id" option-label="SeatCode" :new-option="newMeetingSeatOptions"
              @add-new="onAddNewMeetingSeat" @filter="(val, update) => onFilterMeetingSeats(val, update)"
              no-options-message="No Meeting Seat Available" :with-add-button="false" />
          </q-card-section>
          <q-banner class="bg-grey-2">
            Flight Arrival
          </q-banner>
          <q-card-section class="q-gutter-y-sm">
            <q-input label-color="black" outlined v-model="models.accomodations.Arrival_FlightName"
              label="Arrival Flight Name" />

            <q-input label-color="black" outlined v-model="models.accomodations.Arrival_FlightDate"
              label="Arrival Flight Date" type="date" />

            <q-input label-color="black" outlined v-model="models.accomodations.Arrival_PickupTime"
              label="Arrival Pickup Time" type="time" />

          </q-card-section>
          <q-banner class="bg-grey-2">
            Flight Departure
          </q-banner>
          <q-card-section class="q-gutter-y-sm">
            <select-with-add-button label="Vehicle" v-model="models.VehicleId" :options="vehicleOptions"
              option-value="Id" :emit-value="true" option-label="DriverName" :new-option="newVehicleOptions"
              @add-new="onAddNewVehicle" @filter="onFilterVehicles" :custom-option="true" class="q-mb-md" />

            <q-input label-color="black" outlined v-model="models.accomodations.Departure_FlightName"
              label="Departure Flight Name" />

            <q-input label-color="black" outlined v-model="models.accomodations.Departure_FlightDate"
              label="Departure Flight Date" type="date" />

            <q-input label-color="black" outlined v-model="models.accomodations.Departure_PickupTime"
              label="Departure Pickup Time" type="time" />

          </q-card-section>
          <q-banner class="bg-grey-2">
            Hotel
          </q-banner>
          <q-card-section class="q-gutter-y-sm">

            <q-input label-color="black" outlined v-model="models.accomodations.Hotel_Name" label="Hotel Name" />

            <q-input label-color="black" outlined v-model="models.accomodations.Hotel_CheckInTime"
              label="Hotel Check In Time" type="time" />

            <q-input label-color="black" outlined v-model="models.accomodations.Hotel_CheckOutTime"
              label="Hotel Check Out Time" type="time" />

            <q-input label-color="black" outlined v-model="models.accomodations.Hotel_RoomNumber"
              label="Hotel Room Number" />
          </q-card-section>
          <q-card-actions align="right">
            <div class="q-pa-md">
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

const settingStore = useSettingsStore()
const participantStore = useParticipantStore()

const $q = useQuasar()
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})

const models = ref({

  participant: {
    FullName: '',
    PositionName: '',
    Email: '',
    CompanyId: '',
    Unit: '',
    PhoneNumber: '',
    UserName: ''
  },

  MeetingSeatId: '',
  VehicleId: '',
  accomodations: {
    Departure_FlightName: '',
    Departure_FlightDate: '',
    Departure_PickupTime: '',
    Arrival_FlightName: '',
    Arrival_FlightDate: '',
    Arrival_PickupTime: '',
    Hotel_Name: '',
    Hotel_CheckInTime: '',
    Hotel_CheckOutTime: '',
    Hotel_RoomNumber: ''
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
      vehicleOptions.value = vehicleOptions.value.filter(v => v.DriverName?.toLowerCase().indexOf(needle) > -1)
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
  meetingSeatsOptions.value = await settingStore.getMeetingSeats()
})

const { dialogRef } = useDialogPluginComponent()

const emit = defineEmits(['save', 'hide'])

const editedItem = ref({
  ...props.data
})

const onSubmit = async () => {
  if (!models.value) {
    console.error('models.value is null or undefined')
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Fill all required fields'
    })
    return
  }

  const requiredFields = [
    { field: 'FullName', label: 'Full Name' },
    { field: 'PositionName', label: 'Position Name' },
    { field: 'Email', label: 'Email' },
    { field: 'CompanyId', label: 'Company' },
    { field: 'Unit', label: 'Unit' },
    { field: 'PhoneNumber', label: 'Phone Number' },
    { field: 'UserName', label: 'User Name' }
  ]

  const missingFields = requiredFields.filter(field => !models.value.participant[field.field])

  if (missingFields.length > 0) {
    const missingFieldsLabels = missingFields.map(field => field.label)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `Fill all required fields: ${missingFieldsLabels.join(', ')}`
    })
    return
  }

  try {
    await participantStore.addParticipant(models.value)
    participantStore.participants = []
    await participantStore.getAllParticipants(1)
    emit('save', models.value)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Participant added'
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

const onReset = () => {
  models.value = {
    ...props.data
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
