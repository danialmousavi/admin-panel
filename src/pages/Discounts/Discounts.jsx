import React from 'react'
import DiscountsTable from './DiscountsTable'
import AddDiscounts from './AddDiscounts'

export default function Discounts() {
  return (
    <>
            <div id="manage_discount_section" class="manage_discount_section main_section ">
            <h4 class="text-center my-3">مدیریت کد های تخفیف</h4>
            <div class="row justify-content-between">
                <div class="col-10 col-md-6 col-lg-4">
                    <div class="input-group mb-3 ltr-direction">
                        <input type="text" class="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                        <span class="input-group-text" >جستجو</span>
                    </div>
                </div>
                <div class="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    <button class="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_discount_modal">
                        <i class="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>
            <DiscountsTable/>
            <AddDiscounts/>
        </div>
    </>
  )
}
