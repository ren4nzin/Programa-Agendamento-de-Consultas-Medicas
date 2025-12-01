import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Home(){
  const nav = useNavigate()
  return (
    <div className="page">
      <div className="hero">
        <h1>Bem-vindo ao Saúde</h1>
        <p>Agende consultas presenciais ou online com facilidade.</p>
        <div style={{marginTop:16}}>
          <Button onClick={() => nav('/booking/specialty')}>Agendar Consulta</Button>
          <Button variant="ghost" onClick={() => nav('/appointments')} style={{marginLeft:12}}>Minhas Consultas</Button>
        </div>
      </div>
    </div>
  )
}
