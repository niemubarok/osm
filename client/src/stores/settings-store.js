import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'

export const useSettingsStore = defineStore('Settings', {
  state: () => ({
    meetingDate: {
      Day1: null,
      Day2: null
    },
    vehicles: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    async updateMeetingDate (meetingDate) {
      const res = await api.post('/settings/update-meeting-date', {
        meetingDate
      })
      return res
    },

    async getMeetingDate () {
      const res = await api.get('/settings/meeting-date')
      this.meetingDate = res.data.meetingDate
    },

    async getCompanies () {
      const res = await api.get('/settings/companies')
      return res.data?.companies
    },
    async addCompany (data) {
      const res = await api.post('/settings/add-company', data)
      // return res
    },
    async getVehicles () {
      const res = await api.get('/settings/vehicles')
      this.vehicles = res.data.vehicles
      return res.data.vehicles
    },
    async getVehicleDetails () {
      const res = await api.get('/settings/vehicle-details')
      return res.data
    },
    async getMeetingSeats () {
      const res = await api.get('/settings/meeting-seats')
      return res.data.meetingSeats
    },

    async addMeetingSeat (data) {
      const res = await api.post('/settings/add-meeting-seat', data)
      return res
    },
    async addVehicle (data) {
      const res = await api.post('/settings/add-vehicle', data)
      return res
    },
    async deleteVehicle (id) {
      if (!id) {
        Notify.create({
          message: 'Id is required',
          color: 'negative',
          position: 'top'
        })
        return
      }
      try {
        const res = await api.delete(`/settings/delete-vehicle/${id}`)
        if (res.data.error) {
          Notify.create({
            message: res.data.error,
            color: 'negative',
            position: 'top'
          })
        }
        return res
      } catch (error) {
        Notify.create({
          message: error.message,
          color: 'negative',
          position: 'top'
        })
      }
    },

    async updateVehicle (id, data) {
      if (!id) {
        Notify.create({
          message: 'Id is required',
          color: 'negative',
          position: 'top'
        })
        return
      }
      try {
        const res = await api.put(`/settings/update-vehicle/${id}`, data)
        return res
      } catch (error) {
        Notify.create({
          message: error.message,
          color: 'negative',
          position: 'top'
        })
      }
    }
  }
})
