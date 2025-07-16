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

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGuarantees, setSelectedGuarantees] = useState([]);
  
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
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
  const fetchBrands = async () => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  try {
    const res = await axios.get(
      "https://ecomadminapi.azhadev.ir/api/admin/brands",
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    setBrands(res.data.data);
  } catch (error) {
    console.log("Error fetching brands:", error);
  }
};

const fetchColors = async () => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  try {
    const res = await axios.get(
      "https://ecomadminapi.azhadev.ir/api/admin/colors",
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    setColors(res.data.data);
  } catch (error) {
    console.log("Error fetching colors:", error);
  }
};

const fetchGuarantees = async () => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  try {
    const res = await axios.get(
      "https://ecomadminapi.azhadev.ir/api/admin/guarantees",
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    setGuarantees(res.data.data);
  } catch (error) {
    console.log("Error fetching guarantees:", error);
  }
};

// Run fetchData whenever catId changes
  useEffect(() => {
    fetchData();
  }, [catId]);

  useEffect(() => {
  fetchBrands();
  fetchColors();
  fetchGuarantees();
}, []);
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


  const handleBrandChange = (value, setFieldValue) => {
  setSelectedBrands((oldData) => {
    if (value && oldData.findIndex((d) => d === value) === -1) {
      const newData = [...oldData, value];
      setFieldValue("brand_id", newData.join("-"));
      return newData;
    } else {
      return oldData;
    }
  });
};

const handleColorChange = (value, setFieldValue) => {
  setSelectedColors((oldData) => {
    if (value && oldData.findIndex((d) => d === value) === -1) {
      const newData = [...oldData, value];
      setFieldValue("color_ids", newData.join("-"));
      return newData;
    } else {
      return oldData;
    }
  });
};

const handleRemoveColor = (color, setFieldValue) => {
  setSelectedColors((oldData) => {
    const newData = oldData.filter((d) => d !== color);
    setFieldValue("color_ids", newData.join("-"));
    return newData;
  });
};

const handleRemoveBrand = (brand, setFieldValue) => {
  setSelectedBrands((oldData) => {
    const newData = oldData.filter((d) => d !== brand);
    setFieldValue("brand_id", newData.join("-"));
    return newData;
  });
};
const handleGuaranteeChange = (value, setFieldValue) => {
  setSelectedGuarantees((oldData) => {
    if (value && oldData.findIndex((d) => d === value) === -1) {
      const newData = [...oldData, value];
      setFieldValue("guarantee_ids", newData.join("-"));
      return newData;
    } else {
      return oldData;
    }
  });
};

const handleRemoveGuarantee = (guarantee, setFieldValue) => {
  setSelectedGuarantees((oldData) => {
    const newData = oldData.filter((d) => d !== guarantee);
    setFieldValue("guarantee_ids", newData.join("-"));
    return newData;
  });
};

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
                  <select
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        handleBrandChange(value, setFieldValue);
                        e.target.value = ""; // reset select
                      }
                    }}
                  >
                    <option value="">انتخاب برند</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.persian_name}
                      </option>
                    ))}
                  </select>
                  <span className="input-group-text w_6rem justify-content-center">برند</span>
                </div>
                {errors.brand_id && touched.brand_id && (
                  <div className="text-danger">{errors.brand_id}</div>
                )}

                <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex flex-wrap">
                  {selectedBrands.map((brand) => (
                    <span className="chips_elem me-2 mb-2" key={brand}>
                      <i
                        className="fas fa-times text-danger pointer ms-1"
                        onClick={() => handleRemoveBrand(brand, setFieldValue)}
                      ></i>
                      {brand}
                    </span>
                  ))}
                </div>
              </div>


              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3" style={{ direction: "ltr" }}>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        handleColorChange(value, setFieldValue);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">انتخاب رنگ</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.title}
                      </option>
                    ))}
                  </select>

                  <span className="input-group-text w_6rem justify-content-center">
                    رنگ
                  </span>
                </div>
                {errors.color_id && touched.color_id && (
                  <div className="text-danger">{errors.color_id}</div>
                )}

                <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex flex-wrap">
                  {selectedColors.map((color) => (
                    <span className="chips_elem me-2 mb-2" key={color}>
                      <i
                        className="fas fa-times text-danger pointer ms-1"
                        onClick={() => handleRemoveColor(color, setFieldValue)}
                      ></i>
                      {color}
                    </span>
                  ))}
                </div>
              </div>

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3" style={{ direction: "ltr" }}>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          handleGuaranteeChange(value, setFieldValue);
                          e.target.value = "";
                        }
                      }}
                    >
                      <option value="">انتخاب گارانتی</option>
                      {guarantees.map((guarantee) => (
                        <option key={guarantee.id} value={guarantee.id}>
                          {guarantee.title}
                        </option>
                      ))}
                    </select>

                    <span className="input-group-text w_6rem justify-content-center">
                      گارانتی
                    </span>
                  </div>
                  {errors.guarantee_id && touched.guarantee_id && (
                    <div className="text-danger">{errors.guarantee_id}</div>
                  )}

                  <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex flex-wrap">
                    {selectedGuarantees.map((guarantee) => (
                      <span className="chips_elem me-2 mb-2" key={guarantee}>
                        <i
                          className="fas fa-times text-danger pointer ms-1"
                          onClick={() => handleRemoveGuarantee(guarantee, setFieldValue)}
                        ></i>
                        {guarantee}
                      </span>
                    ))}
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
                  <textarea
                    name="short_descriptions"
                    value={values.short_descriptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="توضیحات کوتاه"
                    rows="5"
                  ></textarea>
                  <span className="input-group-text w_6rem justify-content-center">توضیحات کوتاه</span>
                </div>
                {errors.short_descriptions && touched.short_descriptions && (
                  <div className="text-danger">{errors.short_descriptions}</div>
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