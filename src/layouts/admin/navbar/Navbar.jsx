import React from 'react'

export default function Navbar() {
  return (
    // <!-- #region(collapsed) navbar  -->
    <nav class="navbar fixed-top navbar-dark bg-secondary top_navbar py-0">
        <div class="container-fluid h-100 pe-0">

            <div class="right_content h-100 py-1 bg-dark">
                <a class="navbar-brand h-100" href="/">
                    <img src="/assets/images/logo.png" class="h-100"/>
                </a>
                <div class="form-check form-switch mx-4 d-none d-md-block">
                    <input id="handle_toggle_sidemenu" class="form-check-input pointer" type="checkbox" />
                </div>
            </div>

            <div class="left_content d-flex flex-row-reverse">
                <i class="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu mini_menu" aria-labelledby="dropdownMenuButton1">
                    <li class="my-2"><a class="dropdown-item d-block text-center">دانیال موسوی</a></li>
                    <li class="my-2 d-flex justify-content-center align-items-center px-2">
                        <i class="fas fa-tachometer-alt"></i>
                        <a class="dropdown-item" href="#">داشبورد</a>
                    </li>
                    <li class="my-2 d-flex justify-content-center align-items-center px-2">
                        <i class="fas fa-paper-plane"></i>
                        <a class="dropdown-item" href="#">تیکت ها</a>
                    </li>
                    <li class="my-2 d-flex justify-content-center align-items-center px-2">
                        <i class="fas fa-envelope"></i>
                        <a class="dropdown-item" href="#">پیام ها</a>
                    </li>
                    <hr/>
                    <li class="d-flex justify-content-center align-items-center px-2">
                        <i class="fas fa-power-off"></i>
                        <a class="dropdown-item" href="#">خروج</a>
                    </li>
                </ul>
                <i class="far fa-bell fa-2x mx-3 pointer position-relative">
                    <span class="alarm_count">4</span>
                </i>
                <i class="fas fa-search fa-2x mx-3 pointer"></i>
            </div>

        </div>
    </nav>
    // <!-- #endregion(collapsed) navbar  -->
  )
}
