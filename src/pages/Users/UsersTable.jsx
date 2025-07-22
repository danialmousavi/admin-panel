import React, { useEffect, useState } from 'react'
import Actions from './tableAdditional/Actions';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UsersTable() {
    const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [searchChar, setSearchChar] = useState("") 
      const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
      const [countOnPage, setCountOnPage] = useState(8) // تعداد یوزر در هر صفحه
      const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات
      const apiPath="https://ecomadminapi.azhadev.ir"
const dataInfo = [
    { field: "id", title: "#" },

    { field: "user_name", title: "نام کاربری" }, 
    { field: "first_name", title: "نام" },
    { field: "last_name", title: "نام خانوادگی" },
    { field: "phone", title: "شماره تماس" },
    { field: "email", title: "ایمیل" },
    {
      field: null,
      title: "جنسیت",
      elements: (rowData) => rowData.gender==1?"آقا":"خانم",
    },
    {
      field: null,
      title: "نقش",
      elements: (rowData) => {
        return(
            <>
                {rowData.roles?.map(r=>(
                    <div key={r.id} className='text-center'>{r.title}</div>
                ))}
            </>
        )
      },
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDelteUser={handleDelteUser} />,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

    const handleGetUsers = async (page, count, char)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    setLoading(true)
    await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/users?page=${page}&count=${count}&searchChar=${char}`,{
        headers:{
            "Authorization":`Bearer ${userToken}`
        }
    }).then(res=>{
        console.log(res);
        res && setLoading(false)
        if(res.status==200){
        setData(res.data.data.data)//ست کردن دیتا
        setPageCount(res.data.data.last_page)//ست کردن تعداد صفحات برای پجینیشن
        }
        
    })
  }

  const handleSearch = (char)=>{
    setSearchChar(char)
    handleGetUsers(1, countOnPage, char)
  }
    useEffect(()=>{
      handleGetUsers(currentPage, countOnPage, searchChar)
    },[currentPage])
  
    //delete user
    const handleDelteUser=(userID)=>{
        console.log(userID);
  const userToken=JSON.parse(localStorage.getItem("loginToken"))
    Swal.fire({
      title:"حذف نقش",
      text:"آیا از حذف کاربر اطمینان دارید؟",
      icon:"question",
      showCancelButton:true,
      showConfirmButton:true,
      cancelButtonText:"خیر",
      confirmButtonText:"بله",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',        
    }).then(res=>{
      if(res.isConfirmed){
        axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/users/${userID}`,{
          headers:{
            "Authorization":`Bearer ${userToken}`
          }
        }).then(res=>{
          console.log(res);
          if(res.status==200){
            Swal.fire({
              title:"تبریک",
              text:"با موفقیت حذف شد",
              icon:"success"
            })
            setData(prevdata=>prevdata.filter(data=>data.id!==userID))
          }else{
              Swal.fire({
              title:"متاسفیم ",
              text:"خطایی پیش آمده است",
              icon:"error"
            })
          }
        })
      }
    })
    }
  return (
    <>
     <PaginatedDataTable
    tableData={data}
    dataInfo={dataInfo}
    searchParams={searchParams}
    loading={loading}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    pageCount={pageCount}
    handleSearch={handleSearch}
    >
    <Link to={`/users/add-user`} className="btn btn-success d-flex justify-content-center align-items-center">
        <i className="fas fa-plus text-light"></i>
    </Link>
    <Outlet context={{setData,handleGetUsers }}/>
    </PaginatedDataTable>
    </>
    )
}
