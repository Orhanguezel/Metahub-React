// src/modules/users/public/components/login/LoginFormStep.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormGroup,
  InputWrapper,
  Input,
  SubmitButton,
  TogglePassword,
  InputIcon,
  Label,
  ErrorMessage,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LoginFormStep({ onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("login");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- Validation ---
  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = t("errors.email");
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = t("errors.emailInvalid");
    if (!form.password) errs.password = t("errors.password");
    else if (form.password.length < 8)
      errs.password = t("errors.passwordLength");
    return errs;
  };

  // --- Handlers ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(loginUser(form)).unwrap();
      if (res?.mfaRequired || res?.needOtp) {
        onNext({ step: "otp", payload: { email: form.email } });
      } else {
        onNext({ step: "done" });
      }
    } catch (err) {
      toast.error(err?.message || t("errors.default"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {/* Email */}
      <FormGroup>
        <Label htmlFor="email">{t("email")}</Label>
        <InputWrapper $hasError={!!errors.email}>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("placeholders.email")}
            disabled={loading}
            autoComplete="email"
          />
        </InputWrapper>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      {/* Password */}
      <FormGroup>
        <Label htmlFor="password">{t("password")}</Label>
        <InputWrapper $hasError={!!errors.password}>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder={t("placeholders.password")}
            disabled={loading}
            autoComplete="current-password"
          />
          <TogglePassword
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormGroup>

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </Form>
  );
}
