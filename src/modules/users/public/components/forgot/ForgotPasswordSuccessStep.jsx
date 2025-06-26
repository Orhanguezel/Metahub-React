// modules/users/public/components/forgot/ForgotPasswordSuccessStep.js

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Success } from "@/modules/users/public/styles/AuthFormStyles";

export default function ForgotPasswordSuccessStep({ onAuthSuccess }) {
  const { t } = useTranslation("forgotPassword");

  useEffect(() => {
    if (onAuthSuccess) {
      const timeout = setTimeout(() => onAuthSuccess(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [onAuthSuccess]);

  return (
    <Success>
      {t(
        "success",
        "Password reset link has been sent to your email. Please check your inbox."
      )}
    </Success>
  );
}
