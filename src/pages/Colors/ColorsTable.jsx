import React from "react";

export default function ColorsTable() {
  return (
    <>
    <div class="row justify-content-between">
        <div class="col-10 col-md-6 col-lg-4">
            <div class="input-group mb-3 ltr-direction" >
                <input type="text" class="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                 <span class="input-group-text" >جستجو</span>
            </div>
                </div>
        <div class="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
         <button class="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_color_modal">
         <i class="fas fa-plus text-light"></i>
        </button>
        </div>
    </div>    
      <table class="table table-responsive text-center table-hover table-bordered">
        <thead class="table-secondary">
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
            <td class="p-2">
              <div
                class="w-100 h-100 d-block"
                style={{ background: "#000", color: "#000" }}
              >
                ...
              </div>
            </td>
            <td>
              <i
                class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف رنگ"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>قزمز</td>
            <td class="dir_ltr">#f44336 </td>
            <td class="p-2">
              <div
                class="w-100 h-100 d-block"
                style={{ background: "#f44336", color: " #f44336" }}
              >
                ...
              </div>
            </td>
            <td>
              <i
                class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
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
        class="d-flex justify-content-center"
      >
        <ul class="pagination dir_ltr">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
