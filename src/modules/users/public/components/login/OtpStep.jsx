import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "@/modules/users/slice/advancedSlice";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default function OtpStep({ email, channel = "sms", onNext }) {
  const { t } = useTranslation("login");
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await dispatch(verifyOtp({ email, code })).unwrap();
      onNext && onNext({ step: "done" });
    } catch (err) {
      setError(err?.message || t("otpFailed", "Code could not be verified."));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    try {
      await dispatch(resendOtp({ email })).unwrap();
    } catch (err) {
      setError(err?.message || t("otpResendFailed", "Code could not be sent."));
    } finally {
      setResending(false);
    }
  };

  return (
    <OtpWrapper>
      <OtpTitle>{t("otpTitle", "Security Code Verification")}</OtpTitle>
      <OtpDesc>
        {t("otpDesc", "Please enter the 6-digit code sent via {{channel}}.", {
          channel: channel === "sms" ? t("sms", "SMS") : t("email", "Email"),
        })}
      </OtpDesc>
      <OtpForm onSubmit={handleVerify} autoComplete="off">
        <OtpInput
          id="otpCode"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          autoFocus
          disabled={loading}
        />
        {error && <OtpError>{error}</OtpError>}
        <OtpButton type="submit" disabled={loading || code.length < 6}>
          {loading ? t("verifying", "Verifying...") : t("verify", "Verify")}
        </OtpButton>
        <OtpResend
          type="button"
          onClick={handleResend}
          disabled={resending || loading}
        >
          {resending
            ? t("resending", "Resending...")
            : t("resendCode", "Resend Code")}
        </OtpResend>
      </OtpForm>
    </OtpWrapper>
  );
}

// --- Minimal Still ---
const OtpWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 120px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const OtpTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary || "#333"};
  margin-bottom: 0.8rem;
`;

const OtpDesc = styled.p`
  color: ${({ theme }) => theme?.colors?.grey || "#A0A0A0"};
  font-size: 1.02rem;
  margin-bottom: 14px;
`;

const OtpForm = styled.form`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 1.5em;
  text-align: center;
`;

const OtpInput = styled.input`
  width: 100%;
  font-size: 1.17rem;
  padding: 12px 10px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme?.colors?.grey || "#A0A0A0"};
  background: ${({ theme }) => theme?.colors?.white || "#fff"};
  letter-spacing: 0.3em;
  text-align: center;
  font-weight: 700;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  }
`;

const OtpButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 1em 2.5em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  align-self: center;
  width: auto;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.8em 1.6em;
  }
`;

const OtpResend = styled.button`
  width: 100%;
  padding: 8px 0;
  margin-top: 4px;
  background: ${({ theme }) => theme?.colors?.grey || "#A0A0A0"};
  color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  border: none;
  border-radius: 7px;
  font-size: 0.98rem;
  cursor: pointer;
  opacity: 0.94;
  transition: background 0.13s, color 0.13s;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
    color: ${({ theme }) => theme?.colors?.white || "#fff"};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const OtpError = styled.div`
  color: #ff3247;
  font-size: 0.99rem;
  margin-bottom: 2px;
`;
