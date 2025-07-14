import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PaginatedTable from "../../components/PaginatedTable";
import Actions from "./tableAdditional/Actions";
import axios from "axios";
import AddBrands from './AddBrands'

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
        elements: (rowData) => <Actions rowData={rowData} setBrandsToEdit={setBrandsToEdit}/>,
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
    setLoading(true)
    await axios
      .get(
        `https://ecomadminapi.azhadev.ir/api/admin/brands `,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setDatas(res.data.data);
      });

        };
       useEffect(()=>{
        fetchBrands()
      },[])       
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
