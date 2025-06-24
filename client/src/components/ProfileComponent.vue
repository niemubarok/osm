<template>
  <q-card flat bordered class="bg-grey-2 relative" :style="{ width: $q.screen.lt.sm ? '100%' : 'fit-content' }">
    <div class="bg-grey-3 flex justify-between">
      <q-chip flat square class="bg-transparent text-weight-bolder q-ma-sm" label="PROFILE" />
      <q-btn flat color="dark" icon="logout" @click="logout" />
    </div>
    <q-separator />
    <q-card-section class="bg-white">
      <!-- <div v-if="$q.screen.lt.sm" class="text-right" style="margin-bottom: -10px" @click="qrcodeDialog = true">
        <q-btn flat color="dark" icon="qr_code" />
        <q-dialog v-model="qrcodeDialog">
          <div>
            <q-card class="absolute-center" style="width: 95dvw; height: 50dvh">
              <div>
                <q-avatar v-close-popup size="20px" color="red-6" text-color="white" icon="close"
                  class="absolute-top-right z-top q-ma-sm" />
              </div>
              <q-card-section class="flex justify-center content-center full-height">
                <QrCodeComponent />
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>
      </div> -->
      <div style="z-index: 1">
        <q-item>
          <q-item-section avatar>
            <q-avatar square size="100px" font-size="52px" color="teal" text-color="white" class="rounded-borders">
              <img :src="'https://ui-avatars.com/api/?name=' + data.FullName + '&?background=random'">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ data?.FullName }}</q-item-label>
            <q-separator spaced />
            <q-item-label caption>
              <q-icon color="grey-8" name="mail" />
              {{ data?.Email }}
            </q-item-label>
            <q-item-label caption>
              <q-icon color="grey-8" name="phone" />
              {{ data?.PhoneNumber }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="grey-8" name="corporate_fare" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              Company Name
            </q-item-label>
            <q-item-label>{{ data?.CompanyName }}</q-item-label>
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
            <q-item-label>{{ data?.Unit }}</q-item-label>
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
            <q-item-label>{{ data?.PositionName }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <!-- <q-card-actions vertical align="center" class="q-pa-none">
      <q-banner class="full-width bg-grey-4">
        Meeting Attendance

      </q-banner>

      <div class="full-width q-px-md">
        <q-item class="bg-grey-3 rounded-borders q-pa-none q-mb-md q-mt-md q-pr-sm">
          <q-item-section avatar class="q-pl-md bg-primary rounded-borders">
            <div class="text-center full-width text-weight-bolder">Day 1</div>
          </q-item-section>
          <q-item-section class="q-pl-md ">
            <q-item-label class="text-weight-bolder">09-02-2024</q-item-label>
            <q-separator />
            <q-item-label caption lines="2" class="text-weight-bolder text-black">05:00</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-avatar icon="task_alt" color="primary" />
          </q-item-section>
        </q-item>
      </div>
      <div class="full-width q-px-md">

        <q-item class="bg-grey-4 rounded-borders q-pa-none q-pr-sm q-mb-md ">
          <q-item-section avatar class="text-center items-center bg-red-4 rounded-borders">
            <div class=" q-pl-md text-weight-bolder">Day 2</div>
          </q-item-section>
          <q-item-section class="q-pl-md ">
            <q-item-label class="text-weight-bolder">09-02-2024</q-item-label>
            <q-separator />
            <q-item-label caption lines="2" class="text-weight-bolder text-black">05:00</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-avatar icon="cancel" color="red-4" text-color="white" />
          </q-item-section>
        </q-item>
      </div>
      <div class="full-width q-px-md q-mb-md">

        <q-btn push size="xl" color="primary" text-color="dark" label=" CHECK IN" class="full-width q-py-md q-mt-md" />
      </div>
    </q-card-actions> -->
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ls from 'localstorage-slim'
import QrCodeComponent from 'src/components/QrCodeComponent.vue'
import { useUserStore } from 'src/stores/user-store'
import { Cookies } from 'quasar'
const userStore = useUserStore()

const router = useRouter()
const logout = () => {
  ls.clear()
  Cookies.remove('token')
  router.push({ path: '/login' })
}

const props = defineProps({
  data: {
    type: [String, Object, null]
  }
})

const qrcodeDialog = ref(false)
</script>
