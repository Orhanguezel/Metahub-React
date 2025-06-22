import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/public/common/Navbar";
import Footer from "@/public/common/Footer";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default PublicLayout;
