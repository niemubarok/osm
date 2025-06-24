<template>
  <q-page padding>
    <q-banner class="flex row justify-between bg-grey-3">
      <div>

        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="dark" icon="event_available" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              ATTENDANCES
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-banner>

    <AttendancesComponent :rows="filteredRows" :total-attendances="attendanceStore.totalCheckedIn"
      :attendances-percentage="attendanceStore.attendancesPersentage" />
  </q-page>
</template>

<script setup>
import AttendancesComponent from 'src/components/AttendancesComponent.vue'
import { useAttendanceStore } from 'src/stores/attendance-store'
import { useUtilStore } from 'src/stores/util-store'
import { useComponentStore } from 'src/stores/component-store'
import { computed, onMounted, ref } from 'vue'
const attendanceStore = useAttendanceStore()

const utilStore = useUtilStore()
const componentStore = useComponentStore()

const filter = ref('')
const rows = ref([])
const filteredRows = computed(() => {
  return rows.value.filter(row => {
    return (
      row.FullName.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase()) ||
      row.Email.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase()) ||
      row.PhoneNumber.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase()) ||
      row.PositionName.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase()) ||
      row.Unit.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase()) ||
      row.Name.toLowerCase().includes(componentStore.searchModels.attendances.toLowerCase())
    )
  })
})

onMounted(async () => {
  componentStore.searchModels.attendances = ''
  rows.value = await attendanceStore.getAllAttendances()
  // await participantStore.getAllParticipants()
})

</script>
