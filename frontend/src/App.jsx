import React, { useEffect } from "react";
import { theme } from "./styles/theme.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";
import { fetchTenants } from "@/modules/tenants/slice/tenantSlice";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Pages (public, user, admin)
import HomePage from "@/modules/users/public/pages/LoginPage";
import FAQPage from "@/modules/home/public/components/FAQPage.jsx";
import ShippingReturnsPage from "@/modules/home/public/components/ShippingReturnsPage.jsx";
import PrivacyPolicyPage from "@/modules/home/public/components/PrivacyPolicyPage.jsx";
import TermsOfServicePage from "@/modules/home/public/components/TermsOfServicePage.jsx";
import LoginPage from "@/modules/users/public/pages/LoginPage";
import RegisterPage from "@/modules/users/public/pages/RegisterPage";
import ForgotPasswordPage from "@/modules/users/public/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/modules/users/public/pages/ResetPasswordPage";
import VerifyEmailPage from "@/modules/users/public/pages/VerifyEmailPage";
import {
  AllBikesPage,
  BikeCategoryPage,
  BikeDetailPage,
} from "@/modules/bikes";
import { AccountPage, ChangePasswordPage, LogoutPage } from "@/modules/users";
import CartPage from "@/modules/cart/public/CartPage";
import CheckoutPage from "@/modules/cart/public/CheckoutPage";
import { OrderDetail, OrderPage, OrderSuccessPage } from "@/modules/order";
import AdminPage from "@/modules/dashboard/admin/pages/page";
import AdminSettingsPage from "@/modules/settings/admin/pages/AdminSettingsPage";
import AdminBikePage from "@/modules/bikes/admin/pages/AdminBikePage";
import AdminOrderPage from "@/modules/order/admin/pages/AdminOrderPage";
import AdminModulePage from "@/modules/adminmodules/admin/pages/AdminModulePage";
import AdminTenantPage from "@/modules/tenants/admin/pages/AdminTenantPage";

// ✅ Merkezi tenant değişim efekti
import { useTenantChangeEffect } from "@/hooks/useTenantChangeEffect";

const App = () => {
  const dispatch = useDispatch();
  useTenantChangeEffect(); // 🔑 Tek satırla her tenant değişimini yönet

  const { profile, loading } = useSelector((state) => state.account);

  // 1. İlk açılışta user ve tenant listesi çek
  useEffect(() => {
    if (!profile && !loading) {
      dispatch(fetchCurrentUser());
    }
    dispatch(fetchTenants());
  }, [dispatch, profile, loading]);

  // 2. (İstersen) sadece tenant değiştiğinde bazı işlemler tetiklenebilir

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="all-bikes" element={<AllBikesPage />} />
          <Route path="bikescategory/:slug" element={<BikeCategoryPage />} />
          <Route path="bike/:bikeId" element={<BikeDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="verify-email/:token" element={<VerifyEmailPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsOfServicePage />} />
        </Route>

        {/* User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="setting" element={<AdminSettingsPage />} />
          <Route path="bikes" element={<AdminBikePage />} />
          <Route path="order" element={<AdminOrderPage />} />
          <Route path="modules" element={<AdminModulePage />} />
          <Route path="tenants" element={<AdminTenantPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.mode}
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "200px",
        }}
        className="custom-toast"
      />
    </BrowserRouter>
  );
};

export default App;
