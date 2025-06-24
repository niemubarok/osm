<template>
  <div v-if="sotStore.showCamera">
    <add-sot-finding-component />
  </div>
  <div v-else>
    <SotFindingListTableComponent />
    <!-- <q-page-sticky position="bottom-right" :offset="fabpos" :disable="draggingFab" v-touch-pan.prevent.mouse="moveFab"
      expand>
      <q-btn fab icon="add" text-color="black" color="primary" @click="showAddSotDialog" class="shadow-1" />
      <q-tooltip>
        Add SOT

      </q-tooltip>
    </q-page-sticky> -->
    <add-button @click="showAddSotDialog" tooltip="Add SOT" label="Add SOT" />
  </div>
  <!-- {{ rows }} -->

</template>

<script setup>
import SotFindingListTableComponent from 'src/components/SotFindingListTableComponent.vue'
import AddSotFindingComponent from 'src/components/AddSotFindingComponent.vue'
import AddButton from 'src/components/AddButton.vue'
import { onMounted, ref } from 'vue'
import { useSotStore } from 'src/stores/sot-store'
import { useComponentStore } from 'src/stores/component-store'

const sotStore = useSotStore()
const componentStore = useComponentStore()

const showAddSotDialog = () => {
  sotStore.showCamera = true
  componentStore.showHeader = false
}

const fabpos = ref([25, 18])
const draggingFab = ref(false)
const moveFab = (ev) => {
  fabpos.value = [
    fabpos.value[0] - ev.delta.x,
    fabpos.value[1] - ev.delta.y
  ]
}

onMounted(async () => {
  // await sotStore.getSotFindingsById()
})

</script>
