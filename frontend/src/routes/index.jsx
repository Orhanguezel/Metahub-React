// src/routes/index.jsx
import React from "react";
import publicRoutes from "./public.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";

export const buildRoutes = () => (
  <>
    {publicRoutes()}
    {adminRoutes()}
    {userRoutes()}
  </>
);
