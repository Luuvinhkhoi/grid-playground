import { configureStore } from "@reduxjs/toolkit";
import initReducer from "./initial";
export const store=configureStore({
    reducer:{
        init: initReducer
    }
})