import { boot } from 'quasar/wrappers'
import ls from 'localstorage-slim'
import { Notify } from 'quasar'
import { useUserStore } from 'src/stores/user-store'

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    try {
      const userStore = useUserStore()
      const user = ls.get('user')
      const roles = ls.get('roles')

      // Skip auth check for login page
      if (to.path === '/login') {
        next()
        return
      }

      // Check if user is logged in
      if (!user) {
        // Try to check auth with server
        const isAuthenticated = await userStore.checkAuth()
        if (!isAuthenticated) {
          Notify.create({
            message: 'Please login!',
            type: 'negative',
            position: 'top'
          })
          next({ path: '/login', query: { redirect: to.path } })
          return
        }
      }

      // Check role-based access
      if (to.meta?.roles && roles !== null && to.meta !== null && to.meta.roles !== null) {
        if (!roles.some(role => to.meta.roles.includes(role)) && to.meta?.roles[0] !== 0) {
          Notify.create({
            message: 'You do not have access to this page!',
            type: 'negative',
            position: 'top'
          })
          next({ name: 'home' })
          return
        }
      }

      next()
    } catch (error) {
      console.error('Error in beforeEach router:', error)
      Notify.create({
        message: 'An unexpected error occurred. Please contact the administrator.',
        type: 'negative',
        position: 'top'
      })
      next({ path: '/login', query: { redirect: to.path } })
    }
  })
})
