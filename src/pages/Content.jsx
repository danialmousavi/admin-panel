import React, { useContext } from "react";
import AdminContext from "../context/adminLayoutContext";
import Category from "./Category/Category";
import Products from "./Products/Products";
import { Route, Routes, useRoutes } from "react-router-dom";
import Guarantee from "./Guarantee/Guarantee";
import Brands from "./Brands/Brands";
import Discounts from "./Discounts/Discounts";
import Cart from "./Cart/Cart";
import Orders from "./Orders/Orders";
import Deliveries from "./Deliveries/Deliveries";
import Users from "./Users/Users";
import Roles from "./Roles/Roles";
import Permisions from "./Permisions/Permisions";
import Questions from "./Questions/Questions";
import Comments from "./Comments/Comments";
import Dashboard from "./Dashboard/Dashboard";
import Colors from "./Colors/Colors";
import AddCategoryAttribute from "./Category/Attr/AddCategoryAttribute";
export default function Content() {
  const admincontext = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${
        admincontext.showSidebar ? "with_sidebar" : ""
      }`}
    >
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/category' element={<Category/>}>
              <Route path=':categoryId' element={<Category/>}/>
            </Route>
            <Route path='/category/:categoryId/attr' element={<AddCategoryAttribute/>}/>

            <Route path='/colors' element={<Colors/>}/>
            <Route path='/guarantee' element={<Guarantee/>}/>
            <Route path='/brands' element={<Brands/>}/>
            <Route path='/discounts' element={<Discounts/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/delivery' element={<Deliveries/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/roles' element={<Roles/>}/>
            <Route path='/permisions' element={<Permisions/>}/>
            <Route path='/questions' element={<Questions/>}/>
            <Route path='/comments' element={<Comments/>}/>
            <Route path='*' element={<Dashboard/>}/>
          </Routes>
    </section>
  );
}
