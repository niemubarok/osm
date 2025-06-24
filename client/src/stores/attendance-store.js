import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useAttendanceStore = defineStore('Attendance', {
  state: () => ({
    totalParticipants: ref(0),
    totalCheckedIn: ref({
      Day1: 0,
      Day2: 0
    }),
    attendances: ref([]),
    chartData: ref([])
  }),

  getters: {
    attendancesPersentage: (state) => {
      if (isNaN(state.totalParticipants) || state.totalParticipants === 0) {
        return {
          Day1: 0,
          Day2: 0
        }
      }
      return {
        Day1: ((state.totalCheckedIn.Day1 / state.totalParticipants) * 100).toFixed(2),
        Day2: ((state.totalCheckedIn.Day2 / state.totalParticipants) * 100).toFixed(2)
      }
    }
  },

  actions: {
    async checkIn (data) {
      const res = await api.post('/participant/attendance/check-in', data)
      return res
    },
    async getAllAttendances () {
      const res = await api.get('/participant/attendance/all')
      this.totalParticipants = res.data.length
      this.totalCheckedIn = res.data.reduce((acc, curr) => {
        if (curr.Day1 !== null) {
          acc.Day1 += 1
        }
        if (curr.Day2 !== null) {
          acc.Day2 += 1
        }
        return acc
      }, { Day1: 0, Day2: 0 })
      this.attendances = res.data
      return res.data
    },
    async getChartData () {
      const res = await api.get('/participant/attendance/all')
      // this.totalParticipants = res.data.length
      this.chartData = res.data.map((attendance) => {
        const checkInDay1 = attendance.Day1 !== null ? 1 : 0
        const checkInDay2 = attendance.Day2 !== null ? 1 : 0
        const checkInCount = checkInDay1 + checkInDay2
        return {
          FullName: attendance.FullName,
          checkInCount
        }
      })
    },
    async getAttendanceById (id) {
      // if (id == null) {
      //   throw new Error('AttendanceStore.getAttendanceById: id is null or undefined')
      // }

      try {
        const res = await api.get(`/participant/attendance/${id}`)
        return res.data
      } catch (error) {
        console.error('🚀 ~ getAttendanceById ~ error:', error)
        throw error
      }
    }
  }
})
