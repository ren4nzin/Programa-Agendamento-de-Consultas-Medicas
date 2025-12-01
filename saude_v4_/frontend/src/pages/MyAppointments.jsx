import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from '../components/Card'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  async function load() {
    try {
      setLoading(true)
      const res = await api.get('/appointments')
      setAppointments(res.data || [])
    } catch (e) {
      console.error(e)
      alert('Erro ao carregar consultas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function cancelAppointment(appt) {
    const id = appt?._id || appt?.id

    if (!id) {
      alert('Erro: ID inválido')
      console.log('Agendamento recebido:', appt)
      return
    }

    if (!confirm('Deseja realmente cancelar esta consulta?')) return

    try {
      await api.delete('/appointments/' + id)
      alert('Consulta cancelada com sucesso!')
      load()
    } catch (e) {
      console.error(e)
      alert('Erro ao cancelar consulta')
    }
  }

  function goReschedule(appt) {
    nav('/reschedule', { state: { appointment: appt } })
  }

  return (
    <div className="page fade-in">
      <div className="section">
        
        <h2 style={{ marginBottom: 20 }}>Minhas Consultas</h2>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 20, opacity: 0.7 }}>
            Carregando consultas...
          </div>
        )}

        {/* Sem consultas */}
        {!loading && appointments.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 20, opacity: 0.7 }}>
            Você ainda não possui consultas agendadas.
          </div>
        )}

        {/* Lista */}
        <div className="grid" style={{ gap: 16 }}>
          {appointments.map(a => (
            <Card key={a._id} className="fade-in" style={{ padding: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                
                {/* Informações da consulta */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {a.specialty} — {a.doctorName}
                  </div>
                  <div className="muted" style={{ marginTop: 4 }}>
                    {a.date} • {a.time}
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color:
                        a.status === 'CANCELLED'
                          ? '#ff4d4f'
                          : a.status === 'RESCHEDULED'
                          ? '#faad14'
                          : '#52c41a'
                    }}
                  >
                    {a.status === 'CANCELLED'
                      ? 'CANCELADO'
                      : a.status === 'RESCHEDULED'
                      ? 'REAGENDADO'
                      : 'CONFIRMADO'}
                  </div>
                </div>

                {/* Botões */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    variant="ghost"
                    onClick={() => goReschedule(a)}
                    disabled={a.status === 'CANCELLED'}
                  >
                    Reagendar
                  </Button>

                  <Button
                    onClick={() => cancelAppointment(a)}
                    style={{
                      background: '#ff4d4f',
                      color: 'white',
                      opacity: a.status === 'CANCELLED' ? 0.5 : 1
                    }}
                    disabled={a.status === 'CANCELLED'}
                  >
                    Cancelar
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
