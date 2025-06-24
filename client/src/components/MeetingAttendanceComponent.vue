<template>
  <q-card flat bordered class="q-pb-lg">
    <div class="bg-grey-3">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="MEETING ATTENDANCE" />
    </div>

    <div class="full-width q-px-md">
      <q-item class="bg-grey-3 rounded-borders q-pa-none q-mb-md q-mt-md q-pr-sm">
        <q-item-section avatar class="q-pl-md rounded-borders"
          :class="day1 ? 'bg-primary text-dark' : 'bg-red-4 text-dark'">
          <!-- <q-avatar color="primary" text-color="white" icon="bluetooth" /> -->
          <div class="text-center full-width text-weight-bolder">Day 1
          </div>
        </q-item-section>
        <q-item-section class="q-pl-md ">
          <q-item-label class="text-weight-bolder">{{ utilStore.formatDate(day1) || 'N/A' }}</q-item-label>
          <q-separator />
          <q-item-label caption lines="2" class="text-weight-bolder text-black">{{ utilStore.formatTime(day1) || 'N/A'
            }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-avatar size="lg" :icon="day1 ? 'task_alt' : 'event_busy'" :color="day1 ? 'primary' : 'red-4'"
            :class="day1 ? 'bg-primary text-dark' : 'bg-red-4 text-dark'" />
          <!-- <q-item-label caption>Present</q-item-label> -->
        </q-item-section>
      </q-item>
    </div>
    <div class="full-width q-px-md">

      <q-item class="bg-grey-4 rounded-borders q-pa-none q-pr-sm q-mb-md ">
        <q-item-section avatar class="text-center items-center  rounded-borders"
          :class="day2 ? 'bg-primary text-dark' : 'bg-red-4 text-dark'">
          <!-- <q-avatar color="primary" text-color="white" icon="bluetooth" /> -->
          <div class=" q-pl-md text-weight-bolder">Day 2</div>
        </q-item-section>
        <q-item-section class="q-pl-md ">
          <q-item-label class="text-weight-bolder"> {{ utilStore.formatDate(day2) || 'N/A' }}</q-item-label>
          <q-separator />
          <q-item-label caption lines="2" class="text-weight-bolder text-black"> {{ utilStore.formatTime(day2) || 'N/A'
            }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-avatar size="lg" :icon="day2 ? 'task_alt' : 'event_busy'" :color="day2 ? 'primary' : 'red-4'"
            :class="day2 ? 'bg-primary text-dark' : 'bg-red-4 text-dark'" />
          <!-- <q-item-label caption>Present</q-item-label> -->
        </q-item-section>
      </q-item>
    </div>
    <q-card-actions vertical align="center" :class="!$q.screen.lt.md ? 'q-mb-md' : ''">
      <!-- <div class="full-width q-px-md  text-body1 "> -->
      <!-- <q-btn push color="primary" text-color="dark" :disabled="day1" :label="day1 ? 'CHECKED IN' : ' CHECK IN DAY 1'"
        class="full-width q-py-lg q-mt-md shadow-1 " @click="onClickCheckIn(1)" />
      <q-space />
      <q-btn push color="primary" text-color="dark" :disabled="day2" :label="day2 ? 'CHECKED IN' : ' CHECK IN DAY 2'"
        class="full-width q-py-lg q-mt-md shadow-1" @click="onClickCheckIn(2)" /> -->

      <q-btn v-if="hasAccess" push color="primary" text-color="dark" :disabled="isDisabledCheckInButton"
        :label="buttonLabel" class="full-width q-py-lg q-mt-md shadow-1" @click="onClickCheckIn">
        <q-tooltip v-if="!hasAccess">
          Unauthorized!.
        </q-tooltip>
      </q-btn>
    </q-card-actions>

  </q-card>
</template>

<script setup>
import { useAttendanceStore } from 'src/stores/attendance-store'
import { useUtilStore } from 'src/stores/util-store'
import { useSettingsStore } from 'src/stores/settings-store'
import { computed, onUpdated, ref, watch } from 'vue'
import { date, useQuasar } from 'quasar'
import { useParticipantStore } from 'src/stores/participant-store'
import { useUserStore } from 'src/stores/user-store'

const $q = useQuasar()
const attendanceStore = useAttendanceStore()
const participantStore = useParticipantStore()
const utilStore = useUtilStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const hasAccess = (userStore.hasAccess('checkin_button'))

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const day1 = ref(null)
const day2 = ref(null)
const meetingDate = computed(() => settingsStore.meetingDate)
const today = new Date()
const isDay1 = ref(false)
const isDay2 = ref(false)
const participantId = ref(null)

watch(() => props.data, (newValue) => {
  day1.value = newValue?.Day1 || null
  day2.value = newValue?.Day2 || null
  // participantId.value = newValue?.ParticipantId
})

const isDisabledCheckInButton = computed(() => {
  return (isDay1.value && day1.value) || (isDay2.value && day2.value) || (day1.value && day2.value) || (!isDay1.value && !isDay2.value) || !hasAccess
})

const buttonLabel = computed(() => {
  if (day1.value && day2.value && !isDay1.value && !isDay2.value) return 'No Meeting Today'
  if (day1.value && day2.value && (isDay1.value || isDay2)) return 'CHECKED IN'
  if (isDay1.value && !day1.value) return 'CHECK IN DAY 1'
  if (isDay2.value && !day2.value) return 'CHECK IN DAY 2'

  if (isDay1.value && day1.value && !day2.value) return 'CHECKED IN DAY 1'
  if (isDay2.value && !day1.value && day2.value) return 'CHECKED IN DAY 2'
  if (isDay2.value && day1.value && day2.value) return 'CHECKED IN DAY 2'

  return 'No Meeting Today'
})

const onClickCheckIn = async () => {
  if (!meetingDate.value.Day1 && !meetingDate.value.Day2) {
    $q.notify({
      message: 'Meeting Date not set',
      color: 'negative',
      classes: 'text-white',
      icon: 'cancel'
    })
    return
  }
  if (isDay1.value && day1.value) {
    $q.notify({
      message: 'Already Checked In',
      color: 'negative',
      classes: 'text-white',
      icon: 'cancel'
    })
    return
  }

  if (isDay2.value && day2.value) {
    $q.notify({
      message: 'Already Checked In',
      color: 'negative',
      classes: 'text-white',
      icon: 'cancel'
    })
    return
  }

  const checkInTime = new Date().toISOString()
  const dataToStore = {
    ParticipantId: Array.isArray(props.data?.ParticipantId) ? props.data?.ParticipantId?.[0] : props.data?.ParticipantId,
    [isDay1.value ? 'Day1' : 'Day2']: checkInTime
  }

  const day = ref(isDay1.value ? 1 : 2)
  await attendanceStore.checkIn(dataToStore)
  day1.value = isDay1.value ? checkInTime : day1.value
  day2.value = isDay2.value ? checkInTime : day2.value
  $q.notify({
    message: `Check In Day ${day.value} Success`,
    color: 'positive',
    classes: 'text-black',
    icon: 'task_alt'
  })
}

onUpdated(async () => {
  const attendance = await attendanceStore.getAttendanceById(props.data?.ParticipantId)
  day1.value = attendance?.Day1
  day2.value = attendance?.Day2

  await settingsStore.getMeetingDate()
  isDay1.value = date.isSameDate(new Date(meetingDate.value.Day1), today, 'date')
  isDay2.value = date.isSameDate(new Date(meetingDate.value.Day2), today, 'date')
})

</script>
