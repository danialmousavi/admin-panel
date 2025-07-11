import React, { useState } from 'react'
import CategoryTable from './CategoryTable'
import AddCategory from './AddCategory'

export default function Category() {
  const [forceReRender, setForceReRender] = useState(0);
  return (
        <div id="manage_product_category" className="manage_product_category main_section ">
            <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

            <CategoryTable forceReRender={forceReRender}/>
            <AddCategory setForceReRender={setForceReRender}/>
        </div>
)
}
