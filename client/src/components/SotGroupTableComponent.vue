<template>
  <div class="q-pa-md full-width">
    <q-table :rows="groupData" :columns="columns" row-key="SotId" :pagination="{ rowsPerPage: 10 }">
      <!-- Id Column -->
      <template v-slot:body-cell-Id="props">
        <q-td :props="props">
          {{ props.row.SotId }}
        </q-td>
      </template>

      <!-- Attendants Column -->
      <template v-slot:body-cell-attendants="props">
        <q-td :props="props">
          <div class="row q-gutter-sm">
            <div class="column items-center">
              <q-avatar size="40px">
                <q-img :src="props.row.Attendant1_PictureData ?
                  'data:image/png;base64,' + props.row.Attendant1_PictureData :
                  'https://ui-avatars.com/api/?name=' + props.row.Attendant1_EmployeeName" />
              </q-avatar>
              <div class="text-caption">{{ props.row.Attendant1_EmployeeName }}</div>
              <div>{{ props.row.Attendant1_PhoneNumber }}</div>
            </div>
            <div class="column items-center" v-if="props.row.Attendant2_EmployeeName">
              <q-avatar size="40px">
                <q-img :src="props.row.Attendant2_PictureData ?
                  'data:image/png;base64,' + props.row.Attendant2_PictureData :
                  'https://ui-avatars.com/api/?name=' + props.row.Attendant2_EmployeeName" />
              </q-avatar>
              <div class="text-caption">{{ props.row.Attendant2_EmployeeName }}</div>
              <div>{{ props.row.Attendant2_PhoneNumber }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Observers Column -->
      <template v-slot:body-cell-observers="props">
        <q-td :props="props">
          <div class="column">
            <div v-for="observer in props.row.SotObserver" :key="observer.ObserverName">
              {{ observer.ObserverName }}
            </div>
          </div>
        </q-td>
      </template>
      <!-- Observers Column -->
      <template v-slot:body-cell-notes="props">
        <q-td :props="props">
          <div class="column" v-html="props.row.Notes" />
          <!-- <div v-for="observer in props.row.Notes" :key="observer.Notes"> -->
          <!-- {{ props.row.Notes }} -->
          <!-- </div> -->
        </q-td>
      </template>
      <!-- Observers Column -->
      <template v-slot:body-cell-clsr="props">
        <q-td :props="props">
          <div class="column" v-html="props.row.CLSR_Observation" />

        </q-td>
      </template>

      <!-- Actions Column -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-group flat>
            <q-btn flat dense icon="visibility" @click="viewDetails(props.row)">
              <q-tooltip>View Details</q-tooltip>
            </q-btn>
            <q-btn v-if="userStore.hasAccess('EDIT_GROUP')" flat dense icon="edit" @click="onEditSotGroup(props.row)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn v-if="userStore.hasAccess('EDIT_GROUP')" flat dense icon="delete" color="negative"
              @click="onDeleteSotGroup(props.row.SotId)">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </q-btn-group>
        </q-td>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useSotStore } from 'src/stores/sot-store'
import { useUserStore } from 'src/stores/user-store'
import EditSotGroupDialog from './EditSotGroupDialog.vue'

const $q = useQuasar()
const sotStore = useSotStore()
const userStore = useUserStore()
const groupData = ref([])

const columns = [
  {
    name: 'Id',
    label: 'Id',
    field: 'Id',
    align: 'center'
  },
  {
    name: 'location_name',
    label: 'Location Name',
    field: 'LocationName',
    align: 'left'
  },
  {
    name: 'vehicle',
    label: 'Vehicle',
    field: row => Array.isArray(row.SotObserver) ? row.SotObserver[0]?.VehicleCode : '-',
    align: 'left'
  },
  {
    name: 'attendants',
    label: 'Attendants',
    field: 'attendants',
    align: 'left'
  },
  {
    name: 'observers',
    label: 'Observers',
    field: 'SotObserver',
    align: 'left'
  },
  {
    name: 'notes',
    label: 'Risk',
    field: 'Notes',
    align: 'left'
  },
  {
    name: 'clsr',
    label: 'CLSR Observation',
    field: 'Clsr_Observation',
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center'
  }
]

const props = defineProps({
  groups: Object,
  Participant: Object
})

// Reuse existing methods from card component
// const { onEditSotGroup, onDeleteSotGroup } = await import('./SotGroupCardComponent.vue')

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

const viewDetails = (row) => {
  $q.dialog({
    title: 'Group Details',
    message: `
      <div>
        <h6>Hazard/Risk:</h6>
        ${row.Notes || 'No Notes'}
        <h6>CLSR Observation:</h6>
        ${row.CLSR_Observation || 'No CLSR Observation'}
      </div>
    `,
    html: true
  })
}

onMounted(async () => {
  console.log('🚀 ~ onMounted ~ props.groups:', props.groups)
  if (props.groups) {
    watch(() => props.groups, (newValue) => {
      if (newValue) {
        groupData.value = newValue
        console.log('🚀 ~ watch ~ groupData.value :', groupData.value)
      }
    }, { immediate: true })
  } else {
    watch(() => props.Participant, async (newValue) => {
      if (newValue?.ParticipantId) {
        groupData.value = await sotStore.getSotGroupById(newValue.ParticipantId)
      }
    }, { immediate: true })
  }
})
</script>
