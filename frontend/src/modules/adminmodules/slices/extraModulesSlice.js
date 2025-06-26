import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { toast } from "react-toastify";

const initialState = {
    maintenanceLogs: [],
    healthStatus: null,
    maintenanceLoading: false,
    maintenanceError: null,
    lastAction: "",
};

//// --- THUNKS --- ////

// 1. Meta rebuild (tüm modül meta verilerini yeniden oluştur)
export const rebuildAllModules = createAsyncThunk(
    "maintenance/rebuildAllModules",
    async (_, thunkAPI) => {
        const res = await apiCall("post", "/modules/rebuild", null, thunkAPI.rejectWithValue, { withCredentials: true });
        toast.success("Module meta list rebuilt successfully.");
        return res.data ?? [];
    }
);

// 2. Tenant settingslerini sıfırla
export const resetTenantModules = createAsyncThunk(
    "maintenance/resetTenantModules",
    async (tenant, thunkAPI) => {
        const res = await apiCall("post", `/modules/reset-tenant-modules`, { tenant }, thunkAPI.rejectWithValue, { withCredentials: true });
        toast.success("Tenant module settings reset.");
        return res.data ?? [];
    }
);

// 3. Health check (modül yapısal sağlık kontrolü)
export const fetchModulesHealth = createAsyncThunk(
    "maintenance/fetchModulesHealth",
    async (_, thunkAPI) => {
        const res = await apiCall("get", "/modules/health", null, thunkAPI.rejectWithValue, { withCredentials: true });
        return res.data ?? {};
    }
);

// 4. Batch enable/disable (tüm modülleri toplu aktif/pasif yap)
export const batchToggleModules = createAsyncThunk(
    "maintenance/batchToggleModules",
    async ({ enable, moduleNames }, thunkAPI) => {
        const res = await apiCall(
            "patch",
            "/modules/batch-toggle",
            { enable, moduleNames },
            thunkAPI.rejectWithValue,
            { withCredentials: true }
        );
        toast.success("Batch module toggle operation completed.");
        return res.data ?? {};
    }
);

// 5. Sync all (tüm ayarları backend ile eşitle)
export const syncAllModules = createAsyncThunk(
    "maintenance/syncAllModules",
    async (_, thunkAPI) => {
        const res = await apiCall("post", "/modules/sync-all", null, thunkAPI.rejectWithValue, { withCredentials: true });
        toast.success("All modules synced with backend.");
        return res.data ?? [];
    }
);

// 6. Batch delete (modül meta/settings toplu silme)
export const batchDeleteModules = createAsyncThunk(
    "maintenance/batchDeleteModules",
    async (moduleNames, thunkAPI) => {
        const res = await apiCall(
            "delete",
            "/modules/batch-delete",
            { moduleNames },
            thunkAPI.rejectWithValue,
            { withCredentials: true }
        );
        toast.success("Batch module delete operation completed.");
        return res.data ?? {};
    }
);

// 7. Cleanup (Unused/bozuk modülleri temizle)
export const cleanupModules = createAsyncThunk(
    "maintenance/cleanupModules",
    async (_, thunkAPI) => {
        const res = await apiCall("post", "/modules/cleanup", null, thunkAPI.rejectWithValue, { withCredentials: true });
        toast.success("Cleanup completed.");
        return res.data ?? [];
    }
);

//// --- SLICE --- ////

const extraModulesSlice = createSlice({
    name: "extraModules",
    initialState,
    reducers: {
        clearMaintenanceState: (state) => {
            state.maintenanceError = null;
            state.maintenanceLogs = [];
            state.lastAction = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(rebuildAllModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "rebuildAllModules";
            })
            .addCase(rebuildAllModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(rebuildAllModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Reset tenant modules
            .addCase(resetTenantModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "resetTenantModules";
            })
            .addCase(resetTenantModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(resetTenantModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Health check
            .addCase(fetchModulesHealth.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "fetchModulesHealth";
            })
            .addCase(fetchModulesHealth.fulfilled, (state, action) => {
                state.healthStatus = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(fetchModulesHealth.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Batch toggle
            .addCase(batchToggleModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "batchToggleModules";
            })
            .addCase(batchToggleModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(batchToggleModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Sync all
            .addCase(syncAllModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "syncAllModules";
            })
            .addCase(syncAllModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(syncAllModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Batch delete
            .addCase(batchDeleteModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "batchDeleteModules";
            })
            .addCase(batchDeleteModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(batchDeleteModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            })
            // Cleanup
            .addCase(cleanupModules.pending, (state) => {
                state.maintenanceLoading = true;
                state.lastAction = "cleanupModules";
            })
            .addCase(cleanupModules.fulfilled, (state, action) => {
                state.maintenanceLogs = action.payload;
                state.maintenanceLoading = false;
            })
            .addCase(cleanupModules.rejected, (state, action) => {
                state.maintenanceLoading = false;
                state.maintenanceError = action.payload?.message;
            });
    },
});

export const { clearMaintenanceState } = extraModulesSlice.actions;
export default extraModulesSlice.reducer;
