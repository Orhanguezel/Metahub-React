// modules/users/public/components/reset/ResetPasswordForm.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  Button,
  Title,
  ErrorMessage,
  Wrapper,
} from "@/modules/users/public/styles/AuthFormStyles";

export default function ResetPasswordForm({ token, onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("resetPassword");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      setForm({ newPassword: "", confirmPassword: "" });
      onNext({ step: "done" });
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch, onNext]);

  const validate = () => {
    const errs = {};
    if (!form.newPassword || form.newPassword.length < 8)
      errs.newPassword = t("errors.newLength");
    if (form.newPassword !== form.confirmPassword)
      errs.confirmPassword = t("errors.confirmMismatch");
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await dispatch(
        resetPassword({
          token,
          newPassword: form.newPassword,
        })
      ).unwrap();
    } catch {
      toast.error(t("errors.default"));
    }
  };

  return (
    <Wrapper>
      <Title>{t("title")}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="newPassword"
          placeholder={t("placeholders.new")}
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && (
          <ErrorMessage>{errors.newPassword}</ErrorMessage>
        )}

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t("placeholders.confirm")}
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </Button>
      </Form>
    </Wrapper>
  );
}
