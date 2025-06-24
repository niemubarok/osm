<template>
  <q-card flat bordered class="q-pb-lg">
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
    <div class="bg-grey-3">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="Vehicle Detail" />
    </div>
    <!-- <q-card-section> -->
    <!-- <q-banner rounded class="bg-grey-2">Departure</q-banner> -->
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
      <q-separator />
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
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>
