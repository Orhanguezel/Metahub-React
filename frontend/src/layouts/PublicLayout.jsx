import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/modules/shared";
import { Footer } from "@/modules/shared";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default PublicLayout;
