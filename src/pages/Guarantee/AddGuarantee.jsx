import React, { useEffect, useState } from "react";
import ModalsConatainer from "../../components/ModalsContainer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddGuarantee({setDatas,guaranteetoEdit}) {
  // تعریف اسکیما
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان گارانتی الزامی است."),
    descriptions: Yup.string().required("توضیحات الزامی است."),
    length: Yup.number()
      .typeError("مدت گارانتی باید عدد باشد.")
      .positive("مدت گارانتی باید عدد مثبت باشد.")
      .required("مدت گارانتی الزامی است."),
    length_unit: Yup.string().required("واحد مدت الزامی است."),
  });
  const [reInitialValues,setReInitialValues]=useState(null);
  useEffect(()=>{
    if(guaranteetoEdit){
          setReInitialValues({
            title: guaranteetoEdit.title ,
            descriptions: guaranteetoEdit.descriptions,
            length:guaranteetoEdit.length,
            length_unit: guaranteetoEdit.length_unit ,
            });
    }
    else{
        setReInitialValues(null)
    }
  },[guaranteetoEdit])
  return (
    <>
      <ModalsConatainer
        title="افزودن گارانتی"
        id="add_guarantee_modal"
        fullScreen={false}
      >
        <div className="container">
          <Formik
            initialValues={reInitialValues||{
              title: "",
              descriptions: "",
              length: "",
              length_unit: "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const userToken = JSON.parse(localStorage.getItem("loginToken"));
              try {
                let response;
                if (guaranteetoEdit) {
                  // حالت ویرایش (PUT)
                  response = await axios.put(
                    `https://ecomadminapi.azhadev.ir/api/admin/guarantees/${guaranteetoEdit.id}`,
                    values,
                    {
                      headers: {
                        Authorization: `Bearer ${userToken}`,
                      },
                    }
                  );

                  if (response.status == 200||response.status==201) {
                    setDatas((prev) =>
                      prev.map((item) =>
                        item.id === guaranteetoEdit.id ? response.data.data : item
                      )
                    );
                    Swal.fire({
                      title: "تبریک!",
                      text: "گارانتی با موفقیت ویرایش شد.",
                      icon: "success",
                    });
                    resetForm();
                  }

                } else {
                  // حالت افزودن (POST)
                  response = await axios.post(
                    "https://ecomadminapi.azhadev.ir/api/admin/guarantees",
                    values,
                    {
                      headers: {
                        Authorization: `Bearer ${userToken}`,
                      },
                    }
                  );

                  if (response.status === 200 || response.status === 201) {
                    setDatas((prev) => [...prev, response.data.data]);
                    Swal.fire({
                      title: "تبریک!",
                      text: "گارانتی با موفقیت اضافه شد.",
                      icon: "success",
                    });
                  }
                }
                resetForm();
              } catch (error) {
                console.error(error);
                Swal.fire({
                  title: "متاسفیم",
                  text: "مشکلی پیش آمده است.",
                  icon: "error",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
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
                        عنوان گارانتی
                      </span>
                    </div>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>

                  <div className="col-12">
                    <div className="input-group my-3 ltr-direction">
                      <Field
                        type="text"
                        name="descriptions"
                        className="form-control"
                        placeholder=""
                      />
                      <span className="input-group-text w_8rem justify-content-center">
                        توضیحات گارانتی
                      </span>
                    </div>
                    <ErrorMessage
                      name="descriptions"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>

                  <div className="col-12">
                    <div className="input-group my-3 ltr-direction">
                      <Field
                        type="text"
                        name="length"
                        className="form-control"
                        placeholder=" به ماه"
                      />
                      <span className="input-group-text w_8rem justify-content-center">
                        مدت گارانتی
                      </span>
                    </div>
                    <ErrorMessage
                      name="length"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>

                  <div className="col-12">
                    <div className="input-group my-3 ltr-direction">
                      <Field
                        type="text"
                        name="length_unit"
                        className="form-control"
                        placeholder=""
                      />
                      <span className="input-group-text w_8rem justify-content-center">
                        واحد مدت
                      </span>
                    </div>
                    <ErrorMessage
                      name="length_unit"
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
    </>
  );
}
