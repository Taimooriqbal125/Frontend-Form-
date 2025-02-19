import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log("sss", import.meta.env)

// ✅ Async action for OTP verification
export const verifyOTP = createAsyncThunk(
    "otp/verifyOTP",
    async ({ email, phone, emailOtp, phoneOtp }, { rejectWithValue }) => {
        try {
            // ✅ Send OTP verification request
            const response = await axios.post(
                `${API_BASE_URL}/verifyotp`,
                { email, phone, emailOtp, phoneOtp },
                { headers: { "Content-Type": "application/json" } }
            );

            return response.data; // ✅ Success response from backend
        } catch (error) {
            console.error("❌ OTP Verification Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "OTP verification failed");
        }
    }
);


// ✅ Redux slice for OTP verification
const otpSlice = createSlice({
    name: "otp",
    initialState: {
        verified: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.verified = true;
                state.loading = false;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default otpSlice.reducer;
