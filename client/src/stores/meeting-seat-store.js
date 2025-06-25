import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { 
  meetingSeatData, 
  getOccupiedSeats, 
  getAvailableSeats,
  findParticipantById
} from 'src/data'

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
    // DEMO MODE - Using dummy data instead of API calls
    async getMeetingSeats () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Enrich seat data with participant information
      const enrichedSeats = meetingSeatData.map(seat => {
        if (seat.IsOccupied && seat.ParticipantId) {
          const participant = findParticipantById(seat.ParticipantId)
          return {
            ...seat,
            Participant: participant
          }
        }
        return seat
      })
      
      this.seats = enrichedSeats
      
      console.log('🪑 Meeting seats loaded (Demo Mode):', {
        total: meetingSeatData.length,
        occupied: getOccupiedSeats().length,
        available: getAvailableSeats().length
      })
      
      return enrichedSeats
    }
  }
})
