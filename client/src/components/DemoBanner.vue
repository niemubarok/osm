<template>
  <q-banner 
    v-if="showBanner" 
    class="bg-amber-2 text-amber-8 q-mb-md"
    dense
    inline-actions
  >
    <div class="row items-center">
      <q-icon name="info" class="q-mr-sm" />
      <div class="text-weight-medium">
        Demo Mode Active
      </div>
      <q-space />
      <q-btn 
        flat 
        dense 
        icon="close" 
        @click="hideBanner"
        class="text-amber-8"
      />
    </div>
    <div class="text-caption q-mt-xs">
      Aplikasi sedang berjalan dalam mode demo dengan data dummy. 
      <q-btn 
        flat 
        dense 
        no-caps
        color="amber-8"
        @click="showCredentials = true"
        class="text-caption q-pa-none"
        style="text-decoration: underline;"
      >
        Lihat kredensial demo
      </q-btn>
    </div>
  </q-banner>

  <!-- Demo Credentials Dialog -->
  <q-dialog v-model="showCredentials" :maximized="$q.screen.lt.sm">
    <q-card style="max-width: 600px; width: 100%">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Demo Credentials</div>
        <div class="text-subtitle2">Kredensial untuk testing aplikasi</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <div class="text-h6 text-grey-8">Users Available:</div>
        
        <q-list separator>
          <q-item 
            v-for="user in demoUsers" 
            :key="user.email"
            class="q-pa-md"
          >
            <q-item-section>
              <q-item-label class="text-weight-medium">
                {{ user.role }}
              </q-item-label>
              <q-item-label caption>
                <strong>Email:</strong> {{ user.email }}
              </q-item-label>
              <q-item-label caption>
                <strong>Password:</strong> {{ user.password }}
              </q-item-label>
            </q-item-section>
            
            <q-item-section side>
              <q-btn 
                flat 
                dense 
                icon="content_copy"
                @click="copyCredentials(user)"
                color="primary"
              >
                <q-tooltip>Copy credentials</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <div class="text-body2 text-grey-7">
          <div class="text-weight-medium q-mb-xs">Demo Features:</div>
          <ul class="q-pl-md">
            <li>15 Participants dari 5 perusahaan</li>
            <li>8 SOT records dengan lokasi berbeda</li>
            <li>15 SOT findings (safe/unsafe)</li>
            <li>Data dummy dari seeder backend</li>
            <li>Simulasi API delays</li>
          </ul>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn 
          flat 
          label="Close" 
          color="primary" 
          @click="showCredentials = false" 
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const showBanner = ref(true)
const showCredentials = ref(false)

const demoUsers = [
  {
    email: 'admin@sbi.co.id',
    password: 'password123',
    role: 'Super Administrator'
  },
  {
    email: 'safety.manager@sbi.co.id',
    password: 'password123',
    role: 'Safety Manager'
  },
  {
    email: 'hse.coordinator@sbi.co.id',
    password: 'password123',
    role: 'HSE Coordinator'
  },
  {
    email: 'plant.manager@sbi.co.id',
    password: 'password123',
    role: 'Plant Manager'
  },
  {
    email: 'ops.supervisor@sbi.co.id',
    password: 'password123',
    role: 'Operations Supervisor'
  }
]

const hideBanner = () => {
  showBanner.value = false
  localStorage.setItem('demo_banner_hidden', 'true')
}

const copyCredentials = (user) => {
  const text = `Email: ${user.email}\nPassword: ${user.password}`
  navigator.clipboard.writeText(text).then(() => {
    $q.notify({
      message: 'Credentials copied to clipboard',
      type: 'positive',
      position: 'top'
    })
  })
}

onMounted(() => {
  const hidden = localStorage.getItem('demo_banner_hidden')
  if (hidden === 'true') {
    showBanner.value = false
  }
})
</script>
