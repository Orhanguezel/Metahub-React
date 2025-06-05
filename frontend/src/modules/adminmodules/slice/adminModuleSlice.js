// src/modules/adminmodules/slice/adminModuleSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { toast } from "react-toastify";


// 1. Tüm projeleri getir
export const fetchAvailableProjects = createAsyncThunk(
  "admin/fetchAvailableProjects",
  async (_, thunkAPI) => {
    const res = await apiCall(
      "get",
      "/admin/projects",
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data ?? [];
  }
);

// 2. Seçili projeye ait modülleri getir
export const fetchAdminModules = createAsyncThunk(
  "admin/fetchAdminModules",
  async (project, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/admin/modules?project=${project}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data ?? [];
  }
);

// 3. Tek modül detayı
export const fetchModuleDetail = createAsyncThunk(
  "admin/fetchModuleDetail",
  async ({ name, project }, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/admin/module/${name}?project=${project}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data;
  }
);

// 4. Modül oluştur
export const createAdminModule = createAsyncThunk(
  "admin/createAdminModule",
  async (payload, thunkAPI) => {
    const res = await apiCall(
      "post",
      "/admin/modules",
      payload,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data;
  }
);

// 5. Modül güncelle
export const updateAdminModule = createAsyncThunk(
  "admin/updateAdminModule",
  async ({ name, updates }, thunkAPI) => {
    const res = await apiCall(
      "patch",
      `/admin/module/${name}`,
      updates,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data;
  }
);

// 6. Modül sil
export const deleteAdminModule = createAsyncThunk(
  "admin/deleteAdminModule",
  async ({ name }, thunkAPI) => {
    await apiCall(
      "delete",
      `/admin/module/${name}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return name;
  }
);

// --- Slice ---

const initialState = {
  modules: [],
  selectedModule: null,
  moduleAnalytics: [],
  loading: false,
  error: null,
  successMessage: null,
  selectedProject: "",
  availableProjects: [],
  fetchedAvailableProjects: false,
};

const adminModuleSlice = createSlice({
  name: "adminModule",
  initialState,
  reducers: {
    clearAdminMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    clearSelectedModule: (state) => {
      state.selectedModule = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch available projects
      .addCase(fetchAvailableProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableProjects.fulfilled, (state, action) => {
        state.availableProjects = action.payload;
        state.fetchedAvailableProjects = true;
        state.loading = false;
      })
      .addCase(fetchAvailableProjects.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch projects";
      })

      // Fetch admin modules
      .addCase(fetchAdminModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminModules.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch modules";
      })

      // Fetch module detail
      .addCase(fetchModuleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModuleDetail.fulfilled, (state, action) => {
        state.selectedModule = action.payload;
        state.loading = false;
      })
      .addCase(fetchModuleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch module detail";
      })

      // Create admin module
      .addCase(createAdminModule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createAdminModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
        state.successMessage = `Module "${action.payload.name}" created successfully.`;
        state.loading = false;
        if (state.successMessage) toast.success(state.successMessage);
      })
      .addCase(createAdminModule.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to create module";
      })

      // Update admin module
      .addCase(updateAdminModule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateAdminModule.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.modules.findIndex((m) => m.name === updated.name);
        if (idx !== -1) state.modules[idx] = updated;
        state.selectedModule = updated;
        state.successMessage = `Module "${updated.name}" updated successfully.`;
        state.loading = false;
        if (state.successMessage) toast.success(state.successMessage);
      })
      .addCase(updateAdminModule.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to update module";
      })

      // Delete admin module
      .addCase(deleteAdminModule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAdminModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((m) => m.name !== action.payload);
        if (state.selectedModule?.name === action.payload)
          state.selectedModule = null;
        state.successMessage = `Module "${action.payload}" deleted successfully.`;
        state.loading = false;
        if (state.successMessage) toast.success(state.successMessage);
      })
      .addCase(deleteAdminModule.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to delete module";
      });
  },
});

export const { clearAdminMessages, setSelectedProject, clearSelectedModule } =
  adminModuleSlice.actions;
export default adminModuleSlice.reducer;
