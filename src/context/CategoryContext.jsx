import { createContext, useState } from "react";

const CategoryContext=createContext({
    catId: false,
    setCatId: () => {}
});

export const CategoryContextContainer=({children})=>{
    const [catId, setCatId] = useState(null);
    return(
        <CategoryContext.Provider value={{catId, setCatId}}>
            {children}
        </CategoryContext.Provider>
    )
}
export default CategoryContext;