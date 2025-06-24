<template>
  <q-banner class=" bg-grey-3">
    <div class="flex row justify-between">

      <q-item>
        <q-item-section avatar>
          <q-chip square class="bg-primary q-pr-md" icon="group">

            <span class="q-pl-sm text-weight-bold">
              {{ participantStore.participants[0]?.meta?.total }}
            </span>
          </q-chip>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">
            MEETING PARTICIPANTS
          </q-item-label>
        </q-item-section>

      </q-item>

      <!-- <q-btn-dropdown color="primary" text-color="grey-8" label="Sort" icon="sort">
        <q-list>
          <q-item clickable v-close-popup @click="sortParticipants('name')">
            <q-item-section>
              <q-item-label>Sort by Name</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="sortParticipants('id')">
            <q-item-section>
              <q-item-label>Sort by Date</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->
    </div>
  </q-banner>

  <div class=" flex justify-center">
    <participant-card-skeleton v-if="isLoading" />
  </div>
  <q-card v-if="componentStore.isShowSearchBox && participantStore.participants[0]?.data.length < 1"
    class="q-ma-md full-width" flat bordered>
    <q-card-section class="flex flex-center">
      <q-icon name="sentiment_dissatisfied" size="40px" color="grey-7" />
      <div class="text-h6 q-ml-sm text-center">Participant Not Found</div>
    </q-card-section>
  </q-card>
  <q-card v-if="componentStore.isShowSearchBox && componentStore.searchModels.participants.length < 3"
    class="q-ma-md full-width" flat bordered>
    <q-card-section class="flex flex-center">
      <q-icon name="info" size="40px" color="grey-7" />
      <div class="text-h6 q-ml-sm text-center">Type at least 3 characters</div>
    </q-card-section>
  </q-card>
  <div ref="scrollTargetRef" style="max-height: 90dvh; overflow: auto;">
    <q-infinite-scroll @load="onLoad" :offset="1150" :scroll-target="scrollTargetRef">
      <div v-for="(item, index) in participantStore.participants" :key="index"
        class="caption flex justify-center q-px-md">
        <participant-card-component :participants="item.data" />

      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <participant-card-skeleton />
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" expand>
      <q-btn fab icon="add" text-color="black" color="primary" @click="showAddParticipantDialog" class="shadow-1" />
      <q-tooltip>
        Add Participant

      </q-tooltip>
    </q-page-sticky>
  </div>
</template>

<script setup>
import ParticipantCardComponent from 'src/components/ParticipantCardComponent.vue'
import ParticipantCardSkeleton from 'src/components/ParticipantCardSkeleton.vue'
import AddParticipantComponent from 'src/components/AddParticipantComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { useParticipantStore } from 'src/stores/participant-store'
import { useComponentStore } from 'src/stores/component-store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const participantStore = useParticipantStore()
const componentStore = useComponentStore()
const page = ref(1)
const isLoading = ref(true)

const scrollTargetRef = ref(null)

const onLoad = async (index, done) => {
  if (isLoading.value) {
    done()
    return
  }
  // isLoading.value = true
  // setTimeout(async () => {
  try {
    if (componentStore.searchModels.participants === '') {
      const nextPage = participantStore.participantsMeta?.nextPageUrl?.split('=')[1]
      if (nextPage) {
        await participantStore.getAllParticipants(+nextPage)
        page.value = +nextPage
      }
    }
    //  else if (componentStore.searchModels.participants.length > 2) {
    //   await participantStore.searchParticipants(componentStore.searchModels.participants, page.value + 1)
    //   page.value++
    // }
  } catch (error) {
    console.error('Error loading participants:', error)
  } finally {
    isLoading.value = false
    done()
  }
  // }, 1000)
}

const isSearching = ref(false)

watch(
  () => componentStore.searchModels.participants,
  async (newValue) => {
    if (!isSearching.value) {
      isSearching.value = true
      // Lakukan pencarian
      participantStore.participants = []
      page.value = 1

      if (newValue.length > 2) {
        await participantStore.searchParticipantByName(newValue, 1)
      } else if (newValue === '') {
        await participantStore.getAllParticipants(1)
      }
      isSearching.value = false
    }
  }
)

const showAddParticipantDialog = () => {
  $q.dialog({
    component: AddParticipantComponent
  })
}

// const sortParticipants = (sortBy) => {
//   if (sortBy === 'name') {
//     participantStore.participants.sort((a, b) => a.data.FullName.localeCompare(b.data.FullName))
//   } else if (sortBy === 'id') {
//     // console.log('🚀 ~ sortParticipants ~ participantStore.participants:', participantStore.participants)
//     const sortedParticipant = participantStore.participants.map(data => data.data.sort(
//       (a, b) => a.ParticipantId)
//     )
//     // console.log('🚀 ~ sortParticipants ~ sortedParticipant:', sortedParticipant)
//   }
// }

onMounted(async () => {
  componentStore.searchModels.participants = ''
  componentStore.isShowSearchBox = false
  // setTimeout(async () => {
  await participantStore.getAllParticipants(1)
  isLoading.value = false
  // }, 2000)
})
</script>
