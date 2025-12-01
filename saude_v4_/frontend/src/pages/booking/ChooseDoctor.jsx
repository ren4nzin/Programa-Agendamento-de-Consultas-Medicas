import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import Card from '../../components/Card'
import BackButton from '../../components/BackButton'

export default function ChooseDoctor(){
  const loc = useLocation()
  const { specialty, date } = loc.state || {}
  const [doctors, setDoctors] = useState([])
  const nav = useNavigate()

  useEffect(()=>{ (async ()=>{
    try {
      const res = await api.get('/doctors', { params:{ specialty } })
      setDoctors(res.data)
    } catch(e){ console.error(e) }
  })() },[specialty])

  return (
    <div className="page">
      <div className="section">
        <BackButton to="/booking/date" />
        <h2>Escolha o Médico — {specialty}</h2>
        <div className="grid">
          {doctors.map(d => (
            <Card key={d._id} style={{cursor:'pointer'}} onClick={() => nav('/booking/time', { state:{ specialty, date, doctor:d } })}>
              <div className="card-title">{d.name}</div>
              <div className="muted">{d.crm} • {d.specialty}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
