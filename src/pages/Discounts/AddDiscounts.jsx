import React, { useEffect, useState } from 'react'
import ModalsConatainer from '../../components/ModalsContainer'
import { useNavigate, useOutletContext } from 'react-router-dom'
import axios from 'axios';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import moment from 'jalali-moment';
import Swal from 'sweetalert2';

export default function AddDiscounts() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productInputValue, setProductInputValue] = useState("");
  const {setDatas}=useOutletContext();

  const initialValues = {
    title: "",
    code: "",
    percent: 0,
    expire_at: "",
    for_all: true,
    product_ids: "",
  };
const validateForm = (values) => {
  const errors = {};
  
  // اعتبارسنجی عنوان
  if (!values.title) {
    errors.title = "لطفا این قسمت را پر کنید";
  } else if (!/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/.test(values.title)) {
    errors.title = "فقط از حروف و اعداد استفاده شود";
  }
  
  // اعتبارسنجی کد تخفیف
  if (!values.code) {
    errors.code = "لطفا این قسمت را پر کنید";
  } else if (!/^[a-zA-Z0-9\s@!%-.$?&]+$/.test(values.code)) {
    errors.code = "فقط از حروف و اعداد استفاده شود";
  }
  
  // اعتبارسنجی درصد تخفیف
  if (!values.percent) {
    errors.percent = "لطفا این قسمت را پر کنید";
  } else if (values.percent < 1 || values.percent > 100) {
    errors.percent = "درصد تخفیف باید بین ۱ تا ۱۰۰ باشد";
  }
  
  // اعتبارسنجی تاریخ انقضا
  if (!values.expire_at) {
    errors.expire_at = "لطفا این قسمت را پر کنید";
  } else if (!/^[0-9/\ \s-]+$/.test(values.expire_at)) {
    errors.expire_at = "فقط ازاعداد و خط تیره استفاده شود";
  }
  
  // اعتبارسنجی محصولات (اگر تخفیف برای همه نباشد)
  if (!values.for_all && (!values.product_ids || values.product_ids.trim().length === 0)) {
    errors.product_ids = "حداقل یک محصول انتخاب کنید";
  }
  
  return errors;
};

  const handleGetAllProductTitles = async () => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    try {
      const res = await axios.get("https://ecomadminapi.azhadev.ir/api/admin/products/all_titles", {
        headers: { "Authorization": `Bearer ${userToken}` }
      });
      setAllProducts(res.data.data.map(p => ({ id: p.id, value: p.title })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleGetAllProductTitles();
  }, []);

  const addProduct = (productId, setFieldValue) => {
    const product = allProducts.find(p => p.id == productId);
    if (product && !selectedProducts.some(p => p.id == productId)) {
      const newSelected = [...selectedProducts, product];
      setSelectedProducts(newSelected);
      setFieldValue(
        'product_ids', 
        newSelected.map(p => p.id).join('-')
      );
      setProductInputValue("");
    }
  };

  const removeProduct = (productId, setFieldValue) => {
    const newSelected = selectedProducts.filter(p => p.id !== productId);
    setSelectedProducts(newSelected);
    setFieldValue(
      'product_ids', 
      newSelected.map(p => p.id).join(',') || ""
    );
  };


  return (
    <ModalsConatainer
      id={"add_discount_modal"}
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      closeFunction={() => navigate(-1)}
      title="افزودن تخفیف جدید"
      fullScreen={false}
    >
      <div className="container">
        <Formik
          initialValues={initialValues}
          validate={validateForm}
onSubmit={async (values, actions) => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));

  const newValues = {
    ...values,
    expire_at: moment.from(values.expire_at, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
  };

  try {
    const res = await axios.post(
      'https://ecomadminapi.azhadev.ir/api/admin/discounts',
      newValues,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (res.status === 201) {
      setDatas(prev => [...prev, res.data.data]);

      Swal.fire({
        title: "کد تخفیف با موفقیت ایجاد شد",
        icon: "success",
        confirmButtonText: "باشه",
      });

      navigate(-1);
    }
  } catch (error) {
    console.error("خطا در ثبت تخفیف:", error);

    Swal.fire({
      title: "خطا!",
      text: error.response?.data?.message || "مشکلی پیش آمده، لطفا دوباره تلاش کنید.",
      icon: "error",
      confirmButtonText: "فهمیدم",
    });
  }
}}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row justify-content-center">
                {/* Title Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      type="text"
                      name="title"
                      className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                      placeholder="کیبرد را در حالت فارسی قرار دهید"
                    />
                    <span className="input-group-text w_8rem justify-content-center">عنوان کد</span>
                  </div>
                  <ErrorMessage name="title" component="div" className="text-danger small" />
                </div>

                {/* Code Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      type="text"
                      name="code"
                      className={`form-control ${errors.code && touched.code ? 'is-invalid' : ''}`}
                      placeholder="کیبرد را در حالت لاتین قرار دهید"
                    />
                    <span className="input-group-text w_8rem justify-content-center">کد تخفیف</span>
                  </div>
                  <ErrorMessage name="code" component="div" className="text-danger small" />
                </div>

                {/* Percent Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      type="number"
                      name="percent"
                      className={`form-control ${errors.percent && touched.percent ? 'is-invalid' : ''}`}
                      placeholder="فقط عدد"
                    />
                    <span className="input-group-text w_8rem justify-content-center">درصد تخفیف</span>
                  </div>
                  <ErrorMessage name="percent" component="div" className="text-danger small" />
                </div>

                {/* Expiration Date Field */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      type="text"
                      name="expire_at"
                      className={`form-control ${errors.expire_at && touched.expire_at ? 'is-invalid' : ''}`}
                      placeholder="مثلا 1400/10/10"
                    />
                    <span className="input-group-text w_8rem justify-content-center">تاریخ اعتبار</span>
                  </div>
                  <ErrorMessage name="expire_at" component="div" className="text-danger small" />
                </div>

                {/* For All Checkbox */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="form-check my-3">
                    <Field
                      type="checkbox"
                      name="for_all"
                      id="for_all"
                      className="form-check-input me-2"
                      onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("for_all", checked);

                      if (checked) {
                        setFieldValue("product_ids", "");     // پاک کردن مقدار product_ids
                        setSelectedProducts([]);              // پاک کردن محصولات انتخاب‌شده
                      }  }}
                    />
                    <label className="form-check-label" htmlFor="for_all">
                      تخفیف برای همه محصولات
                    </label>
                  </div>
                </div>

                {/* Product Selection (Conditional) */}
                {!values.for_all && (
                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-3" style={{ direction: 'ltr' }}>
                      <input
                        type="text"
                        value={productInputValue}
                        onChange={(e) => setProductInputValue(e.target.value)}
                        onBlur={(e) => {
                          const product = allProducts.find(
                            p => p.value === e.target.value
                          );
                          if (product) addProduct(product.id, setFieldValue);
                        }}
                        className="form-control"
                        placeholder="قسمتی از نام محصول را وارد کنید"
                        list="productLists"
                      />
                      <datalist id="productLists">
                        {allProducts.map((product) => (
                          <option key={product.id} value={product.value} />
                        ))}
                      </datalist>
                    </div>

                    {/* Selected Products Chips */}
                    <div className="d-flex flex-wrap mt-2">
                      {selectedProducts.map((product) => (
                        <span className="chips_elem me-2 mb-2" key={product.id}>
                          <i
                            className="fas fa-times text-danger pointer ms-1"
                            onClick={() => removeProduct(product.id, setFieldValue)}
                          ></i>
                          {product.value}
                        </span>
                      ))}
                    </div>
                    <ErrorMessage name="product_ids" component="div" className="text-danger small mt-2" />
                  </div>
                )}

                {/* Submit Button */}
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button type="submit" className="btn btn-primary">
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