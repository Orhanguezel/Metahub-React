import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// State
const initialState = {
  bikes: [],
  selected: null,
  loading: false,
  error: null,
  successMessage: null,
};

// 🌍 Public - Get All
export const fetchBikes = createAsyncThunk(
  "bikes/fetchPublic",
  async (_, thunkAPI) => {
    const res = await apiCall(
      "get",
      "/bikes",
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// 🌍 Public - Get By Slug
export const fetchBikeBySlug = createAsyncThunk(
  "bikes/fetchBySlug",
  async (slug, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/bikes/slug/${slug}`,
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// 🌍 Public - Get By ID
export const fetchBikeByIdPublic = createAsyncThunk(
  "bikes/fetchByIdPublic",
  async (id, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/bikes/${id}`,
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// 🛠 Admin - Get All
export const fetchBikesAdmin = createAsyncThunk(
  "bikes/fetchAdmin",
  async (_, thunkAPI) => {
    const res = await apiCall(
      "get",
      "/bikes/admin",
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// 🛠 Admin - Get By ID
export const fetchBikeByIdAdmin = createAsyncThunk(
  "bikes/fetchByIdAdmin",
  async (id, thunkAPI) => {
    const res = await apiCall(
      "get",
      `/bikes/admin/${id}`,
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// ➕ Create (tek dil de, çok dil de gönderebilirsin)
export const createBike = createAsyncThunk(
  "bikes/create",
  async (data, thunkAPI) => {
    const isFormData =
      typeof window !== "undefined" && data instanceof FormData;
    const res = await apiCall(
      "post",
      "/bikes/admin",
      data,
      thunkAPI.rejectWithValue,
      isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined
    );
    return res.data;
  }
);

// ✏️ Update
export const updateBike = createAsyncThunk(
  "bikes/update",
  async (params, thunkAPI) => {
    const { id, data } = params;
    const isFormData =
      typeof window !== "undefined" && data instanceof FormData;
    const res = await apiCall(
      "put",
      `/bikes/admin/${id}`,
      data,
      thunkAPI.rejectWithValue,
      isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined
    );
    return res.data;
  }
);

// ❌ Delete
export const deleteBike = createAsyncThunk(
  "bikes/delete",
  async (id, thunkAPI) => {
    const res = await apiCall(
      "delete",
      `/bikes/admin/${id}`,
      null,
      thunkAPI.rejectWithValue
    );
    return { id, message: res.message };
  }
);

// 🔁 Toggle Publish
export const togglePublishBike = createAsyncThunk(
  "bikes/togglePublish",
  async ({ id, isPublished }, thunkAPI) => {
    const formData = new FormData();
    formData.append("isPublished", String(isPublished));
    const res = await apiCall(
      "put",
      `/bikes/admin/${id}`,
      formData,
      thunkAPI.rejectWithValue,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }
);

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    clearBikeMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSelectedBike: (state) => {
      state.selected = null;
    },
    clearBikes: (state) => {
      state.bikes = [];
      state.selected = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    const loading = (state) => {
      state.loading = true;
      state.error = null;
    };
    const failed = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred.";
    };

    builder
      .addCase(fetchBikes.pending, loading)
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload;
      })
      .addCase(fetchBikes.rejected, failed)

      .addCase(fetchBikeBySlug.pending, loading)
      .addCase(fetchBikeBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchBikeBySlug.rejected, failed)

      .addCase(fetchBikeByIdPublic.pending, loading)
      .addCase(fetchBikeByIdPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchBikeByIdPublic.rejected, failed)

      .addCase(fetchBikesAdmin.pending, loading)
      .addCase(fetchBikesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload;
      })
      .addCase(fetchBikesAdmin.rejected, failed)

      .addCase(fetchBikeByIdAdmin.pending, loading)
      .addCase(fetchBikeByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchBikeByIdAdmin.rejected, failed)

      .addCase(createBike.pending, loading)
      .addCase(createBike.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product created successfully.";
        state.bikes.unshift(action.payload);
      })
      .addCase(createBike.rejected, failed)

      .addCase(updateBike.pending, loading)
      .addCase(updateBike.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product updated successfully.";
        const updated = action.payload;
        const index = state.bikes.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.bikes[index] = updated;
        if (state.selected?._id === updated._id) state.selected = updated;
      })
      .addCase(updateBike.rejected, failed)

      .addCase(deleteBike.pending, loading)
      .addCase(deleteBike.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product deleted successfully.";
        state.bikes = state.bikes.filter((p) => p._id !== action.payload.id);
      })
      .addCase(deleteBike.rejected, failed)

      .addCase(togglePublishBike.pending, loading)
      .addCase(togglePublishBike.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.bikes.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.bikes[index] = updated;
        if (state.selected?._id === updated._id) state.selected = updated;
        state.successMessage = updated.isPublished
          ? "Product published."
          : "Product unpublished.";
      })
      .addCase(togglePublishBike.rejected, failed);
  },
});

export const { clearBikeMessages, clearSelectedBike, clearBikes } = bikeSlice.actions;
export default bikeSlice.reducer;
