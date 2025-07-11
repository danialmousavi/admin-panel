import React, { useContext } from 'react'
import AdminContext from '../../../context/adminLayoutContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
    const admincontext =useContext(AdminContext)
    const navigate=useNavigate()
    const handleLogout=()=>{
        const userToken = JSON.parse(localStorage.getItem("loginToken"));
        Swal.fire({
            title: 'خروج از حساب کاربری',
            text: "آیا مطمئن هستید که میخواهید خارج شوید؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',  
            confirmButtonText: 'بله, خارج شوم',
            cancelButtonText: 'خیر'
        }).then(result=>{
            if(result.isConfirmed){
                axios.get("https://ecomadminapi.azhadev.ir/api/auth/logout",{
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                    },
                }).then(res=>{
                    if(res.status==200){
                        localStorage.removeItem("loginToken")
                        Swal.fire({
                            title: 'خروج موفق',
                            text: 'شما با موفقیت خارج شدید.',
                            icon: 'success',
                            confirmButtonText: 'باشه'
                        }).then(()=>{
                            navigate("/auth/login")
                        })
                    }else{
                        Swal.fire({
                            title: 'خطا',
                            text: res.data.message,
                            icon: 'error',
                            confirmButtonText: 'باشه'
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                    Swal.fire({
                        title: 'خطا',
                        text: 'مشکلی در خروج از حساب کاربری پیش آمد.',
                        icon: 'error',
                        confirmButtonText: 'باشه'
                    })
                })
            }
        })
    }
  return (
    // <!-- #region(collapsed) navbar  -->
    <nav className="navbar fixed-top navbar-dark bg-secondary top_navbar py-0">
        <div className="container-fluid h-100 pe-0">

            <div className="right_content h-100 py-1 bg-dark">
                <a className="navbar-brand h-100" href="/">
                    <img src="/assets/images/logo.png" className="h-100"/>
                </a>
                <div className="form-check form-switch mx-4 d-none d-md-block">
                    <input id="handle_toggle_sidemenu" className="form-check-input pointer" type="checkbox" onChange={(e)=>admincontext.setShowSidebar(e.target.checked)} />
                </div>
            </div>

            <div className="left_content d-flex flex-row-reverse">
                <i className="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu mini_menu" aria-labelledby="dropdownMenuButton1">
                    <li className="my-2"><a className="dropdown-item d-block text-center">دانیال موسوی</a></li>
                    <li className="my-2 d-flex justify-content-center align-items-center px-2">
                        <i className="fas fa-tachometer-alt"></i>
                        <a className="dropdown-item" href="#">داشبورد</a>
                    </li>
                    <li className="my-2 d-flex justify-content-center align-items-center px-2">
                        <i className="fas fa-paper-plane"></i>
                        <a className="dropdown-item" href="#">تیکت ها</a>
                    </li>
                    <li className="my-2 d-flex justify-content-center align-items-center px-2">
                        <i className="fas fa-envelope"></i>
                        <a className="dropdown-item" href="#">پیام ها</a>
                    </li>
                    <hr/>
                    <li className="d-flex justify-content-center align-items-center px-2" onClick={handleLogout}>
                        <i className="fas fa-power-off"></i>
                        <button className="dropdown-item" href="#">خروج</button>
                    </li>
                </ul>
                <i className="far fa-bell fa-2x mx-3 pointer position-relative">
                    <span className="alarm_count">4</span>
                </i>
                <i className="fas fa-search fa-2x mx-3 pointer"></i>
            </div>

        </div>
    </nav>
    // <!-- #endregion(collapsed) navbar  -->
  )
}
