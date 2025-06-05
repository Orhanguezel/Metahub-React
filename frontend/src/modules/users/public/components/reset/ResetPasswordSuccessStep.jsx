import React, { useEffect } from "react";
import { Success } from "@/modules/users/public/styles/AuthFormStyles";
import { useTranslation } from "react-i18next";

export default function ResetPasswordSuccessStep({ onAuthSuccess }) {
  const { t } = useTranslation("resetPassword");

  useEffect(() => {
    if (onAuthSuccess) {
      const timer = setTimeout(() => onAuthSuccess(), 2000);
      return () => clearTimeout(timer);
    }
  }, [onAuthSuccess]);

  return (
    <Success>
      {t(
        "success",
        "Your password has been reset successfully. You can now log in."
      )}
    </Success>
  );
}
