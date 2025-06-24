<template>
  <q-card bordered class="q-ma-sm relative-position" :style="{
    width: $q.screen.lt.sm ? '95%' : 'fit-content',
  }">
    <!-- <q-card-section title> -->
    <q-banner class="bg-grey-3 ">
      <div class="flex justify-between">

        <div class="q-mt-sm">
          Users List
        </div>

        <div>

          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search email or name">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

      </div>
    </q-banner>
    <q-table :rows="userStore.users" :columns="columns" row-key="id" virtual-scroll :pagination="{ rowsPerPage: 0 }"
      :loading="loading" :filter="filter" binary-state-sort sticky-header style="height: 50dvh;">

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-tooltip>Left click to edit, right to delete</q-tooltip>
          <q-menu context-menu touch-position>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-btn color="red" icon="delete" label="Delete" @click="onDeleteUser(props.row.id)" />
              </q-item>
            </q-list>
          </q-menu>
          <q-td key="no" :props="props">
            {{ props.pageIndex + 1 }}
          </q-td>
          <q-td key="fullName" :props="props">
            {{ props.row.fullName }}
            <q-popup-edit v-model="props.row.fullName" v-slot="scope"
              @save="(value) => onUpdateUser(props.row.id, 'fullName', value)">
              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" @blur="'v-close-popup'">
                <template v-slot:append>
                  <q-btn flat color="grey-9" icon="save" @click="scope.set" v-close-popup
                    class="absolute-top-right q-mr-md" />
                </template>
                <template v-slot:after>
                  <q-btn dense flat color="grey-9" icon="close" v-close-popup class="absolute-top-right q-px-sm" />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" v-slot="scope"
              @save="(value) => onUpdateUser(props.row.id, 'email', value)">
              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" @blur="'v-close-popup'">
                <template v-slot:append>
                  <q-btn flat color="grey-9" icon="save" @click="scope.set" v-close-popup
                    class="absolute-top-right q-mr-md" />
                </template>
                <template v-slot:after>
                  <q-btn dense flat color="grey-9" icon="close" v-close-popup class="absolute-top-right q-px-sm" />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="created_at" :props="props">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
          </q-td>
        </q-tr>
      </template>

      <template v-slot:pagination="scope">
        <q-btn v-if="scope.pagesNumber > 2" icon="first_page" color="grey-8" round dense flat
          :disable="scope.isFirstPage" @click="scope.firstPage" />

        <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="scope.isFirstPage"
          @click="scope.prevPage" />

        <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="scope.isLastPage"
          @click="scope.nextPage" />

        <q-btn v-if="scope.pagesNumber > 2" icon="last_page" color="grey-8" round dense flat :disable="scope.isLastPage"
          @click="scope.lastPage" />
        <q-btn push icon="add" text-color="black" color="primary" @click="showAddUserDialog"
          :label="$q.screen.gt.sm ? 'Add User' : ''" class="q-ml-md">
        </q-btn>
      </template>

    </q-table>

    <q-dialog v-model="addUserDialog">
      <AddUserComponent @adduser="userAdded" />
    </q-dialog>

  </q-card>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store'
import { ref, onMounted } from 'vue'
import AddUserComponent from './AddUserComponent.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const loading = ref(false)
const filter = ref('')
const columns = [
  {
    name: 'no',
    required: true,
    label: 'No.',
    align: 'left',
    field: 'id',
    sortable: true
  },
  {
    name: 'fullName',
    align: 'left',
    label: 'Full Name',
    field: 'fullName',
    sortable: true
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true
  },
  {
    name: 'created_at',
    align: 'left',
    label: 'Created At',
    field: 'created_at',
    sortable: true,
    format: (val) => new Date(val).toLocaleDateString()
  }
]

const userStore = useUserStore()

const onUpdateUser = async (id, column, value) => {
  await userStore.updateUser(id, column, value)
  $q.notify({
    color: 'green-4',
    textColor: 'black',
    icon: 'cloud_done',
    message: `User ${column} updated to ${value}`
  })
  await userStore.getUsers()
}

const onDeleteUser = async (id) => {
  await userStore.deleteUser(id)
  $q.notify({
    color: 'green-4',
    textColor: 'black',
    icon: 'cloud_done',
    message: 'User deleted'
  })
  await userStore.getUsers(
    () => {
      loading.value = false
    }
  )
}

const addUserDialog = ref(false)
const showAddUserDialog = () => {
  addUserDialog.value = true
}

const userAdded = () => {
  addUserDialog.value = false
  userStore.getUsers()
}

onMounted(async () => {
  loading.value = true
  await userStore.getUsers()
  loading.value = false
})
</script>
