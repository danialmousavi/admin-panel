import React, { useState } from "react";
import { useEffect } from "react";
import PaginatedDataTable from "../../components/PaginatedDataTable";
import AddProducts from "./AddProducts";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Actions from "./TableAddition/Actions";
import { log10 } from "chart.js/helpers";

const TableProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("") 
  const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(8) // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات
  const apiPath="https://ecomadminapi.azhadev.ir"

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (rowData) => rowData.categories[0].title,
    },
    { field: "title", title: "عنوان" }, 
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    { 
      // field: "image", 
      title: "عکس" ,
      elements: (rowData) => rowData.image?<img src={apiPath+"/"+rowData.image} width={40} alt="" />:null,

    },
    
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteProducts={handleDeleteProducts} handleToggleNotification={handleToggleNotification}/>,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };


  //get products
  const handleGetProducts = async (page, count, char)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    setLoading(true)
    await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/products?page=${page}&count=${count}&searchChar=${char}`,{
        headers:{
            "Authorization":`Bearer ${userToken}`
        }
    }).then(res=>{
        console.log(res);
        res && setLoading(false)
        if(res.status==200){
        setData(res.data.data)//ست کردن دیتا
        setPageCount(res.data.last_page)//ست کردن تعداد صفحات برای پجینیشن
        }
        
    })
  }

  const handleSearch = (char)=>{
    setSearchChar(char)
    handleGetProducts(1, countOnPage, char)
  }

  useEffect(()=>{
    handleGetProducts(currentPage, countOnPage, searchChar)
  },[currentPage])

  //Delete product
  const handleDeleteProducts=(productId)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    Swal.fire({
          title:"حذف محصول",
          text:"آیا میخواهید محصول را حذف کنید؟",
          icon:"question",
          showCancelButton:true,
          showConfirmButton:true,
          cancelButtonText:"خیر",
          confirmButtonText:"بله",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
    }).then(res=>{
        if(res.isConfirmed){
                axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/products/${productId}`,{
        headers:{
            "Authorization":`Bearer ${userToken}`
        }
    }).then(res=>{
        console.log(res);
        if(res.status==200||res.status==201){
            Swal.fire({
                title:"حذف",
                text:"حذف با موفقیت انجام شد",
                icon:"success"
            })
        handleGetProducts(currentPage, countOnPage, searchChar)
        }else{
                Swal.fire({
                title:"متاسفیم",
                text:"مشکلی پیش آمده است!",
                icon:"success"
            })
        }
    })
        }
    })

  }

  //Toggle notification
  const handleToggleNotification=(productId)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    console.log(productId);
    axios.get(`https://ecomadminapi.azhadev.ir/api/admin/products/toggle_notification/${productId}`,{
      headers:{
        "Authorization":`Bearer ${userToken}`
      }
    }).then(res=>{
      console.log(res);
      if(res.status==200){
        Swal.fire({
          title:"موفق",
          text:"عملیات با موفقیت انجام شد",
          icon:"success"
        })
        handleGetProducts(currentPage, countOnPage, searchChar)
      }else{
        Swal.fire({
          title:"متاسفیم",
          text:"مشکلی پیش آمده است!",
          icon:"error"
        })
      }
    })
  }
  return (
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
    <Link to={`/products/add`} className="btn btn-success d-flex justify-content-center align-items-center">
        <i className="fas fa-plus text-light"></i>
    </Link>
    </PaginatedDataTable>
  );
};

export default TableProduct;
