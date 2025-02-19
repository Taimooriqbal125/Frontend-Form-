import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


// ✅ Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data; // ✅ Success: Return user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// ✅ Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores user data after login
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // ✅ Clear user data on logout
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name, // ✅ Store username for welcome message
          username: action.payload.username,
        };
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
