// src/modules/users/slice/userStatusSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// Initial state for user status
const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

// Toggle user active/passive status (admin)
export const toggleUserStatus = createAsyncThunk(
  "userStatus/toggleUserStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiCall(
        "put",
        `/users/users/${id}/status`,
        null,
        rejectWithValue
      );
      // Backend should return { _id, isActive }
      return response;
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message || "Failed to update user status.",
      });
    }
  }
);

// Update user role (admin)
export const updateUserRole = createAsyncThunk(
  "userStatus/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      await apiCall(
        "put",
        `/users/users/${id}/role`,
        { role },
        rejectWithValue
      );
    } catch (err) {
      return rejectWithValue({
        message: err?.response?.data?.message || "Failed to update user role.",
      });
    }
  }
);

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    clearUserStatusMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Toggle status
    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.isActive
          ? "User activated successfully."
          : "User deactivated successfully.";
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unknown error occurred.";
      });

    // Update role
    builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User role updated successfully.";
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unknown error occurred.";
      });
  },
});

export const { clearUserStatusMessages } = userStatusSlice.actions;
export default userStatusSlice.reducer;
