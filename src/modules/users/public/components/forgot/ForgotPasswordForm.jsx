import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordForm({ onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("forgotPassword");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (successMessage) {
      setEmail("");
      dispatch(clearAuthMessages());
      onNext?.({ step: "done" });
    }
    if (error) {
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch, onNext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormError(t("errors.email", "Please enter a valid email address."));
      return;
    }
    setFormError(null);
    dispatch(forgotPassword({ email }));
  };

  return (
    <PageWrapper>
      <Title>{t("title", "Forgot Password")}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder={t("placeholders.email", "E-mail address")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formError && <Error>{formError}</Error>}
        {successMessage && <Success>{successMessage}</Success>}
        {error && <Error>{error}</Error>}
        <Button type="submit" disabled={loading}>
          {loading
            ? t("loading", "Sending...")
            : t("submit", "Send Reset Link")}
        </Button>
      </form>
    </PageWrapper>
  );
}

// -------- STYLES --------
const PageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 70px auto 0 auto;
  padding: 32px 18px 28px 18px;
  background: ${({ theme }) => theme?.colors?.secondary || "#222"};
  border-radius: 14px;
  box-shadow: 0 6px 24px #0002;
  color: ${({ theme }) => theme?.colors?.text || "#fff"};
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme?.fontSizes?.xlarge || "24px"};
  font-weight: 700;
  margin-bottom: 22px;
  color: ${({ theme }) => theme?.colors?.textLight || "#f0f0f0"};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 11px 10px;
  font-size: 1rem;
  border: 1.5px solid ${({ theme }) => theme?.colors?.grey || "#A0A0A0"};
  border-radius: 7px;
  background: ${({ theme }) => theme?.colors?.background || "#191919"};
  color: ${({ theme }) => theme?.colors?.text || "#fff"};
  margin-bottom: 9px;
  margin-top: 3px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 10px;
  background: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  color: ${({ theme }) => theme?.colors?.white || "#fff"};
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.16s;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme?.colors?.secondary || "#303030"};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: #d24343;
  font-size: 0.97em;
  margin: 4px 0 2px 0;
`;

const Success = styled.div`
  color: #3bb664;
  font-size: 0.97em;
  margin: 4px 0 2px 0;
`;
