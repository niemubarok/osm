import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { 
  sotParticipantFindingsData, 
  locationData, 
  clsrData, 
  participantData,
  findLocationById,
  findClsrById,
  findParticipantById,
  getSafeFindings,
  getUnsafeFindings
} from 'src/data'

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
    // DEMO MODE - Using dummy data instead of API calls
    async getChartData () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Calculate statistics from dummy data
      const safeFindings = getSafeFindings()
      const unsafeFindings = getUnsafeFindings()
      
      this.totalFindings = sotParticipantFindingsData.length
      this.totalSafe = safeFindings.length
      this.totalUnsafe = unsafeFindings.length
      
      // Get unique observers
      const uniqueObservers = [...new Set(sotParticipantFindingsData.map(f => f.CreatedBy))]
      this.totalObservers = uniqueObservers.length
      
      // Observation type (safe vs unsafe)
      this.observationType = [
        { name: 'Safe', value: this.totalSafe, color: '#4CAF50' },
        { name: 'Unsafe', value: this.totalUnsafe, color: '#F44336' }
      ]
      
      // Findings per location
      const findingsPerLocation = locationData.map(location => {
        // Get SOTs for this location
        const locationFindings = sotParticipantFindingsData.filter(finding => {
          // Find the SOT that contains this finding (simplified for demo)
          return finding.Id % locationData.length === (location.Id - 1)
        })
        
        const safeCount = locationFindings.filter(f => f.IsSafe).length
        const unsafeCount = locationFindings.filter(f => !f.IsSafe).length
        
        return {
          location: location.Name,
          safe: safeCount,
          unsafe: unsafeCount,
          total: safeCount + unsafeCount
        }
      }).filter(item => item.total > 0) // Only include locations with findings
      
      this.numberOfFindingsPerLocation = findingsPerLocation
      
      // Observation type per location (detailed breakdown)
      this.observationTypePerLocation = findingsPerLocation.map(item => ({
        location: item.location,
        data: [
          { name: 'Safe', value: item.safe, color: '#4CAF50' },
          { name: 'Unsafe', value: item.unsafe, color: '#F44336' }
        ]
      }))
      
      // Findings per observer
      const findingsPerObserver = uniqueObservers.map(observerId => {
        const observerFindings = sotParticipantFindingsData.filter(f => f.CreatedBy === observerId)
        const participant = findParticipantById(observerId)
        
        const safeCount = observerFindings.filter(f => f.IsSafe).length
        const unsafeCount = observerFindings.filter(f => !f.IsSafe).length
        
        return {
          observer: participant?.FullName || `Observer ${observerId}`,
          safe: safeCount,
          unsafe: unsafeCount,
          total: safeCount + unsafeCount
        }
      }).filter(item => item.total > 0)
      
      this.numberOfFindingsPerObserver = findingsPerObserver
      
      // Findings per CLSR category
      const findingsPerClsr = clsrData.map(clsr => {
        const clsrFindings = sotParticipantFindingsData.filter(f => f.ZRef_ClsrId === clsr.Id)
        
        const safeCount = clsrFindings.filter(f => f.IsSafe).length
        const unsafeCount = clsrFindings.filter(f => !f.IsSafe).length
        
        return {
          category: clsr.Name,
          safe: safeCount,
          unsafe: unsafeCount,
          total: safeCount + unsafeCount
        }
      }).filter(item => item.total > 0)
      
      this.numberOfFindingsPerClsr = findingsPerClsr
      
      console.log('📊 Chart data calculated (Demo Mode):', {
        totalFindings: this.totalFindings,
        totalSafe: this.totalSafe,
        totalUnsafe: this.totalUnsafe,
        totalObservers: this.totalObservers
      })
    }
  }
})
