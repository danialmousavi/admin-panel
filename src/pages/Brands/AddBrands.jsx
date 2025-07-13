import React from "react";
import ModalsConatainer from "../../components/ModalsContainer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import BrandSchema from "../../configs/BrandsSchema";

export default function AddBrands({setDatas}) {
  return (
    <ModalsConatainer
      fullScreen={false}
      id={"add_brand_modal"}
      title={"افزودن برند"}
    >
      <div className="container">
        <Formik
          initialValues={{
            original_name: "",
            persian_name: "",
            descriptions: "",
            logo: null,
          }}
          validationSchema={BrandSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const token = JSON.parse(localStorage.getItem("loginToken"));
              const formData = new FormData();
              formData.append("original_name", values.original_name);
              formData.append("persian_name", values.persian_name);
              formData.append("descriptions", values.descriptions);
              if (values.logo) {
                formData.append("logo", values.logo);
              }

              const res = await axios.post(
                "https://ecomadminapi.azhadev.ir/api/admin/brands",
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(res);
              
              if (res.status == 201) {
                Swal.fire({
                  title: "موفق",
                  text: "برند با موفقیت اضافه شد",
                  icon: "success",
                  confirmButtonText: "باشه",
                });
                resetForm();
                setDatas(prevDatas=>[...prevDatas,res.data.data])
              } else {
                Swal.fire({
                  title: "خطا",
                  text: res.data?.message || "مشکلی پیش آمده است",
                  icon: "error",
                  confirmButtonText: "باشه",
                });
              }
            } catch (error) {
              Swal.fire({
                title: "خطا",
                text:
                  error.response?.data?.message ||
                  "مشکلی در ارتباط با سرور رخ داده است.",
                icon: "error",
                confirmButtonText: "باشه",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="input-group my-3 ltr-direction">
                    <Field
                      name="original_name"
                      type="text"
                      className="form-control"
                      placeholder="کیبرد را در حالت لاتین قرار دهید"
                    />
                    <span className="input-group-text w_8rem justify-content-center">
                      عنوان لاتین برند
                    </span>
                  </div>
                  <ErrorMessage
                    name="original_name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <div className="input-group my-3 ltr-direction">
                    <Field
                      name="persian_name"
                      type="text"
                      className="form-control"
                      placeholder="کیبرد را در حالت فارسی قرار دهید"
                    />
                    <span className="input-group-text w_8rem justify-content-center">
                      عنوان فارسی برند
                    </span>
                  </div>
                  <ErrorMessage
                    name="persian_name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <div className="input-group my-3 ltr-direction">
                    <Field
                      name="descriptions"
                      as="textarea"
                      rows="3"
                      className="form-control"
                      placeholder="متن کوتاه در مورد برند"
                    />
                    <span className="input-group-text w_8rem justify-content-center">
                      توضیحات برند
                    </span>
                  </div>
                  <ErrorMessage
                    name="descriptions"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <div className="input-group mb-3 ltr-direction">
                    <input
                      name="logo"
                      type="file"
                      className="form-control"
                      onChange={(event) => {
                        setFieldValue("logo", event.currentTarget.files[0]);
                      }}
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تصویر
                    </span>
                  </div>
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "در حال ارسال..." : "ذخیره"}
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
