import React from "react";
import ModalsConatainer from "../../components/ModalsContainer";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddDelivery() {
  const navigate = useNavigate();
const { fetchData } = useOutletContext();
  const initialValues = {
    title: "",
    amount: "",
    time: 1,
    time_unit: "روز",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
    amount: Yup.number()
      .typeError("فقط عدد وارد کنید")
      .required("لطفا این قسمت را پر کنید"),
    time: Yup.number()
      .typeError("فقط عدد وارد کنید")
      .required("لطفا این قسمت را پر کنید"),
    time_unit: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
  });

  return (
    <ModalsConatainer
      id="add_delivery_modal"
      fullScreen={false}
      title="افزودن روش ارسال"
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      closeFunction={() => navigate("/deliveries")}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        
        onSubmit={async (values) => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));

  try {
    const res = await axios.post(
      "https://ecomadminapi.azhadev.ir/api/admin/deliveries",
      values,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (res.status === 201) {
      Swal.fire({
        title: "موفق",
        text: "روش ارسال با موفقیت اضافه شد",
        icon: "success",
      }).then(() => {
       fetchData(); // ⬅️ اینجا جدول رو آپدیت کن
        navigate(-1); // برگشت به جدول
      });
    } else {
      Swal.fire({
        title: "خطا",
        text: res.data?.message || "مشکلی پیش آمده است",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "خطا",
      text: error?.response?.data?.message || "مشکلی در ارتباط با سرور رخ داده است.",
      icon: "error",
    });
  }
}}
      >
        <Form>
          <div className="container">
            <div className="row justify-content-center">
              {/* عنوان */}
              <div className="col-12">
                <div className="input-group my-3 ltr-direction">
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder=""
                  />
                  <span className="input-group-text w_8rem justify-content-center">
                    عنوان
                  </span>
                </div>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* هزینه */}
              <div className="col-12">
                <div className="input-group my-3 ltr-direction">
                  <Field
                    type="number"
                    name="amount"
                    className="form-control"
                    placeholder="تومان (فقط عدد)"
                  />
                  <span className="input-group-text w_8rem justify-content-center">
                    هزینه
                  </span>
                </div>
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* مدت ارسال */}
              <div className="col-12">
                <div className="input-group my-3 ltr-direction">
                  <Field
                    type="number"
                    name="time"
                    className="form-control"
                    placeholder="فقط عدد"
                  />
                  <span className="input-group-text w_8rem justify-content-center">
                    مدت ارسال
                  </span>
                </div>
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* واحد مدت ارسال */}
              <div className="col-12">
                <div className="input-group my-3 ltr-direction">
                  <Field
                    type="text"
                    name="time_unit"
                    className="form-control"
                    placeholder=""
                  />
                  <span className="input-group-text w_8rem justify-content-center">
                    واحد مدت ارسال
                  </span>
                </div>
                <ErrorMessage
                  name="time_unit"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* دکمه ذخیره */}
              <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                <button type="submit" className="btn btn-primary">
                  ذخیره
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </ModalsConatainer>
  );
}
