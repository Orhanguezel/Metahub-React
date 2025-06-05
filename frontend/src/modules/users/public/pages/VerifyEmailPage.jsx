import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyEmail } from "@/modules/users/slice/advancedSlice";
import {
  Wrapper,
  Title,
  Info,
  Success,
  ErrorMessage,
} from "@/modules/users/public/styles/AuthFormStyles";
import { useTranslation } from "react-i18next";

export default function VerifyEmailPage() {
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const { t } = useTranslation("register");
  const { loading, successMessage, error } = useAppSelector(
    (state) => state.auth
  );
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token))
        .unwrap()
        .then(() => setVerified(true))
        .catch(() => setVerified(false));
    }
  }, [token, dispatch]);

  return (
    <Wrapper>
      <Title>{t("verifyEmail.title", "Email Verification")}</Title>
      {loading && (
        <Info>{t("verifyEmail.verifying", "Verifying your email...")}</Info>
      )}
      {!loading && verified === true && (
        <Success>
          {successMessage ||
            t(
              "verifyEmail.success",
              "Email verified successfully. You can now log in."
            )}
        </Success>
      )}
      {!loading && verified === false && (
        <ErrorMessage>
          {error ||
            t(
              "verifyEmail.error",
              "Verification failed or the link has expired. Please request a new verification email."
            )}
        </ErrorMessage>
      )}
    </Wrapper>
  );
}
