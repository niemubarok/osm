import { defineStore } from 'pinia'
import { api } from 'src/boot/axios.js'
import CryptoJS from 'crypto-js'
import { ref } from 'vue'
import { useComponentStore } from './component-store'

const componentStore = useComponentStore()

export const useParticipantStore = defineStore('participant', {
  state: () => ({
    participantProfile: [],
    participants: ref([]),
    participantsMeta: ref({}),
    isProfileLoaded: ref(false)
  }),

  getters: {
    filteredParticipants: (state) => {
      // if (componentStore.filterValue === '') return state.participants

      const filtered = state.participants[0]?.data?.filter((participant) => {
        const fullName = participant.FullName.toLowerCase()
        const filter = componentStore.filterValue.toLowerCase()
        return fullName.includes(filter)
      })

      return [filtered]
    }
  },

  actions: {
    // async getParticipantProfileById (id) {
    //   // const response = await api.get(`participant/${id}`)
    //   // const data = await response.json();
    //   this.participant_profile = response.data
    // },
    async getParticipantProfileByUserName (username) {
      const response = await api.post('/participant/show-profile',
        {
          username
        }
      )
      this.participantProfile = response.data
    },
    async addParticipant (data) {
      const response = await api.post('/participant/add', data)
    },
    async getAllParticipants (page) {
      const response = await api.get(`/participant/all/?page=${page}`)
      this.participants.push(response.data)
      this.participantsMeta = response.data.meta
      return response.data.data
    },
    async searchParticipantByName (search) {
      const response = await api.get(`/participant/search/?name=${search}`)
      this.participants.splice(0, this.participants.length, response.data) // replace 0th index with response
      this.participantsMeta = response.data.meta
      return response.data
    },
    async editParticipant (data) {
      const id = parseInt(data?.participant?.Id)
      const response = await api.put(`/participant/${id}`, data)
    },
    async deleteParticipant (id) {
      const response = await api.delete(`/participant/${id}`)
    }
  }
})
