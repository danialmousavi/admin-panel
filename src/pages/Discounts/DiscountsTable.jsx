import React from 'react'

export default function DiscountsTable() {
  return (
    <>
                <table class="table table-responsive text-center table-hover table-bordered">
                <thead class="table-secondary">
                    <tr>
                        <th>#</th>
                        <th>عنوان </th>
                        <th>کد</th>
                        <th>درصد تخفیف</th>
                        <th>تا تاریخ</th>
                        <th>برای</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>تخفیف شماره 1</td>
                        <td>takhfif1</td>
                        <td>39%</td>
                        <td>1400/10/12</td>
                        <td>همه</td>
                        <td>
                            <i class="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش کد" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_discount_modal"></i>
                            <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف کد" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center">
                <ul class="pagination dir_ltr">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                </ul>
                </nav>
    </>
  )
}
