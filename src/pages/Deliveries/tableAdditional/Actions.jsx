import { useNavigate } from "react-router-dom";

export default function Actions({ rowData ,handleDeleteDelivery}) {
  const navigate=useNavigate()
  return (
    <>
    <div className={`d-flex justify-content-center`}>
        <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip "
        title="ویرایش دسته"
        onClick={()=>navigate('/delivery/add_delivery',{state:{deliveryToEdit:rowData}})}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        onClick={()=>handleDeleteDelivery(rowData.id)}
      ></i>
    </div>
    </>
  );
}
