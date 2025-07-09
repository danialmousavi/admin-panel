import Brands from "./pages/Brands/Brands";
import Category from "./pages/Category/Category";
import Colors from "./pages/Colors/Colors";
import Dashboard from "./pages/Dashboard/Dashboard";
import Discounts from "./pages/Discounts/Discounts";
import Guarantee from "./pages/Guarantee/Guarantee";
import Products from "./pages/Products/Products";

const Routes=[
    {path:"/",element:<Dashboard/>},
    {path:"/products",element:<Products/>},
    {path:"/category",element:<Category/>},
    {path:"/colors",element:<Colors/>},
    {path:"/guarantee",element:<Guarantee/>},
    {path:"/brands",element:<Brands/>},
    {path:"/discounts",element:<Discounts/>},
    {path:"*",element:<Dashboard/>},
    
]
export default Routes;