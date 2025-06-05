// src/modules/users/public/components/login/LoginForm.js

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthMessages } from "@/modules/users/slice/authSlice";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  InputWrapper,
  Input,
  ErrorMessage,
  SubmitButton,
  AltAction,
  RememberMe,
  TogglePassword,
  Icon,
  FormOptions,
} from "@/modules/users/public/styles/AuthFormStyles";

export default function LoginForm({ onNext, onAuthSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.account.profile);
  const { t } = useTranslation("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      if (profile.role?.toLowerCase() === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/account", { replace: true });
      }
    }
  }, [profile, navigate]);

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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const result = await dispatch(
        loginUser({ email: form.email, password: form.password })
      ).unwrap();

      if (result?.needOtp || result?.mfaRequired) {
        onNext && onNext({ step: "otp", payload: { email: form.email } });
        toast.info(t("otpRequired", "Please enter your security code"));
        return;
      }

      await dispatch(fetchCurrentUser()).unwrap();
      toast.success(t("success", "Successfully logged in!"));
      if (onAuthSuccess) onAuthSuccess();
      else onNext && onNext({ step: "done" });
    } catch (err) {
      toast.error(err?.message || t("errors.default"));
    } finally {
      setLoading(false);
      dispatch(clearAuthMessages());
    }
  };

  // Manual navigation
  const handleForgotPassword = (e) => {
    e.preventDefault();
    onNext && onNext({ step: "forgotPassword" });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {/* Email */}
      <FormGroup>
        <label htmlFor="email">{t("email")}</label>
        <InputWrapper $hasError={!!errors.email}>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("placeholders.email")}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
          />
        </InputWrapper>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      {/* Password */}
      <FormGroup>
        <label htmlFor="password">{t("password")}</label>
        <InputWrapper $hasError={!!errors.password}>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("placeholders.password")}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={loading}
          />
          <TogglePassword
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormGroup>

      {/* Options */}
      <FormOptions>
        <RememberMe>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">{t("remember")}</label>
        </RememberMe>
        <a href="/forgot-password" onClick={handleForgotPassword}>
          {t("forgotPassword")}
        </a>
      </FormOptions>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>

      <AltAction>
        {t("noAccount")}{" "}
        <a href="/register" onClick={handleRegister}>
          {t("registerNow")}
        </a>
      </AltAction>
    </Form>
  );
}
