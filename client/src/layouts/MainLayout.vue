<template>

  <!-- v-bind:class="{absolute:minicomponentStore }" -->

  <q-layout view="lHh Lpr lFf">

    <q-header v-if="$route.meta.showHeader && componentStore.showHeader" class=" noprint bg-grey-2 shadow-1">
      <!-- Demo Banner -->
      <DemoBanner />

      <q-toolbar>
        <q-btn class="noprint " flat icon="menu" color="dark" aria-label="Menu"
          @click="$q.screen.lt.md ? componentStore.leftDrawerOpen = !componentStore.leftDrawerOpen : componentStore.miniState = !componentStore.miniState" />

        <q-toolbar-title class="flex justify-between text-dark text-h4 text-bold">
          <!-- {{ componentStore.isShowSearchBox }} -->
          <q-slide-transition>
            <div v-if="!componentStore.isShowSearchBox">
              <LogoSBI width="100px" />
            </div>
          </q-slide-transition>
          <q-space />
          <q-slide-transition>
            <div v-show="componentStore.isShowSearchBox || !$q.screen.lt.md"
              :style="$q.screen.lt.md ? 'width: 100%' : 'width: 60%'">
              <!-- Search Bar-->
              <q-input ref="searchRef" v-if="$route.meta.showSearchBar"
                v-model="componentStore.searchModels[currentPage]"
                @blur="() => componentStore.searchModels[currentPage] !== '' ? componentStore.isShowSearchBox = true : componentStore.isShowSearchBox = false"
                dense outlined :label="'Search ' + currentPage" color="dark" label-color="dark" bg-color="grey-4"
                input-class="text-black" style="width: 100%" type="search" debounce="500" clearable
                @clear="componentStore.searchModels[currentPage] = ''">

                <template v-if="$q.screen.lt.md" v-slot:after>
                  <q-icon name="cancel" @click="componentStore.searchModels[currentPage] = ''" />
                </template>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </q-slide-transition>

          <!-- <q-slide-transition> -->
          <q-space />

          <q-btn v-if="!componentStore.isShowSearchBox && $q.screen.lt.md && $route.meta.showSearchBar" dense flat
            color="dark" icon-right="search" label="Search" @click="onClickSearch" aria-label="Search" />

          <!-- <div v-if="!componentStore.isShowSearchBox && $q.screen.lt.lg"
            class="q-ml-xl text-h5 text-weight-bolder text-right text-grey-8">
            OSM
            <q-badge outline class="text-grey-7">
              v1.0
            </q-badge>
          </div> -->
          <!-- <div v-if="!$q.screen.lt.lg" class="q-ml-xl text-h5 text-weight-bolder text-right text-grey-8">
            On Site Meeting SBI
            <q-badge outline class="text-grey-7">
              v1.0
            </q-badge>
          </div> -->

          <!-- </q-slide-transition> -->

        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="$route.meta.showSidebar" :mini="componentStore.miniState" :mini-width="90" show-if-above
      v-model="componentStore.leftDrawerOpen" :width="200" class="bg-grey-1 z-top q-px-sm shadow-1">
      <!-- <div
        v-if="componentStore.minicomponentStore == false"
        class="noprint q-mini-drawer-hide absolute"
        style="z-index:10;bottom: 100px; right: -17px"
      >
        <q-btn
          class="noprint "
          dense
          unelevated
          round
          color="primary"
          icon="chevron_left"
          @click="componentStore.minicomponentStore = true"
          v-if="componentStore.minicomponentStore == false"
        />
      </div>

      <div
        v-if="componentStore.minicomponentStore == true"
        class="noprint q-mini-drawer-hide absolute"
        style="z-index:10;bottom: 100px; right: 1px"
      >
        <q-btn
          dense
          unelevated
          round
          color="primary"
          icon="chevron_left"
          @click="componentStore.minicomponentStore = false"
          v-if="componentStore.minicomponentStore == true"
        />
      </div> -->

      <div class="bg-grey-1 q-py-md">

        <div class="text-center">
          <!-- <LogoSIG width="40px" class="q-mt-md" /> -->
          <!-- <LogoSBI v-if="$q.screen.lt.md" width="80%" /> -->
        </div>
        <!-- <q-separator class="q-mt-sm" /> -->
        <div class="q-my-md text-center">

        </div>
      </div>
      <div class="noprint q-ma-sm bg-transparent text-dark "
        style="border-radius:5px;background-color:rgb(43, 103, 171, 0.3)">
        <div class="noprint">

          <q-list style="margin-top:27px">

            <EssentialLink v-for="link in componentStore.essentialLinks" :key="link.title" v-bind="link"
              :miniState="componentStore.miniState" :roles="link.roles" :submenu="link.submenu"
              :children="link.children" :is-function="link.isFunction" :callback="logout" :external="link.external" />
          </q-list>
          <!-- <q-btn color="primary" icon="logout" label="Logout" @click="onClick" /> -->
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
      <!-- <keep-alive> -->
      <router-view v-slot="{ Component }">
        <!-- <suspense> -->
        <component :is="Component" />
        <!-- </suspense> -->
      </router-view>
      <!-- </keep-alive> -->

    </q-page-container>

  </q-layout>

</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import DemoBanner from 'components/DemoBanner.vue'
import { useComponentStore } from 'src/stores/component-store'
import { useUserStore } from 'src/stores/user-store'
import LogoSBI from 'src/components/LogoSBI.vue'
import LogoSIG from 'src/components/LogoSIG.vue'
import { ref, nextTick, onMounted as onBeforeMount, onUpdated } from 'vue'
import { useParticipantStore } from 'src/stores/participant-store'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const componentStore = useComponentStore()
const userStore = useUserStore()
const searchRef = ref(null)
const participantStore = useParticipantStore()
const currentPage = ref('')

onUpdated(() => {
  currentPage.value = route.meta.searchModel
})

onBeforeMount(() => {
  currentPage.value = route.meta.searchModel
})

const logout = async () => {
  const success = await userStore.logout()
  if (success) {
    router.push({ path: '/login' })
  }
}

// const updateSearchModel = (value) => {
//   searchModels[currentPage.value] = value
// }

// const searchModels = {
//   participants: componentStore.participantsSearchModel,
//   'meeting-seats': componentStore.meetingSeatsSearchModel,
//   attendances: componentStore.attendancesSearchModel
// }

// const onSearch = async () => {
//   if (componentStore.filterValue.length > 2) {
//     await participantStore.searchParticipants(componentStore.filterValue)
//   }
// else {
//   participantStore.participants = []
//   await participantStore.getAllParticipants(1)
// }
// }

const onClickSearch = () => {
  componentStore.isShowSearchBox = !componentStore.isShowSearchBox
  nextTick(() => {
    searchRef.value.focus()
  })
}

</script>
<style>
.q-drawer .q-drawer--left .q-drawer--standard {
  border-radius: 0 20px 20px 0;

}

.q-item--clickable:hover {
  background: #a1b63b;
  border-radius: 5px;
}

/* .q-item.q-item-type.q-router-link--exact-active {
  background-color: #a1b63b;
  border-radius: 5px;
  height: 5px;
} */

.q-drawer .q-drawer-container {
  border-radius: 0 20px 0 0;
}

.none {
  display: none;
}
</style>
