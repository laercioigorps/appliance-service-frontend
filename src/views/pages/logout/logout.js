import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let navigate = useNavigate()
  useEffect(() => {
    sessionStorage.removeItem('token')
    //navigate('/dashboard')
    window.location.replace('/')
  })

  return <div className="bg-light min-vh-100 d-flex flex-row align-items-center">Loging Out...</div>
}

export default Logout
