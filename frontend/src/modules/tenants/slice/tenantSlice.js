import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// ---------- ASYNC THUNKS ----------

// Tüm Tenant'ları getir
export const fetchTenants = createAsyncThunk(
  "tenants/fetchAll",
  async (_, { rejectWithValue }) =>
    await apiCall("get", "/tenants", null, rejectWithValue)
);

// Tenant oluştur
export const createTenant = createAsyncThunk(
  "tenants/create",
  async (formData, { rejectWithValue }) =>
    await apiCall("post", "/tenants", formData, rejectWithValue)
);

// Tenant güncelle
export const updateTenant = createAsyncThunk(
  "tenants/update",
  async ({ id, formData }, { rejectWithValue }) =>
    await apiCall("put", `/tenants/${id}`, formData, rejectWithValue)
);

// Tenant sil
export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id, { rejectWithValue }) =>
    await apiCall("delete", `/tenants/${id}`, null, rejectWithValue)
);

// ---------- INITIAL STATE ----------

const initialState = {
  tenants: [],
  loading: false,
  error: null,
  successMessage: null,
  selectedTenant: null,
};

// ---------- SLICE ----------

const tenantSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    clearTenantMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setSelectedTenant: (state, action) => {
      state.selectedTenant = action.payload;
    },
    clearSelectedTenant: (state) => {
      state.selectedTenant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTenants
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload.data || [];
        state.successMessage = action.payload.message || null;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed!";
      })

      // createTenant
      .addCase(createTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Tenant created!";
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Create failed!";
      })

      // updateTenant
      .addCase(updateTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Tenant updated!";
      })
      .addCase(updateTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Update failed!";
      })

      // deleteTenant
      .addCase(deleteTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Tenant deleted!";
      })
      .addCase(deleteTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Delete failed!";
      });
  },
});

// ---------- EXPORTS ----------

export const {
  clearTenantMessages,
  setSelectedTenant,
  clearSelectedTenant,
} = tenantSlice.actions;

export default tenantSlice.reducer;
