<template>
  <q-expansion-item v-if="hasAccess" v-model="expanded" exact clickable :href="external ? link : undefined"
    :target="external ? '_blank' : undefined" :to="!external ? link : undefined" class="q-mt-xs shadow-1"
    style="border-radius: 5px;" :class="$route.path === link ? 'bg-grey-7 text-white' : 'bg-primary  text-grey-10'"
    :icon="icon" :hide-expand-icon="!submenu" :active-class="$route.path === link ? 'text-white' : 'text-grey-10'"
    :expand-icon-class="$route.path === link ? 'text-white' : 'text-grey-10'">
    <!-- style="background-color: rgb(29, 53, 77)" -->
    <template #header>
      <q-icon :name="icon" size="2em">
      </q-icon>
      <q-item-section @click="onClickNav">
        <q-item-label class="q-ml-xs">{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}

        </q-item-label>
      </q-item-section>
      <q-tooltip v-if="componentStore.miniState" anchor="center right" self="center left" :offset="[15, 20]"
        class="q-pa-md bg-primary text-grey-9 text-weight-bold shadow-1">
        <strong>{{ title }}</strong>
      </q-tooltip>
    </template>

    <!-- <div > -->
    <!-- <template #default v-if="submenu"> -->
    <!-- caption="John Doe" -->

  </q-expansion-item>

  <q-slide-transition>

    <q-list v-if="expanded" bordered class="bg-transparent rounded-borders">
      <q-item v-for="menu in children" :key="menu.icon" clickable v-ripple
        :class="$route.path === menu.link ? 'bg-grey-6 text-white' : 'bg-primary  text-grey-10'"
        class="rounded-borders q-ma-xs no-padding " :active="$route.path === menu" :to="menu.link ? menu.link : ''">
        <q-tooltip v-if="componentStore.miniState" anchor="center right" self="center left" :offset="[15, 20]"
          class="q-pa-md bg-primary text-grey-9 text-weight-bold shadow-1">
          <strong>{{ menu.title }}</strong>
        </q-tooltip>

        <q-item-section avatar>
          <q-icon color="dark" :name="menu.icon" :class="!componentStore.miniState ? 'q-ma-sm' : ''" />
        </q-item-section>
        <q-item-section v-if="!componentStore.miniState">{{ menu.title }}</q-item-section>
      </q-item>
    </q-list>
  </q-slide-transition>

  <!-- </div> -->
  <!-- </template> -->

</template>

<script setup>
import { useComponentStore } from 'src/stores/component-store'
import { useUserStore } from 'src/stores/user-store'
import ls from 'localstorage-slim'
import { ref, computed, watch } from 'vue'

const componentStore = useComponentStore()
const userStore = useUserStore()
const expanded = ref(false)

const userRoles = ls.get('roles')

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },
  external: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  },
  miniState: {
    type: Boolean,
    default: false
  },

  roles: {
    type: Array
  },

  submenu: {
    type: Boolean,
    default: false
  },

  children: {
    type: Array
  },
  isFunction: Boolean,
  callback: Function
})

const hasAccess = computed(() => (props.roles[0] === 0) || (Array.isArray(userRoles) && userRoles.some(role => props.roles.includes(role))))

watch(() => props.roles, (newValue) => {
  console.log('🚀 ~ newValue:', newValue)
})
const onClickNav = () => {
  componentStore.currentPage = props.title
  expanded.value = !expanded.value

  if (props.isFunction) {
    props.callback()
  }
}
</script>

<style>
.active {
  background-color: #72831e;
  /* color: #fff; */
}
</style>
