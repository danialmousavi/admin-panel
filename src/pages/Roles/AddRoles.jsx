import React, { useEffect, useState } from 'react';
import ModalsConatainer from '../../components/ModalsContainer';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function AddRoles() {
  const navigate = useNavigate();
  const { setDatas } = useOutletContext();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // دریافت مجوزها از سرور
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const userToken = JSON.parse(localStorage.getItem('loginToken'));
      const res = await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/permissions`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        setPermissions(res.data.data);
      } else {
        Swal.fire({
          title: 'خطا',
          text: res.data?.message || 'مشکلی پیش آمده است',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'خطا',
        text: error.response?.data?.message || 'مشکلی در ارتباط با سرور رخ داده است.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // اعتبارسنجی فرم
  const validateForm = (values) => {
    const errors = {};
    if (!values.title) errors.title = 'عنوان نقش الزامی است';
    if (!values.description) errors.description = 'توضیحات الزامی است';
    if (values.permissions_id.length === 0) errors.permissions_id = 'حداقل یک مجوز انتخاب کنید';
    return errors;
  };

  return (
    <ModalsConatainer
      id="add_role_modal"
      fullScreen={true}
      title="افزودن نقش"
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik
          initialValues={{
            title: '',
            description: '',
            permissions_id: [],
          }}
          validate={validateForm}
          onSubmit={async (values, actions) => {
            const userToken = JSON.parse(localStorage.getItem('loginToken'));
            try {
              const res = await axios.post(
                'https://ecomadminapi.azhadev.ir/api/admin/roles',
                values,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              );

              if (res.status === 201) {
                setDatas((prev) => [...prev, res.data.data]);
                Swal.fire({
                  title: 'نقش با موفقیت ایجاد شد',
                  icon: 'success',
                });
                navigate(-1);
              }
            } catch (error) {
              Swal.fire({
                title: 'خطا!',
                text: error.response?.data?.message || 'ارسال نقش با خطا مواجه شد.',
                icon: 'error',
              });
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row justify-content-center">

                {/* عنوان نقش */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      name="title"
                      className="form-control"
                      placeholder="مثلاً مدیر فروش"
                    />
                    <span className="input-group-text w_8rem justify-content-center">عنوان نقش</span>
                  </div>
                  <ErrorMessage name="title" component="div" className="text-danger small" />
                </div>

                {/* توضیحات */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group my-3" style={{ direction: 'ltr' }}>
                    <Field
                      name="description"
                      className="form-control"
                      placeholder="توضیحی درباره این نقش بنویسید"
                    />
                    <span className="input-group-text w_8rem justify-content-center">توضیحات نقش</span>
                  </div>
                  <ErrorMessage name="description" component="div" className="text-danger small" />
                </div>

                {/* لیست مجوزها */}
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="my-3 border rounded p-3">
                    <label className="fw-bold mb-2 d-block">مجوزها:</label>
                    {permissions.map((perm) => (
                      <div className="form-check" key={perm.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`perm-${perm.id}`}
                          checked={values.permissions_id.includes(perm.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue('permissions_id', [...values.permissions_id, perm.id]);
                            } else {
                              setFieldValue(
                                'permissions_id',
                                values.permissions_id.filter((id) => id !== perm.id)
                              );
                            }
                          }}
                        />
                        <label className="form-check-label" htmlFor={`perm-${perm.id}`}>
                          {perm.description}
                        </label>
                      </div>
                    ))}
                    <ErrorMessage name="permissions_id" component="div" className="text-danger small mt-2" />
                  </div>
                </div>

                {/* دکمه ذخیره */}
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
