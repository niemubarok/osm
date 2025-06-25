import { defineStore } from 'pinia'
import { Cookies, Notify } from 'quasar'
import { api } from 'src/boot/axios.js'
import ls from 'localstorage-slim'
import { ref } from 'vue'
import { userData, participantData } from 'src/data'

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
    // DEMO MODE - Using dummy data instead of API calls
    async login () {
      try {
        console.log('🔄 Starting demo login process...')
        console.log('Username:', this.username)
        console.log('Password length:', this.password?.length)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Find user in dummy data
        const user = userData.find(u => 
          u.email === this.username && u.password === this.password
        )
        
        if (!user) {
          const message = 'Please Check Your Email or Password'
          Notify.create({
            message,
            type: 'negative'
          })
          throw new Error(message)
        }
        
        // Find corresponding participant data
        const participant = participantData.find(p => 
          p.Email === user.email
        )
        
        // Create user object with participant info
        this.user = {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          participant: participant || null
        }
        
        ls.set('user', this.user)
        
        // Set default role for demo
        this.roles = [1] // Admin role for demo
        ls.set('roles', this.roles)
        
        console.log('✅ Demo login successful, user stored:', this.user)
        
        Notify.create({
          message: 'Login successful! (Demo Mode)',
          type: 'positive'
        })
        
        return true 
      } catch (error) {
        console.error('❌ Demo login error:', error)
        throw error
      }
    },

    async logout () {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.user = {}
        this.roles = [0]
        ls.remove('user')
        ls.remove('roles')
        
        Notify.create({
          message: 'Successfully logged out (Demo Mode)',
          type: 'positive'
        })
        return true
      } catch (error) {
        console.error('Logout error:', error)
        // Clear local data even if server logout fails
        this.user = {}
        this.roles = [0]
        ls.remove('user')
        ls.remove('roles')
        return true
      }
    },

    async checkAuth () {
      try {
        // Check if user exists in localStorage
        const storedUser = ls.get('user')
        const storedRoles = ls.get('roles')
        
        if (storedUser && storedRoles) {
          this.user = storedUser
          this.roles = storedRoles
          return true
        }
        
        return false
      } catch (error) {
        this.user = {}
        this.roles = [0]
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Math.max(...userData.map(u => u.id)) + 1,
        full_name: data.username,
        email: data.username + '@demo.com',
        password: data.password,
        created_at: new Date(),
        updated_at: new Date()
      }
      
      userData.push(newUser)
      
      Notify.create({
        message: 'User added successfully (Demo Mode)',
        type: 'positive',
        position: 'top',
        timeout: 2000,
        classes: ['bg-positive text-black']
      })
      
      return { status: 200, data: newUser }
    },

    async getUsers () {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.users = userData.map(user => ({
          ...user,
          role: 'Admin' // Default role for demo
        }))
        
        return this.users
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const userIndex = userData.findIndex(u => u.id === UserId)
        if (userIndex !== -1) {
          userData[userIndex].role = RoleId
          userData[userIndex].updated_at = new Date()
        }
        
        Notify.create({
          message: 'User role updated successfully (Demo Mode)',
          type: 'positive'
        })
        
        return { status: 200, data: userData[userIndex] }
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const userIndex = userData.findIndex(u => u.id === id)
        if (userIndex !== -1) {
          userData[userIndex][column] = value
          userData[userIndex].updated_at = new Date()
        }
        
        Notify.create({
          message: 'User updated successfully (Demo Mode)',
          type: 'positive'
        })
        
        return { status: 200, data: userData[userIndex] }
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const userIndex = userData.findIndex(u => u.id === id)
        if (userIndex !== -1) {
          userData.splice(userIndex, 1)
        }
        
        Notify.create({
          message: 'User deleted successfully (Demo Mode)',
          type: 'positive'
        })
        
        return { status: 200 }
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
