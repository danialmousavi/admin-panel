import Category from "./pages/Category/Category";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";

const Routes=[
    {path:"/",element:<Dashboard/>},
    {path:"/products",element:<Products/>},
    {path:"/category",element:<Category/>},
    {path:"*",element:<Dashboard/>},
    
]
export default Routes;