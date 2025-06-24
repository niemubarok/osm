<template>
  <!-- {{ groups }} -->
  <q-card v-for="(group, index) in groupData" :key="index" flat bordered :style="{
    width: $q.screen.lt.sm ? '100%' : '20dvw',
  }" style="min-width: max-content;height:fit-content">
    <!-- <div class="flex justify-end"> -->
    <!-- <q-btn flat outline dense size="sm" color="primary" text-color="black" icon="airline_seat_recline_normal"
        :label="participant?.SeatCode" class="bg-transparent absolute-top-left q-ma-sm no-pointer-events"
        style="border: 1px solid grey;" /> -->
    <!-- <div class="text-right" style="margin-bottom: -10px"
        @click="utilStore.onClickGenerateQrCode(participant?.UserName)">
        <q-btn flat color="dark" icon="qr_code">
          <q-tooltip>Generate QR Code</q-tooltip>
        </q-btn>

      </div> -->

    <!-- </div> -->
    <q-img :src="'data:image/png;base64,' + group.LocationImageData" :ratio="16 / 9" fit="fill" spinner-color="primary"
      spinner-size="82px">

    </q-img>

    <q-btn v-if="userStore.hasAccess('EDIT_GROUP')" flat icon="more_vert" size="md" dense
      class="text-white  absolute-top-right">
      <q-tooltip>more</q-tooltip>
      <q-menu auto-close>
        <q-list style="min-width: 100px">
          <!-- <q-item clickable @click="onClickParticipantDetail(participant?.UserName)">
            <q-item-section>View Profile</q-item-section>

          </q-item>
          <q-separator />-->
          <q-item clickable @click="onEditSotGroup(group)">
            <q-item-section>edit</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="onDeleteSotGroup(group?.SotId)">
            <q-item-section class="text-red">delete</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-card-section class="full-width no-padding q-mb-sm">
      <q-chip icon-right="directions_bus" text-color="white"
        :label="Array.isArray(group?.SotObserver) ? group?.SotObserver[0]?.VehicleCode : '-'"
        class="absolute bg-grey-9 text-white q-pa-sm"
        style="top: 0; right: 10px;font-size:small;transform: translateY(-150%);max-width: 60%; " />
      <q-chip icon-right="place" text-color="white" :label="group?.LocationName"
        class="absolute bg-grey-9 text-white q-pa-sm"
        style="top: 0; left: 10px;font-size:small;transform: translateY(-150%);max-width: 60%; " />
      <q-chip color="grey-3" square dense label="Attendant" class="q-mb-md" />
      <div class="flex row justify-evenly">
        <div class="column items-center">

          <q-avatar square size="60px" font-size="52px">
            <q-img
              :src="group?.Attendant1_PictureData ? 'data:image/png;base64,' + group?.Attendant1_PictureData : 'https://ui-avatars.com/api/?name=' + group?.Attendant1_EmployeeName + '&?background=random'"
              spinner-color="primary" spinner-size="82px" fit="cover" />

          </q-avatar>

          <q-chip class="q-mb-md" :label="group?.Attendant1_EmployeeName" />
        </div>
        <div class="column items-center">

          <q-avatar square size="60px" font-size="52px">
            <q-img
              :src="group?.Attendant2_PictureData ? 'data:image/png;base64,' + group?.Attendant2_PictureData : 'https://ui-avatars.com/api/?name=' + group?.Attendant1_EmployeeName + '&?background=random'"
              spinner-color="primary" spinner-size="82px" fit="cover" />

          </q-avatar>

          <q-chip class="q-mb-md" :label="group?.Attendant2_EmployeeName || '-'" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="no-padding">
      <q-chip color="grey-3" dense square label="OBSERVER" />
      <q-separator />
      <div>
        <q-list v-for="observer in group?.SotObserver" :key="observer" separator dense class="">

          <q-item>{{ observer?.ObserverName.toUpperCase() }}</q-item>
          <q-separator />
        </q-list>
      </div>

    </q-card-section>
    <q-card-actions align="right" class="bg-grey-3 no-padding q-mt-md">
      <q-btn flat dense label="Hazard / Risk in This Workspace
