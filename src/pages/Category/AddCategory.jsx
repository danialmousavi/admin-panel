import React, { useContext, useEffect, useState } from "react";
import ModalsConatainer from "../../components/ModalsContainer";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import categorySchema from "../../configs/CategorySchema";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";

// Initial values for Formik form
const initialValues = {
  title: "",
  description: "",
  parent_id: "",
  is_active: false,
  show_in_menu: false,
  image: null,
};

export default function AddCategory({ setForceReRender }) {
  const [parents, setParents] = useState([]); // To store list of parent categories
  const params = useParams(); // Get URL parameters

  const [reInirialValues, setReinitialValues] = useState(null); // For resetting initial values if categoryId exists

  const {catId,setCatId}=useContext(CategoryContext)//category id for editing the category
  const [editCategory,setEditCategory]=useState(null)
  // Fetch all categories to populate parent dropdown
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    axios
      .get("https://ecomadminapi.azhadev.ir/api/admin/categories", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setParents(res.data.data);
        } else {
          console.error("Error fetching categories:", res.data.message);
        }
      });
  }, []);

  // If categoryId exists in URL params, pre-fill parent_id in form
useEffect(() => {
  if (catId && editCategory) {
    setReinitialValues({
      title: editCategory.title || "",
      description: editCategory.description || "",
      parent_id: editCategory.parent_id || "",
      is_active: editCategory.is_active ? true : false,
      show_in_menu: editCategory.show_in_menu ? true : false,
      image: null,
    });
  } else if (params.categoryId) {
    setReinitialValues({
      ...initialValues,
      parent_id: params.categoryId,
    });
  } else {
    setReinitialValues(initialValues);
  }
}, [params.categoryId, editCategory, catId]);

  //get one category for editing
  useEffect(()=>{
    if(catId){
      const userToken=JSON.parse(localStorage.getItem("loginToken"))
      axios.get(`https://ecomadminapi.azhadev.ir/api/admin/categories/${catId}`,{
        headers:{
          "Authorization":`Bearer ${userToken}`
        }
      }).then(res=>{
        console.log(res);
        setEditCategory(res.data.data)
      }
      )
    }
  },[catId])
  return (
    <ModalsConatainer
      fullScreen={true}
      id={"add_product_category_modal"}
      title={catId?`ویرایش${editCategory?editCategory.title:""}`:"افزودن دسته بندی جدید"}
    >
      {/* Formik Form */}
      <Formik
        initialValues={reInirialValues || initialValues}
        validationSchema={categorySchema}
        enableReinitialize // Allows form values to reset when initialValues change
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const userToken = JSON.parse(localStorage.getItem("loginToken"));

          let submitPromise;

          if (!catId) {
            // Create new category
            if (values.image) {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description || "");
              formData.append("parent_id", values.parent_id || "");
              formData.append("is_active", values.is_active ? "1" : "0");
              formData.append("show_in_menu", values.show_in_menu ? "1" : "0");
              formData.append("image", values.image);

              submitPromise = axios.post(
                "https://ecomadminapi.azhadev.ir/api/admin/categories",
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            } else {
              submitPromise = axios.post(
                "https://ecomadminapi.azhadev.ir/api/admin/categories",
                {
                  title: values.title,
                  description: values.description || "",
                  parent_id: values.parent_id || "",
                  is_active: values.is_active ? 1 : 0,
                  show_in_menu: values.show_in_menu ? 1 : 0,
                },
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              );
            }
          } else {
            // Update category (no image)
            submitPromise = axios.put(
              `https://ecomadminapi.azhadev.ir/api/admin/categories/${catId}`,
              {
                title: values.title,
                description: values.description || "",
                parent_id: values.parent_id || "",
                is_active: values.is_active ? 1 : 0,
                show_in_menu: values.show_in_menu ? 1 : 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
          }

          submitPromise
            .then((res) => {
              if (res.status >= 200 && res.status < 300) {
                Swal.fire({
                  title: "موفق",
                  text: !catId
                    ? "دسته‌بندی با موفقیت اضافه شد"
                    : "دسته‌بندی با موفقیت ویرایش شد",
                  icon: "success",
                  confirmButtonText: "باشه",
                });
                resetForm();
                setForceReRender((prev) => prev + 1);
              } else {
                Swal.fire({
                  title: "خطا",
                  text: res.data?.message || "مشکلی پیش آمده است",
                  icon: "error",
                  confirmButtonText: "باشه",
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                title: "خطا",
                text:
                  err.response?.data?.message ||
                  "مشکلی در ارتباط با سرور رخ داده است.",
                icon: "error",
                confirmButtonText: "باشه",
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}

      >
        {/* Form body */}
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <div className="container">
              <div className="row justify-content-center">
                {/* Parent Category Dropdown */}
                {parents.length > 0 ? (
                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group mb-3 ltr-direction">
                      <Field as="select" name="parent_id" className="form-control">
                        <option value="">بدون والد</option>
                        {parents.map((parent) => (
                          <option key={parent.id} value={parent.id}>
                            {parent.title}
                          </option>
                        ))}
                      </Field>
                      <span className="input-group-text w_6rem justify-content-center">
                        دسته والد
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Title Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 ltr-direction">
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="عنوان دسته"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      عنوان
                    </span>
                  </div>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger small mb-2"
                  />
                </div>

                {/* Description Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 ltr-direction">
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      placeholder="توضیحات"
                      rows="5"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      توضیحات
                    </span>
                  </div>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger small mb-2"
                  />
                </div>

                {/* Image Upload */}
                {!catId?(               <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 ltr-direction">
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تصویر
                    </span>
                  </div>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger small mb-2"
                  />
                </div>):null}

                {/* is_active Switch */}
                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="form-check form-switch col-5 col-md-2">
                    <Field
                      type="checkbox"
                      name="is_active"
                      id="flexSwitchCheckDefault"
                      className="form-check-input pointer"
                    />
                    <label
                      className="form-check-label pointer"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      وضعیت فعال
                    </label>
                  </div>
                </div>

                {/* show_in_menu Switch */}
                <div className="col-12 col-md-6 col-lg-8 row justify-content-center mt-3">
                  <div className="form-check form-switch col-5 col-md-2">
                    <Field
                      type="checkbox"
                      name="show_in_menu"
                      id="flexSwitchCheckMenu"
                      className="form-check-input pointer"
                    />
                    <label
                      className="form-check-label pointer"
                      htmlFor="flexSwitchCheckMenu"
                    >
                      نمایش در منو
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
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
            </div>
          </Form>
        )}
      </Formik>
    </ModalsConatainer>
  );
}
