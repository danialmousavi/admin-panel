import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "./roles/rolesReducer";

const store=configureStore({
    reducer: {
        rolesReducer
    },
})
export default store;