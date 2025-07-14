import React, { useEffect, useState } from 'react'
import Actions from './tableAdditional/Actions';
import Loading from '../../components/Loading';
import PaginatedTable from '../../components/PaginatedTable';
import AddGuarantee from './AddGuarantee';
import axios from 'axios';

export default function GuaranteeTable() {
    const [loading, setLoading] = useState(false);
    const [datas,setDatas]=useState([]);
  
    const [brandsToEdit,setBrandsToEdit]=useState(null);
  
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
        elements: (rowData) => <Actions rowData={rowData} />,
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

    // fetch btands 
    const fetchBrands = async () => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    setLoading(true)
    await axios
      .get(
        `https://ecomadminapi.azhadev.ir/api/admin/guarantees `,
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
                <AddGuarantee setDatas={setDatas} />
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
  )
}
