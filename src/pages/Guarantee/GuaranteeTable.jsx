import React, { useEffect, useState } from 'react'
import Actions from './tableAdditional/Actions';
import Loading from '../../components/Loading';
import PaginatedTable from '../../components/PaginatedTable';
import AddGuarantee from './AddGuarantee';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function GuaranteeTable() {
    const [loading, setLoading] = useState(false);
    const [datas,setDatas]=useState([]);
    const [guaranteetoEdit,setGuaranteetoEdit]=useState(null);
 
    const dataInfo = [
      { feild: "id", title: "#" },
      { feild: "title", title: "عنوان" },
      { feild: "descriptions", title: "توضیحات" },
      { feild: "length", title: "مدت گارانتی" },
      { feild: "length_unit", title: "واحد" },

    ];
  
  
    const additionalFeild = [
      {
        title: "عملیات",
        elements: (rowData) => <Actions rowData={rowData} setGuaranteetoEdit={setGuaranteetoEdit} handleDeleteGaurantee={handleDeleteGaurantee}/>,
      },
    ];
  
    //اطلاعات مربوط به صفحه بندی و سرچ
    const searchparams = {
      title: "جستجو",
      placeholder: "قسمتی از عنوان را وارد کنید",
      searchFeild: "title",
      itemsPerPage: 3,
      id: "add_guarantee_modal",
    };

    // fetch Gaurantee 
const fetchGaurantee = async () => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  setLoading(true);
  try {
    const res = await axios.get(
      `https://ecomadminapi.azhadev.ir/api/admin/guarantees`,
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
      title: 'خطا در دریافت گارانتی‌ها',
      text: error?.response?.data?.message || 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
    });
  } finally {
    setLoading(false);
  }
};
       useEffect(()=>{
        fetchGaurantee()
      },[])    
      //delete Gaurantee
      const handleDeleteGaurantee=(rowData)=>{
 const userToken=JSON.parse(localStorage.getItem("loginToken"))
    Swal.fire({
      title:"حذف گارانتی",
      text:"آیا از حذف گارانتی اطمینان دارید؟",
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
        axios.delete(`https://ecomadminapi.azhadev.ir/api/admin/guarantees/${rowData.id}`,{
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
                <AddGuarantee setDatas={setDatas} setGuaranteetoEdit={setGuaranteetoEdit} guaranteetoEdit={guaranteetoEdit} />
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target={`#${searchparams.id}`}
                  onClick={()=>setGuaranteetoEdit(null)}
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
  )
}
