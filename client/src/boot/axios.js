import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true // Enable cookies for session auth
})

// Add a request interceptor (untuk session auth, tidak perlu Authorization header)
api.interceptors.request.use(
  (config) => {
    // Session auth menggunakan cookies automatically
    // Tidak perlu manual Authorization header
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor untuk handle auth errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
