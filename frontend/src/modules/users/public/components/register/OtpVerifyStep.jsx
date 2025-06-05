// src/modules/users/public/components/register/OtpVerifyStep.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "@/modules/users/slice/advancedSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Form,
  Title,
  Desc,
  Input,
  SubmitButton,
  ErrorMessage,
  Wrapper,
  IconWrap,
  ResendBox,
  ResendButton,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaShieldAlt } from "react-icons/fa";

export default function OtpVerifyStep({ email, onNext }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation("register");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    if (!code.trim() || code.length < 6) {
      setError(t("otpRequired"));
      return;
    }
    setLoading(true);
    try {
      await dispatch(verifyOtp({ email, code })).unwrap();
      toast.success(t("otpVerified"));
      onNext({ step: "done" });
    } catch {
      setError(t("otpFailed"));
      toast.error(t("otpFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await dispatch(resendOtp({ email })).unwrap();
      toast.success(t("otpResent"));
    } catch {
      toast.error(t("otpResendFailed"));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Wrapper>
      <IconWrap>
        <FaShieldAlt size={38} />
      </IconWrap>
      <Title>{t("otpTitle", "Enter the Code")}</Title>
      <Desc>{t("otpDesc", { email })}</Desc>
      <Form onSubmit={handleVerify}>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          placeholder={t("otpPlaceholder")}
          autoFocus
          inputMode="numeric"
          pattern="[0-9]*"
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={loading || !code.trim()}>
          {loading ? t("loading") : t("submit")}
        </SubmitButton>
      </Form>
      <ResendBox>
        <span>{t("otpNoCode")}</span>
        <ResendButton
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
        >
          {resendLoading ? t("loading") : t("otpResend")}
        </ResendButton>
      </ResendBox>
    </Wrapper>
  );
}
