import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyEmail } from "@/modules/users/slice/advancedSlice";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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
    <PageWrapper>
      <PageTitle>{t("verifyEmail.title", "Email Verification")}</PageTitle>
      {loading && (
        <PageInfo>
          {t("verifyEmail.verifying", "Verifying your email...")}
        </PageInfo>
      )}
      {!loading && verified === true && (
        <PageSuccess>
          {successMessage ||
            t(
              "verifyEmail.success",
              "Email verified successfully. You can now log in."
            )}
        </PageSuccess>
      )}
      {!loading && verified === false && (
        <PageError>
          {error ||
            t(
              "verifyEmail.error",
              "Verification failed or the link has expired. Please request a new verification email."
            )}
        </PageError>
      )}
    </PageWrapper>
  );
}

// --- Styles ---

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 120px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin.top: 220px;
  text-align: center;
  color: #333;
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.accent || "#E0E0E0"};
  font-size: ${({ theme }) => theme.fontSizes.medium || "16px"};
  margin-bottom: 10px;
`;

const PageSuccess = styled.div`
  color: ${({ theme }) => theme.colors.accent || "#49c180"};
  font-size: ${({ theme }) => theme.fontSizes.medium || "16px"};
  margin-top: 12px;
  text-align: center;
`;

const PageError = styled.div`
  color: #d24343;
  font-size: ${({ theme }) => theme.fontSizes.medium || "16px"};
  margin-top: 12px;
  text-align: center;
`;
