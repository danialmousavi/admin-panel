import React from 'react'
import ModalsConatainer from '../../components/ModalsContainer'

export default function AddDelivery() {
  return (
    <>
    <ModalsConatainer id={"add_delivery_modal"} fullScreen={true} title={"افزودن روش ارسال"}>
                        <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="input-group my-3 ltr-direction">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">عنوان</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group my-3 ltr-direction">
                                <input type="number" className="form-control" placeholder="تومان (فقط عدد)"/>
                                <span className="input-group-text w_8rem justify-content-center"> هزینه </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group my-3 ltr-direction">
                                <input type="text" className="form-control" placeholder="فقط عدد"/>
                                <span className="input-group-text w_8rem justify-content-center">مدت ارسال</span>
                            </div>
                        </div>                       
                        <div className="col-12">
                            <div className="input-group my-3 ltr-direction">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">واحد مدت ارسال</span>
                            </div>
                        </div>                       
                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <button className="btn btn-primary ">ذخیره</button>
                        </div>
                    </div>
                </div>
    </ModalsConatainer>
    </>
  )
}
