import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slice/customerSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
    reducer: 
        {
          auth: authReducer,   
          //customer: customerReducer        
        },
    }
)