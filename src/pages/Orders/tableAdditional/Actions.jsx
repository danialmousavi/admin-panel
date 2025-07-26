import { useNavigate } from "react-router-dom";

export default function Actions({ rowData }) {
  const navigate=useNavigate()
  return (
    <>
    <div className={`d-flex justify-content-center`}>
        <i
        className="fas fa-shopping-cart  text-info mx-1 hoverable_text pointer has_tooltip "
        title="جزییات سفارش"
        // onClick={()=>navigate('/discounts/add_discount',{state:{discountToEdit:rowData}})}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        // onClick={()=>handleDeleteDiscount(rowData.id)}
      ></i>
    </div>
    </>
  );
}
