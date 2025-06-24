<template>
  <q-card flat bordered class=" q-ma-sm" :style="{
    width: $q.screen.lt.sm ? '95%' : 'fit-content',
  }">
    <q-skeleton height="150px" square />

    <q-card-section class="full-width no-padding q-mb-sm">
      <q-skeleton height="30px" width="150px" square class="absolute bg-grey-9 q-pa-sm"
        style="top: 0; right: 10px;font-size:small;transform: translateY(-150%);max-width: 60%; " />
      <q-skeleton height="30px" width="150px" square class="absolute bg-grey-9 q-pa-sm"
        style="top: 0; left: 10px;font-size:small;transform: translateY(-150%);max-width: 60%; " />
      <q-skeleton height="30px" width="100px" square class="q-mb-md" />
      <div class="flex row justify-evenly">
        <div class="column items-center">
          <q-skeleton type="QAvatar" size="60px" />
          <q-skeleton height="30px" width="100px" square class="q-mb-md" />
        </div>
        <div class="column items-center">
          <q-skeleton type="QAvatar" size="60px" />
          <q-skeleton height="30px" width="100px" square class="q-mb-md" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="no-padding">
      <q-skeleton height="30px" width="100px" square class="q-mb-md" />
      <q-separator />
      <div>
        <q-list>
          <q-item>
            <q-skeleton height="30px" width="100px" square />
          </q-item>
          <q-separator />
        </q-list>
      </div>
    </q-card-section>

  </q-card>
</template>
