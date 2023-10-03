import axios from 'axios'
// import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'

// const cookie = cookies()

// const token = cookie.get('login-page-token')
const token = getCookie('login-page-token')

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}
