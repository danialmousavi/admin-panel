import React from 'react'

export default function PermisionsTable() {
  return (
    <>
                <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        <th>#</th>
                        <th>عنوان</th>
                        <th>توضیحات</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td> مجوز شماره 1</td>
                        <td>توضیحات در مورد این مجوز که چیست و کلیات آن کدام است</td>
                        <td>
                            <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">فعال</label>
                                <input className="form-check-input pointer mx-3" type="checkbox" id="flexSwitchCheckDefault" />
                            </div> 
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
    </>
  )
}
