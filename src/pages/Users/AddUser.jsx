import React, { useEffect, useState } from 'react';
import ModalsConatainer from '../../components/ModalsContainer';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'jalali-moment';

export default function AddUser() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [roleInputValue, setRoleInputValue] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const setData=useOutletContext();
  const initialValues = {
    user_name: '',
    first_name: '',
    last_name: '',
    phone: '',
    national_code: '',
    email: '',
    password: '',
    birth_date: '',
    gender: 1,
    roles_id: []
  };

  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("نام کاربری الزامی است"),
    first_name: Yup.string().required('نام الزامی است'),
    last_name: Yup.string().required('نام خانوادگی الزامی است'),
    phone: Yup.string().required('شماره موبایل الزامی است'),
    national_code: Yup.string().required('کد ملی الزامی است'),
    email: Yup.string().email('فرمت ایمیل معتبر نیست').required('ایمیل الزامی است'),
    password: Yup.string().min(8, 'حداقل ۸ کاراکتر').required('رمز عبور الزامی است'),
    birth_date: Yup.string().required('تاریخ تولد الزامی است'),
    gender: Yup.number().required('جنسیت الزامی است'),
    roles_id: Yup.array().min(1, 'حداقل یک نقش باید انتخاب شود').required('نقش الزامی است'),
  });

  // دریافت نقش ها از API
  const fetchRoles = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("loginToken"));
      const response = await axios.get(
        `https://ecomadminapi.azhadev.ir/api/admin/roles`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      
      if (response.status === 200) {
        setRoles(response.data.data);
      } else {
        Swal.fire({
          title: "خطا",
          text: response.data?.message || "مشکلی پیش آمده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "مشکلی در ارتباط با سرور رخ داده است.";

      Swal.fire({
        title: "خطا",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // اضافه کردن نقش
  const addRole = (roleId, setFieldValue) => {
    // پیدا کردن نقش از لیست roles
    const roleToAdd = roles.find(r => r.id === roleId);
    if (roleToAdd && !selectedRoles.some(r => r.id === roleId)) {
      const newSelectedRoles = [...selectedRoles, roleToAdd];
      setSelectedRoles(newSelectedRoles);

      // مقدار roles_id فرم رو هم بروز کن
      setFieldValue("roles_id", newSelectedRoles.map(r => r.id));
    }
  };

  // حذف نقش
  const removeRole = (roleId, setFieldValue) => {
    const newSelectedRoles = selectedRoles.filter(r => r.id !== roleId);
    setSelectedRoles(newSelectedRoles);

    // مقدار roles_id فرم رو هم بروز کن
    setFieldValue("roles_id", newSelectedRoles.map(r => r.id));
  };
  return (
    <ModalsConatainer
      id={"add_user_modal"}
      fullScreen={true}
      title={"افزودن کاربر"}
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      closeFunction={() => navigate(-1)}
    >
      <Formik
       initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={(values)=>{
      const userToken = JSON.parse(localStorage.getItem("loginToken"));

        const newValues={
          ...values,
          birth_date: moment.from(values.birth_date, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
        }
        console.log(newValues);
        axios.post("https://ecomadminapi.azhadev.ir/api/admin/users",newValues,{
          headers:{
            "Authorization":`Bearer ${userToken}`
          }
        }).then(res=>{
          console.log(res);
          
          if(res.status==201){
            Swal.fire({
              title:"تبریک",
              icon:"success",
              text:"کاربر با موفقیت ایجاد شد"
            }).then(()=>{
              navigate(-1)
            })
          }else{
             Swal.fire({
              title:"متاسفیم",
              icon:"error",
              text:"مشکلی پیش آمده است"
            })
          }
        })
      }}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="container">
              <div className="row justify-content-center">
              {/* نام کاربری */}
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group my-1" style={{ direction: 'ltr' }}>
                  <Field name="user_name" type="text" className="form-control" placeholder="مثلا gh123" />
                  <span className="input-group-text w_8rem justify-content-center">نام کاربری</span>
                </div>
                <ErrorMessage name="user_name" component="div" className="text-danger" />
              </div>
                {/* نام */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <Field name="first_name" type="text" className="form-control" placeholder="فقط از حروف استفاده شود" />
                    <span className="input-group-text w_8rem justify-content-center">نام</span>
                  </div>
                  <ErrorMessage name="first_name" component="div" className="text-danger" />
                </div>

                {/* نام خانوادگی */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <Field name="last_name" type="text" className="form-control" placeholder="فقط از حروف استفاده شود" />
                    <span className="input-group-text w_8rem justify-content-center">نام خانوادگی</span>
                  </div>
                  <ErrorMessage name="last_name" component="div" className="text-danger" />
                </div>

                {/* کد ملی */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <Field name="national_code" type="number" className="form-control" placeholder="فقط از عدد استفاده شود" />
                    <span className="input-group-text w_8rem justify-content-center">کد ملی</span>
                  </div>
                  <ErrorMessage name="national_code" component="div" className="text-danger" />
                </div>

                {/* شماره موبایل */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <Field name="phone" type="text" className="form-control" placeholder="فقط از عدد استفاده شود" />
                    <span className="input-group-text w_8rem justify-content-center">شماره موبایل</span>
                  </div>
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>

                {/* ایمیل */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <Field name="email" type="email" className="form-control" placeholder="فقط فرمت ایمیل (email@yourhost.com)" />
                    <span className="input-group-text w_8rem justify-content-center">ایمیل</span>
                  </div>
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                {/* رمز عبور */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-1" style={{ direction: 'ltr' }}>
                    <span className="input-group-text justify-content-center pointer">
                      <i className="fas fa-eye"></i>
                    </span>
                    <Field name="password" type="password" className="form-control" placeholder="حد اقل 8 کارکتر" />
                    <span className="input-group-text w_8rem justify-content-center">رمز عبور</span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                {/* تاریخ تولد */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      type="text"
                      name="birth_date"
                      className="form-control"
                      placeholder="مثلا 1400/10/10"
                    />
                    <span className="input-group-text w_8rem justify-content-center">تاریخ تولد</span>
                  </div>
                  <ErrorMessage name="birth_date" component="div" className="text-danger" />
                </div>

                {/* بقیه فیلدها بدون تغییر همون‌طور که هستن */}
             <div className="col-12 col-md-6 col-lg-8 mb-3">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <textarea type="text" className="form-control" placeholder="خیابان - کوچه و ..." />
                      <span className="input-group-text w_8rem justify-content-center"> آدرس</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="مثلا @qasem" />
                      <span className="input-group-text w_8rem justify-content-center">اینستاگرام</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="مثلا @qasem" />
                      <span className="input-group-text w_8rem justify-content-center">تلگرام</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="file" className="form-control" />
                      <span className="input-group-text justify-content-center">تصویر</span>
                    </div>
                  </div>
    {/* نقش ها */}
                <div className="col-12 col-md-6 col-lg-8 my-1">
                  <label className="form-label">نقش ها</label>
                  <select
                    className="form-select"
                    value={roleInputValue}
                    onChange={e => {
                      const roleId = parseInt(e.target.value);
                      if (roleId) {
                        addRole(roleId, setFieldValue);
                      }
                      setRoleInputValue(""); // بعد از انتخاب خالی کن
                    }}
                  >
                    <option value="">نقشی انتخاب کنید</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                  </select>

                  {/* نمایش نقش های انتخاب شده */}
                  <div className="mt-2">
                    {selectedRoles.map(role => (
                      <span
                        key={role.id}
                        className="chips_elem d-inline-flex align-items-center m-1 p-1 rounded bg-primary text-white"
                        style={{ cursor: 'default' }}
                      >
                        {role.title}
                        <i
                          className="fas fa-times ms-2 text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeRole(role.id, setFieldValue)}
                        ></i>
                      </span>
                    ))}
                  </div>
                  {/* خطای اعتبارسنجی */}
                  <ErrorMessage name="roles_id" component="div" className="text-danger" />
                </div>
              
                {/* دکمه ذخیره */}
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button type="submit" className="btn btn-primary">ذخیره</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalsConatainer>
  );
}
