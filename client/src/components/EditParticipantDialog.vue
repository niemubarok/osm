<template>
  <q-dialog ref="dialogRef" :maximized="true" content-class="dialog__backdrop">
    <div class="flex justify-center items-center q-pt-sm">
      <q-card style="width:fit-content; height: fit-content"
        :style="$q.screen.lt.sm ? 'width: 100dvw; height: fit-content' : 'width: 50dvw;'">

        <q-banner class="bg-primary text-black ">
          <div class="text-h6 flex row justify-between">Edit Participant

            <q-btn round size="sm" icon="close" color="grey-9" v-close-popup />
          </div>
        </q-banner>

        <q-card-section class="q-pt-md ">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
            <!-- <q-input label-color="black" outlined v-model="editedItem.participant.FullName" label="Full Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <RequiredInputComponent label="Full Name" v-model="editedItem.participant.FullName" />

            <RequiredInputComponent label="Position Name" v-model="editedItem.participant.PositionName" />
            <!-- <q-input label-color="black" outlined v-model="editedItem.participant.PositionName" label="Position Name"
              lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <RequiredInputComponent label="Email" v-model="editedItem.participant.Email" />
            <!-- <q-input label-color="black" outlined v-model="editedItem.participant.Email" label="Email" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <select-with-add-button label="Company Name" v-model="editedItem.participant.Company"
              :options="companyOptions" :emit-value="true" option-label="Name" :new-option="newCompanyOption"
              @add-new="onAddNewCompany" @filter="onFilterCompanies" required />

            <RequiredInputComponent label="Unit" v-model="editedItem.participant.Unit" />
            <!-- <q-input label-color="black" outlined v-model="editedItem.participant.Unit" label="Unit" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <q-input label-color="black" outlined v-model="editedItem.participant.PhoneNumber" label="Phone Number" />

            <RequiredInputComponent label="User Name" v-model="editedItem.participant.UserName" />
            <!-- <q-input label-color="black" outlined v-model="editedItem.participant.UserName" label="User Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" /> -->

            <select-with-add-button label="Meeting Seat" v-model="editedItem.MeetingSeat" :options="meetingSeatsOptions"
              option-label="SeatCode" :new-option="newMeetingSeatOptions" @add-new="onAddNewMeetingSeat"
              @filter="onFilterMeetingSeats" />

            <!-- {{ editedItem.MeetingSeat }} -->

            <select-with-add-button label="Vehicle" v-model="editedItem.Vehicle" :options="vehicleOptions" :emit-value
              option-label="PlatNumber" :new-option="newVehicleOptions" @add-new="onAddNewVehicle"
              @filter="onFilterVehicles" :custom-option="true"
              :prefix="`${editedItem.Vehicle.DriverName} - ${editedItem.Vehicle.DriverPhone} - `" required />
            <!-- {{ editedItem.Vehicle }} -->
            <q-input label-color="black" outlined v-model="editedItem.accomodations.Departure_FlightName"
              label="Departure Flight Name" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Departure_FlightDate"
              label="Departure Flight Date" type="date" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Departure_PickupTime"
              label="Departure Pickup Time" type="time" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Arrival_FlightName"
              label="Arrival Flight Name" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Arrival_FlightDate"
              label="Arrival Flight Date" type="date" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Arrival_PickupTime"
              label="Arrival Pickup Time" type="time" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Hotel_Name" label="Hotel Name" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Hotel_CheckInTime"
              label="Hotel Check In Time" type="time" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Hotel_CheckOutTime"
              label="Hotel Check Out Time" type="time" />

            <q-input label-color="black" outlined v-model="editedItem.accomodations.Hotel_RoomNumber"
              label="Hotel Room Number" />

            <div align="right">
              <q-btn label="Cancel" color="primary" text-color="dark" flat class="q-ml-sm" v-close-popup />
              <q-btn label="Save" type="submit" color="primary" text-color="dark" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
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

// const models = ref({

//   participant: {
//     FullName: '',
//     PositionName: '',
//     Email: '',
//     CompanyId: '',
//     Unit: '',
//     PhoneNumber: '',
//     UserName: ''
//   },

//   MeetingSeatId: '',
//   VehicleId: '',
//   accomodations: {
//     Departure_FlightName: '',
//     Departure_FlightDate: '',
//     Departure_PickupTime: '',
//     Arrival_FlightName: '',
//     Arrival_FlightDate: '',
//     Arrival_PickupTime: '',
//     Hotel_Name: '',
//     Hotel_CheckInTime: '',
//     Hotel_CheckOutTime: '',
//     Hotel_RoomNumber: ''
//   }
// })

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

const editedItem = ref({

  participant: {
    Id: props.data?.ParticipantId,
    FullName: props.data?.FullName,
    PositionName: props.data?.PositionName,
    Email: props.data?.Email,
    Company: {
      Name: props.data?.CompanyName,
      id: props.data?.CompanyId
    },

    Unit: props.data?.Unit,
    PhoneNumber: props.data?.PhoneNumber,
    UserName: props.data?.UserName
  },

  MeetingSeat: {
    Id: props.data?.MeetingSeatId,
    SeatCode: props.data?.SeatCode,
    SeatPosition: props.data?.SeatPosition
  },
  Vehicle: {
    Id: props.data?.VehicleId,
    DriverName: props.data?.DriverName,
    DriverPhone: props.data?.DriverPhone,
    PlatNumber: props.data?.PlatNumber
  },
  accomodations: {
    VehicleId: null,
    Departure_FlightName: props.data?.Departure_FlightName,
    Departure_FlightDate: props.data?.Departure_FlightDate,
    Departure_PickupTime: props.data?.Departure_PickupTime,
    Arrival_FlightName: props.data?.Arrival_FlightName,
    Arrival_FlightDate: props.data?.Arrival_FlightDate,
    Arrival_PickupTime: props.data?.Arrival_PickupTime,
    Hotel_Name: props.data?.Hotel_Name,
    Hotel_CheckInTime: props.data?.Hotel_CheckInTime,
    Hotel_CheckOutTime: props.data?.Hotel_CheckOutTime,
    Hotel_RoomNumber: props.data?.Hotel_RoomNumber
  }
})

onMounted(async () => {
  // companies.value = await settingStore.getCompanies()
  // meetingSeatsOptions.value = await settingStore.getMeetingSeats()
})

const { dialogRef } = useDialogPluginComponent()

const emit = defineEmits(['save', 'hide'])

const onSubmit = async () => {
  if (editedItem.value == null) {
    console.error('Edited item is null or undefined')
    return
  }

  try {
    await participantStore.editParticipant(editedItem.value)
  } catch (error) {
    console.error('Error while editing participant:', error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error while editing participant'
    })
    return
  }
  dialogRef.value.hide()
}

const onReset = () => {
  editedItem.value = {
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
