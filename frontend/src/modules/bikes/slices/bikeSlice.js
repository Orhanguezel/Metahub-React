import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

const initialState = {
  bikes: [],
  categories: [],
  selectedProduct: null,
  selectedCategory: null,
  loading: false,
  error: null,
};

// 🌐 Public: Get All Products
export const fetchProducts = createAsyncThunk(
  "bikes/fetchProducts",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/radonarprod", null, rejectWithValue);
  }
);

// 🌐 Public: Get Product by ID
export const getProductById = createAsyncThunk(
  "bikes/getProductById",
  async (id, { rejectWithValue }) => {
    return await apiCall("get", `/radonarprod/${id}`, null, rejectWithValue);
  }
);

// 🌐 Public: Get Product by Slug
export const getProductBySlug = createAsyncThunk(
  "bikes/getProductBySlug",
  async (slug, { rejectWithValue }) => {
    return await apiCall(
      "get",
      `/radonarprod/slug/${slug}`,
      null,
      rejectWithValue
    );
  }
);

// 📥 Admin: Get All Products
export const fetchAdminProducts = createAsyncThunk(
  "bikes/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/radonarprod/admin", null, rejectWithValue);
  }
);

// 🔍 Admin: Get Product by ID
export const getProductByIdAdmin = createAsyncThunk(
  "bikes/getProductByIdAdmin",
  async (id, { rejectWithValue }) => {
    return await apiCall(
      "get",
      `/radonarprod/admin/${id}`,
      null,
      rejectWithValue
    );
  }
);

// ✏️ Admin: Update Product
export const updateProduct = createAsyncThunk(
  "bikes/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    return await apiCall(
      "put",
      `/radonarprod/admin/${id}`,
      formData,
      rejectWithValue
    );
  }
);

// ❌ Delete Product
export const deleteProduct = createAsyncThunk(
  "bikes/deleteProduct",
  async (id, { rejectWithValue }) => {
    return await apiCall("delete", `/radonarprod/${id}`, null, rejectWithValue);
  }
);

// ➕ Create Product (Admin)
export const createProduct = createAsyncThunk(
  "bikes/createProduct",
  async (formData, { rejectWithValue }) => {
    return await apiCall(
      "post",
      "/radonarprod/admin",
      formData,
      rejectWithValue
    );
  }
);

// 📄 Get All Categories
export const fetchCategories = createAsyncThunk(
  "bikes/fetchCategories",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/radonarcategory", null, rejectWithValue);
  }
);

// 📁 Create Category
export const createCategory = createAsyncThunk(
  "bikes/createCategory",
  async (categoryData, { rejectWithValue }) => {
    return await apiCall(
      "post",
      "/radonarcategory",
      categoryData,
      rejectWithValue
    );
  }
);

// 🔍 Get Category by ID
export const getCategoryById = createAsyncThunk(
  "bikes/getCategoryById",
  async (id, { rejectWithValue }) => {
    return await apiCall(
      "get",
      `/radonarcategory/${id}`,
      null,
      rejectWithValue
    );
  }
);

// ✏️ Update Category
export const updateCategory = createAsyncThunk(
  "bikes/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    return await apiCall(
      "put",
      `/radonarcategory/${id}`,
      data,
      rejectWithValue
    );
  }
);

// ❌ Delete Category
export const deleteCategory = createAsyncThunk(
  "bikes/deleteCategory",
  async (id, { rejectWithValue }) => {
    return await apiCall(
      "delete",
      `/radonarcategory/${id}`,
      null,
      rejectWithValue
    );
  }
);

// 📢 Admin: Toggle Publish Status
export const togglePublish = createAsyncThunk(
  "bikes/togglePublish",
  async ({ id, isPublished }, { rejectWithValue }) => {
    return await apiCall(
      "patch",
      `/radonarprod/admin/${id}/toggle-publish`,
      { isPublished },
      rejectWithValue
    );
  }
);

// 📂 Fetch Radonar Categories
export const fetchRadonarCategories = createAsyncThunk(
  "bikes/fetchRadonarCategories",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/radonarcategory", null, rejectWithValue);
  }
);

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    setBikes(state, action) {
      state.bikes = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    clearBikeError(state) {
      state.error = null;
    },
    clearSelected(state) {
      state.selectedProduct = null;
      state.selectedCategory = null;
    },
    clearCategoryMessages(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred.";
    };

    // Category cases
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, handleRejected)

      .addCase(createCategory.pending, handlePending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, handleRejected)

      .addCase(getCategoryById.pending, handlePending)
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload.data;
      })
      .addCase(getCategoryById.rejected, handleRejected)

      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        // Optional: Güncellenen kategoriyle listeyi güncelle
      })
      .addCase(updateCategory.rejected, handleRejected)

      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, handleRejected);

    // Product cases
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload.data;
      })
      .addCase(fetchProducts.rejected, handleRejected)

      .addCase(fetchAdminProducts.pending, handlePending)
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload.data;
      })
      .addCase(fetchAdminProducts.rejected, handleRejected)

      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes.push(action.payload);
      })
      .addCase(createProduct.rejected, handleRejected)

      .addCase(getProductById.pending, handlePending)
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(getProductById.rejected, handleRejected)

      .addCase(getProductByIdAdmin.pending, handlePending)
      .addCase(getProductByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdAdmin.rejected, handleRejected)

      .addCase(getProductBySlug.pending, handlePending)
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(getProductBySlug.rejected, handleRejected)

      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        // Optional: Güncellenen ürünü liste içinde güncelle
      })
      .addCase(updateProduct.rejected, handleRejected)

      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = state.bikes.filter(
          (bike) => bike._id !== action.meta.arg
        );
      })
      .addCase(deleteProduct.rejected, handleRejected)
      .addCase(togglePublish.pending, handlePending)
      .addCase(togglePublish.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.bikes = state.bikes.map((bike) =>
          bike._id === updated._id ? updated : bike
        );
      })
      .addCase(togglePublish.rejected, handleRejected);
    builder
      .addCase(fetchRadonarCategories.pending, handlePending)
      .addCase(fetchRadonarCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchRadonarCategories.rejected, handleRejected);
  },
});

export const {
  setBikes,
  setCategories,
  clearBikeError,
  clearSelected,
  clearCategoryMessages,
} = bikeSlice.actions;

export default bikeSlice.reducer;
