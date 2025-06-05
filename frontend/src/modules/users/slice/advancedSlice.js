// src/modules/users/slice/advancedSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { fetchCurrentUser } from "./accountSlice";

// Send OTP (SMS/Email)
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/resend-otp",
      data,
      rejectWithValue
    );
    return { message: res.message || "OTP was resent." };
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (data, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/send-otp",
      data,
      rejectWithValue
    );
    return { message: res.message, needOtp: true };
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/verify-otp",
      data,
      thunkAPI.rejectWithValue
    );
    const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
    thunkAPI.dispatch(setAuthUser(user));
    return { user, message: res.message || "Verification successful." };
  }
);

export const resendEmailVerification = createAsyncThunk(
  "auth/resendEmailVerification",
  async (data, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/send-verification",
      data,
      rejectWithValue
    );
    return { message: res.message || "Verification email was sent." };
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/verify-email",
      { token },
      rejectWithValue
    );
    return { message: res.message || "Email verified successfully." };
  }
);

export const verifyMfa = createAsyncThunk(
  "auth/verifyMfa",
  async (data, thunkAPI) => {
    const res = await apiCall(
      "post",
      "/users/advanced-auth/verify-mfa",
      data,
      thunkAPI.rejectWithValue
    );
    const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
    thunkAPI.dispatch(setAuthUser(user));
    return { user, message: res.message || "MFA verification successful." };
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  needOtp: false,
  mfaRequired: false,
  emailVerifyRequired: false,
};

const advancedSlice = createSlice({
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
          : action.payload?.message || "Operation failed.";
    };

    builder
      // OTP
      .addCase(resendOtp.pending, setLoading)
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(resendOtp.rejected, setError)

      .addCase(sendOtp.pending, setLoading)
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.needOtp = !!action.payload?.needOtp;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(sendOtp.rejected, setError)

      .addCase(verifyOtp.pending, setLoading)
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user ?? null;
        state.needOtp = false;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(verifyOtp.rejected, setError)

      // Email verification
      .addCase(resendEmailVerification.pending, setLoading)
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(resendEmailVerification.rejected, setError)

      .addCase(verifyEmail.pending, setLoading)
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(verifyEmail.rejected, setError)

      // MFA
      .addCase(verifyMfa.pending, setLoading)
      .addCase(verifyMfa.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user ?? null;
        state.mfaRequired = false;
        state.successMessage = action.payload?.message ?? null;
      })
      .addCase(verifyMfa.rejected, setError);
  },
});

export const { clearAuthMessages, setAuthUser } = advancedSlice.actions;
export default advancedSlice.reducer;
