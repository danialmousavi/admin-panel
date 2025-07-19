import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../../../components/Loading';
import PrevBtn from '../../../components/PrevBtn';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function GAllery() {
    const location=useLocation();
    const {selectedProduct}=location.state;
    console.log(selectedProduct);
    const [gallery , setGallery] = useState(selectedProduct.gallery)
    const [error, setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const apiPath="https://ecomadminapi.azhadev.ir"

        const handleSelectImage = async (e)=>{
          const userToken=JSON.parse(localStorage.getItem("loginToken"));
        setError(null)
        setLoading(true)
        const image = e.target.files[0]
        const formdata = new FormData();
        formdata.append("image", image)
        if (image.type !=  "image/png" && image.type !=  "image/jpeg" && image.type !=  "image/jpg")   
            return setError("لطفا فقط از فایل با فرمت jpg و یا png استفاده کنید")            
        if (image.size > 512000)  return setError("حجم تصویر نباید بیشتر از 500 کیلوبایت باشد")      
        axios.post(`https://ecomadminapi.azhadev.ir/api/admin/products/${selectedProduct.id}/add_image`,formdata,{
          headers:{
            "Authorization":`Bearer ${userToken}`
          }
        }).then(res=>{
          console.log(res);
          if (res.status == 201) {
            Swal.fire({
              title:"تبریک",
              text:"با موفقیت به گالری اضافه شد",
              icon:"success"
            })
            setGallery(old=>[...old, {id:res.data.data.id , is_main: 0, image:res.data.data.image}])
        }else{
              Swal.fire({
              title:"متاسفیم",
              text:"مشکلی پیش آمده است",
              icon:"success"
            })
        }
        })
        setLoading(false);

    }
  return (
<div className="container">
  <h4 className="text-center my-3">
    مدیریت گالری تصاویر:
    <span className="text-primary"> {selectedProduct.title} </span>
  </h4>

  <div className="text-left m-auto my-3">
    <PrevBtn />
  </div>

  {error && (
    <small className="d-block text-right text-danger py-3">{error}</small>
  )}

  <div className="row justify-content-center">
    <div className="d-flex flex-wrap justify-content-center gap-2">
      {gallery.map((g) => (
        <div
          key={g.id}
          className={`image_gallery position-relative ${
            g.is_main ? "main_image" : ""
          }`}
          title={g.is_main ? "تصویر اصلی" : ""}
        >
          <img src={`${apiPath}/${g.image}`} className="w-100 h-100 object-fit-cover rounded" alt="gallery" />

          <div className="image_action_container">
            {!g.is_main && (
              <i
                className="fas fa-clipboard-check text-success pointer hoverable_text mx-2 font_1_2"
                title="انتخاب به عنوان اصلی"
              ></i>
            )}
            <i
              className="fas fa-trash-alt text-danger pointer hoverable_text mx-2 font_1_2"
              title="حذف این تصویر"
            ></i>
          </div>
        </div>
      ))}

      {/* Add New Image */}
      <div
        className={`add_image_gallery position-relative ${
          loading ? "disabled" : ""
        }`}
        title="افزودن تصویر جدید"
      >
        {loading ? (
          <Loading />
        ) : (
          <i className="fas fa-plus fa-2x text-success border p-3 rounded-circle"></i>
        )}

        <input
          type="file"
          name="image"
          className="position-absolute w-100 h-100 opacity_0"
          onChange={handleSelectImage}
        />
      </div>
    </div>
  </div>
</div>

  )
}
