import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser, clearAuthMessages } from "@/modules/users/slice/authSlice";
import { resetProfile } from "@/modules/users/slice/accountSlice";
import { clearAddresses } from "@/modules/users/slice/addressSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation("logout");
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        dispatch(resetProfile());
        dispatch(clearAddresses());
        toast.success(t("success"));
      } catch (err) {
        toast.error(err?.message || t("error"));
      } finally {
        dispatch(clearAuthMessages());
        navigate("/login");
      }
    };
    doLogout();
    // eslint-disable-next-line
  }, [dispatch, navigate, t]);

  return (
    <main style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <h1>{t("loggingOut")}</h1>
    </main>
  );
}
