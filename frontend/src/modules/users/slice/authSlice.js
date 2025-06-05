// src/modules/users/slice/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// Initial state for authentication
const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  needOtp: false,
  otpSession: null,
  mfaRequired: false,
  emailVerifyRequired: false,
};

// 🔐 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    const res = await apiCall("post", "/users/login", data, rejectWithValue);
    return res.data;
  }
);

// 📝 Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    const res = await apiCall("post", "/users/register", formData, rejectWithValue);
    return { message: res.message || "Registration successful" };
  }
);

// 🔐 Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    const res = await apiCall("put", "/account/me/password", data, rejectWithValue);
    return { message: res.message || "Password changed successfully." };
  }
);

// 🔑 Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      `/users/reset-password/${data.token}`,
      { newPassword: data.newPassword },
      rejectWithValue
    );
    return { message: res.message || "Password reset successfully." };
  }
);

// ❓ Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      "/users/forgot-password",
      data,
      rejectWithValue
    );
    return { message: res.message || "Reset email sent." };
  }
);

// 🚪 Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    const res = await apiCall("post", "/users/logout", null, rejectWithValue);
    return { message: res.message || "Logged out successfully." };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    };
    const setError = (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Authentication failed";
    };

    builder
      // LOGIN
      .addCase(loginUser.pending, setLoading)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Login successful.";
        state.needOtp = !!action.payload.needOtp;
        state.otpSession = action.payload.otpSession || null;
        state.mfaRequired = !!action.payload.mfaRequired;
        state.emailVerifyRequired = !!action.payload.emailVerifyRequired;
      })
      .addCase(loginUser.rejected, setError)
      // REGISTER
      .addCase(registerUser.pending, setLoading)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, setError)
      // CHANGE PASSWORD
      .addCase(changePassword.pending, setLoading)
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, setError)
      // RESET PASSWORD
      .addCase(resetPassword.pending, setLoading)
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, setError)
      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, setLoading)
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, setError)
      // LOGOUT
      .addCase(logoutUser.pending, setLoading)
      .addCase(logoutUser.fulfilled, (state, action) => {
        Object.assign(state, initialState);
        state.successMessage = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Logout failed";
      });
  },
});

export const { clearAuthMessages, setAuthUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
