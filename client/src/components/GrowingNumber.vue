<template>
  <div>{{ prefix }}
    <span class="text-weight-bolder">
      {{ newValueFormatted }}
    </span>
    {{ suffix }}
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import numeral from 'numeral'

const props = defineProps({
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  value: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 500
  }
})

const newValue = ref(0)

const newValueFormatted = computed(() =>
  newValue.value < 1000
    ? newValue.value
    : numeral(newValue.value).format('0,0')
)

const grow = (m) => {
  const v = Math.ceil(newValue.value + m)

  if (v > props.value) {
    newValue.value = props.value
    return false
  }

  newValue.value = v

  setTimeout(() => {
    grow(m)
  }, 25)
}

const growInit = () => {
  grow(props.value / (props.duration / 25))
}

watch(() => props.value, () => {
  growInit()
})

onMounted(() => {
  growInit()
})

defineExpose({
  newValueFormatted
})
</script>
