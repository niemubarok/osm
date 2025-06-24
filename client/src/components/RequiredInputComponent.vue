<template>
  <q-input :autofocus label-color="black" :label outlined v-model="model" lazy-rules
    :rules="[val => val && val.length > 0 || 'Please type something']" stack-label label-slot>

    <template #label>
      <div>
        <!-- :label="label"  -->
        <span class=" text-dark ">{{ label }}</span>
        <q-badge style="font-size: small;"
          class="q-px-sm q-ml-sm  bg-red-6 q-mr-md text-white text-italic rounded-borders">required</q-badge>
      </div>
    </template>
    <!-- </template> -->
  </q-input>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  autofocus: {
    type: Boolean,
    default: false
  }
})
</script>
