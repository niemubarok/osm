import cryptoJs from 'crypto-js'
import { defineStore } from 'pinia'
import { Dialog } from 'quasar'
import QrCodeDialog from 'src/components/QrCodeDialog.vue'

export const useUtilStore = defineStore('Util', {
  state: () => ({
    colors: [
      '#C5DC57', '#FFE0E6', '#8BC34A', '#FF9800', '#2196F3',
      '#4CAF50', '#FF69B4', '#8E24AA', '#03A9F4', '#FFC107',
      '#9C27B0', '#673AB7', '#3F51B5', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A',
      '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E', '#FF9800',
      '#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#8BC34A'
    ]
  }),

  getters: {
  },

  actions: {
    encodeUsername (username) {
      const secretKey = process.env.SECRET_KEY
      const encryptedUserName = cryptoJs.AES.encrypt(
        username,
        secretKey
      ).toString()
      return btoa(encryptedUserName)
    },
    decodeUsername (username) {
      const secretKey = process.env.SECRET_KEY
      const encryptedUserName = atob(username)
      const decryptedUserName = cryptoJs.AES.decrypt(
        encryptedUserName,
        secretKey
      ).toString(cryptoJs.enc.Utf8)
      return decryptedUserName
    },
    onClickGenerateQrCode (username) {
      const encodedUserName = this.encodeUsername(username)

      const url = `${window.location.origin}/profile/${encodedUserName}`
      Dialog.create({
        component: QrCodeDialog,
        componentProps: {
          qrCodeValue: url
        }
      })
    },
    formatDate (date) {
      if (!date) return 'N/A'
      try {
        return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      } catch (e) {
        console.error('Error formatting date:', e)
        return 'N/A'
      }
    },

    formatTime (date) {
      if (!date) return 'N/A'
      try {
        return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':')
      } catch (e) {
        console.error('Error formatting time:', e)
        return 'N/A'
      }
    },
    formatDateToDigit (date) {
      return new Date(date).toISOString().slice(0, 10)
    },
    compareDates (date1, date2) {
      return new Date(date1).getTime() >= new Date(date2).getTime()
    },
    blobToBase64 (blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = () => {
          // Hasil base64 terdapat di reader.result
          resolve(reader.result.split(',')[1]) // Menghilangkan prefix data URL
        }

        reader.onerror = reject

        reader.readAsDataURL(blob)
      })
    },
    getColor (index) {
      return this.colors[index % this.colors.length]
    }
  }
})
