import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PaginatedTable from "../../components/PaginatedTable";
import AddColors from "./AddColors";
import { elements } from "chart.js";
import Actions from "./TableAdditional/Actions";
import axios from "axios";

export default function ColorsTable() {
   const [loading, setLoading] = useState(false);
      const [datas,setDatas]=useState([]);
      const [ColortoEdit,setColortoEdit]=useState(null);
   
      const dataInfo = [
        { feild: "id", title: "#" },
        { feild: "title", title: "عنوان" },
        { feild: "code", title: "کد رنگ" },
  
      ];
    
    
      const additionalFeild = [
        {
          title:"عملیات",
          elements:(rowData)=><div className="w-100 h-100 d-block" style={{backgroundColor:rowData.code,color:rowData.code}}>...</div>
        },
        {
          title: "عملیات",
          elements: (rowData) => <Actions rowData={rowData} />,
        },
      ];
    
      //اطلاعات مربوط به صفحه بندی و سرچ
      const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
        searchFeild: "title",
        itemsPerPage: 6,
        id: "add_color_modal",
      };
      // fetch colors 
    const fetchColors = async () => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    setLoading(true)
    await axios
      .get(
        `https://ecomadminapi.azhadev.ir/api/admin/colors `,
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
        fetchColors()
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
                <AddColors setDatas={setDatas} />
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target={`#${searchparams.id}`}
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
