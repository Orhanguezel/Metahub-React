import { useTranslation } from "react-i18next";
import {
  Wrapper,
  IconWrap,
  Title,
  Desc,
  Button,
  RedirectMsg,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterSuccessStep({
  onAuthSuccess,
  autoRedirect = false,
  redirectDelayMs = 3000,
}) {
  const { t } = useTranslation("register");
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        else navigate("/login");
      }, redirectDelayMs);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, onAuthSuccess, redirectDelayMs, navigate]);

  const handleClick = () => {
    if (onAuthSuccess) onAuthSuccess();
    else navigate("/login");
  };

  return (
    <Wrapper>
      <IconWrap>
        <span aria-hidden="true">
          <FaCheckCircle size={52} />
        </span>
      </IconWrap>
      <Title>{t("successTitle", "Registration Complete!")}</Title>
      <Desc>
        {t(
          "successDesc",
          "Your account has been created and verified. You can now log in."
        )}
      </Desc>
      <Button type="button" onClick={handleClick}>
        {t("goToLogin", "Go to Login")}
      </Button>
      {autoRedirect && (
        <RedirectMsg>
          {t(
            "redirectingToLogin",
            "Redirecting you to the login page shortly..."
          )}
        </RedirectMsg>
      )}
    </Wrapper>
  );
}
