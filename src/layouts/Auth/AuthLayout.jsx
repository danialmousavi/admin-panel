import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login/Login'

export default function AuthLayout() {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </>
  )
}
