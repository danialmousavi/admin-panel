import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PrevBtn from '../../../components/PrevBtn';
import Loading from '../../../components/Loading';
import * as Yup from "yup"
import { color } from 'chart.js/helpers';
import Swal from 'sweetalert2';
export default function SetAttributes() {
    const location=useLocation();
    const {selectedProduct}=location.state;
    // console.log(selectedProduct);
    const[attrs,setAttrs]=useState()
    ;
    const [initialValues,setInitialValues]=useState(null);
    const [validationSchema,setValidationSchema]=useState({});
    const handleGetAttributes = async ()=>{
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    let attrsVar=[];
    let initials={};
    let rules={};
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
                    attrsVar=[...attrsVar,{groupTitle:cat.title,data:res.data.data}]
                    if (res.data.data.length > 0) {
                        for (const d of res.data.data) {                        
                            initials = {...initials, [d.id]:""}
                            rules = {...rules, [d.id]:Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود")}
                        }
                    }
                }
            })
        ).then(()=>{
            setAttrs(attrsVar);
            setInitialValues(initials)
            setValidationSchema(Object.keys(initials).length > 0 ? Yup.object(rules) : {})
        })
    }
    useEffect(()=>{
        handleGetAttributes()
    },[])
  return (
    <>
    {console.log(attrs)
    }
            <div className="container">
            <h4 className="text-center my-3"> افزودن ویژگی محصول: <span className="text-primary">{selectedProduct.title}</span> </h4>
            <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                <PrevBtn />
            </div>
            <div className="row justify-content-center">
    {initialValues?(
    <Formik 
    initialValues={initialValues}
    onSubmit={(values,actions)=>{
         let data = {}
    const userToken = JSON.parse(localStorage.getItem("loginToken"));

        for (const key in values) {
            if (values[key]) data = {...data, [key]:{value: values[key]}}
        }
        axios.post(`https://ecomadminapi.azhadev.ir/api/admin/products/${selectedProduct.id}/add_attr`,data,{
            headers:{
                "Authorization":`Bearer ${userToken}`
            }
        }).then(res=>{
            console.log(res);
            
            if(res.status==200){
                Swal.fire({
                    title:"تبریک",
                    text:"ویژگی محصول با موفقیت اضافه شد",
                    icon:"success"
                })
                actions.resetForm();
            }
        })

    }}
    validationSchema={validationSchema}
    >
        <Form>
                {
                        attrs.map((attr, index)=>(
                            <div key={"group"+index} className="row justify-content-center">
                                    <h6 className="text-center">گروه : {attr.groupTitle}</h6>
                                    {
                                        attr.data.length > 0 ? (
                                            attr.data.map(attrData=>(
                                                <div className="col-12 col-md-6 col-lg-8" key={attrData.id}>  
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text w_6rem justify-content-center"> {attrData.unit} </span>
                                                        <Field name={attrData.id} type="text" className="form-control" placeholder="" />
                                                        <span className="input-group-text w_8rem justify-content-center">{attrData.title}</span>
                                                    </div>
                                                    <ErrorMessage name={attrData.id}  component="div" style={{ color: 'red' }}/>
                                                </div>
                                            ))
                                        ) : (
                                            <small className="text-center text-danger ">هیچ ویژگی برای گروه های این محصول ایجاد نشده است</small>
                                        )
                                    }
                                </div>
                            ))
                }

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4 m-auto">
                <button type='submit' className='btn btn-primary m-2'>
                    ذخیره
                </button>
                <PrevBtn/>
                </div>
        </Form>
    </Formik>
    ):(<>
    <Loading/>
    </>)}

            </div>
            </div>
    </>
  )
}
