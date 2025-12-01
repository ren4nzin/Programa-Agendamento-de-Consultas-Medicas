import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => nav('/home')}>
          <div className="logo-mark">🩺</div>
          <div className="logo-text">Saúde</div>
        </div>
        <nav>
          {user ? (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/booking/specialty" className="nav-link">Agendar</Link>
              <Link to="/appointments" className="nav-link">Minhas Consultas</Link>
              <button className="btn-ghost" onClick={() => { logout(); nav('/login') }}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Entrar</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
