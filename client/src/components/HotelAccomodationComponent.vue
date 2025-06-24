<template>
  <q-card flat bordered class="q-pb-lg">
    <div class="bg-grey-3">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="HOTEL ACCOMODATION" />
    </div>
    <!-- <q-card-section> -->
    <!-- <q-banner rounded class="bg-grey-2">Departure</q-banner> -->
    <q-list>
      <q-separator />
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="apartment" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Hotel Name
          </q-item-label>
          <q-item-label>{{ data?.Hotel_Name || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="dialpad" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Room Number
          </q-item-label>
          <q-item-label>{{ data?.Hotel_RoomNumber || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="schedule" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Check In Time
          </q-item-label>
          <q-item-label>
            {{
              data?.Hotel_CheckInTime?.split("T")[1]?.slice(0, 5) || "N/A"
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="schedule" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Check Out Time
          </q-item-label>
          <q-item-label>
            {{
              data?.Hotel_CheckOutTime?.split("T")[1]?.slice(0, 5) || "N/A"
            }}
          </q-item-label>
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
