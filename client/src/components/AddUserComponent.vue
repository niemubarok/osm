<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-card flat class="q-ma-sm" :style="{
    width: $q.screen.lt.sm ? '90%' : '20dvw',
  }" style="min-width: fit-content;">
    <q-btn flat color="black" icon="close" v-close-popup class="float-right q-mt-sm" />
    <q-banner class=" text-h6">
      Add New User
    </q-banner>
    <q-form @submit="onSubmit">
      <q-card-section>
        <q-select v-model="roles" :options="roleOptions" map-options label-slot stack-label outlined multiple use-chips
          behavior="menu" emit-value class="q-mb-md" color="dark" label-color="black">
          <template #label>
            <div>
              <!-- :label="label"  -->
              <span class=" text-dark ">Roles</span>
              <q-badge style="font-size: small;"
                class="q-px-sm q-ml-sm  bg-red-6 q-mr-md text-white text-italic rounded-borders">required</q-badge>
            </div>
          </template>

          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <RequiredInputComponent label="Username" v-model="username" />
        <!-- <q-input v-model="username" label="Username" outlined lazy-rules
          :rules="[val => !!val || 'Please type a username']" /> -->

        <!-- <RequiredInputComponent label="Password" v-model="password" /> -->
        <!-- <q-input v-model="password" label="Password" outlined type="password"
          :rules="[val => !!val || 'Please type a password']" lazy-rules /> -->
      </q-card-section>
      <q-card-actions align="right">

        <q-btn type="submit" label="Add" color="primary" text-color="black" class="q-px-md" v-close-popup />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { useQuasar } from 'quasar'
import RequiredInputComponent from './RequiredInputComponent.vue'

const $q = useQuasar()

const userStore = useUserStore()

const roleOptions = [
  { label: 'Administrator', value: 1 },
  { label: 'Committee', value: 2 }
]

const roles = ref([])
const username = ref(null)
// const password = ref(null)

const onSubmit = async () => {
  if (!roles.value.length || !username.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Fill all required fields'
    })
    return
  }

  try {
    const data = { roles: roles.value, username: username.value }
    await userStore.addUser(data)
    roles.value = []
    username.value = null
    // password.value = null
    await userStore.getUsers()
  } catch (error) {
    console.error('onSubmit: An error occurred while adding a new user.', error)
  }
}

</script>
