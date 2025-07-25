import { elements } from 'chart.js';
import React, { useEffect, useState } from 'react'
import PaginatedDataTable from '../../components/PaginatedDataTable';
import { Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Actions from './tableAdditional/Actions';

export default function CartTable() {
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [searchChar, setSearchChar] = useState("") 
      const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
      const [countOnPage, setCountOnPage] = useState(8) // تعداد یوزر در هر صفحه
      const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات
      const apiPath="https://ecomadminapi.azhadev.ir"
const dataInfo = [
    { field: "id", title: "#" },

    { field: "user_id", title: "آیدی کاربر" }, 
    {
      field: null,
      title: "نام کاربر",
      elements: (rowData) => `${rowData.user.first_name||""} ${rowData.user.last_name||""}`,
    },
    {
      field: null,
      title: "موبایل کاربر",
      elements:(rowdata)=>rowdata.user.phone
    },
    {
      field: null,
      title: " تعداد کالاها",
      elements:(rowdata)=>rowdata.items.length
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDelteCart={handleDelteCart}/>,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

const handleGetCarts = async (page=currentPage, count=countOnPage, char=searchChar) => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  setLoading(true);
  try {
    const res = await axios.get(
      `https://ecomadminapi.azhadev.ir/api/admin/carts?page=${page}&count=${count}&searchChar=${char}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(res);
    
    if (res.status === 200) {
      setData(res.data.data.data); // ست کردن دیتا
      setPageCount(res.data.data.last_page); // ست کردن تعداد صفحات برای پجینیشن
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    Swal.fire({
      icon: 'error',
      title: 'خطا در دریافت کاربران',
      text: error?.response?.data?.message || 'مشکلی در دریافت اطلاعات کاربران رخ داده است.',
    });
  } finally {
    setLoading(false);
  }
};
  const handleSearch = (char)=>{
    setSearchChar(char)
    handleGetCarts(1, countOnPage, char)
  }
    useEffect(()=>{
      handleGetCarts(currentPage, countOnPage, searchChar)
    },[currentPage])
  

    //delete cart
    const handleDelteCart=(cartID)=>{
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
        axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/carts/${cartID}`,{
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
            setData(prevdata=>prevdata.filter(data=>data.id!==cartID))
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
    <Link to={`/cart/add_cart`} className="btn btn-success d-flex justify-content-center align-items-center">
        <i className="fas fa-plus text-light"></i>
    </Link>
    <Outlet context={{handleGetCarts }}/>
    </PaginatedDataTable>
    </>
  )
}
