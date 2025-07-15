import React, { useEffect, useState } from "react";
import ModalsConatainer from "../../components/ModalsContainer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddColors({setDatas,ColortoEdit}) {
    const [reInitialValues,setReInitialValues]=useState(null)
  // اسکیما ولیدیشن
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("نام رنگ الزامی است."),
    code: Yup.string()
      .matches(/^#([0-9a-fA-F]{3}){1,2}$/, "کد رنگ معتبر نیست.")
      .required("کد رنگ الزامی است."),
  });
  useEffect(()=>{
    console.log(ColortoEdit);
    if(ColortoEdit){
        setReInitialValues({
            title:ColortoEdit.title,
            code:ColortoEdit.code
        })
    }else{
        setReInitialValues(null)
    }
  },[ColortoEdit])
  return (
    <ModalsConatainer
      fullScreen={false}
      id="add_color_modal"
      title="افزودن رنگ جدید"
    >
      <div className="container">
        <Formik
          initialValues={reInitialValues||{
            title: "",
            code: "#563d7c",   // مقدار اولیه رنگ
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const userToken=JSON.parse(localStorage.getItem("loginToken"))
            console.log(values);
            if(!ColortoEdit){
              axios.post("https://ecomadminapi.azhadev.ir/api/admin/colors",values,{
                headers:{
                    "Authorization":`Bearer ${userToken}`
                }
            }).then(res=>{
                console.log(res);
                
                if(res.status==200||res.status==201){
                    Swal.fire({
                        title:"عالیه",
                        text:"رنگ با موفقیت اضافه شد",
                        icon:"success"
                    })
                setDatas(prevData=>[...prevData,res.data.data])
                }else{
                    Swal.fire({
                        title:"متاسفیم",
                        text:"مشکلی پیش آمده است",
                        icon:"error"
                    })

                }
            })
            }else{
            axios.put(`https://ecomadminapi.azhadev.ir/api/admin/colors/${ColortoEdit.id}`,values,{
                headers:{
                    "Authorization":`Bearer ${userToken}`
                }
            }).then(res=>{
                console.log(res);
                
                if(res.status==200||res.status==201){
                    Swal.fire({
                        title:"عالیه",
                        text:"رنگ با موفقیت آپدیت شد",
                        icon:"success"
                    })
                    setDatas((prev) =>
                    prev.map((item) =>
                      item.id === ColortoEdit.id ? res.data.data : item
                    )
                  );
                }else{
                    Swal.fire({
                        title:"متاسفیم",
                        text:"مشکلی پیش آمده است",
                        icon:"error"
                    })

                }
            })
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="input-group my-3 ltr-direction">
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder=""
                    />
                    <span className="input-group-text w_8rem justify-content-center">
                      نام رنگ
                    </span>
                  </div>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="exampleColorInput"
                    className="form-label"
                  >
                    انتخاب رنگ
                  </label>
                  <input
                    type="color"
                    id="exampleColorInput"
                    className="form-control form-control-color"
                    value={values.code}
                    onChange={(e) => {
                      setFieldValue("code", e.target.value);
                    }}
                    title="Choose your color"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalsConatainer>
  );
}
