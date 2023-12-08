import axios from 'axios'

export const BASE_URL = 'https://reqres.in/api/'

const restClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: BASE_URL
})

export default restClient
