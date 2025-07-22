import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = "https://e-com-backend-fxxd.onrender.com";

// -------------------------------
// Login Thunk
// -------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// -------------------------------
// Signup Thunk
// -------------------------------
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);


// // -------------------------------
// // Login Thunk
// // -------------------------------
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (formData, thunkAPI) => {
//     try {
//       const res = await axios.post("/api/auth/login", formData); // Backend URL
//       return res.data; // { user, token }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// // -------------------------------
// // Signup Thunk
// // -------------------------------
// export const signupUser = createAsyncThunk(
//   "auth/signupUser",
//   async (formData, thunkAPI) => {
//     try {
//       const res = await axios.post("/api/auth/signup", formData); // Backend URL
//       return res.data; // { user, token }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Signup failed"
//       );
//     }
//   }
// );

// -------------------------------
// Initial State
// -------------------------------
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// -------------------------------
// Auth Slice
// -------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// -------------------------------
// Exports
// -------------------------------
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
