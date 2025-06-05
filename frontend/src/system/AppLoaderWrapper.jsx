// src/system/AppLoaderWrapper.jsx
import React, { useEffect, useState } from "react";
import { useGsap } from "@/contexts/GsapContext";
import { useDispatch } from "react-redux";
import { fetchSettings } from "@/modules/settings/slice/settingSlice";
import { fetchCompanyInfo } from "@/modules/company/slice/companySlice";
import LoaderOverlay from "@/modules/home/public/components/LoaderOverlay";

const AppLoaderWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const gsap = useGsap();
  const [ready, setReady] = useState(
    typeof window !== "undefined" &&
    sessionStorage.getItem("loaderAnimationComplete") === "true"
  );

  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  const handleLoaderLoaded = () => {
    sessionStorage.setItem("loaderAnimationComplete", "true");
    setReady(true);
  };

  if (!ready && gsap) {
    return <LoaderOverlay onLoaded={handleLoaderLoaded} />;
  }

  return <>{children}</>;
};



export default AppLoaderWrapper;
