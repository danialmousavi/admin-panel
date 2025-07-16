import React, { useEffect, useState } from 'react'
import ModalsConatainer from '../../components/ModalsContainer'
import { Formik } from 'formik';
import axios from 'axios';
import ProductsvalidationSchema from '../../configs/ProductsSchema';
import PrevBtn from '../../components/PrevBtn';

export default function AddProducts() {
  const [loading, setLoading] = useState(false);
  const [catId, setCatId] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory,setSelectedCategory]=useState([])

  const initialValues = {
    category_ids: "",
    title: "",
    price: "",
    weight: "",
    brand_id: "",
    color_ids: "",
    guarantee_ids: "",
    descriptions: "",
    short_descriptions: "",
    cart_descriptions: "",
    image: null,
    alt_image: "",
    keywords: "",
    stock: "",
    discount: "",
  };

// Function to fetch data from the API (either main categories or subcategories)
  const fetchData = async () => {
    setLoading(true);
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/categories${catId ? `?parent=${catId}` : ""}`, {
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    }).then(res => {
      if (catId) {
        setSubCategories(res.data.data);// if catId exists, fetch subcategories
      } else {
        setMainCategories(res.data.data);// if no catId, fetch main categories
      }
    });
    setLoading(false);
  };
// Run fetchData whenever catId changes
  useEffect(() => {
    fetchData();
  }, [catId]);

  //chnage subcategeory and save it in state 
  const handleSubcategoryChange=(value,setFieldValue)=>{
    setSelectedCategory(oldData=>{
      if(oldData.findIndex(d=>d.id==value)==-1){
           const newData=[...oldData,subCategories.filter(c=>c.id==value)[0]]
           const selectedIds=newData.map(nd=>nd.id)
          setFieldValue("category_ids", selectedIds.join("-"));
            return newData
      }else{
        return oldData
      }
    })
  }
  const handleRemoveFromCategory=(categoryId,setFieldValue) =>{
    setSelectedCategory(oldData=>{
      let newData=oldData.filter(d=>d.id!==categoryId);
      const selectedIds=newData.map(nd=>nd.id)
      setFieldValue("category_ids", selectedIds.join("-"));
      return newData
    });

  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductsvalidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        ...formikProps
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h4 className='text-center'>افزودن محصول جدید</h4>
            <div className='text-start'>
              <PrevBtn/>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-8">
                {/* MAIN CATEGORY SELECT */}
                <div className="input-group mb-2" style={{ direction: "ltr" }}>
                  <select
                    className="form-control"
                    name="category_ids"
                    value={values.category_ids}
                    onChange={(e) => {
                      handleChange(e);
                      const selectedId = e.target.value;
                      if (selectedId) {
                        setCatId(selectedId);
                      } else {
                        setCatId(null);
                        setSubCategories([]);
                      }
                    }}
                    onBlur={handleBlur}
                  >
                    <option value="">انتخاب دسته محصول</option>
                    {mainCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                  <span className="input-group-text w_6rem justify-content-center">دسته</span>
                </div>
                {errors.category_ids &&  (
                  <div className="text-danger">{errors.category_ids}</div>
                )}

                {/* SUBCATEGORY SELECT */}
                {subCategories.length > 0 && (
                  <div className="input-group mb-2 mt-3" style={{ direction: "ltr" }}>
                    <select
                      className="form-control"
                       onChange={(e) => {
                        handleChange(e);
                        handleSubcategoryChange(e.target.value,setFieldValue);
                      }}
                      onBlur={handleBlur}
                    >
                      <option value="">انتخاب زیر دسته محصول</option>
                      {subCategories.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.title}</option>
                      ))}
                    </select>
                    <span className="input-group-text w_6rem justify-content-center">زیر دسته</span>
                  </div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                {selectedCategory.map(s=>(
                <span className="chips_elem" key={s.id}>
                  <i className="fas fa-times text-danger" onClick={()=>handleRemoveFromCategory(s.id,setFieldValue)}></i>
                  {s.title}
                </span>
                ))}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group my-3" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="عنوان محصول"
                  />
                  <span className="input-group-text w_6rem justify-content-center">عنوان</span>
                </div>
                {errors.title && touched.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="قیمت محصول"
                  />
                  <span className="input-group-text w_6rem justify-content-center">قیمت</span>
                </div>
                {errors.price && touched.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="وزن محصول (کیلوگرم)"
                  />
                  <span className="input-group-text w_6rem justify-content-center">وزن</span>
                </div>
                {errors.weight && touched.weight && (
                  <div className="text-danger">{errors.weight}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <span className="input-group-text justify-content-center">
                    <i className="fas fa-plus text-success hoverable_text pointer"></i>
                  </span>
                  <input
                    type="text"
                    name="brand_id"
                    value={values.brand_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="قسمتی از نام برند را وارد کنید"
                    list="brandLists"
                  />
                  <span className="input-group-text w_6rem justify-content-center">برند</span>
                  <datalist id="brandLists">
                    <option value="سامسونگ" />
                    <option value="سونی" />
                    <option value="اپل" />
                  </datalist>
                </div>
                {errors.brand_id && touched.brand_id && (
                  <div className="text-danger">{errors.brand_id}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-2" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="color_ids"
                    value={values.color_ids}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="قسمتی از نام رنگ را وارد کنید"
                    list="colorList"
                  />
                  <datalist id="colorList">
                    <option value="مشکی" />
                    <option value="سفید" />
                    <option value="قرمز" />
                  </datalist>
                  <span className="input-group-text w_6rem justify-content-center">رنگ</span>
                </div>
                {errors.color_ids && touched.color_ids && (
                  <div className="text-danger">{errors.color_ids}</div>
                )}
                <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex">
                  <span className="color_tag chips_elem d-flex justify-content-center align-items-center pb-2" style={{ background: "#000" }}>
                    <i className="fas fa-times text-danger hoverable_text"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-2" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="guarantee_ids"
                    value={values.guarantee_ids}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="قسمتی از نام گارانتی را وارد کنید"
                    list="guarantiList"
                  />
                  <datalist id="guarantiList">
                    <option value="گارانتی فلان 1" />
                    <option value="گارانتی فلان 2" />
                    <option value="گارانتی فلان 3" />
                  </datalist>
                  <span className="input-group-text w_6rem justify-content-center">گارانتی</span>
                </div>
                {errors.guarantee_ids && touched.guarantee_ids && (
                  <div className="text-danger">{errors.guarantee_ids}</div>
                )}
                <div className="col-12 col-md-6 col-lg-8 mb-3">
                  <span className="chips_elem">
                    <i className="fas fa-times text-danger"></i>
                    گارانتی فلان
                  </span>
                  <span className="chips_elem">
                    <i className="fas fa-times text-danger"></i>
                    گارانتی فلان
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <textarea
                    name="descriptions"
                    value={values.descriptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="توضیحات"
                    rows="5"
                  ></textarea>
                  <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
                </div>
                {errors.descriptions && touched.descriptions && (
                  <div className="text-danger">{errors.descriptions}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                    className="form-control"
                    placeholder="تصویر"
                  />
                  <span className="input-group-text w_6rem justify-content-center">تصویر</span>
                </div>
                {errors.image && touched.image && (
                  <div className="text-danger">{errors.image}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="alt_image"
                    value={values.alt_image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="یک کلمه در مورد تصویر"
                  />
                  <span className="input-group-text w_6rem justify-content-center">توضیح تصویر</span>
                </div>
                {errors.alt_image && touched.alt_image && (
                  <div className="text-danger">{errors.alt_image}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="text"
                    name="keywords"
                    value={values.keywords}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="با - از هم جدا شوند"
                  />
                  <span className="input-group-text w_6rem justify-content-center">تگ ها</span>
                </div>
                {errors.keywords && touched.keywords && (
                  <div className="text-danger">{errors.keywords}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="number"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="فقط عدد"
                  />
                  <span className="input-group-text w_6rem justify-content-center">موجودی</span>
                </div>
                {errors.stock && touched.stock && (
                  <div className="text-danger">{errors.stock}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <input
                    type="number"
                    name="discount"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="فقط عدد "
                  />
                  <span className="input-group-text w_6rem justify-content-center">درصد تخفیف</span>
                </div>
                {errors.discount && touched.discount && (
                  <div className="text-danger">{errors.discount}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                <div className="form-check form-switch col-5 col-md-2">
                  <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                  <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">وضعیت فعال</label>
                </div>
              </div>

              <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                <button type="submit" className="btn btn-primary">ذخیره</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}