
export default function Actions({ rowData }) {
  return (
    <>
    <div className={`d-flex justify-content-center`}>
        <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip "
        title="ویرایش دسته"
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
      ></i>
    </div>
    </>
  );
}
