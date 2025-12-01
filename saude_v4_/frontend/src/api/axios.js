import axios from 'axios'
const API_BASE = 'http://localhost:4000/api'
const api = axios.create({ baseURL: API_BASE, timeout: 10000 })
export default api
