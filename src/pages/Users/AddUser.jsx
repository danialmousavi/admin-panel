// Refactored AddUser.jsx with edit mode handling
import React, { useEffect, useState } from 'react';
import ModalsConatainer from '../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
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
  const {setData} = useOutletContext();
  const location = useLocation();
  const editUser = location.state?.editUser;
  const [reInitialValues, setReInitialValues] = useState(null);

  const fetchRoles = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginToken"));
      const res = await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) setRoles(res.data.data);
    } catch (error) {
      Swal.fire("خطا", "خطا در دریافت نقش‌ها", "error");
    }
  };

  const fetchUserDetails = async () => {
    if (!editUser?.id) return;
    try {
      const token = JSON.parse(localStorage.getItem("loginToken"));
      const res = await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/users/${editUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      setReInitialValues({
        user_name: data.user_name || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
        national_code: data.national_code || "",
        email: data.email || "",
        password: "", // Do not pre-fill password
        birth_date: moment(data.birth_date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'),
        gender: data.gender || 1,
        roles_id: data.roles.map(r => r.id) || [],
      });
      setSelectedRoles(data.roles);
    } catch {
      Swal.fire("خطا", "خطا در دریافت اطلاعات کاربر", "error");
    }
  };

  useEffect(() => {
    fetchRoles();
    if (editUser?.id) fetchUserDetails();
  }, [editUser]);

  const addRole = (roleId, setFieldValue) => {
    const role = roles.find(r => r.id === roleId);
    if (role && !selectedRoles.some(r => r.id === roleId)) {
      const newSelected = [...selectedRoles, role];
      setSelectedRoles(newSelected);
      setFieldValue("roles_id", newSelected.map(r => r.id));
    }
  };

  const removeRole = (roleId, setFieldValue) => {
    const updated = selectedRoles.filter(r => r.id !== roleId);
    setSelectedRoles(updated);
    setFieldValue("roles_id", updated.map(r => r.id));
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("نام کاربری الزامی است"),
    first_name: Yup.string().required("نام الزامی است"),
    last_name: Yup.string().required("نام خانوادگی الزامی است"),
    phone: Yup.string().required("شماره موبایل الزامی است"),
    national_code: Yup.string().required("کد ملی الزامی است"),
    email: Yup.string().email("فرمت ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: Yup.string().min(8, "حداقل ۸ کاراکتر").required("رمز عبور الزامی است"),
    birth_date: Yup.string().required("تاریخ تولد الزامی است"),
    gender: Yup.number().required("جنسیت الزامی است"),
    roles_id: Yup.array().min(1, "حداقل یک نقش باید انتخاب شود").required("نقش الزامی است"),
  });

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

  
  return (
    <ModalsConatainer
      id="add_user_modal"
      fullScreen
      title={editUser ? "ویرایش کاربر" : "افزودن کاربر"}
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      closeFunction={() => navigate(-1)}
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        validationSchema={validationSchema}
        enableReinitialize
onSubmit={async (values) => {
  const token = JSON.parse(localStorage.getItem("loginToken"));

  const payload = {
    ...values,
    birth_date: moment.from(values.birth_date, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
  };

  const isEditMode = !!editUser?.id;
  const url = isEditMode
    ? `https://ecomadminapi.azhadev.ir/api/admin/users/${editUser.id}`
    : `https://ecomadminapi.azhadev.ir/api/admin/users`;

  const method = isEditMode ? axios.put : axios.post;

  try {
    const res = await method(url, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    
    if ([200, 201].includes(res.status)) {
      Swal.fire(
        "عملیات موفق",
        isEditMode ? "کاربر با موفقیت ویرایش شد" : "کاربر جدید با موفقیت افزوده شد",
        "success"
      ).then(() => {
        if (isEditMode) {
          // ویرایش کاربر
          setData((prev) =>
            prev.map((u) => (u.id === editUser.id ? res.data.data : u))
          );
        } else {
          // افزودن کاربر جدید
          setData((prev) => [...prev,res.data.data]);
        }

        navigate(-1); // اختیاری، اگه بخوای برگردی عقب
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire("خطا", "مشکلی در ارسال اطلاعات رخ داده", "error");
  }
}}
 
      >
        {({ setFieldValue, values }) => (
          <Form className="container">
            {/* Add your form fields here - same structure as before */}
            {/* نقش‌ها */}
              <div className="row justify-content-center">

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
            <div className="col-12 col-md-6 col-lg-8 my-1">
              <label className="form-label">نقش ها</label>
              <select
                className="form-select"
                value={roleInputValue}
                onChange={e => {
                  const roleId = parseInt(e.target.value);
                  if (roleId) addRole(roleId, setFieldValue);
                  setRoleInputValue("");
                }}
              >
                <option value="">نقشی انتخاب کنید</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.title}</option>
                ))}
              </select>
              <div className="mt-2">
                {selectedRoles.map(role => (
                  <span key={role.id} className="badge bg-primary me-1">
                    {role.title}
                    <i className="fas fa-times ms-2 text-danger" onClick={() => removeRole(role.id, setFieldValue)}></i>
                  </span>
                ))}
              </div>
              <ErrorMessage name="roles_id" component="div" className="text-danger" />
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                {editUser ? "ذخیره تغییرات" : "ذخیره"}
              </button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalsConatainer>
  );
}
