import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
const AuthContext = createContext()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=> {
    try{
      const raw = localStorage.getItem('@saude:user')
      return raw ? JSON.parse(raw) : null
    }catch(e){ return null }
  })
  const [token, setToken] = useState(()=> localStorage.getItem('@saude:token') || null)

  useEffect(()=>{
    if(token){
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common.Authorization
    }
  },[token])

  const login = ({ token, user })=>{
    setToken(token)
    setUser(user)
    localStorage.setItem('@saude:token', token)
    localStorage.setItem('@saude:user', JSON.stringify(user))
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  const logout = ()=>{
    setToken(null)
    setUser(null)
    localStorage.removeItem('@saude:token')
    localStorage.removeItem('@saude:user')
    delete api.defaults.headers.common.Authorization
  }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export function useAuth(){ return useContext(AuthContext) }
