import React, { useEffect, useState } from 'react'
import ConvertDateToJalali from '../../components/ConvertDate';
import { Link, Outlet } from 'react-router-dom';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import Swal from 'sweetalert2';
import axios from 'axios';
import Actions from './tableAdditional/Actions';

export default function OrdersTable() {
   const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [searchChar, setSearchChar] = useState("") 
      const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
      const [countOnPage, setCountOnPage] = useState(8) // تعداد یوزر در هر صفحه
      const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات
const dataInfo = [
    { field: "id", title: "#" },

    { field: "user_id", title: "آیدی کاربر" }, 
    { field: "cart_id", title: "آیدی سبد" }, 

    {
      field: null,
      title: "نام  کاربری",
      elements: (rowData) => `${rowData.user.first_name||""} ${rowData.user.last_name||""}`,
    },
    {
      field: null,
      title: "شماره موبایل کاربر",
      elements: (rowData) => rowData.user.phone,
    },
    {
      title: "تاریخ پرداخت",
      elements: (rowData) => <ConvertDateToJalali date={rowData.pay_at}/>,
    },
    {
      field: null,
      title: "مبلغ پرداختی",
      elements: (rowData) => rowData.pay_amount,
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData}  />,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

const handleGetOrders = async (page=currentPage, count=countOnPage, char=searchChar) => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  setLoading(true);
  try {
    const res = await axios.get(
      `https://ecomadminapi.azhadev.ir/api/admin/orders?page=${page}&count=${count}&searchChar=${char}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    
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
    handleGetOrders(1, countOnPage, char)
  }
    useEffect(()=>{
      handleGetOrders(currentPage, countOnPage, searchChar)
    },[currentPage])
  
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
    <Link to={`/orders/add-order`} className="btn btn-success d-flex justify-content-center align-items-center">
        <i className="fas fa-plus text-light"></i>
    </Link>
    <Outlet context={{setData,handleGetOrders }}/>
    </PaginatedDataTable>
    </>
  )
}
