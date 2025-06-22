import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { toast } from "react-toastify";

const initialState = {
  modules: [],
  selectedModule: null,
  moduleSettings: [],
  analyticsModules: [],
  distinctModuleNames: [],
  loading: false,
  error: null,
  successMessage: null,
  selectedTenant: "",
};

//// --- THUNKS --- ////

// 1. Aktif tenant'ın tüm modüllerini getir (Sidebar + enabled)
export const fetchEnabledModules = createAsyncThunk(
  "admin/fetchEnabledModules",
  async (params = {}, thunkAPI) => {
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    const res = await apiCall(
      "get",
      `/admin/enabled-modules${query ? `?${query}` : ""}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || [];
  }
);

// 2. Aktif tenant'ın analytics modülleri (isteğe bağlı visibleInSidebar filtresi)
export const fetchAnalyticsModules = createAsyncThunk(
  "admin/fetchAnalyticsModules",
  async (params = {}, thunkAPI) => {
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    const res = await apiCall(
      "get",
      `/admin/analytics-modules${query ? `?${query}` : ""}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || [];
  }
);

// 3. Tenant'ın modül ayarlarını (tüm settings) getir
export const fetchTenantModules = createAsyncThunk(
  "admin/fetchTenantModules",
  async (tenant, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/admin/tenant-modules${tenant ? `?tenant=${tenant}` : ""}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || [];
  }
);

// 4. Tenant'a ait benzersiz modül isimleri
export const fetchDistinctTenantModules = createAsyncThunk(
  "admin/fetchDistinctTenantModules",
  async (tenant, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/admin/tenant-distinct-modules${tenant ? `?tenant=${tenant}` : ""}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || [];
  }
);

// 5. Tüm modül meta'larını getir (admin)
export const fetchAdminModules = createAsyncThunk(
  "admin/fetchAdminModules",
  async (_, thunkAPI) => {
    const res = await apiCall(
      "get",
      "/admin/modules",
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data ?? [];
  }
);

// 6. Tek modül detayı getir (admin)
export const fetchModuleDetail = createAsyncThunk(
  "admin/fetchModuleDetail",
  async (name, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/admin/module/${name}`,
      null,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data;
  }
);

// 7. Modül oluştur (admin)
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
    return res.data || {};
  }
);

// 8. Modül güncelle (admin)
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
    return res.data || {};
  }
);

// 9. Modül sil (admin)
export const deleteAdminModule = createAsyncThunk(
  "admin/deleteAdminModule",
  async (name, thunkAPI) => {
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

// 10. Analytics toggle (tenant + module bazlı)
export const toggleModuleAnalytics = createAsyncThunk(
  "admin/toggleModuleAnalytics",
  async ({ module, value }, thunkAPI) => {
    const res = await apiCall(
      "patch",
      `/admin/modules/toggle-analytics`,
      { module, value },
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || {};
  }
);

//// --- SLICE --- ////

const adminModuleSlice = createSlice({
  name: "adminModule",
  initialState,
  reducers: {
    clearAdminMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setSelectedTenant: (state, action) => {
      state.selectedTenant = action.payload;
    },
    clearSelectedModule: (state) => {
      state.selectedModule = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Enabled modules
      .addCase(fetchEnabledModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnabledModules.fulfilled, (state, action) => {
        // mapping: name fallback ve label fallback
        state.moduleSettings = (action.payload || []).map((mod) => ({
          ...mod,
          visibleInSidebar: !!mod.visibleInSidebar,
          enabled: !!mod.enabled,
          useAnalytics: !!mod.useAnalytics,
          showInDashboard: !!mod.showInDashboard, // fallback false
          label: mod.label || { en: mod.name || mod.module },
          name: mod.name || mod.module,
        }));
        state.loading = false;
      })
      .addCase(fetchEnabledModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Beklenmeyen hata!";
      })

      // Analytics modules
      .addCase(fetchAnalyticsModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalyticsModules.fulfilled, (state, action) => {
        state.analyticsModules = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnalyticsModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Beklenmeyen hata!";
      })

      // Tenant module settings (all)
      .addCase(fetchTenantModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTenantModules.fulfilled, (state, action) => {
        state.moduleSettings = action.payload;
        state.loading = false;
      })
      .addCase(fetchTenantModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Distinct module names
      .addCase(fetchDistinctTenantModules.fulfilled, (state, action) => {
        state.distinctModuleNames = action.payload;
      })

      // Admin (meta) modules
      .addCase(fetchAdminModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Modüller yüklenemedi!";
      })

      // Module detail
      .addCase(fetchModuleDetail.fulfilled, (state, action) => {
        state.selectedModule = action.payload;
      })


      // Create module
      .addCase(createAdminModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
        state.successMessage = `Module "${action.payload.name}" created.`;
        toast.success(state.successMessage);
      })

      // Update module
      .addCase(updateAdminModule.fulfilled, (state, action) => {
        const idx = state.modules.findIndex((m) => m.name === action.payload.name);
        if (idx !== -1) state.modules[idx] = action.payload;
        state.selectedModule = action.payload;
        state.successMessage = `Module "${action.payload.name}" updated.`;
        toast.success(state.successMessage);
      })

      // Delete module
      .addCase(deleteAdminModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((m) => m.name !== action.payload);
        state.successMessage = `Module "${action.payload}" deleted.`;
        toast.success(state.successMessage);
      })

      // Toggle analytics
      .addCase(toggleModuleAnalytics.fulfilled, (state, action) => {
        const idx = state.modules.findIndex((m) => m.name === action.payload.name);
        if (idx !== -1) state.modules[idx] = action.payload;
        state.selectedModule = action.payload;
        state.successMessage = `Analytics toggled for "${action.payload.name}".`;
        toast.success(state.successMessage);
      });
  },
});

export const { clearAdminMessages, setSelectedTenant, clearSelectedModule } =
  adminModuleSlice.actions;
export default adminModuleSlice.reducer;
