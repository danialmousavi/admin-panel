import React, { use, useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import axios from "axios";
import ShowInMenu from "./ShowInMenu";
import Actions from "./Actions";
import { useParams } from "react-router-dom";
import PrevBtn from "../../components/PrevBtn";
import Swal from "sweetalert2";
import moment from "jalali-moment";
import ConvertDateToJalali from "../../components/ConvertDate";
import Loading from "../../components/Loading";

export default function CategoryTable({forceReRender,setForceReRender}) {
  const [datas, setDatas] = useState([]);
  const params=useParams();
  const [loading, setLoading] = useState(false);
  const id = params.categoryId || null;
//get categories 
useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // شروع لودینگ

    try {
      const userToken = JSON.parse(localStorage.getItem("loginToken"));

      const response = await axios.get(
        `https://ecomadminapi.azhadev.ir/api/admin/categories${id ? `?parent=${id}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        setDatas(response.data.data);
      } else {
        Swal.fire({
          title: "خطا",
          text: response.data?.message || "مشکلی پیش آمده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "مشکلی در ارتباط با سرور رخ داده است.";

      Swal.fire({
        title: "خطا",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "باشه",
      });
    } finally {
      setLoading(false); // پایان لودینگ
    }
  };

  fetchData();
}, [id,forceReRender]);

//delete category 
const handleDeleteCategory=(categoryData)=>{
  const userToken=JSON.parse(localStorage.getItem("loginToken"))
  Swal.fire({
    title:"حذف دسته بندی",
    text:"آیا از حذف دسته بندی اطمینان دارید؟",
    icon:"question",
    confirmButtonText:"تایید",
    cancelButtonText:"کنسل",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33', 
  }).then(res=>{
    if(res.isConfirmed){
      
      axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/categories/${categoryData.id}`,{
        headers:{
          "Authorization":`Bearer ${userToken}`
        }
      }).then(res=>{
        console.log(res);
        if(res.status>=200&&res.status<300){
          Swal.fire({
          title:"دسته بندی با موفقیت حذف شد",
          icon:"success"
        })
        setForceReRender(prev=>prev+1)
        }else{
          Swal.fire({
            title:"متاسفیم",
            text:"خطایی پیش آمده است",
            icon:"error"
          })
        }
      })
      
    }
  })
  }


const dataInfo = [
    { feild: "id", title: "#" },
    { feild: "title", title: "عنوان محصول" },
    // { feild: "parent_id", title: "دسته والد" },
  ];


  const additionalFeild = [
    {
      title: "تاریخ",
      elements: (rowData) => <ConvertDateToJalali date={rowData.created_at}/>,
    },
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData}/>,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory}/>,
    },
  ];

  //اطلاعات مربوط به صفحه بندی و سرچ
  const searchparams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchFeild: "title",
    itemsPerPage: 3,
    id: "add_product_category_modal",
  };
return (
  <>
    {params.categoryId && (
      <div className="py-3 d-flex justify-content-between">
        <h3 className="text-center">زیرمجموعه دسته‌بندی</h3>
        <PrevBtn />
      </div>
    )}

    {loading ? (
        <Loading/>
    ) : (
        <>
        {datas.length?(
      <PaginatedTable
        datas={datas}
        dataInfo={dataInfo}
        additionalFeild={additionalFeild}
        searchparams={searchparams}
      />
        ):(<>
        <h1 className="text-center text-danger">اطلاعاتی در دسترس نیست!</h1>
        </>)}
        </>
    )}
  </>
);

}
