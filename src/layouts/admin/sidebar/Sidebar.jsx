import React, { useContext } from 'react'
import AdminContext from '../../../context/adminLayoutContext'
import SidebarItems from './SidebarItems'

export default function Sidebar() {
    const admincontext =useContext(AdminContext)

  return (
        <section id="sidebar_section">
        <div className={`mini_sidebar collapsedd bg-dark h-100 ${admincontext.showSidebar ? 'expanded' : ''}`}>
            <ul className="p-0 m-0">
                <li className="pt-1 pb-2 d-flex flex-column avatar_li position-relative">
                    <span className="avatar_box">
                        <img className="w-100 rounded-circle" src="/assets/images/avatar/profile.jpg"/>
                    </span>
                    <div className="sidebar_avatar_name text-center hiddenable">دانیال موسوی</div>
                </li>
                <SidebarItems title='داشبورد' icon='fas fa-tachometer-alt' active={true}/>

                <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span className="hiddenable no_wrap group_sidebar_title">فروشگاه</span>
                </li>

                <SidebarItems icon='fas fa-stream' title='مدیریت گروه محصول' active={false}/>
                <SidebarItems icon='fas fa-cube' title='مدیریت محصول' active={false}/>

                <SidebarItems icon='fas fa-copyright' title='مدیریت برند ها' active={false}/>
                <SidebarItems icon='fab fa-pagelines' title='مدیریت گارانتی ها' active={false}/>
                <SidebarItems icon='fas fa-palette' title='مدیریت رنگ ها' active={false}/>
                <SidebarItems icon='fas fa-percentage' title='مدیریت تخفیف ها' active={false}/>

                <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span className="hiddenable no_wrap group_sidebar_title">سفارشات و سبد</span>
                </li>

                <SidebarItems icon='fas fa-shopping' title='مدیریت سبد ها' active={false}/>

                <SidebarItems icon='fas fa-luggage-cart' title='مدیریت سفارشات' active={false}/>
                <SidebarItems icon='fas fa-truck' title='مدیریت نحوه ارسال' active={false}/>

                <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span className="hiddenable no_wrap group_sidebar_title ">کاربران و همکاران</span>
                </li>

                <SidebarItems icon='fas fa-users' title='مشاهده کاربران' active={false}/>
                <SidebarItems icon='fas fa-user-tag' title='نقش ها' active={false}/>
                <SidebarItems icon='fas fa-shield-alt' title='مجوز ها' active={false}/>

                <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span className="hiddenable no_wrap group_sidebar_title ">ارتباطات</span>
                </li>
                <SidebarItems icon='fas fa-question-circle' title='سوال ها' active={false}/>
                <SidebarItems icon='fas fa-comment' title='نظرات' active={false}/>

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
