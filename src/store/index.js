// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";

// Bike module
import bikeReducer from "@/modules/bikes/slices/bikeSlice";
import bikeCategoryReducer from "@/modules/bikes/slices/bikeCategorySlice";
// Cart module
import cartReducer from "@/modules/cart/slice/cartSlice";
// Order module
import orderReducer from "@/modules/order/slice/ordersSlice";

import adminModuleReducer from "@/modules/adminmodules/slices/adminModuleSlice";
import extraModulesSlice from "@/modules/adminmodules/slices/extraModulesSlice";
import settingReducer from "@/modules/settings/slice/settingSlice";
import companyReducer from "@/modules/company/slice/companySlice";
import tenantReducer from "@/modules/tenants/slice/tenantSlice";
import paymentReducer from "@/modules/payment/slice/paymentSlice";

// User modules (slices)
import authReducer from "@/modules/users/slice/authSlice";
import accountReducer from "@/modules/users/slice/accountSlice";
import addressReducer from "@/modules/users/slice/addressSlice";
import advancedReducer from "@/modules/users/slice/advancedSlice";
import userCrudReducer from "@/modules/users/slice/userCrudSlice";
import userStatusReducer from "@/modules/users/slice/userStatusSlice";


export const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    bikeCategory: bikeCategoryReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
    account: accountReducer,
    address: addressReducer,
    advanced: advancedReducer,
    userCrud: userCrudReducer,
    userStatus: userStatusReducer,
    adminModule: adminModuleReducer,
    extraModules: extraModulesSlice,
    setting: settingReducer,
    company: companyReducer,
    tenants: tenantReducer,
    payment: paymentReducer,
  },
  devTools: true,
});
