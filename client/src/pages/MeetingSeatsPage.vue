<template>
  <q-banner class="bg-grey-3">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="dark" icon="airline_seat_recline_normal" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold">
          MEETING SEATS
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-banner>
  <div class="flex justify-center q-mt-md">

    <MeetingSeatCardComponent />
  </div>
</template>

<script setup>
import MeetingSeatCardComponent from 'src/components/MeetingSeatCardComponent.vue'
</script>
