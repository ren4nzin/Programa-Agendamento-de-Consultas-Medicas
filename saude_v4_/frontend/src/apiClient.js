// apiClient.js — corrigido
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function apiUrl(path = '') {
  return API_BASE + path
}
