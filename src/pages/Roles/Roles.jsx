import React from 'react'
import RolesTable from './RolesTable'
import AddRoles from './AddRoles'

export default function Roles() {
  return (
    <>
    <div id="manage_role_section" className="manage_role_section main_section ">
            <h4 className="text-center my-3">مدیریت نقش ها</h4>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 ltr-direction" >
                        <input type="text" className="form-control" placeholder="قسمتی از نام نقش را وارد کنید"/>
                        <span className="input-group-text" >جستجو</span>
                    </div>
                </div>
                <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_role_modal">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>
        <RolesTable/>
        <AddRoles/>
        </div>

    </>
  )
}
