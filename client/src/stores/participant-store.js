import { defineStore } from 'pinia'
import { api } from 'src/boot/axios.js'
import CryptoJS from 'crypto-js'
import { ref } from 'vue'
import { useComponentStore } from './component-store'
import { participantData, companyData, findCompanyById, findParticipantById } from 'src/data'

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
    // DEMO MODE - Using dummy data instead of API calls
    async getParticipantProfileByUserName (username) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const participant = participantData.find(p => p.UserName === username)
      if (participant) {
        const company = findCompanyById(participant.CompanyId)
        this.participantProfile = {
          ...participant,
          Company: company
        }
      }
      return this.participantProfile
    },

    async addParticipant (data) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newId = Math.max(...participantData.map(p => p.Id)) + 1
      const newParticipant = {
        Id: newId,
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      }
      participantData.push(newParticipant)
      return newParticipant
    },

    async getAllParticipants (page = 1) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const perPage = 10
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      
      const paginatedData = participantData.slice(startIndex, endIndex)
      const enrichedData = paginatedData.map(participant => {
        const company = findCompanyById(participant.CompanyId)
        return {
          ...participant,
          Company: company
        }
      })
      
      const mockResponse = {
        data: enrichedData,
        meta: {
          current_page: page,
          per_page: perPage,
          total: participantData.length,
          last_page: Math.ceil(participantData.length / perPage)
        }
      }
      
      this.participants.push(mockResponse)
      this.participantsMeta = mockResponse.meta
      return mockResponse.data
    },

    async searchParticipantByName (search) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const filtered = participantData.filter(participant => 
        participant.FullName.toLowerCase().includes(search.toLowerCase())
      )
      
      const enrichedData = filtered.map(participant => {
        const company = findCompanyById(participant.CompanyId)
        return {
          ...participant,
          Company: company
        }
      })
      
      const mockResponse = {
        data: enrichedData,
        meta: {
          current_page: 1,
          per_page: enrichedData.length,
          total: enrichedData.length,
          last_page: 1
        }
      }
      
      this.participants.splice(0, this.participants.length, mockResponse)
      this.participantsMeta = mockResponse.meta
      return mockResponse
    },

    async editParticipant (data) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const id = parseInt(data?.participant?.Id)
      const index = participantData.findIndex(p => p.Id === id)
      if (index !== -1) {
        participantData[index] = {
          ...participantData[index],
          ...data.participant,
          updated_at: new Date()
        }
      }
      return participantData[index]
    },

    async deleteParticipant (id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = participantData.findIndex(p => p.Id === id)
      if (index !== -1) {
        participantData.splice(index, 1)
      }
      return { success: true }
    }
  }
})
