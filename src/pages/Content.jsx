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
import AddProducts from "./Products/AddProducts";
import SetAttributes from "./Products/SetAttributes/SetAttributes";
import GAllery from "./Products/Gallery/GAllery";
import AddDiscounts from "./Discounts/AddDiscounts";
import AddRoles from "./Roles/AddRoles";
import AddUser from "./Users/AddUser";
import PermissionComponent from "../components/PermissionComponent";
import useHasPermission from "../hooks/permissionsHooks";
import AddDelivery from "./Deliveries/AddDelivery";
import AddCart from "./Cart/AddCart";
export default function Content() {
  const admincontext = useContext(AdminContext);

  const hasCategoryPermission=useHasPermission("read_categories");
  const hasDiscountPermission=useHasPermission("read_discounts");
  const hasUserPermission=useHasPermission("read_users");
  const hasRolePermission=useHasPermission("read_roles");
  const hasDeliveryPermission=useHasPermission("read_deliveries")
  const hasCartsPermission=useHasPermission("read_carts")

  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${
        admincontext.showSidebar ? "with_sidebar" : ""
      }`}
    >
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/products' element={<PermissionComponent component={<Products/>} pTitle="read_products"/>}/>
            <Route path='/products/add' element={<PermissionComponent component={<AddProducts/>} pTitle="create_product"/>}/>
            <Route path='/products/set-attr' element={<PermissionComponent component={<SetAttributes/>} pTitle="create_product_attr"/>}/>
            <Route path='/products/gallery'element={<PermissionComponent component={<GAllery/>} pTitle="create_product_image"/>}/>
            {hasCategoryPermission && (
            <Route path='/category' element={<Category/>}>
              <Route path=':categoryId' element={<Category/>}/>
            </Route>
            )}
            <Route path='/category/:categoryId/attr' element={<PermissionComponent component={<AddCategoryAttribute/>} pTitle="read_category_attrs"/>}/>

            <Route path='/colors' element={<PermissionComponent component={<Colors/>} pTitle="read_colors"/>}/>
            <Route path='/guarantee' element={<PermissionComponent component={<Guarantee/>} pTitle="read_guarantees"/>}/>
            <Route path='/brands' element={<PermissionComponent component={<Brands/>} pTitle="read_brands"/>}/>
            {hasDiscountPermission&&(
            <Route path='/discounts' element={<Discounts/>}>
              <Route path="add_discount" element={<AddDiscounts/>}/>
            </Route>
            )}
            {hasCartsPermission&&(
            <Route path='/cart' element={<Cart/>}>
              <Route path="add_cart" element={<AddCart/>}/>
            </Route>
            )}
            <Route path='/orders' element={<Orders/>}/>
            {hasDeliveryPermission&&(
             <Route path='/delivery' element={<Deliveries/>}>
               <Route path="add_delivery" element={<AddDelivery/>}/>
            </Route>
            )}
 

            {hasUserPermission &&(
            <Route path='/users' element={<Users/>}>
              <Route path="add-user" element={<AddUser/>}/>
            </Route>
            )}
            {hasRolePermission&&(
            <Route path='/roles' element={<Roles/>}>
            <Route path="add-roles" element={<AddRoles/>}/>
            </Route>
            )}
            <Route path='/permisions' element={<PermissionComponent component={<Permisions/>} pTitle="read_permissions"/>}/>
            <Route path='/questions' element={<Questions/>}/>
            <Route path='/comments' element={<Comments/>}/>
            <Route path='*' element={<Dashboard/>}/>
          </Routes>
    </section>
  );
}
