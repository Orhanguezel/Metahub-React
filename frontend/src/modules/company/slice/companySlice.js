import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

const initialState = {
  company: null,
  status: "idle",
  updateStatus: "idle",
  createStatus: "idle",
  error: null,
  successMessage: null,
};


const appendFormData = (formData, data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logos" && Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("logos", file);
        }
      });
    } else if (key === "removedLogos" && Array.isArray(value)) {
      formData.append("removedLogos", JSON.stringify(value));
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File)
    ) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        formData.append(`${key}[${nestedKey}]`, nestedValue ?? "");
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
};

// Async Thunks

export const fetchCompanyInfo = createAsyncThunk(
  "company/fetchCompanyInfo",
  async (_, thunkAPI) => {
    try {
      const result = await apiCall("get", "/company", null, thunkAPI.rejectWithValue);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "No company data found.");
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (newCompany, thunkAPI) => {
    try {
      const formData = new FormData();
      appendFormData(formData, newCompany);

      const result = await apiCall("post", "/company", formData, thunkAPI.rejectWithValue);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to create company.");
    }
  }
);

export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (updatedData, thunkAPI) => {
    try {
      const formData = new FormData();
      appendFormData(formData, updatedData);

      const result = await apiCall(
        "put",
        `/company/${updatedData._id}`,
        formData,
        thunkAPI.rejectWithValue
      );
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to update company.");
    }
  }
);

// Slice

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch company data.";
      })

      // Update
      .addCase(updateCompanyInfo.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.company = action.payload;
        state.successMessage = "Company updated successfully.";
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "Failed to update company.";
      })

      // Create
      .addCase(createCompany.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.company = action.payload;
        state.successMessage = "Company created successfully.";
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload || "Failed to create company.";
      });
  },
});

export const { resetMessages } = companySlice.actions;
export default companySlice.reducer;
