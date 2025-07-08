import Category from "./pages/Category/Category";
import Colors from "./pages/Colors/Colors";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";

const Routes=[
    {path:"/",element:<Dashboard/>},
    {path:"/products",element:<Products/>},
    {path:"/category",element:<Category/>},
    {path:"/colors",element:<Colors/>},
    {path:"*",element:<Dashboard/>},
    
]
export default Routes;