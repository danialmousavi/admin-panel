import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import ShowInFilter from "./ShowInFilter";
import PrevBtn from "../../../components/PrevBtn";
import Loading from "../../../components/Loading";
import axios from "axios";

export default function AddCategoryAttribute() {
    const location=useLocation();
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err,setErr]=useState("")
    const dataInfo = [
        { feild: "id", title: "#" },
        { feild: "title", title: "عنوان محصول" },
        { feild: "unit", title: "واحد" },
      ];
      const additionalFeild = [

        {
          title: "نمایش در فیلتر",
          elements: (rowData) => <ShowInFilter rowData={rowData}/>,
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

  //get getegory attributes
  const fetchAtrributes=async()=>{
        const userToken=JSON.parse(localStorage.getItem("loginToken"))
        await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/categories/${location.state.categoryData.id}/attributes `,{
            headers:{
              "Authorization":`Bearer ${userToken}`
            }
          }).then(res=>{
            console.log(res);
            setLoading(false)
            setDatas(res.data.data)
            setErr(res.data.message)
          })
  }
  useEffect(()=>{
    setLoading(true);
    fetchAtrributes();
  },[])
  return (
    <>
        <h4 className="text-center my-3">
          مدیریت ویژگی های دسته بندی
        </h4>
        <h4>
          ویژگی های:
          <span className="text-primary">{location.state.categoryData.title}</span>
        </h4>
    <div className="container">
      <div className="row justify-content-center">
        <div className="row my-3">
          <div className="col-12 col-md-6 col-lg-4 my-1">
            <input
              type="text"
              className="form-control"
              placeholder="عنوان ویژگی جدید"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-1">
            <input
              type="text"
              className="form-control"
              placeholder="واحد ویژگی جدید"
            />
          </div>
          <div className="col-8 col-lg-2 my-1">
            <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
              <label
                className="form-check-label pointer"
                htmlFor="flexSwitchCheckDefault"
              >
                نمایش در فیلتر
              </label>
              <input
                className="form-check-input pointer mx-3"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
            <i
              className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text"
              title="ثبت ویژگی"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            ></i>
          </div>
        </div>
        <hr />
        <div className="row justify-content-between">

        </div>

      </div>
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
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target={`#${searchparams.id}`} onClick={()=>setCatId(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>
          </PaginatedTable>
      </>
        ):(<>
        <h1 className="text-center text-danger">{err}</h1>
        </>)}
        </>
    )}
    </div>
    </>
  );
}
