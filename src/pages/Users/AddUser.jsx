import React from 'react';
import ModalsConatainer from '../../components/ModalsContainer';

export default function AddUser() {
  return (
    <>
    <ModalsConatainer id={"add_user_modal"} fullScreen={true} title={"افزودن کاربر" }>
                      <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="فقط از حروف استفاده شود" />
                      <span className="input-group-text w_8rem justify-content-center">نام</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="فقط از حروف استفاده شود" />
                      <span className="input-group-text w_8rem justify-content-center">نام خانوادگی</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="number" className="form-control" placeholder="فقط از عدد استفاده شود" />
                      <span className="input-group-text w_8rem justify-content-center">کد ملی</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="number" className="form-control" placeholder="فقط از عدد استفاده شود" />
                      <span className="input-group-text w_8rem justify-content-center">شماره موبایل</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="فقط فرمت ایمیل (email@yourhost.com)" />
                      <span className="input-group-text w_8rem justify-content-center">ایمیل</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <span className="input-group-text justify-content-center pointer">
                        <i className="fas fa-eye"></i>
                      </span>
                      <input type="password" className="form-control" placeholder="حد اقل 8 کارکتر" />
                      <span className="input-group-text w_8rem justify-content-center">رمز عبور</span>
                    </div>
                  </div>

                  {/* تاریخ تولد */}
                  <div className="col-12 col-md-6 col-lg-8 row px-0 my-3">
                    <label>تاریخ تولد:</label>

                    {['روز', 'ماه', 'سال'].map((label, index) => (
                      <div className="col-12 col-md-4" key={index}>
                        <div className="input-group my-1" style={{ direction: 'ltr' }}>
                          <select className="form-control">
                            <option value="">انتخاب کنید</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                          <span className="input-group-text w_8rem justify-content-center">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* تاریخ ثبت موبایل */}
                  <div className="col-12 col-md-6 col-lg-8 row px-0 my-3">
                    <label>تاریخ ثبت موبایل:</label>

                    {['روز', 'ماه', 'سال'].map((label, index) => (
                      <div className="col-12 col-md-4" key={index}>
                        <div className="input-group my-1" style={{ direction: 'ltr' }}>
                          <select className="form-control">
                            <option value="">انتخاب کنید</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                          <span className="input-group-text w_8rem justify-content-center">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <select className="form-control">
                        <option value="1">مرد</option>
                        <option value="1">زن</option>
                        <option value="2">نامشخص</option>
                      </select>
                      <span className="input-group-text w_8rem justify-content-center">جنسیت</span>
                    </div>
                  </div>

                  {/* آدرس */}
                  <div className="col-12 col-md-6 col-lg-8 row px-0 mt-3">
                    <label>آدرس:</label>
                    {['کشور', 'استان', 'شهر'].map((label, index) => (
                      <div className="col-12 col-md-4" key={index}>
                        <div className="input-group my-1" style={{ direction: 'ltr' }}>
                          <input type="text" className="form-control" />
                          <span className="input-group-text w_8rem justify-content-center">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-12 col-md-6 col-lg-8 mb-3">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="خیابان - کوچه و ..." />
                      <span className="input-group-text w_8rem justify-content-center">ادامه آدرس</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="مثلا @qasem" />
                      <span className="input-group-text w_8rem justify-content-center">اینستاگرام</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="مثلا @qasem" />
                      <span className="input-group-text w_8rem justify-content-center">تلگرام</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8">
                    <div className="input-group my-1" style={{ direction: 'ltr' }}>
                      <input type="file" className="form-control" />
                      <span className="input-group-text justify-content-center">تصویر</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-8 my-1">
                    <div className="input-group mb-2" style={{ direction: 'ltr' }}>
                      <input type="text" className="form-control" placeholder="قسمتی از نقش مورد نظر را وارد کنید" list="roleLists" />
                      <span className="input-group-text w_8rem justify-content-center">نقش ها</span>
                      <datalist id="roleLists">
                        <option value="نقش شماره 1" />
                        <option value="نقش شماره 2" />
                        <option value="نقش شماره 3" />
                      </datalist>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                      <span className="chips_elem">
                        <i className="fas fa-times text-danger"></i> نقش 1
                      </span>
                      <span className="chips_elem">
                        <i className="fas fa-times text-danger"></i> نقش 2
                      </span>
                    </div>
                  </div>

                  <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <button className="btn btn-primary">ذخیره</button>
                  </div>
                </div>
              </div>
    </ModalsConatainer>
    </>
  );
}
