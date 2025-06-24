<template>
  <q-banner class="bg-grey-3">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="dark" icon="airline_seat_recline_normal" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold">
          VEHICLES LIST
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-banner>
  <div class="flex justify-center q-mt-md q-gutter-md q-pb-md">
    <!-- {{ vehicles }} -->
    <VehicleComponent v-for="data in vehicles" :key="data" :data="data" />
  </div>

  <q-page-sticky position="bottom-right" :offset="fabPos" :disable="draggingFab" v-touch-pan.prevent.mouse="moveFab">
    <q-btn fab color="primary" text-color="dark" icon="add" draggable @click="addVehicleDialog = true" />
  </q-page-sticky>

  <q-dialog v-model="addVehicleDialog">
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section title>
        <div class="text-h6">Add New Vehicle</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input autofocus filled v-model="vehicleForm.Code" label="Vehicle Code *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-input filled v-model="vehicleForm.PlatNumber" label="License Plate *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-input filled v-model="vehicleForm.DriverName" label="Driver Name *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-input filled v-model="vehicleForm.DriverPhone" label="Driver Phone *" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

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
import VehicleComponent from 'src/components/VehicleComponent.vue'
import { useComponentStore } from 'src/stores/component-store'
import { useSettingsStore } from 'src/stores/settings-store'
import { computed, onMounted, ref, watch } from 'vue'

const settingStore = useSettingsStore()
const componentStore = useComponentStore()

const allVehicles = ref([])

const addVehicleDialog = ref(false)
const fabPos = ref([18, 18])
const draggingFab = ref(false)
const moveFab = (ev) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true

  fabPos.value = [
    fabPos.value[0] - ev.delta.x,
    fabPos.value[1] - ev.delta.y
  ]
}

// watch(() => settingStore.vehicles, (newValue) => {
//   allVehicles.value = newValue
// })

onMounted(async () => {
  await settingStore.getVehicles()
  // allVehicles.value = settingStore.vehicles
})

const vehicles = computed(() => {
  if (!settingStore.vehicles.length) return []
  return settingStore.vehicles.filter(
    vehicle => vehicle.DriverName.toLowerCase().includes(componentStore.searchModels.vehicles.toLowerCase()) ||
      vehicle.PlatNumber.toLowerCase().includes(componentStore.searchModels.vehicles.toLowerCase())
  )
})

const vehicleForm = ref({
  Code: '',
  PlatNumber: '',
  DriverName: '',
  DriverPhone: ''
})
const onSubmit = async () => {
  await settingStore.addVehicle(vehicleForm.value)
}
</script>
