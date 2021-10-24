import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

const TOKEN_KEY = 'token'

const getAuthToken = () => localStorage.getItem(TOKEN_KEY)

HTTP.interceptors.request.use((config) => {
  const token = getAuthToken()
  
  if (token && config && config.headers){
    config.headers.Authorization = token
  }

  return config
})

export default HTTP