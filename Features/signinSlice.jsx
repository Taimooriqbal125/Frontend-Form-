import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("scas",API_BASE_URL)
// console.log("aaa",process.env)

// ✅ Async action for signing up a user
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Ensure the response contains email and phone
      if (!response.data.email || !response.data.phone) {
        throw new Error("Email or phone is missing in response");
      }

      return {
        email: response.data.email, // ✅ Extract only required data
        phone: response.data.phone,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// ✅ Redux slice for user signup
const signinSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // ✅ Store user details after signup
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.email, // ✅ Store email in Redux
          phone: action.payload.phone, // ✅ Store phone in Redux
        };
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signinSlice.reducer;
