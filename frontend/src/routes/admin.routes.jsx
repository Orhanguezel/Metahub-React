// src/routes/admin.routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import {AdminLayout} from "@/layouts";
import {BikeAdminPage} from "@/modules/bikes";
import {ModulesAdminPage} from "@/modules/adminmodules";
import {SettingsAdminPage} from "@/modules/settings";
import {CompanyAdminPage} from "@/modules/company";

const adminRoutes = () => (
  <Route path="admin" element={<AdminLayout />}>
    <Route path="bikes" element={<BikeAdminPage />} />
    <Route path="modules" element={<ModulesAdminPage />} />
    <Route path="settings" element={<SettingsAdminPage />} />
    <Route path="company"element={<CompanyAdminPage />} />
    {/* */}
  </Route>
);

export default adminRoutes;
