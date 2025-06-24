import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import ls from 'localstorage-slim'
import { Notify } from 'quasar'

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
    async getSotFindingsById (params) {
      const page = params?.page || 1
      const limit = params?.limit || 10
      const ParticipantId = ls.get('user')?.id // Fix: menggunakan 'id' bukan 'userData.Id'
      
      if (!ParticipantId) {
        console.error('User ID not found in localStorage')
        throw new Error('User not logged in')
      }
      
      const res = await api.get(
        '/sot/finding/' + ParticipantId + '/?page=' + page + '&limit=' + limit
      )
      this.sotFindingList = res.data.data
      this.sotFindingListMeta = res.data.meta
      return res.data.data
    },
    async getSotFindings (params) {
      const page = params?.page || 1
      const limit = params?.limit || 10
      const res = await api.get(
        '/sot/finding/all/?page=' + page + '&limit=' + limit
      )
      this.sotFindingList = res.data.data
      this.sotFindingListMeta = res.data.meta
      return res.data.data
    },
    async getClsrList () {
      const { data } = await api.get('/sot/clsr/all')
      console.log('🚀 ~ getClsr ~ data:', data)
      return data
    },

    async addSotFinding () {
      try {
        const CreatedDate = new Date()
        const ParticipantId = ls.get('user')?.id // Fix: menggunakan 'id' bukan 'userData.Id'
        if (!ParticipantId) {
          Notify.create({
            type: 'negative',
            message: 'You are not logged in'
          })
          return
        }
        // Fix: menggunakan email untuk ImageFileName karena tidak ada sAMAccountName
        const user = ls.get('user')
        const ImageFileName = user.email?.split('@')[0] + '_' + CreatedDate.getTime()

        const chunkSize = 10 * 1024 * 1024 // 10MB
        const imageData = atob(this.ImageData.split(',')[1])
        const arrayBuffer = new ArrayBuffer(imageData.length)
        const uintArray = new Uint8Array(arrayBuffer)

        for (let i = 0; i < imageData.length; i++) {
          uintArray[i] = imageData.charCodeAt(i)
        }

        const blob = new Blob([uintArray], { type: 'image/png' })
        const fileSize = blob.size
        const totalChunks = Math.ceil(fileSize / chunkSize)

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize
          const end = Math.min(start + chunkSize, fileSize)
          const chunk = blob.slice(start, end)

          const formData = new FormData()
          formData.append('ImageData', chunk)
          formData.append('ImageFileName', ImageFileName)
          formData.append('CreatedBy', ParticipantId)
          formData.append('IsSafe', this.IsSafe)
          formData.append('Description', this.Description)
          formData.append('ZRef_ClsrId', this.ClsrId)
          formData.append('CreatedDate', CreatedDate.toISOString())

          formData.append('chunkIndex', i)
          formData.append('totalChunks', totalChunks)

          const res = await api.post('/sot/finding/add', formData)
          if (res.status === 200 && res.data.isGroupMember === false) {
            Notify.create({
              type: 'negative',
              textColor: 'black',
              color: 'red',
              message: 'You are not a member of any group'
            })
            return
          }

          if (res.status !== 200) {
            Notify.create({
              type: 'negative',
              message:
                'Error occurred while uploading chunk ' +
                (i + 1) +
                ' of ' +
                totalChunks
            })
            return
          }
        }

        Notify.create({
          type: 'positive',
          textColor: 'black',
          message: 'SOT finding added successfully'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error occurred while adding SOT finding'
        })
      }
    },

    async getSotGroupList () {
      const res = await api.get('/sot/group/all')
      this.sotGroupList = [...res.data.data]
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
        const { data } = await api.get(`/sot/group/${Id}`)
        if (!data || !data.data) {
          Notify.create({
            type: 'negative',
            message: 'No Data'
          })
        }
        return data.data
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
      const res = await api.post('/sot/group/add', data)
      if (res.statusText === 'OK') {
        Notify.create({
          type: 'positive',
          textColor: 'black',
          message: 'SOT group added successfully'
        })
      }
    },
    async updateSotGroup (id, data) {
      const res = await api.put(`/sot/group/update/${id}`, data)
      console.log('🚀 ~ updateSotGroup ~ res:', res)
    },
    async deleteSotGroup (id) {
      const res = await api.delete('/sot/group/delete/' + id)
    }
  }
})
