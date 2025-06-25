import { defineStore } from 'pinia'
import { Cookies, Notify } from 'quasar'
import { api } from 'src/boot/axios.js'
import ls from 'localstorage-slim'
import { ref } from 'vue'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: ref([]),
    user: {},
    username: '',
    password: '',
    rememberMe: false,
    roles: ref(ls.get('roles') || [0]), // 0: guest, 1: admin, 2: committee
    permissions: {
      checkin_button: [2],
      SOT_VIEW: [1, 2],
      EDIT_GROUP: [1, 2],
      VEHICLE_EDIT: [1, 2],
      ATTENDANCES_CHART: [1, 2],
      ADD_SOT: [0, 1],
      ADD_PARTICIPANT: [1, 2]
    }
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    async login () {
      try {
        console.log('🔄 Starting login process...')
        console.log('Username:', this.username)
        console.log('Password length:', this.password?.length)
        
        const res = await api.post('/auth/login', {
          email: this.username, // Menggunakan email sebagai username
          password: this.password
        })

        console.log('🚀 ~ login ~ res?.data:', res?.data)
        console.log('Full login response:', res)
        
        if (!res?.data || !res?.data.token) {
          console.error('Login response does not contain token')
          return false
        } 
        
        // Store JWT token
        ls.set('auth_token', res.data.token)
        
        // Store user data
        this.user = res.data.user
        ls.set('user', this.user)

        // Set default role untuk database auth (bisa disesuaikan nanti)
        this.roles = [1] // Default admin role, nanti bisa ditambah role system
        ls.set('roles', this.roles)
        
        console.log('✅ Login successful, user stored:', this.user)
        console.log('✅ Token stored:', res.data.token)
        return true 
      } catch (error) {
        console.error('❌ Login error:', error)
        
        if (error.code === 'ERR_NETWORK') {
          const message = 'Failed to connect to the server'
          Notify.create({
            message,
            type: 'negative'
          })
          throw new Error(message)
        }
        
        if (error.response?.status === 401) {
          const message = 'Please Check Your Email or Password'
          Notify.create({
            message,
            type: 'negative'
          })
          throw new Error(message)
        } 
        
        if (error.response?.data?.message) {
          Notify.create({
            message: error.response.data.message,
            type: 'negative'
          })
          throw new Error(error.response.data.message)
        }
        
        // Generic error
        const message = 'Login failed. Please try again.'
        Notify.create({
          message,
          type: 'negative'
        })
        throw new Error(message)
      }
    },

    async logout () {
      try {
        await api.post('/auth/logout')
        this.user = {}
        this.roles = [0]
        ls.remove('auth_token')
        ls.remove('user')
        ls.remove('roles')
        Notify.create({
          message: 'Successfully logged out',
          type: 'positive'
        })
        return true
      } catch (error) {
        console.error('Logout error:', error)
        // Clear local data even if server logout fails
        this.user = {}
        this.roles = [0]
        ls.remove('auth_token')
        ls.remove('user')
        ls.remove('roles')
        return true
      }
    },

    async checkAuth () {
      try {
        console.log('🔄 Checking authentication status...')
        
        // Check if token exists
        const token = ls.get('auth_token')
        if (!token) {
          console.log('❌ No auth token found')
          return false
        }
        
        const res = await api.get('/auth/me')
        console.log('🚀 checkAuth response:', res)
        
        if (res.data?.user) {
          this.user = res.data.user
          ls.set('user', this.user)
          this.roles = [1] // Default role
          ls.set('roles', this.roles)
          console.log('✅ Auth check successful, user:', this.user)
          return true
        }
        console.log('❌ Auth check failed: no user data')
        return false
      } catch (error) {
        console.error('❌ Auth check error:', error)
        console.error('Error response:', error.response)
        
        // Clear invalid token
        this.user = {}
        this.roles = [0]
        ls.remove('auth_token')
        ls.remove('user')
        ls.remove('roles')
        return false
      }
    },

    hasAccess (component) {
      return this.roles.some((role) =>
        this.permissions[component].includes(role)
      )
    },

    async addUser (data) {
      const res = await api.post('/user/add', {
        data: {
          roles: data.roles,
          UserName: data.username,
          Password: data.password
        }
      })
      if (res.status === 200) {
        Notify.create({
          message: 'User added successfully',
          type: 'positive',
          position: 'top',
          timeout: 2000,
          classes: ['bg-positive text-black']
        })
      }
      return res
    },

    async getUsers () {
      try {
        const res = await api.get('/user/all')
        if (res.data) {
          this.users = res.data
        } else {
          Notify.create({
            message: 'Failed to get users',
            type: 'negative',
            position: 'top',
            timeout: 2000,
            classes: ['bg-negative text-white']
          })
        }
      } catch (error) {
        Notify.create({
          message: 'Failed to get users',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
      }
    },
    async updateRole (UserId, RoleId) {
      if (!UserId || !RoleId) {
        Notify.create({
          message: 'updateRole: UserId or RoleId is null or undefined',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        return null
      }
      try {
        const res = await api.post('/user/role/update', {
          UserId,
          RoleId
        })
        return res
      } catch (error) {
        Notify.create({
          message: 'updateRole: error updating user role',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        console.error('updateRole: error updating user role', error)
        return null
      }
    },

    async updateUser (id, column, value) {
      if (!id || !column || value === undefined || value === null) {
        Notify.create({
          message: 'updateUser: id, column, or value is null or undefined',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        return null
      }
      try {
        const res = await api.post('/user/update', { id, column, value })
        return res
      } catch (error) {
        Notify.create({
          message: 'updateUser: error updating user',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        console.error('updateUser: error updating user', error)
        return null
      } 
    },

    async deleteUser (id) {
      if (!id) {
        Notify.create({
          message: 'deleteUser: id is null or undefined',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        return null
      }
      try {
        const res = await api.delete(`/user/${id}`)
        return res
      } catch (error) {
        Notify.create({
          message: 'deleteUser: error deleting user',
          type: 'negative',
          position: 'top',
          timeout: 2000,
          classes: ['bg-negative text-white']
        })
        console.error('deleteUser: error deleting user', error)
        return null
      }
    }
  }
})
