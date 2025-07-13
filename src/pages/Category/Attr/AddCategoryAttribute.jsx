import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import ShowInFilter from "./ShowInFilter";
import PrevBtn from "../../../components/PrevBtn";
import Loading from "../../../components/Loading";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import AttrActions from "./AttrActions";

export default function AddCategoryAttribute() {
  const location = useLocation();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  const dataInfo = [
    { feild: "id", title: "#" },
    { feild: "title", title: "عنوان محصول" },
    { feild: "unit", title: "واحد" },
  ];
  const [attrToEdit,setAttrToEdit]=useState(null);
  const [reInitialValues,setReInitialValues]=useState(null)
  const additionalFeild = [
    {
      title: "نمایش در فیلتر",
      elements: (rowData) => <ShowInFilter rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <AttrActions
          rowData={rowData}
          setAttrToEdit={setAttrToEdit}
          attrToEdit={attrToEdit}
        />
      ),
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

  //get category attributes
  const fetchAtrributes = async () => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    await axios
      .get(
        `https://ecomadminapi.azhadev.ir/api/admin/categories/${location.state.categoryData.id}/attributes `,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDatas(res.data.data);
        setErr(res.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchAtrributes();
  }, []);

  //post attributes to server
  const attrVlidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("عنوان دسته بندی الزامی است")
      .matches(/^[\u0600-\u06FF\s]+$/, "عنوان باید به زبان فارسی باشد"),
    unit: Yup.string().required("واحد الزامی است"),
    in_filter: Yup.boolean().optional(),
  });

  //edit attributes
  useEffect(()=>{
    if(attrToEdit){
      setReInitialValues({
        title:attrToEdit.title,
        unit:attrToEdit.unit,
        in_filter: attrToEdit.in_filter === 1 ? true : false,
      })
    }else{
      setReInitialValues(null)
    }
  },[attrToEdit])

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
        <Formik
          initialValues={reInitialValues||{ title: "", unit: "", in_filter: false }}
          validationSchema={attrVlidationSchema}
          enableReinitialize
          onSubmit={(values) => {
            // console.log(values);
            const userToken = JSON.parse(localStorage.getItem("loginToken"));
              if(!attrToEdit){ 
            const newValues={
              ...values,
              in_filter:values.in_filter?1:0
            }
            axios.post(`https://ecomadminapi.azhadev.ir/api/admin/categories/${location.state.categoryData.id}/attributes`,newValues,{
              headers:{
                "Authorization":`Bearer ${userToken}`
              }
            }).then(res=>{
              console.log(res);
              if(res.status==201){
                Swal.fire({
                  title:"عالیه",
                  text:"یک ویژگی به دسته بندی اضافه شد",
                  icon:"success"
                })
                setDatas(prev=>[...prev,res.data.data])
              }else{
                  Swal.fire({
                  title:"متاسفیم",
                  text:"مشکلی پیش آمده است",
                  icon:"error"
                })
              }
            })    
              }else {
                const newValues = {
                  ...values,
                  in_filter: values.in_filter ? 1 : 0
                };

                axios.put(
                  `https://ecomadminapi.azhadev.ir/api/admin/categories/attributes/${attrToEdit.id}`,
                  newValues,
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`
                    }
                  }
                ).then(res => {
                  console.log(res);

                  if (res.status === 200) {
                    Swal.fire({
                      title: "عالیه",
                      text: "ویژگی با موفقیت ویرایش شد",
                      icon: "success"
                    });

                    // داده‌های جدول رو آپدیت کن
                    setDatas(prev => {
                      return prev.map(item => {
                        if (item.id === attrToEdit.id) {
                          return res.data.data;
                        }
                        return item;
                      });
                    });

                    setAttrToEdit(null);
                  } else {
                    Swal.fire({
                      title: "متاسفیم",
                      text: "مشکلی پیش آمده است",
                      icon: "error"
                    });
                  }
                }).catch(error => {
                  console.log(error);
                  Swal.fire({
                    title: "خطا",
                    text: "ویرایش با خطا مواجه شد",
                    icon: "error"
                  });
                });
              }
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="row justify-content-center">
                <div className="row my-3">
                  <div className="col-12 col-md-6 col-lg-4 my-1">
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="عنوان ویژگی جدید"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 my-1">
                    <Field
                      type="text"
                      name="unit"
                      className="form-control"
                      placeholder="واحد ویژگی جدید"
                    />
                    <ErrorMessage
                      name="unit"
                      component="div"
                      className="text-danger small mt-1"
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
                      <Field
                        type="checkbox"
                        name="in_filter"
                        id="flexSwitchCheckDefault"
                        className="form-check-input pointer mx-3"
                      />
                    </div>
                  </div>
                  <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                    <button
                      type="submit"
                      className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text border-0"
                      title="ثبت ویژگی"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    ></button>
                    {attrToEdit?(<>
                    <button className="btn btn-secondary" onClick={()=>setAttrToEdit(null)}>کنسل</button>
                    </>):null}
                  </div>
                </div>
                <hr />
                <div className="row justify-content-between"></div>
              </div>
            </Form>
          )}
        </Formik>
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
                  <button
                    className="btn btn-success d-flex justify-content-center align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target={`#${searchparams.id}`}
                    onClick={() => setCatId(null)}
                  >
                    <i className="fas fa-plus text-light"></i>
                  </button>
                </PaginatedTable>
              </>
            ) : (
              <>
                <h1 className="text-center text-danger">{err}</h1>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
