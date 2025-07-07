import React, { useContext } from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import AdminContext, { AdminLayoutContainer } from '../../context/adminLayoutContext'
import Dashboard from '../../pages/Dashboard/Dashboard'

export default function Index() {
      const admincontext =useContext(AdminContext)

  return (
    <>
     <AdminLayoutContainer>
       <Navbar/>
      <Sidebar/>
      <section id="content_section" className={`bg-light py-2 px-3 ${admincontext.showSidebar?"with_sidebar":""}`}>
        <Dashboard/>
      </section>
     </AdminLayoutContainer>
    </>
  )
}
