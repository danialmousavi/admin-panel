import { createContext, useState } from "react";

const AdminContext=createContext({
    showSidebar: false,
    setShowSidebar: () => {}
});

export const AdminLayoutContainer=({children})=>{
    const [showSidebar, setShowSidebar] = useState(false);
    return(
        <AdminContext.Provider value={{showSidebar, setShowSidebar}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminContext;