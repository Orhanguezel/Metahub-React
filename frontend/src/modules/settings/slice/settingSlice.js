import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";
import { SUPPORTED_LOCALES } from "@/i18n";

const initialState = {
  settings: [],
  loading: false,
  error: null,
  successMessage: null,
  fetchedSettings: false,
};

export const fetchSettings = createAsyncThunk(
  "setting/fetchSettings",
  async (_, thunkAPI) => {
    try {
      const response = await apiCall("get", "/setting", null, thunkAPI.rejectWithValue);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const upsertSetting = createAsyncThunk(
  "setting/upsertSetting",
  async (data, thunkAPI) => {
    try {
      let normalizedValue = data.value;
      // Eğer string gönderildiyse ve multilanguage alan ise: (frontend validasyonu için)
      if (
        typeof data.value === "string" &&
        !["site_template", "available_themes", "navbar_logos", "footer_logos"].includes(data.key)
      ) {
        normalizedValue = SUPPORTED_LOCALES.reduce(
          (acc, lng) => ({ ...acc, [lng]: data.value }),
          {}
        );
      }
      const response = await apiCall(
        "post",
        "/setting",
        { key: data.key, value: normalizedValue, isActive: data.isActive },
        thunkAPI.rejectWithValue
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteSetting = createAsyncThunk(
  "setting/deleteSetting",
  async (key, thunkAPI) => {
    try {
      await apiCall("delete", `/setting/${key}`, null, thunkAPI.rejectWithValue);
      return key;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const upsertSettingImage = createAsyncThunk(
  "setting/upsertSettingImage",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      if (["navbar_logos", "footer_logos"].includes(data.key)) {
        if (data.lightFile) formData.append("lightFile", data.lightFile);
        if (data.darkFile) formData.append("darkFile", data.darkFile);
      }
      const response = await apiCall(
        "post",
        `/setting/upload/${data.key}`,
        formData,
        thunkAPI.rejectWithValue,
        { isFormData: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSettingImage = createAsyncThunk(
  "setting/updateSettingImage",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      if (["navbar_logos", "footer_logos"].includes(data.key)) {
        if (data.lightFile) formData.append("lightFile", data.lightFile);
        if (data.darkFile) formData.append("darkFile", data.darkFile);
      }
      const response = await apiCall(
        "put",
        `/setting/upload/${data.key}`,
        formData,
        thunkAPI.rejectWithValue,
        { isFormData: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// --- Helper function ---
function updateOrInsert(state, payload) {
  const updated = payload.data || payload;
  if (!updated || !updated.key) return;
  const index = state.settings.findIndex((s) => s.key === updated.key);
  if (index !== -1) {
    state.settings[index] = updated;
  } else {
    state.settings.push(updated);
  }
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    clearSettingMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSettings: (state) => {
      state.settings = [];
      state.fetchedSettings = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload.data || action.payload;
        state.fetchedSettings = true;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch settings.";
      })

      .addCase(upsertSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Setting saved successfully.";
        updateOrInsert(state, action.payload);
      })

      .addCase(upsertSettingImage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Image uploaded successfully.";
        updateOrInsert(state, action.payload);
      })

      .addCase(updateSettingImage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Image updated successfully.";
        updateOrInsert(state, action.payload);
      })

      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Setting deleted successfully.";
        state.settings = state.settings.filter((s) => s.key !== action.payload);
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          const payload = action.payload;
          if (typeof payload === "string") {
            state.error = payload;
          } else if (payload && typeof payload === "object" && "message" in payload) {
            state.error = payload.message || "Operation failed.";
          } else {
            state.error = "Operation failed.";
          }
        }
      );
  },
});

export const { clearSettingMessages, clearSettings } = settingSlice.actions;
export default settingSlice.reducer;
