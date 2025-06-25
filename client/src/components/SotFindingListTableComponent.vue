<template>

  <q-banner class="bg-primary text-center q-mb-md">
    <span class=" text-weight-bolder text-h6">
      SOT FINDING LIST
      <!-- {{ filter }} -->
    </span>
  </q-banner>

  <q-table ref="tableRef" flat bordered :rows="rows" :columns row-key="FullName" v-model:pagination="pagination"
    :loading="loading" :filter="filter" table-header-class="bg-grey-5 text-black text-weight-bold" class=" q-ma-sm"
    @request="onRequest" binary-state-sort>
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

    <template #loading>
      <q-tr v-for="n in 15" :key="n" class="q-px-sm">
        <!-- <q-td v-for="col in 5" :key="col"> -->
        <q-skeleton type="rect" width="100%" height="30px" class="q-mb-sm " />
        <!-- </q-td> -->
      </q-tr> </template>
    <template #body="props">

      <!-- <q-tr :props="props">
        <q-th auto-width v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-th>
      </q-tr> -->

      <q-tr :props="props" @click="$q.screen.lt.sm ? props.expand = !props.expand : null"
        :class="props.rowIndex % 2 === 0 ? 'bg-grey-2' : ''">
        <!-- {{ props.row }} -->
        <q-td align="center">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td align="center">
          <q-img v-if="props?.row?.ImageData" :src="'data:image/png;base64,' + props?.row?.ImageData" :ratio="16 / 9"
            spinner-color="primary" spinner-size="82px" @click="onClickImage(props?.row?.ImageData)"
            class="cursor-pointer" style="width: 100%; height: 100%;" fit="contain" />
          <div v-else class="text-center">
            <q-icon name="image" size="50px" color="grey-6" />
          </div>
        </q-td>

        <template v-if="userStore.hasAccess('SOT_VIEW')">
          <q-td>
            {{ props?.row?.ParticipantName }}
          </q-td>
          <q-td>
            {{ props?.row?.LocationName }}
          </q-td>
        </template>
        <q-td>
          {{ props?.row?.CreatedDate ? String(props?.row?.CreatedDate).substring(0, 10) : '-' }}
        </q-td>

        <!-- </template> -->
        <q-td align="center">
          <q-chip :class="props?.row?.IsSafe ? 'bg-primary' : 'bg-red-3'"
            :label="props?.row?.IsSafe ? 'Safe' : 'Unsafe'" />
        </q-td>
        <q-td style="white-space: pre-wrap; word-wrap: break-word;">
          <div style="width:200px;">
            {{ props?.row?.Description }}
          </div>
        </q-td>
        <q-td style="white-space: pre-wrap; word-wrap: break-word;">
          <div style="width:200px;">

            {{ props?.row?.ClsrDescription }}
          </div>
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

</template>

<script setup>

import { useUtilStore } from 'src/stores/util-store'
import { useQuasar } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'
import { useSotStore } from 'src/stores/sot-store'
import SotImageViewerComponent from './SotImageViewerComponent.vue'
import { useComponentStore } from 'src/stores/component-store'
import { useUserStore } from 'src/stores/user-store'

const $q = useQuasar()
const utilStore = useUtilStore()
const sotStore = useSotStore()
const userStore = useUserStore()
const componentStore = useComponentStore()
const loading = ref(true)
const tableRef = ref(null)

const initialColumns = ref([
  { name: 'No.', label: 'No.', align: 'center' },
  { name: 'ImageUrl', label: 'Image', align: 'center' },
  { name: 'CreatedBy', label: 'Created By', align: 'left' },
  { name: 'Location', label: 'Location', align: 'left' },
  { name: 'CreatedDate', label: 'Created Date', align: 'left' },
  { name: 'IsSafe', label: 'Safe / Unsafe', align: 'center' },
  { name: 'Description', label: 'Description', align: 'left' },
  { name: 'ClsrDescription', label: 'CLSR Description', align: 'left' }
])

const columns = computed(() => {
  if (!userStore.hasAccess('SOT_VIEW')) {
    return initialColumns.value.filter(column => ['No.', 'IsSafe', 'CreatedDate', 'ImageUrl', 'Description', 'ClsrDescription'].includes(column.name))
  } else {
    return initialColumns.value
  }
})

const pagination = ref({
  sortBy: 'desc',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

// const participantStore = useParticipantStore()
// const props = defineProps({
//   // rows: Array,
//   totalAttendances: Object,
//   attendancesPercentage: Number
// })

const dummyData = [
  {
    No: 1,
    ParticipantName: 'John Doe',
    CreatedBy: 'Admin',
    CreatedDate: '2022-01-01 12:00:00',
    ImageUrl: 'https://via.placeholder.com/100',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Unit: 'Unit 1',
    PositionName: 'Manager'
  },
  {
    No: 2,
    ParticipantName: 'Jane Doe',
    CreatedBy: 'User',
    CreatedDate: '2022-01-02 13:00:00',
    ImageUrl: 'https://via.placeholder.com/100',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Unit: 'Unit 2',
    PositionName: 'Staff'
  },
  {
    No: 3,
    ParticipantName: 'Bob Smith',
    CreatedBy: 'Admin',
    CreatedDate: '2022-01-03 14:00:00',
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
const filter = ref('')

const rows = computed(() => {
  return sotStore.sotFindingList.filter((row) => {
    return !componentStore.searchModels.findings || row.Description.toLowerCase().includes(componentStore.searchModels.findings.toLowerCase())
  })
})

const findingsRef = computed(() => componentStore.searchModels.findings)

watch(findingsRef, (newValue) => {
  filter.value = newValue
})
const onRequest = async (props) => {
  loading.value = true
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  // filter.value = props.filter
  const params = {
    page,
    limit: rowsPerPage,
    sort: sortBy,
    order: descending ? 'desc' : 'asc',
    filter
  }

  if (!userStore.hasAccess('SOT_VIEW')) {
    await sotStore.getSotFindingsById(params)
  } else {
    await sotStore.getSotFindings(params)
  }
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending
  pagination.value.rowsNumber = sotStore.sotFindingListMeta.meta.total
  loading.value = false
}

const onClickImage = (url) => {
  $q.dialog({
    component: SotImageViewerComponent,
    componentProps: {
      src: `data:image/png;base64,${url}`
    }
  })
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
  loading.value = false
})
</script>
