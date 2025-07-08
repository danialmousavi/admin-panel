import React from "react";

export default function ColorsTable() {
  return (
    <>
    <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
            <div className="input-group mb-3 ltr-direction" >
                <input type="text" className="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                 <span className="input-group-text" >جستجو</span>
            </div>
                </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
         <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_color_modal">
         <i className="fas fa-plus text-light"></i>
        </button>
        </div>
    </div>    
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>نام رنگ</th>
            <th>کد رنگ</th>
            <th>رنگ</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>مشکی</td>
            <td>#000000</td>
            <td className="p-2">
              <div
                className="w-100 h-100 d-block"
                style={{ background: "#000", color: "#000" }}
              >
                ...
              </div>
            </td>
            <td>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف رنگ"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>قزمز</td>
            <td className="dir_ltr">#f44336 </td>
            <td className="p-2">
              <div
                className="w-100 h-100 d-block"
                style={{ background: "#f44336", color: " #f44336" }}
              >
                ...
              </div>
            </td>
            <td>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف رنگ"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
