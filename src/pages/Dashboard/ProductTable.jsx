import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import js from "@eslint/js";

const ProductTable = () => {
  
  const [fewerProducts, setFewerProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGetFewerProducts = async ()=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))
    setLoading(true)
    const res = await axios.get("https://ecomadminapi.azhadev.ir/api/admin/products/fewer_products", {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    console.log(res);
    setLoading(false)
    if (res.status == 200) {
      const products = res.data.data
      console.log(products);
      products.length > 0 ? setFewerProducts(products) : setFewerProducts([])
    }
  }

  const handleTurnoffNotification = async (productId)=>{
    const userToken=JSON.parse(localStorage.getItem("loginToken"))

    const res = await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/products/toggle_notification/${productId}`, {
        headers: {
            Authorization: `Bearer ${userToken}`
            }
        }
    );
    if (res.status == 200) {
    Swal.fire({
        icon: 'success',
        title: 'موفق',
        text: res.data.message|| 'عملیات با موفقیت انجام شد',
        confirmButtonText: 'باشه'
    })
      setFewerProducts(old=>old.filter(p=>p.id != productId));
    }
  }

  useEffect(()=>{
    handleGetFewerProducts()
  },[])
  return (
    <div className="col-12 col-lg-6">
      <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>
      {loading ? (<Loading/>) 
      : fewerProducts.length === 0 
      ? (
        <strong className="text-primary">فعلا محصول رو به اتمامی وجود ندارد</strong>
      ) 
      : (
        <table className="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>دسته</th>
              <th>عنوان</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {
              fewerProducts.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.categories[0].title}</td>
                <td>{p.title}</td>
                <td>{p.stock === 0 ? (
                  <span className="text-danger">پایان یافته</span>
                ) : `رو به اتمام : (${p.stock})` }</td>
                <td>
                  {/* <ActionIcon icon="fas fa-eye-slash text-danger" pTitle="update_product_notification" title="نادیده گرفتن"
                  onClick={()=>handleTurnoffNotification(p.id)}
                  /> */}
                      <i
                        className= {`mx-1 hoverable_text pointer has_tooltip fas fa-eye-slash text-danger`}
                        data-bs-toggle="نادیده گرفتن"
                        data-bs-placement="top"
                        onClick={()=>handleTurnoffNotification(p.id)}
                        ></i>   
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
