import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// Initial state for address
const initialState = {
  addresses: [],
  currentAddress: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Fetch all addresses
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/address", null, rejectWithValue);
  }
);

// Create new address
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (data, { rejectWithValue }) => {
    return await apiCall("post", "/address", data, rejectWithValue);
  }
);

// Update address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {
    return await apiCall("put", `/address/${id}`, data, rejectWithValue);
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    return await apiCall("delete", `/address/${id}`, null, rejectWithValue);
  }
);

// Get single address by ID
export const fetchAddressById = createAsyncThunk(
  "address/fetchAddressById",
  async (id, { rejectWithValue }) => {
    return await apiCall("get", `/address/${id}`, null, rejectWithValue);
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetCurrentAddress: (state) => {
      state.currentAddress = null;
    },
    clearAddresses: (state) => {
      state.addresses = [];
      state.currentAddress = null;
      state.error = null;
      state.successMessage = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    };

    const setError = (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "An error occurred";
      state.successMessage = null;
    };

    // Fetch all addresses
    builder
      .addCase(fetchAddresses.pending, setLoading)
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload.data varsayımı, API'ye göre değişebilir
        state.addresses = action.payload.data || action.payload;
      })
      .addCase(fetchAddresses.rejected, setError);

    // Create address
    builder
      .addCase(createAddress.pending, setLoading)
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Address created successfully.";
        state.addresses.push(action.payload.data || action.payload);
      })
      .addCase(createAddress.rejected, setError);

    // Update address
    builder
      .addCase(updateAddress.pending, setLoading)
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Address updated successfully.";
        const updated = action.payload.data || action.payload;
        state.addresses = state.addresses.map((addr) =>
          addr._id === updated._id ? updated : addr
        );
      })
      .addCase(updateAddress.rejected, setError);

    // Delete address
    builder
      .addCase(deleteAddress.pending, setLoading)
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Address deleted successfully.";
        const deletedId = action.meta.arg;
        state.addresses = state.addresses.filter((addr) => addr._id !== deletedId);
      })
      .addCase(deleteAddress.rejected, setError);

    // Fetch address by ID
    builder
      .addCase(fetchAddressById.pending, setLoading)
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAddress = action.payload.data || action.payload;
      })
      .addCase(fetchAddressById.rejected, setError);
  },
});

export const { clearAddressMessages, resetCurrentAddress, clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
