import React from 'react'
import ProductsTable from './ProductsTable'
import AddProducts from './AddProducts'

export default function Products() {
  return (
    <>
            <div id="manage_product_section" className="manage_product_section main_section ">
            <h4 className="text-center my-3">مدیریت محصولات</h4>
            <ProductsTable/>
            <AddProducts/>
        </div>
    </>
  )
}
