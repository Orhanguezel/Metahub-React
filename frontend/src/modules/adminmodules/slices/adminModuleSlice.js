import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { toast } from "react-toastify";

const initialState = {
  modules: [],
  tenantModules: [],
  analyticsModules: [],
  distinctModuleNames: [],
  selectedModule: null,
  selectedTenant: "",
  loading: false,
  error: null,
  successMessage: null,
};

//// --- THUNKS --- ////
// 0. Yeni modül ekle (admin)
export const createAdminModule = createAsyncThunk(
  "admin/createAdminModule",
  async (payload, thunkAPI) => {
    const res = await apiCall(
      "post",
      "/modules/modules",  // endpointin tam adresi: /modules/modules
      payload,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data || {};
  }
);


// 1. Sistemdeki tüm modülleri getir (meta)
export const fetchAdminModules = createAsyncThunk(
  "admin/fetchAdminModules",
  async (_, thunkAPI) => {
    const res = await apiCall("get", "/modules/modules", null, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? [];
  }
);

// 2. Aktif tenant'ın tüm modül ayarlarını getir (settings)
export const fetchTenantModules = createAsyncThunk(
  "admin/fetchTenantModules",
  async (tenant, thunkAPI) => {
    const res = await apiCall("get", `/modules/tenant-modules${tenant ? `?tenant=${tenant}` : ""}`, null, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? [];
  }
);

// 3. Analytics aktif olan modülleri getir
export const fetchAnalyticsModules = createAsyncThunk(
  "admin/fetchAnalyticsModules",
  async (params = {}, thunkAPI) => {
    const query = Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&");
    const res = await apiCall("get", `/modules/analytics-status${query ? `?${query}` : ""}`, null, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? [];
  }
);

// 4. Tenant’a ait benzersiz modül isimleri
export const fetchDistinctTenantModules = createAsyncThunk(
  "admin/fetchDistinctTenantModules",
  async (tenant, thunkAPI) => {
    const res = await apiCall("get", `/modules/tenant-distinct-modules${tenant ? `?tenant=${tenant}` : ""}`, null, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? [];
  }
);

// 5. Tek modül meta detayı getir (meta)
export const fetchModuleDetail = createAsyncThunk(
  "admin/fetchModuleDetail",
  async (name, thunkAPI) => {
    const res = await apiCall("get", `/modules/module/${name}`, null, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data;
  }
);

// 6. Modül meta güncelle (meta)
export const updateAdminModule = createAsyncThunk(
  "admin/updateAdminModule",
  async ({ name, updates }, thunkAPI) => {
    const res = await apiCall("patch", `/modules/module/${name}`, updates, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? {};
  }
);

// 7. Modül sil (meta)
export const deleteAdminModule = createAsyncThunk(
  "admin/deleteAdminModule",
  async (name, thunkAPI) => {
    await apiCall("delete", `/modules/module/${name}`, null, thunkAPI.rejectWithValue, { withCredentials: true });
    return name;
  }
);

// 8. Analytics toggle (meta)
export const toggleModuleAnalytics = createAsyncThunk(
  "admin/toggleModuleAnalytics",
  async ({ module, value }, thunkAPI) => {
    const res = await apiCall("patch", `/modules/toggle-analytics`, { module, value }, thunkAPI.rejectWithValue, { withCredentials: true });
    return res.data ?? {};
  }
);

// 9. Tenant modül ayarlarını güncelle (settings)
export const updateTenantModuleSetting = createAsyncThunk(
  "admin/updateTenantModuleSetting",
  async (payload, thunkAPI) => {
    // payload örn: { module: "product", enabled: false, visibleInSidebar: true }
    const res = await apiCall(
      "patch",
      "/modules/tenant-setting",
      payload,
      thunkAPI.rejectWithValue,
      { withCredentials: true }
    );
    return res.data; // Beklenen: güncel ayar (ModuleSetting)
  }
);

// --- SLICE ---
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
      // --- Module create ---
      .addCase(createAdminModule.pending, (state) => { state.loading = true; })
      .addCase(createAdminModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
        state.successMessage = `Module "${action.payload.name}" created.`;
        state.loading = false;
        toast.success(state.successMessage);
      })
      .addCase(createAdminModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Modül oluşturulamadı!";
        toast.error(state.error);
      })

      // --- Fetch global meta modules ---
      .addCase(fetchAdminModules.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Modüller yüklenemedi!";
      })

      // --- Fetch tenant modules/settings ---
      .addCase(fetchTenantModules.pending, (state) => { state.loading = true; })
      .addCase(fetchTenantModules.fulfilled, (state, action) => {
        state.tenantModules = action.payload;
        state.loading = false;
      })
      .addCase(fetchTenantModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // --- Analytics (opsiyonel) ---
      .addCase(fetchAnalyticsModules.pending, (state) => { state.loading = true; })
      .addCase(fetchAnalyticsModules.fulfilled, (state, action) => {
        state.analyticsModules = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnalyticsModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Beklenmeyen hata!";
      })

      // --- Distinct module names ---
      .addCase(fetchDistinctTenantModules.fulfilled, (state, action) => {
        state.distinctModuleNames = action.payload;
      })

      // --- Modül detayı ---
      .addCase(fetchModuleDetail.fulfilled, (state, action) => {
        state.selectedModule = action.payload;
      })

      // --- Global meta güncelleme ---
      .addCase(updateAdminModule.pending, (state, action) => {
        // Hangi modül güncelleniyor, optimistik olarak değiştir
        const { arg } = action.meta; // RTK 1.9.x ve üstü için
        if (arg && arg.name && arg.updates) {
          const idx = state.modules.findIndex(m => m.name === arg.name);
          if (idx !== -1) {
            state.modules[idx] = {
              ...state.modules[idx],
              ...arg.updates,
              // NOT: Diğer alanlar dokunulmaz!
            };
          }
        }
        state.loading = true;
      })
      .addCase(updateAdminModule.fulfilled, (state, action) => {
        const idx = state.modules.findIndex(m => m.name === action.payload.name);
        if (idx !== -1) state.modules[idx] = action.payload;
        state.selectedModule = action.payload;
        state.successMessage = `Module "${action.payload.name}" updated.`;
        state.loading = false;
      })
      .addCase(updateAdminModule.rejected, (state, action) => {
        // Hata olursa, state’i refetch ile eski haline getir
        state.loading = false;
        state.error = action.payload?.message || "Modül güncellenemedi!";
      })


      // --- Tenant modül ayarları güncelleme ---
      .addCase(updateTenantModuleSetting.pending, (state, action) => {
        const { arg } = action.meta;
        if (arg && arg.module) {
          const idx = state.tenantModules.findIndex(m => m.module === arg.module);
          if (idx !== -1) {
            state.tenantModules[idx] = {
              ...state.tenantModules[idx],
              ...arg,
            };
          }
        }
        state.loading = true;
      })
      .addCase(updateTenantModuleSetting.fulfilled, (state, action) => {
        const { module: moduleName } = action.payload || {};
        const idx = state.tenantModules.findIndex(m => m.module === moduleName);
        if (idx !== -1) {
          state.tenantModules[idx] = {
            ...state.tenantModules[idx],
            ...action.payload,
          };
        }
        state.successMessage = `Module setting updated.`;
        state.loading = false;
      })
      .addCase(updateTenantModuleSetting.rejected, (state, action) => {
        // Hata olursa, state’i refetch ile eski haline getir
        state.loading = false;
        state.error = action.payload?.message || "Module setting update failed!";
      })


      // --- Delete global module ---
      .addCase(deleteAdminModule.pending, (state) => { state.loading = true; })
      .addCase(deleteAdminModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((m) => m.name !== action.payload);
        state.tenantModules = state.tenantModules.filter((m) => m.module !== action.payload);
        state.successMessage = `Module "${action.payload}" deleted.`;
        state.loading = false;
        toast.success(state.successMessage);
      })

      // --- Analytics toggle (opsiyonel) ---
      .addCase(toggleModuleAnalytics.fulfilled, (state, action) => {
        const idx = state.modules.findIndex(
          (m) => m.name === action.payload.name
        );
        if (idx !== -1) state.modules[idx] = action.payload;

        // tenantModules güncellenmez (sadece global toggle için)
        state.selectedModule = action.payload;
        state.successMessage = `Analytics toggled for "${action.payload.name}".`;
        state.loading = false;
        toast.success(state.successMessage);
      });
  },
});

export const { clearAdminMessages, setSelectedTenant, clearSelectedModule } = adminModuleSlice.actions;
export default adminModuleSlice.reducer;