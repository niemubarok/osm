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
      // Distribute findings across locations based on SOT data
      const findingsPerLocation = locationData.map((location, index) => {
        // Create a more realistic distribution of findings per location
        const locationFindings = sotParticipantFindingsData.filter((finding, findingIndex) => {
          // Distribute findings more evenly: every nth finding goes to location n
          return findingIndex % locationData.length === index
        })
        
        const safeCount = locationFindings.filter(f => f.IsSafe).length
        const unsafeCount = locationFindings.filter(f => !f.IsSafe).length
        
        console.log(`🗺️ Location "${location.Name}": findings=${locationFindings.length}, safe=${safeCount}, unsafe=${unsafeCount}`)
        
        return {
          Name: location.Name, // Match component expectation
          NumberOfFindings: safeCount + unsafeCount, // Match component expectation
          location: location.Name,
          safe: safeCount,
          unsafe: unsafeCount,
          total: safeCount + unsafeCount
        }
      })

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
        
        console.log(`👥 Observer "${participant?.FullName || observerId}": findings=${observerFindings.length}, safe=${safeCount}, unsafe=${unsafeCount}`)
        
        return {
          ObserverName: participant?.FullName || `Observer ${observerId}`, // Match component expectation
          NumberOfFindings: safeCount + unsafeCount, // Match component expectation
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
        
        console.log(`📋 CLSR "${clsr.Name}": findings=${clsrFindings.length}, safe=${safeCount}, unsafe=${unsafeCount}`)
        
        return {
          Name: clsr.Name, // Match component expectation
          NumberOfFindings: safeCount + unsafeCount, // Match component expectation
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
        totalObservers: this.totalObservers,
        observationType: this.observationType,
        numberOfFindingsPerLocation: this.numberOfFindingsPerLocation,
        numberOfFindingsPerObserver: this.numberOfFindingsPerObserver,
        numberOfFindingsPerClsr: this.numberOfFindingsPerClsr
      })
    }
  }
})
