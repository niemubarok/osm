<template>
  <q-banner class="flex row justify-between bg-grey-3">
    <div>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="dark" icon="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">
            SETTINGS
          </q-item-label>
        </q-item-section>

      </q-item>
    </div>
  </q-banner>

  <div :class="!$q.screen.lt.sm ? 'flex row justify-evenly q-pl-md' : 'full-width column items-center'">
    <q-card bordered class="col-4 shadow-1 bg-grey-1 q-ma-sm" :style="{
      width: $q.screen.lt.sm ? '95%' : '150px',
    }" style="min-width: fit-content;">
      <!-- <q-card-section title> -->
      <q-banner class="bg-grey-3">
        Meeting Date
      </q-banner>
      <q-card-section>
        <q-input outlined v-model="meetingDateDay1" label="Day 1" stack-label style="width: 100%;"
          @focus="qDateProxyRef1.show()">

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxyRef1" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="meetingDateDay1" mask="YYYY-MM-DD" today-btn text-color="black">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup @click="qDateProxyRef1.toggle()" label="Close" color="black" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input outlined v-model="meetingDateDay2" label="Day 2" stack-label style="width: 100%;"
          @focus="qDateProxyRef2.show()">

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxyRef2" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="meetingDateDay2" mask="YYYY-MM-DD" today-btn text-color="black">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup @click="qDateProxyRef2.toggle()" label="Close" color="black" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="bg-grey-3" align="right">
        <q-btn label="Update" color="primary" text-color="black" @click="onClickUpdate" />
      </q-card-actions>
    </q-card>
    <!-- <add-user-component /> -->
    <users-table-component class="col" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSettingsStore } from 'src/stores/settings-store'
import { useQuasar, date } from 'quasar'
import { useUtilStore } from 'src/stores/util-store'
import AddUserComponent from 'src/components/AddUserComponent.vue'
import UsersTableComponent from 'src/components/UsersTableComponent.vue'

const $q = useQuasar()

const utilStore = useUtilStore()
const settingsStore = useSettingsStore()
const meetingDateDay1 = ref('')
const meetingDateDay2 = ref('')
const qDateProxyRef1 = ref(null)
const qDateProxyRef2 = ref(null)

const onClickUpdate = async () => {
  const date1 = new Date(meetingDateDay1.value)
  const date2 = new Date(meetingDateDay2.value)

  if (meetingDateDay1.value === '' || meetingDateDay2.value === '') {
    $q.notify({ message: 'Date cannot be empty', color: 'negative', position: 'top' })
    return
  }
  if (utilStore.compareDates(date1, date2)) {
    $q.notify({ message: 'Date 2 cannot be less than or equal to Date 1', color: 'negative', position: 'top' })
    return
  }

  const meetingDate = {
    Day1: meetingDateDay1.value,
    Day2: meetingDateDay2.value
  }
  await settingsStore.updateMeetingDate(meetingDate)
  $q.notify({ message: 'Meeting Date Updated', color: 'positive', position: 'top', icon: 'done', classes: 'text-black' })
}

onMounted(async () => {
  await settingsStore.getMeetingDate()
  meetingDateDay1.value = utilStore.formatDateToDigit(settingsStore.meetingDate.Day1)
  meetingDateDay2.value = utilStore.formatDateToDigit(settingsStore.meetingDate.Day2)
})
</script>
