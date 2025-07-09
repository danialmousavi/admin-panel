import React from 'react'
import CommentsTable from './CommentsTable'
import AddComment from './AddComment'

export default function Comments() {
  return (
    <>
            <div id="manage_comments_section" className="manage_comments_section main_section ">
        <h4 className="text-center my-3">مدیریت نظرات</h4>
        <div className="row justify-content-between">
            <div className="col-10 col-md-6 col-lg-4">
                <div className="input-group mb-3 ltr-direction">
                    <input type="text" className="form-control" placeholder="قسمتی از نام یا نام خانوادگی یا نظر را وارد کنید"/>
                    <span className="input-group-text" >جستجو</span>
                </div>
            </div>
            <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_comment_modal">
                    <i className="fas fa-plus text-light"></i>
                </button>
            </div>
        </div>
        <CommentsTable/>
        <AddComment/>
    </div>
    </>
  )
}
