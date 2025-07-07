import React, { useContext } from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import AdminContext, { AdminLayoutContainer } from '../../context/adminLayoutContext'
import Content from '../../pages/Content'


export default function Index() {

  return (
    <>
     <AdminLayoutContainer>
       <Navbar/>
      <Sidebar/>
        <Content/>
     </AdminLayoutContainer>
    </>
  )
}
