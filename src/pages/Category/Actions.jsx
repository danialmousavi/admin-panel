import React, { use, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";

export default function Actions({ rowData , handleDeleteCategory}) {
  const { id } = rowData;
  const navigate = useNavigate();
  const params = useParams();
  const {catId,setCatId}=useContext(CategoryContext)
  return (
    <>
      {params.categoryId ? (
        <></>
      ) : (
        <i
          className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          onClick={() => navigate(`/category/${id}`)}
        ></i>
      )}
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
        onClick={()=>setCatId(rowData.id)}
      ></i>
      {params.categoryId?(      <i
        className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        onClick={()=>navigate(`${rowData.id}/attr`,{
          state:{
            categoryData:rowData
          }
        })}
      ></i>):null}
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handleDeleteCategory(rowData)}
      ></i>
    </>
  );
}
