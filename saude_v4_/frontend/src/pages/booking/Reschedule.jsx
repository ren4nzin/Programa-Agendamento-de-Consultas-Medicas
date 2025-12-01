import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'

export default function Reschedule(){
  const loc = useLocation()
  const { appointment } = loc.state || {}
  const [dates] = useState(()=>{ const arr=[]; const t=new Date(); for(let i=0;i<14;i++){ const d=new Date(t); d.setDate(t.getDate()+i); arr.push(d.toISOString().slice(0,10)); } return arr; })
  const [slots, setSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{ (async ()=>{
    if(!appointment || !selectedDate) return
    try{
      const res = await api.get(`/doctors/${appointment.doctorId}/availability`, { params:{ date:selectedDate } })
      setSlots(res.data.available || [])
    }catch(e){ console.error(e) }
  })() },[appointment,selectedDate])

  async function submit(){
    if(!selectedDate || !selectedTime) return alert('Escolha data e horário')
    try{
      await api.put('/appointments/'+appointment._id+'/reschedule', { date:selectedDate, time:selectedTime })
      alert('Reagendamento efetuado com sucesso')
      nav('/appointments')
    }catch(e){
      alert(e.response?.data?.message || 'Erro ao reagendar')
    }
  }

  if(!appointment) return <div className="page"><div className="section"><BackButton to="/appointments" /><div>Selecione uma consulta para reagendar.</div></div></div>

  return (
    <div className="page fade-in">
      <div className="section">
        <BackButton to="/appointments" />
        <h2>Reagendar — {appointment.doctorName}</h2>
        <div className="grid">
          {dates.map(d => <div key={d} className={'date-card outlined ' + (selectedDate===d?'active':'')} onClick={() => setSelectedDate(d)}>{d}</div>)}
        </div>
        <div className="grid times-grid" style={{marginTop:12}}>
          {slots.map(s => <div key={s} className={'time-pill outlined ' + (selectedTime===s?'active':'')} onClick={() => setSelectedTime(s)}>{s}</div>)}
        </div>
        <div style={{marginTop:16, display:'flex', gap:12}}>
          <Button variant="ghost" onClick={() => nav('/appointments')}>Cancelar</Button>
          <Button onClick={submit}>Confirmar Reagendamento</Button>
        </div>
      </div>
    </div>
  )
}
