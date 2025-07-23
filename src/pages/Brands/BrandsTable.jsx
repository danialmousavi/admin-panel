import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PaginatedTable from "../../components/PaginatedTable";
import Actions from "./tableAdditional/Actions";
import axios from "axios";
import AddBrands from './AddBrands'
import Swal from "sweetalert2";

export default function BrandsTable() {
  const [loading, setLoading] = useState(false);
  const [datas,setDatas]=useState([]);
  const apiPath="https://ecomadminapi.azhadev.ir"
  const [brandsToEdit,setBrandsToEdit]=useState(null);
  const dataInfo = [
      { feild: "id", title: "#" },
      { feild: "original_name", title: "نام اصلی" },
      { feild: "persian_name", title: "نام فارسی" },
      { feild: "descriptions", title: "توضیحات" },
    ];
  
  
    const additionalFeild = [
      {
        title: "لوگو",
        elements: (rowData) => rowData.logo?<img src={apiPath+"/"+rowData.logo} width={40} alt="" />:null,
      },
      {
        title: "عملیات",
        elements: (rowData) => <Actions rowData={rowData} setBrandsToEdit={setBrandsToEdit} handleDeleteBrand={handleDeleteBrand}/>,
      },
    ];
  
    //اطلاعات مربوط به صفحه بندی و سرچ
    const searchparams = {
      title: "جستجو",
      placeholder: "قسمتی از عنوان را وارد کنید",
      searchFeild: "original_name",
      itemsPerPage: 3,
      id: "add_brand_modal",
    };

    //fetch btands 

const fetchBrands = async () => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  setLoading(true);
  try {
    const res = await axios.get(
      `https://ecomadminapi.azhadev.ir/api/admin/brands`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    setDatas(res.data.data);
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire({
      icon: 'error',
      title: 'خطا در دریافت برندها',
      text: error?.response?.data?.message || 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
    });
  } finally {
    setLoading(false);
  }
};
       useEffect(()=>{
        fetchBrands()
      },[])    
      
      //delete brand
      const handleDeleteBrand=(rowData)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    Swal.fire({
      title:"حذف ویژگی",
      text:"آیا از حذف برند اطمینان دارید؟",
      icon:"question",
      showCancelButton:true,
      showConfirmButton:true,
      cancelButtonText:"خیر",
      confirmButtonText:"بله",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',        
    }).then(res=>{
      if(res.isConfirmed){
        console.log(rowData);
        axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/brands/${rowData.id}`,{
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
            setDatas(prevdata=>prevdata.filter(data=>data.id!==rowData.id))
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {datas.length ? (
            <>
            
              <PaginatedTable
                datas={datas}
                dataInfo={dataInfo}
                additionalFeild={additionalFeild}
                searchparams={searchparams}
              >
                <AddBrands setDatas={setDatas} brandsToEdit={brandsToEdit} setBrandsToEdit={setBrandsToEdit}/>
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target={`#${searchparams.id}`}
                  onClick={()=>setBrandsToEdit(null)}
                >
                  <i className="fas fa-plus text-light"></i>
                </button>
              </PaginatedTable>
            </>
          ) : (
            <>
              <h1 className="text-center text-danger">
                اطلاعاتی در دسترس نیست!
              </h1>
            </>
          )}
        </>
      )}
    </>
  );
}
