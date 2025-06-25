import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { 
  participantData, 
  attendanceData, 
  getAttendanceByParticipantId,
  getTotalCheckedIn 
} from 'src/data'

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
    // DEMO MODE - Using dummy data instead of API calls
    async checkIn (data) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const { ParticipantId, Day } = data
      const attendanceIndex = attendanceData.findIndex(a => a.ParticipantId === ParticipantId)
      
      if (attendanceIndex !== -1) {
        const currentTime = new Date()
        if (Day === 1) {
          attendanceData[attendanceIndex].Day1 = currentTime
        } else if (Day === 2) {
          attendanceData[attendanceIndex].Day2 = currentTime
        }
        attendanceData[attendanceIndex].updated_at = currentTime
      }
      
      return { status: 200, data: attendanceData[attendanceIndex] }
    },

    async getAllAttendances () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600))
      
      this.totalParticipants = participantData.length
      
      const checkedInCount = getTotalCheckedIn()
      this.totalCheckedIn = checkedInCount
      
      this.attendances = attendanceData
      
      console.log('📋 Attendance data loaded (Demo Mode):', {
        total: this.totalParticipants,
        day1: checkedInCount.Day1,
        day2: checkedInCount.Day2
      })
      
      return attendanceData
    },

    async getChartData () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600))
      
      this.chartData = attendanceData.map((attendance) => {
        const checkInDay1 = attendance.Day1 !== null ? 1 : 0
        const checkInDay2 = attendance.Day2 !== null ? 1 : 0
        const checkInCount = checkInDay1 + checkInDay2
        
        return {
          FullName: attendance.FullName,
          checkInCount
        }
      })
      
      return this.chartData
    },

    async getAttendanceById (id) {
      if (id == null) {
        throw new Error('AttendanceStore.getAttendanceById: id is null or undefined')
      }

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400))
        
        const attendance = getAttendanceByParticipantId(id)
        if (!attendance) {
          throw new Error('Attendance not found')
        }
        
        return attendance
      } catch (error) {
        console.error('🚀 ~ getAttendanceById ~ error:', error)
        throw error
      }
    }
  }
})
