import axios from 'axios'
import ls from 'local-storage'
import { startLogout } from '../redux/actions/auth'
import store from '../redux/store'
import { toast } from 'react-toastify'

// Add a request interceptor
var axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  // Attaching token to headers for authentication on backend
  if (ls('authorization')) {
    const token = ls('authorization')
    if (config.method !== 'OPTIONS') {
      config.headers.Authorization = token
    }
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { status } = error.response
  if (status === 440) {
    store.dispatch(startLogout())
    toast.warn('You\'ve been logged out due to inactivity.  Please log back in.')
  }

  if (status === 498) {
    const originalRequest = error.config
    const token = error.response.data.token
    ls('authorization', token)

    return new Promise((resolve, reject) => {
      originalRequest.headers.authorization = token
      resolve(axios(originalRequest))
    })
  } else {
    return Promise.reject(error)
  }
})

export default axiosInstance
