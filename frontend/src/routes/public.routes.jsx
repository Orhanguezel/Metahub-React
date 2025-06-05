// src/routes/public.routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { PublicLayout } from "@/layouts";
import Home from "@/modules/home/public/pages/HomePage";
import {
  BikeListPage,
  BikeDetailPage
} from "@/modules/bikes";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage
} from "@/modules/users";

const publicRoutes = () => (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home isAppReady={true} />} />
    <Route path="/bikes" element={<BikeListPage isAppReady={true} />} />
    <Route path="/bikes/:id" element={<BikeDetailPage isAppReady={true} />} />
    
    {/* PUBLIC AUTH ROUTES */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
  </Route>
);

export default publicRoutes;
