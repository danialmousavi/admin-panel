import React, { useContext } from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import AdminContext, { AdminLayoutContainer } from '../../context/adminLayoutContext'

export default function Index() {
      const admincontext =useContext(AdminContext)

  return (
    <>
     <AdminLayoutContainer>
       <Navbar/>
      <Sidebar/>
      <section id="content_section" class={`bg-light py-2 px-3 ${admincontext.showSidebar?"with_sidebar":""}`}></section>
     </AdminLayoutContainer>
    </>
  )
}
