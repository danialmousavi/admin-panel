import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PaginatedTable from "../../components/PaginatedTable";
import AddColors from "./AddColors";
import { elements } from "chart.js";
import Actions from "./TableAdditional/Actions";
import axios from "axios";
import Swal from "sweetalert2";

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
          elements: (rowData) => <Actions rowData={rowData} setColortoEdit={setColortoEdit} handleDeleteColor={handleDeleteColor}/>,
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
      //delete color
      const handleDeleteColor=(rowData)=>{
        const userToken = JSON.parse(localStorage.getItem("loginToken"));

        console.log(rowData);
        Swal.fire({
          title:"حذف رنگ",
          text:"آیا میخواهید رنگ را حذف کنید؟",
          icon:"question",
          showCancelButton:true,
          showConfirmButton:true,
          cancelButtonText:"خیر",
          confirmButtonText:"بله",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          
        }).then(res=>{
          if(res.isConfirmed){
            axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/colors/${rowData.id}`,{
              headers:{
                "Authorization":`Bearer ${userToken}`
              }
            }).then(res=>{
              if(res.status==200||res.status==201){
                Swal.fire({
                  title:"تبریک",
                  text:"با موفقیت حذف شد",
                  icon:"success"
                })                
                setDatas(prevData=>prevData.filter(d=>d.id!==rowData.id))
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
                <AddColors setDatas={setDatas}  ColortoEdit={ColortoEdit}/>
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target={`#${searchparams.id}`}
                  onClick={()=>setColortoEdit(null)}
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
