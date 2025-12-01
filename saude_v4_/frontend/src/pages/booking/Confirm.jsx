import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'

export default function Confirm(){
  const loc = useLocation()
  const nav = useNavigate()
  const { specialty, date, doctor, time } = loc.state || {}

  async function submit(){
    try{
      await api.post('/appointments', { doctorId: doctor._id, specialty, date, time })
      alert('Consulta agendada com sucesso')
      nav('/appointments')
    }catch(e){
      alert(e.response?.data?.message || 'Erro ao agendar')
    }
  }

  return (
    <div className="page">
      <div className="section">
        <BackButton to="/booking/time" />
        <h2>Confirmar Agendamento</h2>
        <div className="card">
          <div><strong>{specialty}</strong> — {doctor?.name}</div>
          <div className="muted">{date} • {time}</div>
        </div>
        <div style={{marginTop:16, display:'flex', gap:12}}>
          <Button variant="ghost" onClick={() => nav('/booking/time')}>Voltar</Button>
          <Button onClick={submit}>Confirmar</Button>
        </div>
      </div>
    </div>
  )
}
