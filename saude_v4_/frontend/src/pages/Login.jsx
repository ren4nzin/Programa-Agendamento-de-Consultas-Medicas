import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../frontend/../src/context/AuthContext'
import api from '../api/axios'
import Button from '../components/Button'

export default function Login(){
  const nav = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')
    try{
      const res = await api.post('/auth/login',{ email, password })
      login(res.data)
      nav('/home')
    }catch(err){
      alert(err.response?.data?.message || 'Erro no login')
    }
  }

  return (
    <div className="center-page">
      <div className="auth-card">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" required />
          <label>Senha</label>
          <input name="password" type="password" required />
          <div style={{display:'flex',gap:12, marginTop:16}}>
            <Button type="submit">Entrar</Button>
            <Button variant="ghost" onClick={() => nav('/register')}>Registrar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
