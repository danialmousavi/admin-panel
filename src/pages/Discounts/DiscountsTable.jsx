import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import PaginatedTable from '../../components/PaginatedTable';
import ConvertDateToJalali from '../../components/ConvertDate';
import { Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Actions from './TableAdditional/Actions';

export default function DiscountsTable() {
    const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
      { feild: "id", title: "#" },
      { feild: "title", title: "عنوان محصول" },
      { feild: "code", title: "کد تخفیف" },
      { feild: "percent", title: "درصد" },
    ];
  
  
    const additionalFeild = [
      {
        title: "تاریخ انقضا",
        elements: (rowData) => <ConvertDateToJalali date={rowData.expire_at}/>,
      },
      {
        title: "وضعیت",
        elements: (rowData) => rowData.is_active?"فعال":"غیرفعال",
      },
      {
        title: "مربوط به",
        elements: (rowData) =>rowData.for_all?"همه":"تعدادی از محصولات" ,
      },
        {
        title: "عملیات",
        elements: (rowData) => <Actions rowData={rowData}  handleDeleteDiscount={handleDeleteDiscount}/>,
      },
    ];
      const searchparams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchFeild: "title",
    itemsPerPage: 10,
    id: "add_discount_modal",
  };
  //get all discounts 
    const fetchData = async () => {
    setLoading(true); // شروع لودینگ

    try {
      const userToken = JSON.parse(localStorage.getItem("loginToken"));

      const response = await axios.get(
        `https://ecomadminapi.azhadev.ir/api/admin/discounts`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response);
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
  useEffect(()=>{
    fetchData()
  },[])

  //delete discount
const handleDeleteDiscount = async (discountId) => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));

  const result = await Swal.fire({
    title: "حذف کد تخفیف",
    text: "آیا از حذف کد تخفیف اطمینان دارید؟",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(
      `https://ecomadminapi.azhadev.ir/api/admin/discounts/${discountId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (res.status === 200) {
      setDatas((prev) => prev.filter((dis) => dis.id !== discountId));

      Swal.fire({
        title: "کد تخفیف با موفقیت حذف شد",
        icon: "success",
        confirmButtonText: "باشه",
      });
    }
  } catch (error) {
    console.error("خطا در حذف کد تخفیف:", error);

    Swal.fire({
      title: "خطا!",
      text: error.response?.data?.message || "حذف کد تخفیف با مشکل مواجه شد.",
      icon: "error",
      confirmButtonText: "فهمیدم",
    });
  }
};

  return (
    <>
    {loading ? (
        <Loading/>
    ) : (
        <>
        {datas.length?(
          <>

          <PaginatedTable
            datas={datas}
            dataInfo={dataInfo}
            additionalFeild={additionalFeild}
            searchparams={searchparams}
          >
            <Link to={`/discounts/add_discount`} className="btn btn-success d-flex justify-content-center align-items-center" >
                <i className="fas fa-plus text-light"></i>
            </Link>
            <Outlet context={{setDatas}}/>
          </PaginatedTable>
      </>
        ):(<>
        <h1 className="text-center text-danger">اطلاعاتی در دسترس نیست!</h1>
        </>)}
        </>
    )}
    </>
  )
}
