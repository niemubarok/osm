<template>
  <!-- <q-responsive :ratio="1" class="col"> -->
  <vue-qrcode :value="value" scale="5" />

  <!-- </q-responsive> -->
</template>

<script setup>

import VueQrcode from 'vue-qrcode'
const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

</script>
