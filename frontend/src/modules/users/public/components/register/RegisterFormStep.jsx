import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { useRecaptcha } from "@/hooks/useRecaptcha";
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
  Terms,
  
  TooltipText,
} from "@/modules/users/public/styles/AuthFormStyles";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PwStrengthBar, RegisterInfoTooltip } from "@/modules/users";

export default function RegisterFormStep({ onNext }) {
  const { t } = useTranslation("register");
  const dispatch = useDispatch();
  const recaptcha = useRecaptcha();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = t("errors.username");
    if (!form.email.trim()) errs.email = t("errors.email");
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = t("errors.emailInvalid");
    if (!form.password) errs.password = t("errors.password");
    else if (form.password.length < 8)
      errs.password = t("errors.passwordLength");
    else if (zxcvbn(form.password).score < 2)
      errs.password = t("errors.weakPassword");
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = t("errors.confirmPassword");
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
    setLoading(true);
    try {
      const recaptchaToken = await recaptcha("register");
      if (!recaptchaToken) {
        toast.error(
          t("errors.recaptchaFailed", "reCAPTCHA validation failed.")
        );
        setLoading(false);
        return;
      }
      await dispatch(
        registerUser({
          name: form.username,
          email: form.email,
          password: form.password,
          recaptchaToken,
        })
      ).unwrap();
      // Progress to next step (e.g. email verification)
      onNext({ step: "verifyEmail", payload: { email: form.email } });
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.message || err?.response?.data?.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  const pwScore = zxcvbn(form.password).score;

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {/* Username */}
      <FormGroup>
        <Label htmlFor="username">{t("username")}</Label>
        <RegisterInfoTooltip
          text={
            <>
              <TooltipText>
                {t("info.usernameInfo", "Enter your real name or nickname.")}
              </TooltipText>
            </>
          }
        />
        <InputWrapper $hasError={!!errors.username}>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={t("placeholders.username")}
            disabled={loading}
            autoFocus
          />
        </InputWrapper>
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      </FormGroup>

      {/* Email */}
      <FormGroup>
        <Label htmlFor="email">{t("email")}</Label>
        <RegisterInfoTooltip
          text={t("info.emailInfo", "Enter a valid email address.")}
        />
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
            autoComplete="new-password"
          />
          <TogglePassword
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        <PwStrengthBar score={pwScore} />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormGroup>

      {/* Confirm Password */}
      <FormGroup>
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <InputWrapper $hasError={!!errors.confirmPassword}>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder={t("placeholders.confirmPassword")}
            disabled={loading}
            autoComplete="new-password"
          />
          <TogglePassword
            type="button"
            tabIndex={-1}
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? t("hidePassword") : t("showPassword")}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </FormGroup>

      {/* Terms */}
      <Terms>
        {t("agree")} <Link to="/terms">{t("terms")}</Link> {t("and")}{" "}
        <Link to="/privacy">{t("privacy")}</Link>.
      </Terms>

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </Form>
  );
}
