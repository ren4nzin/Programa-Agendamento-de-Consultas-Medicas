import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import Card from '../../components/Card'
import BackButton from '../../components/BackButton'
import { useNavigate } from 'react-router-dom'

export default function ChooseSpecialty(){
  const [specialties, setSpecialties] = useState([])
  const nav = useNavigate()

  useEffect(()=>{ (async ()=>{
    try{
      const res = await api.get('/doctors/specialties')
      setSpecialties(res.data)
    }catch(e){ console.error(e) }
  })() },[])

  return (
    <div className="page">
      <div className="section">
        <BackButton to="/home" />
        <h2>Escolha a Especialidade</h2>
        <div className="grid">
          {specialties.map(s => (
            <Card key={s} onClick={() => nav('/booking/date', { state:{ specialty:s } })} style={{cursor:'pointer'}}>
              <div className="card-title">{s}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
