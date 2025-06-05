// src/modules/users/public/components/forgot-password/ForgotPasswordForm.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  Button,
  Title,
  ErrorMessage,
  Wrapper,
} from "@/modules/users/public/styles/AuthFormStyles";
import { toast } from "react-toastify";

export default function ForgotPasswordForm({ onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("forgotPassword");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      if (onNext) onNext({ step: "done" });
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch, onNext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormError(t("errors.email"));
      return;
    }
    setFormError(null);
    dispatch(forgotPassword({ email }));
  };

  return (
    <Wrapper>
      <Title>{t("title", "Forgot Password")}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder={t("placeholders.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </Button>
      </Form>
    </Wrapper>
  );
}
