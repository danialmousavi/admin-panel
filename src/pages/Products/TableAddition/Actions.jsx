import React from "react";
import { useNavigate } from "react-router-dom";
const Actions = ({
  rowData,
  handleDeleteProducts,
  handleToggleNotification,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        onClick={() =>
          navigate("/products/add", {
            state: { productToEdit: rowData },
          })
        }
      ></i>
      <i
        className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
        title="ثبت ویژگی"
        onClick={() =>
          navigate("/products/set-attr", {
            state: { selectedProduct: rowData },
          })
        }
      ></i>
      <i
        className="fas fa-images text-success mx-1 hoverable_text pointer has_tooltip"
        title="گالری محصول"
        onClick={() =>
          navigate("/products/gallery", {
            state: { selectedProduct: rowData },
          })
        }
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        onClick={() => handleDeleteProducts(rowData.id)}
      ></i>
      {rowData.has_notification ? (
        <>
          <i
            className={`mx-1 hoverable_text pointer has_tooltip fas fa-eye text-success`}
            data-bs-toggle="نادیده گرفتن"
            data-bs-placement="top"
            onClick={() => handleToggleNotification(rowData.id)}
          ></i>
        </>
      ) : (
        <i
          className={`mx-1 hoverable_text pointer has_tooltip fas fa-eye-slash text-danger`}
          data-bs-toggle="نادیده گرفتن"
          data-bs-placement="top"
          onClick={() => handleToggleNotification(rowData.id)}
        ></i>
      )}
    </>
  );
};

export default Actions;
