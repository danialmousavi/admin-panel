import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category/Category";
import Colors from "./pages/Colors/Colors";
import Dashboard from "./pages/Dashboard/Dashboard";
import Deliveries from "./pages/Deliveries/Deliveries";
import Discounts from "./pages/Discounts/Discounts";
import Guarantee from "./pages/Guarantee/Guarantee";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import Roles from "./pages/Roles/Roles";
import Users from "./pages/Users/Users";
import Permissions from "./pages/Permisions/permisions"
import Questions from "./pages/Questions/Questions";
import Comments from "./pages/Comments/Comments";
const Routes=[
    {path:"/",element:<Dashboard/>},
    {path:"/products",element:<Products/>},
    {path:"/category",element:<Category/>},
    {path:"/colors",element:<Colors/>},
    {path:"/guarantee",element:<Guarantee/>},
    {path:"/brands",element:<Brands/>},
    {path:"/discounts",element:<Discounts/>},
    {path:"/cart",element:<Cart/>},
    {path:"/orders",element:<Orders/>},
    {path:"/delivery",element:<Deliveries/>},
    {path:"/users",element:<Users/>},
    {path:"/roles",element:<Roles/>},
    {path:"/permisions",element:<Permissions/>},
    {path:"/questions",element:<Questions/>},
    {path:"/comments",element:<Comments/>},

    {path:"*",element:<Dashboard/>},
    
]
export default Routes;