import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'

export default function ChooseTime(){
  const loc = useLocation()
  const { specialty, date, doctor } = loc.state || {}
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{ (async ()=>{
    if(!doctor) return
    try{
      const res = await api.get(`/doctors/${doctor._id}/availability`, { params:{ date } })
      setSlots(res.data.available || [])
    }catch(e){ console.error(e) }
  })() },[doctor,date])

  function confirm(){
    if(!selected) return alert('Escolha um horário')
    nav('/booking/confirm', { state:{ specialty, date, doctor, time:selected } })
  }

  return (
    <div className="page">
      <div className="section">
        <BackButton to="/booking/doctor" />
        <h2>Escolha o Horário — {doctor?.name}</h2>
        <div className="grid times-grid">
          {slots.map(s => (
            <div key={s} className={'time-pill ' + (selected===s ? 'active':'')} onClick={() => setSelected(s)}>{s}</div>
          ))}
        </div>
        <div style={{marginTop:20, display:'flex', gap:12}}>
          <Button onClick={() => nav('/home')} variant="ghost">Cancelar</Button>
          <Button onClick={confirm}>Confirmar Agendamento</Button>
        </div>
      </div>
    </div>
  )
}
