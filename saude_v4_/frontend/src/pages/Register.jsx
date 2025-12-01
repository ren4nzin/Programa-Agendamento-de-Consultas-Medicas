import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/Button'

export default function Register(){
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
      cpf: form.get('cpf')
    }
    try{
      await api.post('/auth/register', payload)
      alert('Conta criada com sucesso. Faça login.')
      nav('/login')
    }catch(err){
      alert(err.response?.data?.message || 'Erro ao criar conta')
    }
  }

  return (
    <div className="center-page">
      <div className="auth-card">
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome completo</label>
          <input name="name" required />
          <label>Email</label>
          <input name="email" type="email" required />
          <label>Senha</label>
          <input name="password" type="password" required />
          <label>CPF</label>
          <input name="cpf" />
          <div style={{display:'flex',gap:12, marginTop:16}}>
            <Button type="submit">Criar</Button>
            <Button variant="ghost" onClick={() => nav('/login')}>Voltar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
