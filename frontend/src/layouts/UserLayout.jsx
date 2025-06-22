import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/public/common/Navbar";
import Footer from "@/public/common/Footer";

const UserLayout = () => (
  <>
    {/* User'a özel üst menü */}
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default UserLayout;
