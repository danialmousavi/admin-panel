import React from 'react'
import Index from './layouts/admin'
import AuthLayout from './layouts/Auth/AuthLayout'
import { useLocation } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
export default function App() {
  const location=useLocation();
  return (
    <Provider store={store}>
          <>
    {location.pathname.includes("/auth")?(
      <AuthLayout/>
    ):(
      <Index />
    )}
    </>
    </Provider>
  )
}
