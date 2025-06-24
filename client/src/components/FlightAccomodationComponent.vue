<template>
  <q-card flat bordered>
    <div class="bg-grey-3">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="FLIGHT ACCOMODATION" />
      <!-- icon="flight" -->

      <q-separator />
    </div>
    <!-- <q-card-section> -->
    <q-banner square class="bg-grey-2">
      <q-item style="margin-left:-20px">
        <q-item-section avatar>
          <q-avatar size="30px" color="grey-8" text-color="white" icon="flight_land" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Arrival</q-item-label>
        </q-item-section>
      </q-item>
    </q-banner>
    <q-separator class="bg-grey-3" />
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="flight" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Flight Name
          </q-item-label>
          <q-item-label>{{ data?.Arrival_FlightName || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator class="bg-grey-3"/> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="event" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Flight Date
          </q-item-label>
          <q-item-label>
            {{
              utilStore.formatDate(data?.Arrival_FlightDate) || "N/A"
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator class="bg-grey-3"/> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="schedule" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Pick Up Time
          </q-item-label>
          <q-item-label>
            {{
              utilStore.formatTime(data?.Arrival_PickupTime) || "N/A"
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="bg-grey-3" />
    <q-banner rounded class="bg-grey-2">
      <q-item style="margin-left:-20px">
        <q-item-section avatar>
          <q-avatar size="30px" color="grey-8" text-color="white" icon="flight_takeoff" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Departure</q-item-label>
        </q-item-section>
      </q-item>
    </q-banner>
    <q-list>
      <q-separator class="bg-grey-3" />
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="flight" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Flight Name
          </q-item-label>
          <q-item-label>{{ data?.Departure_FlightName || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator class="bg-grey-3"/> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="event" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Flight Date
          </q-item-label>
          <q-item-label>{{ utilStore.formatDate(data?.Departure_FlightDate) || "N/A" }}</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-separator class="bg-grey-3"/> -->
      <q-item>
        <q-item-section avatar>
          <q-icon color="grey-8" name="schedule" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Pick Up Time
          </q-item-label>
          <q-item-label>
            {{
              utilStore.formatTime(data?.Departure_PickupTime) || "N/A"
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- </q-card-section> -->
  </q-card>
</template>

<script setup>
import { useUtilStore } from 'src/stores/util-store'

const utilStore = useUtilStore()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

</script>
