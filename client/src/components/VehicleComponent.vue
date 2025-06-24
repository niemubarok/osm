<template>
  <q-card flat bordered>
    <!-- <q-card-section> -->
    <!-- <q-banner rounded class="bg-grey-2">Departure</q-banner> -->
    <q-card-section v-if="userStore.hasAccess('VEHICLE_EDIT')" align="right" class="no-padding absolute-top-right"
      style="z-index: 1">
      <q-btn flat color="grey" icon="more_vert" size="sm" dense>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-btn icon="edit" label="Edit" size="sm" color="grey-8" flat round dense
                @click="editVehicleDialog = true" class="q-ma-xs" />
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-btn icon="delete" label="Delete" size="sm" color="red" flat round dense
                @click="onDeleteVehicle(data.Id)" class="q-ma-xs" />
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-card-section>

    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="bus_alert" />
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            Vehicle Code
          </q-item-label>
          <q-item-label>{{ data?.Code || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="person" />
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            Driver Name
          </q-item-label>
          <q-item-label>{{ data?.DriverName || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- <q-separator /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="phone_android" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Driver Phone
          </q-item-label>
          <q-item-label>{{ data?.DriverPhone || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="pin" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            License Plate
          </q-item-label>
          <q-item-label>{{ data?.PlatNumber || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
    <!-- <q-list>
      <q-banner square class="bg-grey-2">Arrival</q-banner>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="flight_land" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Flight Name</q-item-label>
          <q-item-label>{{ data?.Arrival_FlightName || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="event" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Flight Date</q-item-label>
          <q-item-label>{{
            data?.Arrival_FlightDate?.slice(0, 10) || "N/A"
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="schedule" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Pick Up Time</q-item-label>
          <q-item-label>{{
            data?.Arrival_PickupTime?.split("T")[1]?.slice(0, 5) || "N/A"
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->
    <!-- </q-card-section> -->

  </q-card>

  <q-dialog v-model="editVehicleDialog">
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section title>
        <div class="text-h6">Add New Vehicle</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onEdit(data.Id)" class="q-gutter-md">
          <q-input autofocus filled v-model="vehicleForm.Code" label="Vehicle Code *" lazy-rules />

          <q-input filled v-model="vehicleForm.PlatNumber" label="License Plate *" lazy-rules />

          <q-input filled v-model="vehicleForm.DriverName" label="Driver Name *" lazy-rules />

          <q-input filled v-model="vehicleForm.DriverPhone" label="Driver Phone *" lazy-rules />

          <div class="float-right q-ma-md">
            <q-btn flat class="q-ml-sm" v-close-popup label="Cancel" />
            <q-btn label="Submit" type="submit" color="primary" text-color="dark" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { useSettingsStore } from 'src/stores/settings-store'
import { useUserStore } from 'src/stores/user-store'
import { onMounted, ref } from 'vue'

const settingStore = useSettingsStore()
const userStore = useUserStore()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const editVehicleDialog = ref(false)

const vehicleForm = ref({
  Code: '',
  PlatNumber: '',
  DriverName: '',
  DriverPhone: ''
})

const onDeleteVehicle = async () => {
  await settingStore.deleteVehicle(props.data.Id)
  await settingStore.getVehicles()
}

const onEdit = async (id) => {
  try {
    await settingStore.updateVehicle(id, vehicleForm.value)
    await settingStore.getVehicles()
    editVehicleDialog.value = false
  } catch (error) {
    console.error('onEdit: error', error)
  }
}

onMounted(async () => {
  Object.keys(vehicleForm.value).forEach(key => {
    if (key !== 'Id') vehicleForm.value[key] = props.data[key]
  })
})
</script>
