// src/modules/users/public/components/register/EmailVerifyStep.js

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resendEmailVerification } from "@/modules/users/slice/advancedSlice";
import { toast } from "react-toastify";
import {
  Wrapper,
  IconWrap,
  Title,
  Desc,
  ButtonGroup,
  ActionButton,
  AltButton,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaEnvelopeOpenText, FaRedoAlt } from "react-icons/fa";

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
