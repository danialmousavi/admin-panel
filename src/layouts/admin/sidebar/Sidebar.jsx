import React from 'react'

export default function Sidebar() {
  return (
        <section id="sidebar_section">
        <div class="mini_sidebar collapsedd bg-dark h-100">
            <ul class="p-0 m-0">
                <li class="pt-1 pb-2 d-flex flex-column avatar_li position-relative">
                    <span class="avatar_box">
                        <img class="w-100 rounded-circle" src="/assets/images/avatar/profile.jpg"/>
                    </span>
                    <div class="sidebar_avatar_name text-center hiddenable">دانیال موسوی</div>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item mt-2 active" data-section-id="dashboard_section" >
                    <i class="ms-3 icon fas fa-tachometer-alt text-light"></i>
                    <span class="hiddenable no_wrap font_08">داشبورد</span>
                </li>
                <li class="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span class="hiddenable no_wrap group_sidebar_title">فروشگاه</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_product_category">
                    <i class="ms-3 icon fas fa-stream text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت گروه محصول</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_product_section">
                    <i class="ms-3 icon fas fa-cube text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت محصول</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_brand_section">
                    <i class="ms-3 icon fas fa-copyright text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت برند ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_guarantee_section">
                    <i class="ms-3 icon fab fa-pagelines text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت گارانتی ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_color_section">
                    <i class="ms-3 icon fas fa-palette text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت رنگ ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_discount_section">
                    <i class="ms-3 icon fas fa-percentage text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت تخفیف ها</span>
                </li>
                <li class="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span class="hiddenable no_wrap group_sidebar_title">سفارشات و سبد</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_cart_section">
                    <i class="ms-3 icon fas fa-shopping-basket text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت سبد ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_orders_section">
                    <i class="ms-3 icon fas fa-luggage-cart text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت سفارشات</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_deliveries_section">
                    <i class="ms-3 icon fas fa-truck-loading text-light"></i>
                    <span class="hiddenable no_wrap font_08">مدیریت نحوه ارسال</span>
                </li>
                <li class="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span class="hiddenable no_wrap group_sidebar_title ">کاربران و همکاران</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_user_section">
                    <i class="ms-3 icon fas fa-users text-light"></i>
                    <span class="hiddenable no_wrap font_08">مشاهده کاربران</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_role_section">
                    <i class="ms-3 icon fas fa-user-tag text-light"></i>
                    <span class="hiddenable no_wrap font_08">نقش ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_permission_section">
                    <i class="ms-3 icon fas fa-shield-alt text-light"></i>
                    <span class="hiddenable no_wrap font_08">مجوز ها</span>
                </li>
                <li class="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                    <span class="hiddenable no_wrap group_sidebar_title ">ارتباطات</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_question_section">
                    <i class="ms-3 icon fas fa-question-circle text-light"></i>
                    <span class="hiddenable no_wrap font_08">سوال ها</span>
                </li>
                <li class="py-1 text-start pe-4 sidebar_menu_item" data-section-id="manage_comments_section">
                    <i class="ms-3 icon fas fa-comment text-light"></i>
                    <span class="hiddenable no_wrap font_08">نظرات</span>
                </li>
                {/* <li class="py-2 btn-group dropstart pe-4">
                    <i class="ms-3 icon fas fa-check text-light"></i>
                    <span class="hiddenable" data-bs-toggle="dropdown" aria-expanded="false">داشبورد</span>
                    
                    <ul class="dropdown-menu px-2 sidebar_submenu_list">
                      <li class="d-none">اول</li>
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
