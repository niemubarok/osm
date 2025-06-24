import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMeetingSeatStore = defineStore('MeetingSeat', {
  state: () => ({
    seats: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    async getMeetingSeats () {
      const response = await api.get('/meeting-seats')
      this.seats = response.data
    }
  }
})