" @click="expanded[index] = !expanded[index]" :class="{ 'cursor-pointer': $q.screen.lt.md }"
        :icon-right="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" class="full-width" />

    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded[index]">
        <q-card-section :style="{
          width: $q.screen.lt.sm ? '100%' : '20dvw',
        }">

          <div v-if="group?.Notes" style="word-wrap: break-word; ">
            <div v-html="group?.Notes"></div>
          </div>
          <div v-else>
            No Notes
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>

    <q-btn flat dense label="CLSR Observation
" @click="clsrObservationExpanded[index] = !clsrObservationExpanded[index]"
      :class="{ 'cursor-pointer': $q.screen.lt.md }"
      :icon-right="clsrObservationExpanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" class="full-width" />

    <q-slide-transition>
      <div v-show="clsrObservationExpanded[index]">
        <q-card-section :style="{
          width: $q.screen.lt.sm ? '100%' : '20dvw',
        }">

          <div v-if="group?.CLSR_Observation" style="word-wrap: break-word; ">
            <div v-html="group?.CLSR_Observation"></div>
          </div>
          <div v-else>
            No CLSR Observation
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>

  </q-card>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import QrCodeDialog from 'src/components/QrCodeDialog.vue'
import { useSotStore } from 'src/stores/sot-store'
import { useUtilStore } from 'src/stores/util-store'
import { useComponentStore } from 'src/stores/component-store'
import SotGroupDetailDialog from './SotGroupDetailDialog.vue'
import EditSotGroupDialog from './EditSotGroupDialog.vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user-store'

const $q = useQuasar()

const sotStore = useSotStore()
const utilStore = useUtilStore()
const userStore = useUserStore()
const componentStore = useComponentStore()
const expanded = ref([])
const clsrObservationExpanded = ref([])

const onClickSotGroupDetail = async (username) => {
  const encodedUserName = utilStore.encodeUsername(username)
  // await sotStore.getSotGroupProfileByUserName(encodedUserName)
  const participantDetailDialog = $q.dialog({
    component: SotGroupDetailDialog,
    componentProps: {
      username: encodedUserName
    }
  })
  participantDetailDialog.update()
}

const onEditSotGroup = async (data) => {
  // const encodedUserName = utilStore.encodeUsername(username)
  // await sotStore.editSotGroup(data)

  $q.dialog({
    component: EditSotGroupDialog,
    componentProps: {
      data
    }
  })
}

const onDeleteSotGroup = (id) => {
  if (!id) {
    console.error('onDeleteSotGroup: id is null or undefined')
    return
  }

  $q.dialog({
    title: 'Delete Confirmation',
    message: 'All data related to this group will be deleted. Are you sure you want to delete this group?',
    cancel: true,
    persistent: true,
    ok: { color: 'red', label: 'Delete' }

  })
    .onOk(async () => {
      try {
        await sotStore.deleteSotGroup(id)
        // if (componentStore.searchModels.groups.length) {
        //   await sotStore.searchSotGroups(componentStore.searchModels.groups, 1)
        // }
        sotStore.groups = []
        await sotStore.getSotGroupList()
        // on delete success
        $q.notify({
          color: 'green-4',
          textColor: 'black',
          icon: 'cloud_done',
          message: 'Success'
        })
      } catch (error) {
        console.error('onDeleteSotGroup: error deleting group', error)
        $q.notify({
          color: 'red-4',
          textColor: 'black',
          icon: 'error',
          message: 'Error deleting group'
        })
      }
    })
}

// const onDeleteSotGroup = async (id) => {
//   await sotStore.deleteSotGroup(id)
// }

const props = defineProps({
  groups: Object,
  Participant: Object
})

const groupData = ref([])

onMounted(async () => {
  if (props.groups) {
    watch(() => props.groups, (newValue, oldValue) => {
      if (newValue) {
        groupData.value = newValue
      }
    }, { immediate: true })
  } else {
    watch(() => props.Participant, async (newValue, oldValue) => {
      if (newValue && newValue.ParticipantId) {
        groupData.value = await sotStore.getSotGroupById(newValue.ParticipantId)
      }
    }, { immediate: true })
  }
})
</script>

<style lang="scss" scoped>
.q-dialog__backdrop.fixed-full {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px);
}

.glass {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.301);
  border-radius: 20px;
  border: 1px solid rgba(14, 13, 13, 0.125);
}
</style>
