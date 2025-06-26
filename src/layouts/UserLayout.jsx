import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/modules/shared";
import { Footer } from "@/modules/shared";

const UserLayout = () => (
  <>
    {/* User'a özel üst menü */}
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default UserLayout;
