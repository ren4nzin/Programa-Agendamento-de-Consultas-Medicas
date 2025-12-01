import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from '../components/Card'

export default function Admin(){
  const [stats, setStats] = useState({})
  const [appts, setAppts] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(()=>{ (async ()=>{
    try{
      const s = await api.get('/admin/stats'); setStats(s.data)
      const a = await api.get('/admin/appointments'); setAppts(a.data)
      const d = await api.get('/admin/doctors'); setDoctors(d.data)
    }catch(e){ console.error(e) }
  })() },[])

  return (
    <div className="page fade-in">
      <div className="section">
        <h2>Dashboard Admin</h2>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <Card style={{minWidth:180}}><div>Usuários<br/><strong>{stats.users||0}</strong></div></Card>
          <Card style={{minWidth:180}}><div>Médicos<br/><strong>{stats.doctors||0}</strong></div></Card>
          <Card style={{minWidth:180}}><div>Consultas hoje<br/><strong>{stats.apptsToday||0}</strong></div></Card>
        </div>
        <h3 style={{marginTop:18}}>Consultas</h3>
        <div className="grid">
          {appts.map(a=> <Card key={a._id}><div><strong>{a.specialty}</strong> — {a.doctorName} — {a.date} {a.time}</div></Card>)}
        </div>
        <h3 style={{marginTop:18}}>Médicos</h3>
        <div className="grid">
          {doctors.map(d=> <Card key={d._id}><div><strong>{d.name}</strong><div className="muted">{d.specialty}</div></div></Card>)}
        </div>
      </div>
    </div>
  )
}
