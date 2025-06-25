<template>
  <q-page padding>
    <!-- Demo Banner -->
    <DemoBanner />
    
    <q-card :flat="$q.screen.lt.sm" class="absolute-center q-pa-lg flex justify-center" :style="{
      width: $q.screen.lt.sm ? '100%' : 'fit-content',
    }">
      <div>
        <!-- LOGO -->
        <div class="flex row justify-between items-end q-mb-xl">
          <q-img fit="cover" src="~assets/logo/sig.svg" spinner-color="primary" spinner-size="82px" width="10%" />
          <q-img fit="cover" src="~assets/logo/logo_sbi.svg" spinner-color="primary" spinner-size="82px" width="40%" />
        </div>

        <!-- TITLE -->
        <div class="text-center text-h6 q-mb-md">
          <span class="text-dark text-weight-bolder">Onsite Meeting (OSM)</span>
        </div>
        <div style="font-size: clamp(10px, 2.5vw, 12px)" class="text-grey-10 text-center">
          Please use your email and password to login
        </div>        <div class="q-mt-md">
          <form @submit.prevent="handleLogin">
            <q-input
              v-model="userStore.username"
              autofocus
              outlined
              input-class="text-dark"
              style="width: 350px"
              placeholder="Email"
              type="email"
              :lazy-rules="true"
              :rules="[
                (val) => !!val || 'Email tidak boleh kosong',
                (val) => val.includes('@') || 'Email harus valid'
              ]"
            />
            <q-input
              v-model="userStore.password"
              outlined
              input-class="text-dark"
              :type="!showPassword ? 'password' : 'text'"
              placeholder="Password"
              class="q-my-sm"
              :lazy-rules="true"
              :rules="[(val) => !!val || 'Password tidak boleh kosong']"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <q-tooltip>
              {{ showPassword ? 'Hide password' : 'Show password' }}
            </q-tooltip>

            <q-checkbox v-model="userStore.rememberMe" label="Remember Me" />

            <q-btn push label="Sign IN" type="submit" color="primary" text-color="dark" class="float-right" />
          </form>
        </div>
      </div>
      <!-- <p class="text-center q-mt-md text-grey-10 cursor-pointer">
        Lupa Password?
      </p> -->
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user-store'
import DemoBanner from 'src/components/DemoBanner.vue'
import ls from 'localstorage-slim'

const $q = useQuasar()
const router = useRouter()

const showPassword = ref(false)

const userStore = useUserStore()

const handleLogin = async () => {
  console.log('🚀 handleLogin clicked!')
  console.log('UserStore state:', { 
    username: userStore.username, 
    password: userStore.password?.length,
    isLoggedIn: userStore.isLoggedIn
  })
  
  try {
    if (userStore.username === '' || userStore.password === '') {
      $q.notify({
        message: 'Username and Password cannot be empty',
        color: 'negative',
        icon: 'warning'
      })
      return
    }
    const loggedIn = await userStore.login()

    if (loggedIn) {
      $q.notify({
        message: 'Login Success',
        color: 'positive',
        textColor: 'dark',
        icon: 'check'
      })
      const targetRoute = router.currentRoute.value.query.redirect
      if (targetRoute) {
        router.push({ path: targetRoute })
      } else {
        router.push({ name: 'home' })
      }
    }
  } catch (error) {
    console.error('❌ Login failed:', error)
    $q.notify({
      message: error.message,
      color: 'negative',
      icon: 'warning'
    })
  }
}
</script>
