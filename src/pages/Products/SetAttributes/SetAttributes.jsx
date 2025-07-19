import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PrevBtn from '../../../components/PrevBtn';
import Loading from '../../../components/Loading';

export default function SetAttributes() {
    const location=useLocation();
    const {selectedProduct}=location.state;
    // console.log(selectedProduct);
    const[attrs,setAttrs]=useState()
    ;
    
    const handleGetAttributes = async ()=>{
    const userToken = JSON.parse(localStorage.getItem("loginToken"));

        Promise.all(
            selectedProduct.categories.map(async (cat)=>{
                const res =  await axios.get(`https://ecomadminapi.azhadev.ir/api/admin/categories/${cat.id}/attributes `,
                    {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                    }
                )
                console.log("res",res);
                
                if (res.status == 200) {
                    setAttrs(oldAttr=>{
                        return oldAttr 
                            ? [...oldAttr, { groupTitle: cat.title, data: res.data.data }] 
                            : [{ groupTitle: cat.title , data: res.data.data }]
                    });
                }
            })
        )
    }
    useEffect(()=>{
        handleGetAttributes()
    },[])
  return (
    <>
    {console.log(attrs)
    }
        <Formik>
        <Form>
            <div className="container">
            <h4 className="text-center my-3"> افزودن ویژگی محصول: <span className="text-primary">{selectedProduct.title}</span> </h4>
            <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                <PrevBtn />
            </div>
            <div className="row justify-content-center">
                {
                    attrs ? (
                        attrs.map((attr, index)=>(
                            <div key={"group"+index} className="row justify-content-center">
                                    <h6 className="text-center">گروه : {attr.groupTitle}</h6>
                                    {
                                        attr.data.length > 0 ? (
                                            attr.data.map(attrData=>(
                                                <div className="col-12 col-md-6 col-lg-8" key={attrData.id}>  
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text w_6rem justify-content-center"> {attrData.unit} </span>
                                                        <input type="text" className="form-control" placeholder="" />
                                                        <span className="input-group-text w_8rem justify-content-center">{attrData.title}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <small className="text-center text-danger ">هیچ ویژگی برای گروه های این محصول ایجاد نشده است</small>
                                        )
                                    }
                                </div>
                            ))
                    ) :  (
                        <Loading/>
                    )

                }

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                {/* <SubmitButton/> */}
                <PrevBtn/>
                </div>

            </div>
            </div>
        </Form>
    </Formik>
    </>
  )
}
