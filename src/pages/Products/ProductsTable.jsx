import React from 'react'
import PaginatedTable from '../../components/PaginatedTable'

export default function ProductsTable() {
  // داده های نمونه برای جدول
      const datas=[
        {
            id:"1",
            category:"aaa",
            title:"محصول شماره 1",
            price:"1000",
            stock:"5",
            like_count:"10",
            status:"1"
        },
        {
            id:"2",
            category:"bbb",
            title:"محصول شماره 2",
            price:"2000",
            stock:"10",
            like_count:"20",
            status:"1"
        },
        {
            id:"3",
            category:"ccc",
            title:"محصول شماره سه",
            price:"3000",
            stock:"15",
            like_count:"30",
            status:"1"
        },
        {
            id:"4",
            category:"ddd",
            title:"محصول چهار",
            price:"4000",
            stock:"20",
            like_count:"40",
            status:"1"
        },
        {
            id:"5",
            category:"eee",
            title:"محصول پنج",
            price:"5000",
            stock:"25",
            like_count:"50",
            status:"1"
        }
    ]
    const dataInfo=[
        {feild:"id",title:"#"},
        {feild:"title",title:"عنوان محصول"},
    ]
    const additionalElements=()=>{
      return(
        <>
            <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip" title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top"></i>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_category_modal"></i>
            <i className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip" title="افزودن ویژگی" data-bs-toggle="modal" data-bs-target="#add_product_category_attr_modal"></i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
        </>
      )
    }
    const additionalFeild={
      title:"عملیات",
      elements:()=>additionalElements()
    }

    //اطلاعات مربوط به صفحه بندی و سرچ
    const searchparams={
      title:"جستجو",
      placeholder:"قسمتی از عنوان را وارد کنید",
      searchFeild:"title",
      itemsPerPage:2,
    }
  return (
    <>
    
        <PaginatedTable datas={datas} dataInfo={dataInfo} additionalFeild={additionalFeild} searchparams={searchparams}/>

    </>
  )
}
