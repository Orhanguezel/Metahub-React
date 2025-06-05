// src/modules/users/public/components/login/OtpStep.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "@/modules/users/slice/advancedSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Form,
  Title,
  Desc,
  Label,
  Input,
  Button,
  Resend,
} from "@/modules/users/public/styles/AuthFormStyles";

// Props interface veya type tanımı yok
export default function OtpStep({ email, channel = "sms", onNext }) {
  const { t } = useTranslation("login");
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // OTP verify
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(verifyOtp({ email, code })).unwrap();
      toast.success(t("otpVerified", "Verification successful!"));
      onNext({ step: "done" });
    } catch (err) {
      toast.error(
        err?.message || t("otpFailed", "Code could not be verified.")
      );
    } finally {
      setLoading(false);
    }
  };

  // OTP resend
  const handleResend = async () => {
    setResending(true);
    try {
      await dispatch(resendOtp({ email })).unwrap();
      toast.success(t("otpResent", "Code resent!"));
    } catch (err) {
      toast.error(
        err?.message || t("otpResendFailed", "Code could not be sent.")
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <Form onSubmit={handleVerify} autoComplete="off">
      <Title>{t("otpTitle", "Security Code Verification")}</Title>
      <Desc>
        {t("otpDesc", "Please enter the 6-digit code sent via {{channel}}.", {
          channel: channel === "sms" ? t("sms", "SMS") : t("email", "Email"),
        })}
      </Desc>
      <Label htmlFor="otpCode">{t("otpLabel", "6-digit code")}</Label>
      <Input
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
        aria-label={t("otpLabel", "6-digit code")}
      />
      <Button type="submit" disabled={loading || code.length < 6}>
        {loading ? t("verifying", "Verifying...") : t("verify", "Verify")}
      </Button>
      <Resend
        type="button"
        onClick={handleResend}
        disabled={resending || loading}
      >
        {resending
          ? t("resending", "Resending...")
          : t("resendCode", "Resend Code")}
      </Resend>
    </Form>
  );
}
