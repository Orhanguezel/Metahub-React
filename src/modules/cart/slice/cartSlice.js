import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

export const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  status: "open",
  isActive: true,
  couponCode: null,
  discount: 0,
};

// fetchCart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await apiCall("get", "/cart", null, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return EMPTY_CART;
    } catch (error) {
      if (error.response?.status === 401) return thunkAPI.rejectWithValue("Not logged in");
      if (error.response?.status === 404) return EMPTY_CART;
      return thunkAPI.rejectWithValue(error.message || "Cart yüklenemedi!");
    }
  }
);

// addToCart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const response = await apiCall("post", "/cart/add", { productId, quantity }, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return thunkAPI.rejectWithValue("Sepete eklenemedi.");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Sepete eklenemedi.");
    }
  }
);

// increaseQuantity
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId, thunkAPI) => {
    try {
      const response = await apiCall("patch", `/cart/increase/${productId}`, null, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return thunkAPI.rejectWithValue("Arttırılamadı.");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Arttırılamadı.");
    }
  }
);

// decreaseQuantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId, thunkAPI) => {
    try {
      const response = await apiCall("patch", `/cart/decrease/${productId}`, null, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return thunkAPI.rejectWithValue("Azaltılamadı.");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Azaltılamadı.");
    }
  }
);

// removeFromCart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      const response = await apiCall("delete", `/cart/remove/${productId}`, null, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return thunkAPI.rejectWithValue("Çıkarılamadı.");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Çıkarılamadı.");
    }
  }
);

// clearCart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const response = await apiCall("delete", "/cart/clear", null, thunkAPI.rejectWithValue);
      if (response && response.data) return response.data;
      return thunkAPI.rejectWithValue("Temizlenemedi.");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Temizlenemedi.");
    }
  }
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
  successMessage: null,
  stockWarning: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartMessages: (state) => {
      state.error = null;
      state.successMessage = null;
      state.stockWarning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.stockWarning = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Cart yüklenemedi!";
        if (action.payload === "Not logged in") {
          state.cart = null;
        } else {
          state.cart = { ...EMPTY_CART };
        }
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.stockWarning = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.successMessage = "Sepete eklendi.";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Sepete eklenemedi!";
      })
      // increaseQuantity
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Arttırılamadı!";
      })
      // decreaseQuantity
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Azaltılamadı!";
      })
      // removeFromCart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.successMessage = "Sepetten çıkarıldı.";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Çıkarılamadı!";
      })
      // clearCart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.successMessage = "Sepet temizlendi.";
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Temizlenemedi!";
      });
  },
});

export const { clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;
