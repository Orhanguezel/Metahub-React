import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resendEmailVerification } from "@/modules/users/slice/advancedSlice";
import { toast } from "react-toastify";
import { FaEnvelopeOpenText, FaRedoAlt } from "react-icons/fa";
import styled from "styled-components";

export default function EmailVerifyStep({ email, onNext }) {
  const { t } = useTranslation("register");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await dispatch(resendEmailVerification({ email })).unwrap();
      toast.success(t("verificationEmailSent"));
    } catch (err) {
      toast.error(t("verificationEmailFailed"), err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <IconWrap>
        <FaEnvelopeOpenText size={40} />
      </IconWrap>
      <Title>{t("verifyEmailTitle")}</Title>
      <Desc>
        {t("verifyEmailDesc", { email })}
        <br />
        <strong>{t("spamCheck")}</strong>
      </Desc>
      <ButtonGroup>
        <ActionButton type="button" onClick={handleResend} disabled={loading}>
          <FaRedoAlt style={{ marginRight: 8 }} />
          {loading ? t("loading") : t("resendVerification")}
        </ActionButton>
        <AltButton
          type="button"
          onClick={() => onNext({ step: "otp", payload: { email } })}
        >
          {t("haveCode")}
        </AltButton>
      </ButtonGroup>
    </Wrapper>
  );
}

// ---- STILLER ----

const Wrapper = styled.div`
  width: 100%;
  max-width: 410px;
  margin: 36px auto;
  padding: 28px 22px;
  background: #242424;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0001;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const IconWrap = styled.div`
  color: #81c784;
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2.3rem;
  }
`;
const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 14px;
  color: #f0f0f0;
`;
const Desc = styled.p`
  color: #ccc;
  margin-bottom: 19px;
  font-size: 15px;
  strong {
    color: #81c784;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;
const ActionButton = styled.button`
  flex: 1 1 160px;
  padding: 12px 0;
  background: linear-gradient(90deg, #0a0a0a, #303030);
  color: #fff;
  border: none;
  border-radius: 9px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(90deg, #303030, #0a0a0a);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  svg {
    font-size: 1.08em;
  }
`;
const AltButton = styled.button`
  flex: 1 1 130px;
  padding: 12px 0;
  background: #212121;
  color: #81c784;
  border: 1.5px solid #81c784;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 3px;
  transition: background 0.15s, color 0.14s, border 0.15s;
  &:hover,
  &:focus {
    background: #263238;
    color: #fff;
    border-color: #64b5f6;
  }
`;
