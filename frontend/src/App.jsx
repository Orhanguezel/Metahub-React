// src/App.jsx
import React, { useState } from "react";
import "@/utils/gsapSetup";
import LoaderOverlay from "@/public/home/LoaderOverlay";
import { setupGsapOnWindow } from "@/utils/gsapSetup";

import { theme } from "./styles/theme.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Public pages
import Home from "@/public/pages/Home";
import AboutPage from "@/public/pages/AboutPage";
import StoriesPage from "@/public/pages/StoriesPage";
import ContactPage from "@/public/pages/ContactPage";
import FAQPage from "@/public/pages/FAQPage";
import ShippingReturnsPage from "@/public/pages/ShippingReturnsPage";
import PrivacyPolicyPage from "@/public/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/public/pages/TermsOfServicePAge";

// Auth pages
import LoginPage from "@/modules/users/public/pages/LoginPage";
import RegisterPage from "@/modules/users/public/pages/RegisterPage";
import ForgotPasswordPage from "@/modules/users/public/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/modules/users/public/pages/ResetPasswordPage";
import VerifyEmailPage from "@/modules/users/public/pages/VerifyEmailPage";

// Bikes
import {
  AllBikesPage,
  BikeCategoryPage,
  BikeDetailPage,
} from "@/modules/bikes";

// User (account/cart/order)
import { AccountPage, ChangePasswordPage, LogoutPage } from "@/modules/users";
import CartPage from "@/modules/cart/public/CartPage";
import CheckoutPage from "@/modules/cart/public/CheckoutPage";
import { OrderDetail, OrderPage, OrderSuccessPage } from "@/modules/order";

// Admin
import AdminPage from "@/modules/dashboard/admin/pages/page"; // Dashboard
import AdminSettingsPage from "@/modules/settings/admin/pages/AdminSettingsPage";
import AdminBikePage from "@/modules/bikes/admin/pages/AdminBikePage";
import AdminModulePage from "@/modules/adminmodules/admin/pages/AdminModulePage";
import AdminTenantPage from "@/modules/tenants/admin/pages/AdminTenantPage";

setupGsapOnWindow();

const App = () => {
  const [isLoaderAnimationComplete, setIsLoaderAnimationComplete] = useState(
    sessionStorage.getItem("loaderAnimationComplete") === "true"
  );

  const handleLoaderLoaded = () => {
    sessionStorage.setItem("loaderAnimationComplete", "true");
    setIsLoaderAnimationComplete(true);
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      {!isLoaderAnimationComplete && (
        <LoaderOverlay onLoaded={handleLoaderLoaded} />
      )}

      {/* Ana Routes Ağacı */}
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route
            index
            element={<Home isAppReady={isLoaderAnimationComplete} />}
          />
          <Route
            path="all-bikes"
            element={<AllBikesPage isAppReady={isLoaderAnimationComplete} />}
          />
          <Route
            path="bikescategory/:slug"
            element={
              <BikeCategoryPage isAppReady={isLoaderAnimationComplete} />
            }
          />
          <Route
            path="bike/:bikeId"
            element={<BikeDetailPage isAppReady={isLoaderAnimationComplete} />}
          />
          <Route
            path="about"
            element={<AboutPage isAppReady={isLoaderAnimationComplete} />}
          />
          <Route
            path="login"
            element={<LoginPage isAppReady={isLoaderAnimationComplete} />}
          />
          <Route
            path="register"
            element={<RegisterPage isAppReady={isLoaderAnimationComplete} />}
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="verify-email/:token" element={<VerifyEmailPage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="contact" element={<ContactPage />} />
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
          <Route path="admin" element={<AdminModulePage />} />
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
