// src/modules/users/public/components/login/LoginSuccessStep.js

import { useTranslation } from "react-i18next";
import {
  Wrapper,
  IconWrap,
  Title,
  Desc,
  UserMail,
  Button,
  RedirectMsg,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

export default function LoginSuccessStep({
  onAuthSuccess,
  autoRedirect = true,
  redirectDelayMs = 2000,
}) {
  const { t } = useTranslation("login");
  const user = useSelector((state) => state.auth.user);

  const redirectPath = useMemo(() => {
    if (user && user.role === "admin") return "/admin";
    return "/account";
  }, [user]);

  useEffect(() => {
    if (!autoRedirect) return;
    const timer = setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        window.location.href = redirectPath;
      }
    }, redirectDelayMs);
    return () => clearTimeout(timer);
  }, [autoRedirect, onAuthSuccess, redirectDelayMs, redirectPath]);

  const handleClick = useCallback(() => {
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      window.location.href = redirectPath;
    }
  }, [onAuthSuccess, redirectPath]);

  const dashboardText =
    user && user.role === "admin"
      ? t("goToAdminDashboard", "Go to Admin Dashboard")
      : t("goToAccount", "Go to My Account");

  const redirectingMsg =
    user && user.role === "admin"
      ? t(
          "redirectingToDashboard",
          "Redirecting to the admin dashboard in a moment..."
        )
      : t(
          "redirectingToAccount",
          "Redirecting to your account page in a moment..."
        );

  return (
    <Wrapper>
      <IconWrap>
        <FaCheckCircle
          size={52}
          aria-label={t("loginSuccess", "Login successful!")}
        />
      </IconWrap>
      <Title>{t("loginSuccess", "Login successful!")}</Title>
      <Desc>
        {t("welcomeUser", {
          defaultValue: "Welcome, {{name}}!",
          name: (user && (user.name || user.email)) || "",
        })}
      </Desc>
      {user && user.email && <UserMail>{user.email}</UserMail>}
      <Button type="button" onClick={handleClick}>
        {dashboardText}
      </Button>
      {autoRedirect && <RedirectMsg>{redirectingMsg}</RedirectMsg>}
    </Wrapper>
  );
}
