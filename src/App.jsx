import React from 'react'
import Index from './layouts/admin'
import AuthLayout from './layouts/Auth/AuthLayout'
import { useLocation } from 'react-router-dom'
export default function App() {
  const location=useLocation();
  return (
    <>
    {location.pathname.includes("/auth")?(
      <AuthLayout/>
    ):(
      <Index />
    )}
    </>
  )
}
