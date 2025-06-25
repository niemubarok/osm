import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import ls from 'localstorage-slim'
import { Notify } from 'quasar'
import { 
  sotData, 
  sotParticipantFindingsData, 
  clsrData, 
  locationData,
  findLocationById,
  findClsrById,
  getSotsByLocation,
  getFindingsBySot,
  getSafeFindings,
  getUnsafeFindings
} from 'src/data'

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // Hasil base64 terdapat di reader.result
      resolve(reader.result.split(',')[1]) // Menghilangkan prefix data URL
    }

    reader.onerror = reject

    reader.readAsDataURL(blob)
  })
}

export const useSotStore = defineStore('Sot', {
  state: () => ({
    ImageFileName: ref(''),
    ImageData: ref(''),
    Description: ref(''),
    IsSafe: ref(null),
    ClsrId: ref(''),
    showCamera: ref(false),
    src: ref(''),
    sotFindingList: ref([]),
    sotGroupList: ref([]),
    sotFindingListMeta: ref({}),
    newSotGroupModel: ref({
      attendant: {
        ZRef_LocationId: '',
        Attendant1_EmployeeName: '',
        Attendant1_PhoneNumber: '',
        Attendant1_Picture: null,
        Attendant2_EmployeeName: '',
        Attendant2_PhoneNumber: '',
        Attendant2_Picture: null,
        Notes: ''
      },
      observer: {
        ParticipantId: '',
        SotId: '',
        VehicleCode: ''
      }
    })
  }),

  actions: {
    // DEMO MODE - Using dummy data instead of API calls
    async getSotFindingsById (params) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const page = params?.page || 1
      const limit = params?.limit || 10
      const ParticipantId = ls.get('user')?.id
      
      if (!ParticipantId) {
        console.error('User ID not found in localStorage')
        throw new Error('User not logged in')
      }
      
      // Filter findings by participant
      const userFindings = sotParticipantFindingsData.filter(finding => 
        finding.CreatedBy === ParticipantId
      )
      
      // Add enriched data
      const enrichedFindings = userFindings.map(finding => {
        const clsr = findClsrById(finding.ZRef_ClsrId)
        return {
          ...finding,
          CLSR: clsr,
          StatusText: finding.IsSafe ? 'SAFE' : 'UNSAFE'
        }
      })
      
      // Pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = enrichedFindings.slice(startIndex, endIndex)
      
      this.sotFindingList = paginatedData
      this.sotFindingListMeta = {
        current_page: page,
        per_page: limit,
        total: enrichedFindings.length,
        last_page: Math.ceil(enrichedFindings.length / limit)
      }
      
      return paginatedData
    },

    async getSotFindings (params) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const page = params?.page || 1
      const limit = params?.limit || 10
      
      // Add enriched data
      const enrichedFindings = sotParticipantFindingsData.map(finding => {
        const clsr = findClsrById(finding.ZRef_ClsrId)
        return {
          ...finding,
          CLSR: clsr,
          StatusText: finding.IsSafe ? 'SAFE' : 'UNSAFE'
        }
      })
      
      // Pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = enrichedFindings.slice(startIndex, endIndex)
      
      this.sotFindingList = paginatedData
      this.sotFindingListMeta = {
        current_page: page,
        per_page: limit,
        total: enrichedFindings.length,
        last_page: Math.ceil(enrichedFindings.length / limit)
      }
      
      return paginatedData
    },

    async getClsrList () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      console.log('🚀 ~ getClsr ~ data:', clsrData)
      return clsrData
    },

    async addSotFinding () {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const CreatedDate = new Date()
        const ParticipantId = ls.get('user')?.id
        
        if (!ParticipantId) {
          Notify.create({
            type: 'negative',
            message: 'You are not logged in'
          })
          return
        }

        const user = ls.get('user')
        const ImageFileName = user.email?.split('@')[0] + '_' + CreatedDate.getTime() + '.jpg'

        // Create new finding
        const newFinding = {
          Id: Math.max(...sotParticipantFindingsData.map(f => f.Id)) + 1,
          SotParticipantId: 1, // Default for demo
          CreatedBy: ParticipantId,
          CreatedDate: CreatedDate,
          IsSafe: this.IsSafe,
          ImageFileName: ImageFileName,
          Description: this.Description,
          ZRef_ClsrId: this.ClsrId,
          created_at: new Date(),
          updated_at: new Date()
        }

        // Add to dummy data
        sotParticipantFindingsData.push(newFinding)

        // Reset form
        this.ImageFileName = ''
        this.ImageData = ''
        this.Description = ''
        this.IsSafe = null
        this.ClsrId = ''

        Notify.create({
          type: 'positive',
          textColor: 'black',
          message: 'SOT finding added successfully'
        })

        return newFinding
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error occurred while adding SOT finding'
        })
        console.error('Error adding SOT finding:', error)
      }
    },

    async getSotGroupList () {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Enrich SOT data with location information
      const enrichedSots = sotData.map(sot => {
        const location = findLocationById(sot.ZRef_LocationId)
        return {
          ...sot,
          Location: location
        }
      })
      
      this.sotGroupList = enrichedSots
      return enrichedSots
    },

    async getSotGroupById (Id) {
      if (!Id) {
        Notify.create({
          type: 'negative',
          message: 'Id is required'
        })
        return null
      }

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const sot = sotData.find(s => s.Id === parseInt(Id))
        if (!sot) {
          Notify.create({
            type: 'negative',
            message: 'SOT not found'
          })
          return null
        }

        const location = findLocationById(sot.ZRef_LocationId)
        const findings = getFindingsBySot(sot.Id)
        
        const enrichedSot = {
          ...sot,
          Location: location,
          Findings: findings.map(finding => ({
            ...finding,
            CLSR: findClsrById(finding.ZRef_ClsrId)
          }))
        }

        return enrichedSot
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error occurred while retrieving SOT group'
        })
        console.error('getSotGroupById: error retrieving SOT group', error)
        return null
      }
    },

    async addSotGroup (data) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newSot = {
        Id: Math.max(...sotData.map(s => s.Id)) + 1,
        ...data.attendant,
        created_at: new Date(),
        updated_at: new Date()
      }

      sotData.push(newSot)

      Notify.create({
        type: 'positive',
        textColor: 'black',
        message: 'SOT group added successfully'
      })

      return newSot
    },

    async updateSotGroup (id, data) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = sotData.findIndex(s => s.Id === parseInt(id))
      if (index !== -1) {
        sotData[index] = {
          ...sotData[index],
          ...data,
          updated_at: new Date()
        }
        
        Notify.create({
          type: 'positive',
          message: 'SOT group updated successfully'
        })
      }
      
      return sotData[index]
    },

    async deleteSotGroup (id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = sotData.findIndex(s => s.Id === parseInt(id))
      if (index !== -1) {
        sotData.splice(index, 1)
        
        Notify.create({
          type: 'positive',
          message: 'SOT group deleted successfully'
        })
      }
      
      return { success: true }
    }
  }
})
