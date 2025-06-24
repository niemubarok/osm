<template>
  <q-page-sticky position="bottom-right" :offset="fabpos" :disable="draggingFab" v-touch-pan.prevent.mouse="moveFab"
    expand>
    <q-btn square fab :icon="icon" text-color="black" :color="iconColor" class="shadow-1 rounded-borders z-top"
      :to="to ?? to" :label="label" />
    <q-tooltip>
      {{ tooltip }}

    </q-tooltip>
  </q-page-sticky>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Add'
  },
  icon: {
    type: String,
    default: 'add'
  },
  tooltip: {
    type: String,
    default: 'Add'
  },
  iconColor: {
    type: String,
    default: 'primary'
  },
  to: {
    type: String,
    default: null
  }
})

const fabpos = ref([18, 18])
const draggingFab = ref(false)
const moveFab = (ev) => {
  fabpos.value = [
    fabpos.value[0] - ev.delta.x,
    fabpos.value[1] - ev.delta.y
  ]
}
</script>
