import React from "react";
import { useNavigate } from "react-router-dom";
const Actions = ({ rowData}) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        onClick={()=>navigate("/products/add",{
        })}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
      ></i>
    </>
  );
};

export default Actions;
