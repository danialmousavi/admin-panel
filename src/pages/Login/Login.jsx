import { useFormik } from 'formik';
import React from 'react';
import LoginSchema from '../../configs/LoginSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate=useNavigate()
  const formik=useFormik({
    initialValues:{
      phone:"",
      password:"",
      remember:false
    },
    onSubmit: (values,submitMethods) => {
      
      axios.post("https://ecomadminapi.azhadev.ir/api/auth/login",{
        ...values,
        remember:values.remember?1:0
      }).then((res=>{
        if(res.status==200){
          localStorage.setItem("loginToken",JSON.stringify(res.data.token))
          submitMethods.setSubmitting(false);
          navigate("/")
        }else{
          Swal.fire({
            title: 'خطا',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'باشه'
          })
          submitMethods.setSubmitting(false);
        }
      }
      ))
    },
    validationSchema:LoginSchema
  })
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="row g-0">


          <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">شماره تماس</label>
                <input type="phone" className={`form-control ${formik.errors.phone&&formik.touched.phone?"is-invalid":""}`} id="phone" placeholder="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="invalid-feedback">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">رمزعبور</label>
                <input type="password" className={`form-control ${formik.errors.password&&formik.touched.password?"is-invalid":""}`} id="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="form-check form-switch mb-3 d-flex  justify-content-around align-items-center">
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">به خاطر سپردن</label>
                <input onChange={formik.handleChange} name='remember' className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>{formik.isSubmitting?"لطفا صبر کنید!":"ورود"}</button>
            </form>
          </div>

          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary text-white">
            <h3 className="text-center">صفحه ورود</h3>
          </div>
        </div>
      </div>
    </div>
  );
}