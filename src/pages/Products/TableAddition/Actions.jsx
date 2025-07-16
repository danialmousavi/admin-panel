import React from "react";
import { useNavigate } from "react-router-dom";
const Actions = ({ rowData,handleDeleteProducts}) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        onClick={()=>navigate("/products/add",{
          state:{productToEdit:rowData}
        })}
      ></i>
      <i
        className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
        title="ثبت ویژگی"
        data-bs-toggle="modal"
        data-bs-target="#add_product_attr_modal"
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        onClick={()=>handleDeleteProducts(rowData.id)}
      ></i>
    </>
  );
};

export default Actions;
