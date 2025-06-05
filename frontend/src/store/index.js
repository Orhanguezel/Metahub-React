// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";

// Bike module
import bikeReducer from "@/modules/bikes/slices/bikeSlice";

// User modules (slices)
import accountReducer from "@/modules/users/slice/accountSlice";
import addressReducer from "@/modules/users/slice/addressSlice";
import advancedReducer from "@/modules/users/slice/advancedSlice";
import authReducer from "@/modules/users/slice/authSlice";
import userCrudReducer from "@/modules/users/slice/userCrudSlice";
import userStatusReducer from "@/modules/users/slice/userStatusSlice";
import adminModuleReducer from "@/modules/adminmodules/slice/adminModuleSlice";
import settingReducer from "@/modules/settings/slice/settingSlice";
import companyReducer from "@/modules/company/slice/companySlice";

export const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    account: accountReducer,
    address: addressReducer,
    advanced: advancedReducer,
    auth: authReducer,
    userCrud: userCrudReducer,
    userStatus: userStatusReducer,
    adminModule: adminModuleReducer,
    setting: settingReducer,
    company: companyReducer,
  },
  devTools: true,
});
