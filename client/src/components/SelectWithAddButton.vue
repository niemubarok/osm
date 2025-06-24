<template>
  <q-select autocomplete outlined :options="options" :option-value="optionValue" :option-label="optionLabel"
    :emit-value="emitValue" :map-options="mapOptions" :use-input="useInput" v-model="selectedValue"
    @update:model-value="(val) => $emit('update:model-value', val)"
    @filter="(val, update) => $emit('filter', val, update)" :prefix="prefix" :suffix="suffix" stack-label label-slot>

    <template #label>
      <div>
        <!-- :label="label"  -->
        <span class=" text-dark ">{{ label }}</span>
        <q-badge v-if="required" style="font-size: small;"
          class="q-px-sm q-ml-sm bg-red-6 q-mr-md text-white text-italic rounded-borders">required</q-badge>
      </div>
    </template>

    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ noOptionsMessage }}
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-if="withAddButton">
        <q-item-section class="text-grey">
          <q-btn push color="primary" text-color="black" label="Add" dense flat icon="add">
            <q-tooltip>
              {{ addButtonTooltip }}
            </q-tooltip>
            <q-popup-edit ref="popupEditRef" title="Add New">
              <q-btn flat color="grey-9" icon="close" v-close-popup class="absolute-top-right q-ma-sm" />
              <!-- <form> -->
              <template v-for="(value, key) in localNewOption" :key="key">
                <q-input outlined dense autofocus v-model="localNewOption[key]" :label="key"
                  :rules="[val => val && val.length > 0 || 'Please fill the value']" @keyup.enter="onSubmit" />
              </template>
              <q-btn dense color="primary" type="submit" text-color="black" icon="save" class="float-right"
                @click="onSubmit">
                <q-tooltip>
                  Save
                </q-tooltip>
              </q-btn>
              <!-- </form> -->
            </q-popup-edit>
          </q-btn>
        </q-item-section>
      </q-item>
    </template>

    <template v-if="customOption" v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <div>{{ scope.opt.PlatNumber }} </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.DriverName }}</q-item-label>
          <q-item-label caption>{{ scope.opt.DriverPhone }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

  </q-select>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  labelText: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  optionValue: {
    type: String,
    required: true
  },
  optionLabel: {
    type: String
  },
  emitValue: {
    type: Boolean,
    default: true
  },
  mapOptions: {
    type: Boolean,
    default: true
  },
  useInput: {
    type: Boolean,
    default: true
  },
  addButtonTooltip: {
    type: String,
    default: 'Add New'
  },
  newOption: {
    type: Object,
    default: () => ({})
  },
  noOptionsMessage: {
    type: String,
    default: 'No results'
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  customOption: {
    type: Boolean,
    default: false
  },
  withAddButton: {
    type: Boolean,
    default: true
  }
})

const selectedValue = ref(null)

const localNewOption = defineModel('newOption')

const popupEditRef = ref(null)
const error = ref(false)

const emit = defineEmits(['update:model-value', 'filter'])

const onSubmit = () => {
  error.value = Object.values(localNewOption.value).some(val => !val)
  if (!error.value) {
    emit('add-new', localNewOption.value)
    popupEditRef.value.hide()
  }
}

</script>
