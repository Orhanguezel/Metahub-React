// src/routes/user.routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import {UserLayout} from "@/layouts";
import {
  AccountPage,
  ChangePasswordPage,
  LogoutPage
 } from "@/modules/users";

const userRoutes = () => (
  <Route element={<UserLayout />}>
    <Route path="/account" element={<AccountPage />} />
    <Route path="/change-password" element={<ChangePasswordPage />} />
    <Route path="/logout" element={<LogoutPage />} />
    {/*  */}
  </Route>
);

export default userRoutes;
