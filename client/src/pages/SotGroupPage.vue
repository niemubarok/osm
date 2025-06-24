<template>
  <q-page>
    <q-banner class="flex row justify-between bg-grey-3">
      <div>

        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="dark" icon="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              SOT GROUPS
            </q-item-label>
          </q-item-section>

          <q-btn-toggle v-model="viewMode" flat stretch toggle-color="primary" :options="[
            { label: 'List', value: 'list', icon: 'list' },
            { label: 'Grid', value: 'grid', icon: 'grid_view' }
          ]" />

          <!-- <q-chip square class="bg-primary q-pr-md" icon="group">
            <span class="q-pl-sm text-weight-bold">

            </span>
          </q-chip> -->
        </q-item>
      </div>
    </q-banner>
    <div v-if="isLoading" class="flex row justify-center q-col-gutter-x-md q-col-gutter-y-xs ">
      <sot-group-card-skeleton-component v-for="n in 9" :key="n" />
    </div>
    <div v-else class="flex justify-center q-gutter-md  q-pa-md">

      <sot-group-table-component v-if="viewMode === 'list'" :groups="groups" />
      <sot-group-card-component v-else :groups="groups" />
    </div>

    <q-page-sticky v-if="userStore.hasAccess('EDIT_GROUP')" position="bottom-right" :offset="fabpos"
      :disable="draggingFab" v-touch-pan.prevent.mouse="moveFab" expand>
      <q-btn fab icon="add" text-color="black" color="primary" @click="showAddSotGroupDialog" class="shadow-1" />
      <q-tooltip>
        Add SOT Group

      </q-tooltip>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import SotGroupTableComponent from 'src/components/SotGroupTableComponent.vue'
import SotGroupCardComponent from 'src/components/SotGroupCardComponent.vue'
import SotGroupCardSkeletonComponent from 'src/components/SotGroupCardSkeletonComponent.vue'
import AddSotGroupDialog from 'src/components/AddSotGroupDialog.vue'
import { useSotStore } from 'src/stores/sot-store'
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user-store'

const $q = useQuasar()

const viewMode = ref('list')

const sotStore = useSotStore()
const userStore = useUserStore()

const groups = computed(() => {
  return sotStore.sotGroupList
})

const fabpos = ref([18, 18])
const draggingFab = ref(false)
const moveFab = (ev) => {
  fabpos.value = [
    fabpos.value[0] - ev.delta.x,
    fabpos.value[1] - ev.delta.y
  ]
}

const isLoading = ref(true)

const showAddSotGroupDialog = () => {
  $q.dialog({
    component: AddSotGroupDialog
  })
}

onMounted(async () => {
  await sotStore.getSotGroupList()
  isLoading.value = false
})

</script>
