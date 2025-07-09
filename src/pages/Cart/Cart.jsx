import React from 'react'
import CartTable from './CartTable'
import AddCart from './AddCart'

export default function Cart() {
  return (
   <>
           <div id="manage_cart_section" class="manage_cart_section main_section">
            <h4 class="text-center my-3">مدیریت سبد خرید</h4>
            <div class="row justify-content-between">
                <div class="col-10 col-md-6 col-lg-4">
                    <div class="input-group mb-3 ltr-direction">
                        <input type="text" class="form-control" placeholder="قسمتی از نام یا شماره سبد را وارد کنید"/>
                        <span class="input-group-text" >جستجو</span>
                    </div>
                </div>
                <div class="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    <button class="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#edit_cart_modal">
                        <i class="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>
            <CartTable/>
            <AddCart/>
        </div>
   </>
  )
}
