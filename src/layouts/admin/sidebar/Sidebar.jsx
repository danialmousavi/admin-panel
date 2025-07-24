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
                <SidebarItems title='داشبورد' icon='fas fa-tachometer-alt' active={true} targetPath={'/'} pTitle="read_"/>
                <div className='sidebar-items-container'>
                  
                <SidebarGroupTitle title="فروشگاه"  pTitles={[
             "read_categories",  "read_products",  "read_brands",  "read_guaranties",  "read_colors", "read_discounts"
            ]}/>

                <SidebarItems icon='fas fa-stream' title='مدیریت گروه محصول' active={false} targetPath={'/category'} pTitle="read_categories"/>
                <SidebarItems icon='fas fa-cube' title='مدیریت محصول' active={false} targetPath={'/products'} pTitle="read_products"/>

                <SidebarItems icon='fas fa-palette' title='مدیریت رنگ ها' active={false} targetPath={'/colors'} pTitle="read_colors"/>
                <SidebarItems icon='fab fa-pagelines' title='مدیریت گارانتی ها' active={false} targetPath={'/guarantee'} pTitle="read_guarantees"/>
                <SidebarItems icon='fas fa-copyright' title='مدیریت برند ها' active={false}  targetPath={'/brands'}/>
                <SidebarItems icon='fas fa-percentage' title='مدیریت تخفیف ها' active={false} targetPath={'/discounts'} pTitle="read_brands"/>

                <SidebarGroupTitle title="سفارشات و سبد"  pTitles={["read_carts",  "read_orders",  "read_deliveries"]}/>

                <SidebarItems icon='fas fa-shopping-cart' title='مدیریت سبد ها' active={false} targetPath={'/cart'}  pTitle="read_carts"/>

                <SidebarItems icon='fas fa-luggage-cart' title='مدیریت سفارشات' active={false} targetPath={'/orders'}  pTitle="read_orders"/>
                <SidebarItems icon='fas fa-truck' title='مدیریت نحوه ارسال' active={false} targetPath={'/delivery'}  pTitle="read_deliveries"/>

                <SidebarGroupTitle title="کاربران و همکاران" pTitles={["read_users",  "read_roles",  "read_permissions"]}/>

                <SidebarItems icon='fas fa-users' title='مشاهده کاربران' active={false} targetPath={'/users'} pTitle="read_users"/>
                <SidebarItems icon='fas fa-user-tag' title='نقش ها' active={false} targetPath={'/roles'} pTitle="read_roles"/>
                <SidebarItems icon='fas fa-shield-alt' title='مجوز ها' active={false} targetPath={'/permisions'} pTitle="read_permissions"/>


                <SidebarGroupTitle title="ارتباطات" pTitles={["read_questions",  "read_comments"]}/>

                <SidebarItems icon='fas fa-question-circle' title='سوال ها' active={false} targetPath={'/questions'}  pTitle="read_questions"/>
                <SidebarItems icon='fas fa-comment' title='نظرات' active={false} targetPath={'/comments'} pTitle="read_comments"/>

                </div>
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
