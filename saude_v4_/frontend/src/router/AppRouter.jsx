import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ChooseSpecialty from '../pages/booking/ChooseSpecialty'
import ChooseDate from '../pages/booking/ChooseDate'
import ChooseDoctor from '../pages/booking/ChooseDoctor'
import ChooseTime from '../pages/booking/ChooseTime'
import Confirm from '../pages/booking/Confirm'
import MyAppointments from '../pages/MyAppointments'
import Reschedule from '../pages/booking/Reschedule'   // <-- IMPORT AQUI
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function AppRouter(){
  return (
    <>
      <Header />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/booking/specialty" element={<PrivateRoute><ChooseSpecialty /></PrivateRoute>} />
          <Route path="/booking/date" element={<PrivateRoute><ChooseDate /></PrivateRoute>} />
          <Route path="/booking/doctor" element={<PrivateRoute><ChooseDoctor /></PrivateRoute>} />
          <Route path="/booking/time" element={<PrivateRoute><ChooseTime /></PrivateRoute>} />
          <Route path="/booking/confirm" element={<PrivateRoute><Confirm /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><MyAppointments /></PrivateRoute>} />
          <Route path="/reschedule" element={<PrivateRoute><Reschedule /></PrivateRoute>} />
          
        </Routes>
      </main>
    </>
  )
}
