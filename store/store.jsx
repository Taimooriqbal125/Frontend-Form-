import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/signinSlice"; // Import reducer
import otpReducer from "../Features/otpSlice"
import authReducer from "../Features/usersigninslice"

const store = configureStore({
    reducer: {
        user: userReducer, 
        otp: otpReducer,
        auth: authReducer,
    },
});

export default store;
