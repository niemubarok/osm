<template>
  <div class="q-pa-md full-width">
    <q-table flat bordered :rows="rows" :columns="columns" row-key="ParticipantId" :loading="loading"
      :pagination="{ rowsPerPage: 50 }">
      <template v-slot:body-cell-No="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense round icon="qr_code" @click="onClickGenerateQrCode(props.row.UserName)">
            <q-tooltip>Generate QR Code</q-tooltip>
          </q-btn>
          <q-btn flat dense round icon="visibility" @click="onClickParticipantDetail(props.row.UserName)">
            <q-tooltip>View Profile</q-tooltip>
          </q-btn>
          <q-btn flat dense round icon="edit" @click="onEditParticipant(props.row)">
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn flat dense round icon="delete" color="red" @click="onDeleteParticipant(props.row.ParticipantId)">
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useParticipantStore } from 'src/stores/participant-store'
import { useUtilStore } from 'src/stores/util-store'
import { useComponentStore } from 'src/stores/component-store'
import QrCodeDialog from 'src/components/QrCodeDialog.vue'
import ParticipantDetailDialog from './ParticipantDetailDialog.vue'
import EditParticipantDialog from './EditParticipantDialog.vue'

const $q = useQuasar()
const participantStore = useParticipantStore()
const utilStore = useUtilStore()
const componentStore = useComponentStore()

const loading = ref(false)
const rows = ref([])

const columns = [
  {
    name: 'No',
    label: 'No',
    field: 'No',
    align: 'left'
  }, {
    name: 'SeatCode',
    label: 'Seat',
    field: 'SeatCode',
    align: 'left'
  },
  {
    name: 'FullName',
    label: 'Full Name',
    field: 'FullName',
    align: 'left'
  },
  {
    name: 'PositionName',
    label: 'Position',
    field: 'PositionName',
    align: 'left'
  },
  {
    name: 'Unit',
    label: 'Unit',
    field: 'Unit',
    align: 'left'
  },
  {
    name: 'CompanyName',
    label: 'Company',
    field: 'CompanyName',
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center'
  }
]

const loadData = async () => {
  loading.value = true
  try {
    rows.value = await participantStore.getAllParticipants()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

const isSearching = ref(false)

watch(
  () => componentStore.searchModels.participants,
  async (newValue) => {
    if (!isSearching.value) {
      isSearching.value = true
      // Lakukan pencarian
      rows.value = []

      if (newValue.length > 2) {
        const result = await participantStore.searchParticipantByName(newValue, 1)
        rows.value = result.data
      } else if (newValue === '') {
        rows.value = await participantStore.getAllParticipants()
      }
      isSearching.value = false
    }
  }
)

// Rest of your existing methods remain the same
const onClickGenerateQrCode = (username) => {
  const encodedUserName = utilStore.encodeUsername(username)
  const url = `${window.location.origin}/profile/${encodedUserName}`
  $q.dialog({
    component: QrCodeDialog,
    componentProps: {
      qrCodeValue: url
    }
  })
}

const onClickParticipantDetail = async (username) => {
  const encodedUserName = utilStore.encodeUsername(username)
  const participantDetailDialog = $q.dialog({
    component: ParticipantDetailDialog,
    componentProps: {
      username: encodedUserName
    }
  })
  participantDetailDialog.update()
}

const onEditParticipant = async (data) => {
  $q.dialog({
    component: EditParticipantDialog,
    componentProps: {
      data
    }
  })
}

const onDeleteParticipant = (id) => {
  if (!id) {
    console.error('onDeleteParticipant: id is null or undefined')
    return
  }

  $q.dialog({
    title: 'Delete Confirmation',
    message: 'All data related to this participant will be deleted. Are you sure you want to delete this participant?',
    cancel: true,
    persistent: true,
    ok: { color: 'red', label: 'Delete' }
  }).onOk(async () => {
    try {
      await participantStore.deleteParticipant(id)
      if (componentStore.searchModels.participants.length) {
        await participantStore.searchParticipantByName(componentStore.searchModels.participants, 1)
      }
      loadData()
      $q.notify({
        color: 'green-4',
        textColor: 'black',
        icon: 'cloud_done',
        message: 'Success'
      })
    } catch (error) {
      console.error('onDeleteParticipant: error deleting participant', error)
      $q.notify({
        color: 'red-4',
        textColor: 'black',
        icon: 'error',
        message: 'Error deleting participant'
      })
    }
  })
}
</script>
