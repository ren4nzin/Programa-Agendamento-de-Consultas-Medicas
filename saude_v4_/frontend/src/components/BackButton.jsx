import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function BackButton({to}) {
  const nav = useNavigate()
  return <button className='btn-ghost small' onClick={() => nav(to || -1)}>← Voltar</button>
}
