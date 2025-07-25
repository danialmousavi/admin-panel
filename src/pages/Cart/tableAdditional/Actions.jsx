import React from "react";
import { useNavigate } from "react-router-dom";
const Actions = ({ rowData,handleDelteCart}) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        // onClick={()=>navigate("/carts/add-carts",{
        //     state:{editUser:rowData}
        // })}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        onClick={()=>handleDelteCart(rowData.id)}
      ></i>
    </>
  );
};

export default Actions;
