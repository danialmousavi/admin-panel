import React, { useContext } from 'react'
import AdminContext from '../../../context/adminLayoutContext'
import SidebarItems from './SidebarItems'
import SidebarGroupTitle from './SidebarGroupTitle'
import Avatar from './Avatar'

export default function Sidebar() {
    const admincontext =useContext(AdminContext)

  return (
        <section id="sidebar_section">
        <div className={`mini_sidebar collapsedd bg-dark h-100 ${admincontext.showSidebar ? 'expanded' : ''}`}>
            <ul className="p-0 m-0">
                <Avatar/>
                <SidebarItems title='داشبورد' icon='fas fa-tachometer-alt' active={true} targetPath={'/'}/>

                <SidebarGroupTitle title="فروشگاه"/>

                <SidebarItems icon='fas fa-stream' title='مدیریت گروه محصول' active={false} targetPath={'/category'}/>
                <SidebarItems icon='fas fa-cube' title='مدیریت محصول' active={false} targetPath={'/products'}/>

                <SidebarItems icon='fas fa-palette' title='مدیریت رنگ ها' active={false} targetPath={'/colors'}/>
                <SidebarItems icon='fab fa-pagelines' title='مدیریت گارانتی ها' active={false} targetPath={'/guarantee'}/>
                <SidebarItems icon='fas fa-copyright' title='مدیریت برند ها' active={false}  targetPath={'/brands'}/>
                <SidebarItems icon='fas fa-percentage' title='مدیریت تخفیف ها' active={false} targetPath={'/discounts'}/>

                <SidebarGroupTitle title="سفارشات و سبد"/>

                <SidebarItems icon='fas fa-shopping-cart' title='مدیریت سبد ها' active={false} targetPath={'/cart'}/>

                <SidebarItems icon='fas fa-luggage-cart' title='مدیریت سفارشات' active={false} targetPath={'/orders'}/>
                <SidebarItems icon='fas fa-truck' title='مدیریت نحوه ارسال' active={false} targetPath={'/delivery'}/>

                <SidebarGroupTitle title="کاربران و همکاران"/>

                <SidebarItems icon='fas fa-users' title='مشاهده کاربران' active={false} targetPath={'/users'}/>
                <SidebarItems icon='fas fa-user-tag' title='نقش ها' active={false} targetPath={'/roles'}/>
                <SidebarItems icon='fas fa-shield-alt' title='مجوز ها' active={false} targetPath={'/permisions'}/>


                <SidebarGroupTitle title="ارتباطات"/>

                <SidebarItems icon='fas fa-question-circle' title='سوال ها' active={false} targetPath={'/questions'}/>
                <SidebarItems icon='fas fa-comment' title='نظرات' active={false} targetPath={'/comments'}/>

                {/* <li className="py-2 btn-group dropstart pe-4">
                    <i className="ms-3 icon fas fa-check text-light"></i>
                    <span className="hiddenable" data-bs-toggle="dropdown" aria-expanded="false">داشبورد</span>
                    
                    <ul className="dropdown-menu px-2 sidebar_submenu_list">
                      <li className="d-none">اول</li>
                      <li>اول</li>
                      <li>دوم</li>
                      <li>سوم</li>
                    </ul>
                </li>  */}
            </ul>
        </div>
    </section>
  )
}
