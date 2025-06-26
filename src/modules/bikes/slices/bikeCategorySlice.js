import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

const initialState = {
  categories: [],
  selected: null,
  loading: false,
  error: null,
  successMessage: null,
};

// 🌍 Fetch All (public veya admin)
export const fetchBikeCategories = createAsyncThunk(
  "bikescategory/fetchAll",
  async (_, thunkAPI) => {
    const res = await apiCall(
      "get",
      "/bikescategory",
      null,
      thunkAPI.rejectWithValue
    );
    return res.data;
  }
);

// ➕ Create (FormData)
export const createBikeCategory = createAsyncThunk(
  "bikescategory/create",
  async (formData, thunkAPI) => {
    const res = await apiCall(
      "post",
      "/bikescategory",
      formData,
      thunkAPI.rejectWithValue,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }
);

// ✏️ Update (FormData)
export const updateBikeCategory = createAsyncThunk(
  "bikescategory/update",
  async (params, thunkAPI) => {
    const res = await apiCall(
      "put",
      `/bikescategory/${params.id}`,
      params.data,
      thunkAPI.rejectWithValue,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }
);

// ❌ Delete
export const deleteBikeCategory = createAsyncThunk(
  "bikescategory/delete",
  async (id, thunkAPI) => {
    await apiCall(
      "delete",
      `/bikescategory/${id}`,
      null,
      thunkAPI.rejectWithValue
    );
    return id;
  }
);

const bikeCategorySlice = createSlice({
  name: "bikeCategory",
  initialState,
  reducers: {
    clearCategoryMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    clearSelectedCategory(state) {
      state.selected = null;
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
      // fetch
      .addCase(fetchBikeCategories.pending, loading)
      .addCase(fetchBikeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBikeCategories.rejected, failed)

      // create
      .addCase(createBikeCategory.pending, loading)
      .addCase(createBikeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Category created successfully.";
        if (action.payload && action.payload._id) {
          state.categories.unshift(action.payload);
        }
      })
      .addCase(createBikeCategory.rejected, failed)

      // update
      .addCase(updateBikeCategory.pending, loading)
      .addCase(updateBikeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Category updated successfully.";
        const updated = action.payload;
        if (updated && updated._id) {
          const index = state.categories.findIndex(
            (cat) => cat._id === updated._id
          );
          if (index !== -1) state.categories[index] = updated;
          if (state.selected?._id === updated._id) state.selected = updated;
        }
      })
      .addCase(updateBikeCategory.rejected, failed)

      // delete
      .addCase(deleteBikeCategory.pending, loading)
      .addCase(deleteBikeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Category deleted successfully.";
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      })
      .addCase(deleteBikeCategory.rejected, failed);
  },
});

export const { clearCategoryMessages, clearSelectedCategory } =
  bikeCategorySlice.actions;
export default bikeCategorySlice.reducer;
