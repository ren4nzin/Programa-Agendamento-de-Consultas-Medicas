import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
function nextDays(n=14){ const arr=[]; const t=new Date(); for(let i=0;i<n;i++){ const d=new Date(t); d.setDate(t.getDate()+i); arr.push(d.toISOString().slice(0,10)); } return arr }
export default function ChooseDate(){
  const loc = useLocation()
  const nav = useNavigate()
  const specialty = loc.state?.specialty
  const dates = nextDays(14)
  return (
    <div className="page">
      <div className="section">
        <BackButton to="/booking/specialty" />
        <h2>Escolha a Data — {specialty}</h2>
        <div className="grid">
          {dates.map(d => (
            <div key={d} className="date-card" onClick={() => nav('/booking/doctor', { state:{ specialty, date:d } })}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
