import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

// -- Initial State --
const initialState = {
  payments: [],
  myPayments: [],
  currentPayment: null,
  loading: false,
  error: null,
  successMessage: null,
};

// -- Async Thunks --

// 1. Create Payment
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data, { rejectWithValue }) => {
    return await apiCall("post", "/payment", data, rejectWithValue);
  }
);

// 2. Get All Payments (Admin)
export const fetchAllPayments = createAsyncThunk(
  "payment/fetchAllPayments",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/payment", null, rejectWithValue);
  }
);

// 3. Get Payment By Order ID
export const fetchPaymentByOrderId = createAsyncThunk(
  "payment/fetchPaymentByOrderId",
  async (orderId, { rejectWithValue }) => {
    return await apiCall("get", `/payment/order/${orderId}`, null, rejectWithValue);
  }
);

// 4. Get My Payments (User)
export const fetchMyPayments = createAsyncThunk(
  "payment/fetchMyPayments",
  async (_, { rejectWithValue }) => {
    return await apiCall("get", "/payment/user", null, rejectWithValue);
  }
);

// 5. Get My Payment By Payment ID
export const fetchMyPaymentById = createAsyncThunk(
  "payment/fetchMyPaymentById",
  async (paymentId, { rejectWithValue }) => {
    return await apiCall("get", `/payment/user/${paymentId}`, null, rejectWithValue);
  }
);

// 6. Mark Payment as Paid (Admin)
export const markPaymentAsPaid = createAsyncThunk(
  "payment/markPaymentAsPaid",
  async (paymentId, { rejectWithValue }) => {
    return await apiCall("put", `/payment/${paymentId}/mark-paid`, null, rejectWithValue);
  }
);

// 7. Mark Payment as Failed (Admin)
export const markPaymentAsFailed = createAsyncThunk(
  "payment/markPaymentAsFailed",
  async (paymentId, { rejectWithValue }) => {
    return await apiCall("put", `/payment/${paymentId}/mark-failed`, null, rejectWithValue);
  }
);

// 8. Update Payment Method (Admin)
export const updatePaymentMethod = createAsyncThunk(
  "payment/updatePaymentMethod",
  async ({ paymentId, method }, { rejectWithValue }) => {
    return await apiCall("put", `/payment/${paymentId}/update-method`, { method }, rejectWithValue);
  }
);

// 9. Simulate Stripe Payment (Admin)
export const simulateStripePayment = createAsyncThunk(
  "payment/simulateStripePayment",
  async (_, { rejectWithValue }) => {
    return await apiCall("post", "/payment/simulate/stripe", null, rejectWithValue);
  }
);

// 10. Simulate PayPal Payment (Admin)
export const simulatePayPalPayment = createAsyncThunk(
  "payment/simulatePayPalPayment",
  async (_, { rejectWithValue }) => {
    return await apiCall("post", "/payment/simulate/paypal", null, rejectWithValue);
  }
);

// -- Slice --
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    resetCurrentPayment(state) {
      state.currentPayment = null;
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
        (action.payload && action.payload.message) ||
        (action.error && action.error.message) ||
        "Error";
      state.successMessage = null;
    };

    // Create Payment
    builder.addCase(createPayment.pending, setLoading);
    builder.addCase(createPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
      if (action.payload && action.payload.data) {
        state.payments.push(action.payload.data);
      }
    });
    builder.addCase(createPayment.rejected, setError);

    // Fetch All Payments
    builder.addCase(fetchAllPayments.pending, setLoading);
    builder.addCase(fetchAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = (action.payload && action.payload.data) || [];
    });
    builder.addCase(fetchAllPayments.rejected, setError);

    // Fetch Payment By Order ID
    builder.addCase(fetchPaymentByOrderId.pending, setLoading);
    builder.addCase(fetchPaymentByOrderId.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPayment = action.payload && action.payload.data;
    });
    builder.addCase(fetchPaymentByOrderId.rejected, setError);

    // Fetch My Payments
    builder.addCase(fetchMyPayments.pending, setLoading);
    builder.addCase(fetchMyPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.myPayments = (action.payload && action.payload.data) || [];
    });
    builder.addCase(fetchMyPayments.rejected, setError);

    // Fetch My Payment By ID
    builder.addCase(fetchMyPaymentById.pending, setLoading);
    builder.addCase(fetchMyPaymentById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPayment = action.payload && action.payload.data;
    });
    builder.addCase(fetchMyPaymentById.rejected, setError);

    // Mark as Paid
    builder.addCase(markPaymentAsPaid.pending, setLoading);
    builder.addCase(markPaymentAsPaid.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
    });
    builder.addCase(markPaymentAsPaid.rejected, setError);

    // Mark as Failed
    builder.addCase(markPaymentAsFailed.pending, setLoading);
    builder.addCase(markPaymentAsFailed.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
    });
    builder.addCase(markPaymentAsFailed.rejected, setError);

    // Update Payment Method
    builder.addCase(updatePaymentMethod.pending, setLoading);
    builder.addCase(updatePaymentMethod.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
    });
    builder.addCase(updatePaymentMethod.rejected, setError);

    // Simulate Stripe
    builder.addCase(simulateStripePayment.pending, setLoading);
    builder.addCase(simulateStripePayment.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
    });
    builder.addCase(simulateStripePayment.rejected, setError);

    // Simulate PayPal
    builder.addCase(simulatePayPalPayment.pending, setLoading);
    builder.addCase(simulatePayPalPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload && action.payload.message;
    });
    builder.addCase(simulatePayPalPayment.rejected, setError);
  },
});

export const { clearPaymentMessages, resetCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;


/* createPayment(data)

fetchAllPayments()

fetchPaymentByOrderId(orderId)

fetchMyPayments()

fetchMyPaymentById(paymentId)

markPaymentAsPaid(paymentId)

markPaymentAsFailed(paymentId)

updatePaymentMethod({ paymentId, method })

simulateStripePayment()

simulatePayPalPayment()
*/
