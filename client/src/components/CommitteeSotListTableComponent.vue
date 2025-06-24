<template>
  <q-banner class="bg-primary text-center">
    <span class=" text-weight-bolder text-h6">
      SOT DASHBOARD

    </span>
  </q-banner>
  <q-card v-if="sotStore.ImageFileName !== ''" class="relative-position">
    <q-btn round dense color="red" icon="close" @click="onClickCancel" class="absolute-top-right z-top q-ma-sm" />
    <q-img :src="sotStore.ImageFileName" spinner-color="primary" spinner-size="82px" />
    <!-- <q-card-section> -->
    <div class="bg-transparent q-pa-md fixed-bottom flex justify-center full-width">

      <q-input v-model="sotStore.Description" type="textarea" color="black" label="Description" autofocus autogrow
        class=" q-px-md q-mb-sm bg-semi-transparent rounded-borders " style="width:90%" clearable>

        <template v-slot:append>
          <q-btn square color="primary" text-color="black" icon="send" @click="onSubmit"
            class="rounded-borders q-ml-md " />
        </template>

      </q-input>

    </div>
    <!-- </q-card-section> -->
  </q-card>
  <q-table flat bordered :rows="dummyData" :columns row-key="FullName" :pagination="initialPagination"
    table-header-class="bg-grey-5 text-black text-weight-bold">
    <!-- <template #top>
      <div class="flex justify-center q-gutter-sm text-center full-width">
        <q-card class="col q-pt-sm " :style="$q.screen.lt.md ? 'width: 90dvw' : ' width: 95%;'">
          <div class="text-body q-px-sm">Total Participants</div>
          <q-separator spaced />
          <div class="flex justify-center">
            <q-card-section>
              <q-chip square class="bg-primary q-px-md text-weight-bolder" :class="$q.screen.lt.md ? '' : 'text-h6'"
                :label="rows.length" />
            </q-card-section>
          </div>
        </q-card>
        <q-card class="col q-pt-sm" :style="$q.screen.lt.md ? 'width: 90dvw' : ' width: 95%;'">
          <div class="text-body q-px-sm">Total Attendances</div>
          <q-separator spaced />
          <q-card-section class="flex justify-center">

            <q-chip square class="bg-primary q-px-md q-pt-lg q-pb-md text-weight-bolder"
              :class="$q.screen.lt.md ? '' : 'text-h6'" :label="totalAttendances.Day1">
              <q-badge floating color="dark" text-color="white" label="Day 1" class="q-mb-md" />
            </q-chip>
            <q-chip square class="bg-primary q-px-md q-pt-lg q-pb-md text-weight-bolder"
              :class="$q.screen.lt.md ? '' : 'text-h6'" :label="totalAttendances.Day2">
              <q-badge floating color="dark" text-color="white" label="Day 2" class="q-mb-md" />
            </q-chip>
          </q-card-section>
        </q-card>
        <q-card class="col q-pt-sm">
          <div class="text-body q-px-sm">Attendances Percentage</div>
          <q-separator spaced />
          <q-card-section class="flex justify-center">

            <q-chip square class="bg-primary q-px-md q-pt-lg q-pb-md text-weight-bolder"
              :class="$q.screen.lt.md ? '' : 'text-h6'" :label="`${attendancesPercentage.Day1} %`">
              <q-badge floating color="dark" text-color="white" label="Day 1" class="q-mb-md" />
            </q-chip>
            <q-chip square class="bg-primary q-px-md q-pt-lg q-pb-md text-weight-bolder"
              :class="$q.screen.lt.md ? '' : 'text-h6'" :label="`${attendancesPercentage.Day2} %`">
              <q-badge floating color="dark" text-color="white" label="Day 2" class="q-mb-md" />
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </template> -->
    <template v-slot:body="props">

      <!-- <q-tr :props="props">
        <q-th auto-width v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-th>
      </q-tr> -->
      <q-tr :props="props" @click="$q.screen.lt.sm ? props.expand = !props.expand : null"
        :class="props.rowIndex % 2 === 0 ? 'bg-grey-2' : ''">
        <!-- {{ props.row }} -->
        <q-td>
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td>
          {{ props.row.ParticipantName }}
        </q-td>

        <template v-if="!$q.screen.lt.sm">

          <q-td>
            {{ props.row.CreatedBy }}
          </q-td>
          <q-td>
            {{ props.row.CreatedAt }}
          </q-td>
          <q-td>
            <q-img :src="props.row.ImageUrl" :ratio="16 / 9" spinner-color="primary" spinner-size="82px" />
          </q-td>
        </template>

        <q-td>
          {{ props.row.Description }}
        </q-td>
      </q-tr>
      <!-- <q-tr v-if="props.expand && $q.screen.lt.sm" :props="props">
        <q-td colspan="100%">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="grey-8" name="corporate_fare" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Company Name
                </q-item-label>
                <q-item-label>{{ props.row?.Name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="grey-8" name="work" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Unit
                </q-item-label>
                <q-item-label>{{ props.row?.Unit }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="grey-8" name="account_tree" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Position
                </q-item-label>
                <q-item-label>{{ props.row?.PositionName }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-td>
      </q-tr> -->
    </template>

    <template v-slot:no-data>
      <div class="q-pa-md">
        No Data
      </div>
    </template>
  </q-table>
  <!-- {{ rows }} -->
</template>

<script setup>

import { useUtilStore } from 'src/stores/util-store'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useSotStore } from 'src/stores/sot-store'
import CameraComponent from 'src/components/CameraComponent.vue'

const $q = useQuasar()
const utilStore = useUtilStore()
const sotStore = useSotStore()
const onClickCancel = () => {
  sotStore.ImageFileName = ''
  sotStore.Description = ''
}

const initialColumns = ref([
  { name: 'No.', label: 'No.', align: 'center' },
  { name: 'ParticipantName', label: 'Participant Name', align: 'left' },
  { name: 'CreatedBy', label: 'Created By', align: 'left' },
  { name: 'CreatedAt', label: 'Created At', align: 'left' },
  { name: 'ImageUrl', label: 'Image', align: 'left' },
  { name: 'Description', label: 'Description', align: 'center' }
])

const columns = computed(() => {
  if ($q.screen.lt.sm) {
    return initialColumns.value.filter(column => ['No.', 'ParticipantName', 'Description'].includes(column.name))
  } else {
    return initialColumns.value
  }
})

// const participantStore = useParticipantStore()
const props = defineProps({
  rows: Array,
  totalAttendances: Object,
  attendancesPercentage: Number
})

const dummyData = [
  {
    No: 1,
    ParticipantName: 'John Doe',
    CreatedBy: 'Admin',
    CreatedAt: '2022-01-01 12:00:00',
    ImageUrl: 'https://via.placeholder.com/100',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Unit: 'Unit 1',
    PositionName: 'Manager'
  },
  {
    No: 2,
    ParticipantName: 'Jane Doe',
    CreatedBy: 'User',
    CreatedAt: '2022-01-02 13:00:00',
    ImageUrl: 'https://via.placeholder.com/100',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Unit: 'Unit 2',
    PositionName: 'Staff'
  },
  {
    No: 3,
    ParticipantName: 'Bob Smith',
    CreatedBy: 'Admin',
    CreatedAt: '2022-01-03 14:00:00',
    ImageUrl: 'https://via.placeholder.com/100',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Unit: 'Unit 3',
    PositionName: 'Director'
  }
]

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
  // rowsNumber: xx if getting data from a server
}

</script>
