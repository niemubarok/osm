<template>
  <q-card flat bordered v-for="item in 6" :key="item" class=" relative q-ma-sm" :style="{
    width: $q.screen.lt.sm ? '100%' : '25%',
  }" style="min-width: 45dvh;">
    <!-- Skeleton loading placeholder -->
    <q-skeleton animation="wave">
      <div>
        <q-card-section class="bg-white">
          <div class="flex justify-end">
            <q-badge color="primary" text-color="black" class="absolute-top-left q-ma-sm q-py-xs q-px-md">
              <q-skeleton type="QBadge" />
            </q-badge>
            <div class="text-right" style="margin-bottom: -10px">
              <!-- <q-btn flat color="g" icon="qr_code"> -->
              <q-skeleton type="QBtn" class="q-mr-sm" />
              <!-- </q-btn> -->
            </div>
            <!-- <q-btn flat color="g" icon="visibility"> -->
            <q-skeleton type="QBtn" />
            <!-- </q-btn> -->
          </div>
          <div style="z-index: 1">
            <q-item>
              <q-item-section avatar>
                <q-avatar square size="100px" class="q-mb-md" style="border-radius: 10px;">
                  <q-skeleton type="QAvatar" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-separator spaced />
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </div>
    </q-skeleton>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

</script>
