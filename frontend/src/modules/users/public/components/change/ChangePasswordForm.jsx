// src/modules/users/public/components/change-password/ChangePasswordForm.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
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

export default function ChangePasswordForm({
  onNext,
  onSwitch,
  onAuthSuccess,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation("changePassword");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Sıralı destek: önce onNext, sonra onSwitch, sonra onAuthSuccess
      if (onNext) onNext({ step: "done" });
      if (onSwitch) onSwitch({ step: "done" });
      if (onAuthSuccess) onAuthSuccess();
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch, onNext, onSwitch, onAuthSuccess]);

  const validate = () => {
    const errs = {};
    if (!form.currentPassword)
      errs.currentPassword = t("errors.currentRequired");
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
        changePassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        })
      ).unwrap();
      // Success case üstteki useEffect ile handle edilir!
    } catch {
      toast.error(t("errors.default"));
    }
  };

  return (
    <Wrapper>
      <Title>{t("title")}</Title>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          type="password"
          name="currentPassword"
          placeholder={t("placeholders.current")}
          value={form.currentPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="current-password"
        />
        {errors.currentPassword && <Error>{errors.currentPassword}</Error>}

        <Input
          type="password"
          name="newPassword"
          placeholder={t("placeholders.new")}
          value={form.newPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="new-password"
        />
        {errors.newPassword && <Error>{errors.newPassword}</Error>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t("placeholders.confirm")}
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="new-password"
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
