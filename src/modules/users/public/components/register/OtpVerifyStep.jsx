import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "@/modules/users/slice/advancedSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaShieldAlt } from "react-icons/fa";
import styled from "styled-components";

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
      // *** LOG ***
      console.log("Verifying OTP with:", { email, code }); // <- Emaile bak!
      await dispatch(verifyOtp({ email, code })).unwrap();
      toast.success(t("otpVerified"));
      onNext({ step: "done" });
    } catch (err) {
      setError(t("otpFailed"));
      toast.error(t("otpFailed"), err);
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
          placeholder={t("otpPlaceholder", "Enter 6-digit code")}
          autoFocus
          inputMode="numeric"
          pattern="[0-9]*"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton type="submit" disabled={loading || !code.trim()}>
          {loading ? t("loading") : t("submit")}
        </SubmitButton>
      </Form>
      <ResendBox>
        <span>{t("otpNoCode", "Didn't receive a code?")}</span>
        <ResendButton
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
        >
          {resendLoading ? t("loading") : t("otpResend", "Resend Code")}
        </ResendButton>
      </ResendBox>
    </Wrapper>
  );
}

// ---- STYLES ----

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 36px auto;
  padding: 26px 18px;
  background: #222;
  border-radius: 10px;
  box-shadow: 0 4px 22px #0001;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const IconWrap = styled.div`
  color: #64b5f6;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;
const Title = styled.h2`
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 11px;
  color: #f0f0f0;
`;
const Desc = styled.p`
  color: #bbb;
  margin-bottom: 16px;
  font-size: 14px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  margin-bottom: 10px;
`;
const Input = styled.input`
  font-size: 16px;
  padding: 10px 11px;
  border-radius: 7px;
  border: 2px solid #555;
  background: #1c1c1c;
  color: #fff;
  outline: none;
  text-align: center;
  letter-spacing: 0.08em;
  &:focus {
    border-color: #64b5f6;
    background: #232323;
  }
`;
const ErrorMsg = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  margin-bottom: 2px;
  margin-top: 2px;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background: linear-gradient(90deg, #0a0a0a, #303030);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 6px;
  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(90deg, #303030, #0a0a0a);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const ResendBox = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;
const ResendButton = styled.button`
  background: none;
  color: #64b5f6;
  border: none;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin-left: 3px;
  transition: color 0.16s;
  &:hover,
  &:focus {
    color: #2196f3;
  }
`;
