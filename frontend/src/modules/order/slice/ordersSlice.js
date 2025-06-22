import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// --- Initial State ---
const initialState = {
  orders: [],      // Admin'in tüm siparişleri (liste)
  myOrders: [],    // Kullanıcının kendi siparişleri (liste)
  order: null,     // Sipariş detayı (object)
  loading: false,
  error: null,
  successMessage: null,
};

// --- THUNK ACTIONS ---

// Sipariş oluştur
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (data, thunkAPI) => {
    try {
      return await apiCall("post", "/order", data, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Order could not be created."
      );
    }
  }
);

// Kendi siparişlerini getir (array dönecek!)
export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, thunkAPI) => {
    try {
      return await apiCall("get", "/order", null, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Orders could not be fetched."
      );
    }
  }
);

// Tek siparişi getir
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id, thunkAPI) => {
    try {
      return await apiCall("get", `/order/${id}`, null, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Order not found."
      );
    }
  }
);


// Adres güncelle
export const updateShippingAddress = createAsyncThunk(
  "orders/updateShippingAddress",
  async ({ orderId, shippingAddress }, thunkAPI) => {
    try {
      return await apiCall("put", `/order/${orderId}/address`, { shippingAddress }, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Shipping address could not be updated."
      );
    }
  }
);

// ADMIN: Tüm siparişleri getir (array dönecek!)
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await apiCall("get", "/order/admin", null, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Orders could not be fetched."
      );
    }
  }
);

// ADMIN: Sipariş durumunu güncelle
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      return await apiCall("put", `/order/admin/${orderId}/status`, { status }, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Order status could not be updated."
      );
    }
  }
);

// ADMIN: Siparişi teslim edildi olarak işaretle
export const markOrderAsDelivered = createAsyncThunk(
  "orders/markOrderAsDelivered",
  async (orderId, thunkAPI) => {
    try {
      return await apiCall("put", `/order/admin/${orderId}/deliver`, null, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Order could not be marked as delivered."
      );
    }
  }
);

// ADMIN: Siparişi sil
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      return await apiCall("delete", `/order/admin/${orderId}`, null, thunkAPI.rejectWithValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Order could not be deleted."
      );
    }
  }
);

// --- SLICE ---
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetOrders: (state) => {
      state.orders = [];
      state.myOrders = [];
      state.order = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Kısa helperlar
    const loading = (state) => {
      state.loading = true;
      state.error = null;
    };
    const failed = (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    };

    // Sipariş oluştur
    builder
      .addCase(createOrder.pending, loading)
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Order created.";
        if (action.payload?.data) {
          // Yeni siparişi myOrders'ın başına ekle (isteğe bağlı)
          if (Array.isArray(state.myOrders)) {
            state.myOrders.unshift(action.payload.data);
          } else {
            state.myOrders = [action.payload.data];
          }
        }
      })
      .addCase(createOrder.rejected, failed);

    // Kendi siparişlerini getir
    builder
      .addCase(getMyOrders.pending, loading)
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Hata: backend'den data array olarak gelmeli!
        const data = action.payload?.data;
        state.myOrders = Array.isArray(data) ? data : [];
        state.successMessage = action.payload?.message || "Orders fetched.";
      })
      .addCase(getMyOrders.rejected, failed);

    // Sipariş detayı getir
    builder
      .addCase(getOrderById.pending, loading)
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;

        // Verinin formatını kontrol et
        const orderData = action.payload?.data;
        if (orderData) {
          // Burada order bilgilerini güncelliyoruz.
          state.order = {
            ...orderData,
            items: orderData.items || [],  // items kısmı kontrol ediliyor
            shippingAddress: orderData.shippingAddress || {},  // shippingAddress kontrolü
          };
        } else {
          state.order = null;
        }
      })
      .addCase(getOrderById.rejected, failed);

    // Adres güncelle
    builder
      .addCase(updateShippingAddress.pending, loading)
      .addCase(updateShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Shipping updated.";
        state.order = action.payload?.data || null;
      })
      .addCase(updateShippingAddress.rejected, failed);

    // --- ADMIN ---
    builder
      .addCase(getAllOrders.pending, loading)
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload?.data;
        state.orders = Array.isArray(data) ? data : [];
      })
      .addCase(getAllOrders.rejected, failed);

    builder
      .addCase(updateOrderStatus.pending, loading)
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Status updated.";
        const updated = action.payload?.data;
        if (updated && Array.isArray(state.orders)) {
          state.orders = state.orders.map((o) =>
            o._id === updated._id ? updated : o
          );
        }
      })
      .addCase(updateOrderStatus.rejected, failed);

    builder
      .addCase(markOrderAsDelivered.pending, loading)
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Order delivered.";
        const updated = action.payload?.data;
        if (updated && Array.isArray(state.orders)) {
          state.orders = state.orders.map((o) =>
            o._id === updated._id ? updated : o
          );
        }
      })
      .addCase(markOrderAsDelivered.rejected, failed);

    builder
      .addCase(deleteOrder.pending, loading)
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Order deleted.";
        // deleteOrder thunk'ı {message, data} döndürürse, aşağıdaki gibi:
        if (action.payload?.orderId) {
          state.orders = state.orders.filter((o) => o._id !== action.payload.orderId);
        }
      })
      .addCase(deleteOrder.rejected, failed);
  },
});

export const { clearOrderMessages, resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
