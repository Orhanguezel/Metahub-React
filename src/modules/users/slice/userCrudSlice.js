// src/modules/users/slice/userCrudSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// Initial state for user CRUD
const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "userCrud/fetchUsers",
  async (_, { rejectWithValue }) =>
    await apiCall("get", "/users/users", null, rejectWithValue)
);

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "userCrud/fetchUserById",
  async (id, { rejectWithValue }) =>
    await apiCall("get", `/users/users/${id}`, null, rejectWithValue)
);

// Update user (supports multipart/form-data)
export const updateUser = createAsyncThunk(
  "userCrud/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    return await apiCall(
      "put",
      `/users/users/${id}`,
      formData,
      rejectWithValue,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "userCrud/deleteUser",
  async (id, { rejectWithValue }) =>
    await apiCall("delete", `/users/users/${id}`, null, rejectWithValue)
);

const userCrudSlice = createSlice({
  name: "userCrud",
  initialState,
  reducers: {
    clearUserCrudMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.loading = true;
      state.error = null;
    };

    const setError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Fetch users
      .addCase(fetchUsers.pending, setLoading)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || action.payload;
      })
      .addCase(fetchUsers.rejected, setError)

      // Fetch user by ID
      .addCase(fetchUserById.pending, setLoading)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload.data || action.payload;
      })
      .addCase(fetchUserById.rejected, setError)

      // Update user
      .addCase(updateUser.pending, setLoading)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User was updated successfully.";
        const updatedUser = action.payload.data || action.payload;
        state.users = state.users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
      })
      .addCase(updateUser.rejected, setError)

      // Delete user
      .addCase(deleteUser.pending, setLoading)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User was deleted successfully.";
        const deletedId = action.meta.arg;
        state.users = state.users.filter((u) => u._id !== deletedId);
      })
      .addCase(deleteUser.rejected, setError);
  },
});

export const { clearUserCrudMessages } = userCrudSlice.actions;
export default userCrudSlice.reducer;
