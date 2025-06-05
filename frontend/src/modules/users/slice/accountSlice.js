import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "@/api/apiCall";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Fetch current user profile
export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const response = await apiCall("get", "/users/account/me", null, rejectWithValue);
    if (response && response.success && response.user) {
      return response.user;  
    }
    return rejectWithValue(response.message || "Failed to fetch user");
  }
);



// Update profile info
export const updateMyProfile = createAsyncThunk(
  "account/updateMyProfile",
  async (data, { rejectWithValue }) => {
    return await apiCall(
      "put",
      "/users/account/me/update",
      data,
      rejectWithValue
    );
  }
);

// Update profile password
export const updateMyPassword = createAsyncThunk(
  "account/updateMyPassword",
  async (data, { rejectWithValue }) => {
    return await apiCall(
      "put",
      "/users/account/me/password",
      data,
      rejectWithValue
    );
  }
);

// Update profile image
export const updateProfileImage = createAsyncThunk(
  "account/updateProfileImage",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    return await apiCall(
      "put",
      "/users/account/me/profile-image",
      formData,
      rejectWithValue,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }
);

// Update notification settings
export const updateNotificationSettings = createAsyncThunk(
  "account/updateNotificationSettings",
  async (data, { rejectWithValue }) => {
    return await apiCall(
      "patch",
      "/users/account/me/notifications",
      data,
      rejectWithValue
    );
  }
);

// Update social media links
export const updateSocialMediaLinks = createAsyncThunk(
  "account/updateSocialMediaLinks",
  async (data, { rejectWithValue }) => {
    return await apiCall(
      "patch",
      "/users/account/me/social",
      data,
      rejectWithValue
    );
  }
);

// Delete user account
export const deleteUserAccount = createAsyncThunk(
  "account/deleteUserAccount",
  async (payload, { rejectWithValue }) => {
    return await apiCall(
      "post",
      "/users/account/me/delete",
      payload,
      rejectWithValue
    );
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
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
          : action.payload?.message || "Profile operation failed.";
      state.successMessage = null;
    };

    builder
      .addCase(fetchCurrentUser.pending, setLoading)

     .addCase(fetchCurrentUser.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload; 
  state.error = null;
})


      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch user profile.";
        state.successMessage = null;
      })

      // Update profile
      .addCase(updateMyProfile.pending, setLoading)
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Profile updated successfully.";
        state.error = null;
        if (action.payload.user) {
          state.profile = { ...state.profile, ...action.payload.user };
        }
      })

      .addCase(updateMyProfile.rejected, setError)

      // Update password
      .addCase(updateMyPassword.pending, setLoading)
      .addCase(updateMyPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Password updated successfully.";
        state.error = null;
      })
      .addCase(updateMyPassword.rejected, setError)

      // Update notifications
      .addCase(updateNotificationSettings.pending, setLoading)
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.notifications = action.payload.notifications;
        }
        state.successMessage =
          action.payload.message || "Notifications updated.";
        state.error = null;
      })
      .addCase(updateNotificationSettings.rejected, setError)

      // Update social media
      .addCase(updateSocialMediaLinks.pending, setLoading)
      .addCase(updateSocialMediaLinks.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.socialMedia = action.payload.socialMedia;
        }
        state.successMessage =
          action.payload.message || "Social media updated.";
        state.error = null;
      })
      .addCase(updateSocialMediaLinks.rejected, setError)

      // Update profile image
      .addCase(updateProfileImage.pending, setLoading)
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.profileImage = action.payload.profileImage;
        }
        state.successMessage =
          action.payload.message || "Profile image updated successfully.";
        state.error = null;
      })
      .addCase(updateProfileImage.rejected, setError)

      // Delete user account
      .addCase(deleteUserAccount.pending, setLoading)
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.successMessage = "Account deleted successfully.";
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, setError);
  },
});

export const { clearAccountMessages, resetProfile } = accountSlice.actions;
export default accountSlice.reducer;
