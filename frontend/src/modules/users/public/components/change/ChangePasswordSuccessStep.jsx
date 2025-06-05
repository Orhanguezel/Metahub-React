// src/modules/users/public/components/change-password/ChangePasswordSuccessStep.js

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Success } from "@/modules/users/public/styles/AuthFormStyles";

export default function ChangePasswordSuccessStep({ onAuthSuccess }) {
  const { t } = useTranslation("changePassword");

  useEffect(() => {
    if (onAuthSuccess) {
      const timeout = setTimeout(onAuthSuccess, 2000);
      return () => clearTimeout(timeout);
    }
  }, [onAuthSuccess]);

  return (
    <Success>
      {t("success", "Your password has been changed successfully.")}
    </Success>
  );
}
