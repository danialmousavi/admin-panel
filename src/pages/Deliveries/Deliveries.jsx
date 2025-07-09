import React from 'react'
import DeliveriesTable from './DeliveriesTable'
import AddDelivery from './AddDelivery'

export default function Deliveries() {
  return (
    <>
                <div id="manage_deliveries_section" class="manage_deliveries_section main_section">
            <h4 class="text-center my-3">مدیریت نحوه ارسال</h4>
            <div class="row justify-content-between">
                <div class="col-10 col-md-6 col-lg-4">
                    <div class="input-group mb-3 ltr-direction">
                        <input type="text" class="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                        <span class="input-group-text" >جستجو</span>
                    </div>
                </div>
                <div class="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    <button class="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_delivery_modal">
                        <i class="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>
        <DeliveriesTable/>
        <AddDelivery/>
        </div>
    </>
  )
}
