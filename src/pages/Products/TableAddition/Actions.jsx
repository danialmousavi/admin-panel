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
        onClick={()=>navigate("/products/set-attr",{
          state:{selectedProduct:rowData}
        })}
      ></i>
      <i
        className="fas fa-images text-success mx-1 hoverable_text pointer has_tooltip"
        title="گالری محصول"
        onClick={()=>navigate("/products/gallery",{
          state:{selectedProduct:rowData}
        })}
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
