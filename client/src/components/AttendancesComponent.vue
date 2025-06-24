<template>
  <q-table flat bordered :rows="props.rows" :columns row-key="FullName" :pagination="initialPagination"
    table-header-class="bg-grey-5 text-black text-weight-bold">
    <template #top>
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
    </template>
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
          {{ props.row.FullName }}
        </q-td>

        <template v-if="!$q.screen.lt.sm">

          <q-td>
            {{ props.row.PositionName }}
          </q-td>
          <q-td>
            {{ props.row.Unit }}
          </q-td>
          <q-td>
            {{ props.row.Name }}
          </q-td>
        </template>

        <q-td>
          <!-- <q-chip class="bg-primary" :label="utilStore.formatDate(props.row.Day1)" /> -->
          <q-chip square :style="props.row.Day1 ? 'background-color: #e9f7a4' : 'background-color:#f5acb4'"
            :label="utilStore.formatDate(props.row.Day1) + ' (' + utilStore.formatTime(props.row.Day1) + ')'" />
        </q-td>
        <q-td>
          <q-chip square :style="props.row.Day2 ? 'background-color: #e9f7a4' : 'background-color:#f5acb4'"
            :label="utilStore.formatDate(props.row.Day2) + ' (' + utilStore.formatTime(props.row.Day2) + ')'" />
        </q-td>
      </q-tr>
      <q-tr v-if="props.expand && $q.screen.lt.sm" :props="props">
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
      </q-tr>
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
const utilStore = useUtilStore()
const $q = useQuasar()

const initialColumns = ref([
  { name: 'No.', label: 'No.', align: 'center' },
  { name: 'Name', label: 'Name', align: 'left' },
  // { name: 'Email', label: 'Email', align: 'left' },
  // { name: 'Phone', label: 'Phone', align: 'left' },
  { name: 'Position', label: 'Position', align: 'left' },
  { name: 'Unit', label: 'Unit', align: 'left' },
  { name: 'Company', label: 'Company', align: 'left' },
  { name: 'Day 1', label: 'Day 1', align: 'center' },
  { name: 'Day 2', label: 'Day 2', align: 'center' }
])

const columns = computed(() => {
  if ($q.screen.lt.sm) {
    return initialColumns.value.filter(column => ['No.', 'Name', 'Day 1', 'Day 2'].includes(column.name))
  } else {
    return initialColumns.value
  }
})

// const participantStore = useParticipantStore()
const props = defineProps({
  rows: Array,
  totalAttendances: Object,
  attendancesPercentage: Object
})

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 0
  // rowsNumber: xx if getting data from a server
}

</script>
