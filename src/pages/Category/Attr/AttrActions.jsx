
export default function AttrActions({ rowData ,attrToEdit,setAttrToEdit}) {
  return (
    <>
    <div className={`${attrToEdit&&attrToEdit.id==rowData.id?"bg-select":""} d-flex justify-content-center`}>
        <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip "
        title="ویرایش دسته"
        onClick={()=>setAttrToEdit(rowData)}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
      ></i>
    </div>
    </>
  );
}
