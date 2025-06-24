import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useChartStore = defineStore('Chart', {
  state: () => ({
    observationType: [], // 0
    observationTypePerLocation: [], // 0
    numberOfFindingsPerLocation: [], // 0
    numberOfFindingsPerObserver: [], // 0
    numberOfFindingsPerClsr: [],
    totalFindings: 0,
    totalObservers: 0,
    totalSafe: 0,
    totalUnsafe: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    async getChartData () {
      const { data } = await api.get('/sot/chart/all')
      this.totalObservers = data.numberOfFindingsPerObserver.length
      this.totalFindings = data.totalFindings
      this.totalSafe = data.totalSafe
      this.totalUnsafe = data.totalUnsafe
      this.observationType = data.observationType
      this.observationTypePerLocation = data.observationTypePerLocation
      this.numberOfFindingsPerLocation = data.numberOfFindingsPerLocation
      this.numberOfFindingsPerObserver = data.numberOfFindingsPerObserver
      this.numberOfFindingsPerClsr = data.numberOfFindingsPerClsr
    }
  }
})
