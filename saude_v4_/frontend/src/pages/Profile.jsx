import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { user } = useAuth()
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'' })
  useEffect(()=>{ if(user) setForm({ name:user.name, email:user.email, phone:user.phone||'', address:user.address||'' }) },[user])

  async function save(e){
    e.preventDefault()
    try{
      const res = await api.put('/auth/profile', { email: form.email, phone: form.phone, address: form.address })
      alert('Perfil atualizado')
    }catch(e){ alert(e.response?.data?.message || 'Erro') }
  }

  return (
    <div className="page fade-in">
      <div className="section">
        <h2>Meu Perfil</h2>
        <form onSubmit={save} className="card">
          <label>Nome</label>
          <input value={form.name} readOnly />
          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <label>Telefone</label>
          <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <label>Endereço</label>
          <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
          <div style={{marginTop:12}}>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
