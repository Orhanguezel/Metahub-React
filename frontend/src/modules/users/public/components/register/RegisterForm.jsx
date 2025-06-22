import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import styled from "styled-components";

// Sade PwStrengthBar componenti (isteğe bağlı)
function PwStrengthBar({ score = 0 }) {
  const colors = ["#e57373", "#ffb74d", "#fff176", "#64b5f6", "#81c784"];
  return (
    <PwBar>
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} $active={i <= score} $color={colors[i]} />
      ))}
    </PwBar>
  );
}

export default function RegisterForm({ onSwitch, onAuthSuccess }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("register");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength score (0-4)
  const pwScore = form.password ? zxcvbn(form.password).score : 0;

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      if (onSwitch) {
        onSwitch({ step: "verifyEmail", payload: { email: form.email } });
      } else if (onAuthSuccess) {
        onAuthSuccess();
      }
    }
  }, [successMessage, dispatch, onAuthSuccess, onSwitch, form.email]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error) || t("errors.error")
      );
      dispatch(clearAuthMessages());
    }
  }, [error, dispatch, t]);

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
    try {
      // recaptcha varsa ekleyebilirsin, sade hali için kaldırıldı
      const payload = {
        name: form.username,
        email: form.email,
        password: form.password,
      };
      await dispatch(registerUser(payload)).unwrap();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          (typeof err === "string" ? err : JSON.stringify(err)) ||
          t("errors.error")
      );
    }
  };

  // Klasik navigationlar (isteğe bağlı sade tutuldu)
  const goToLogin = (e) => {
    e.preventDefault();
    if (onSwitch) onSwitch({ step: "login" });
    else window.location.href = "/login";
  };
  const goToTerms = (e) => {
    e.preventDefault();
    window.open("/terms", "_blank");
  };
  const goToPrivacy = (e) => {
    e.preventDefault();
    window.open("/privacy", "_blank");
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {/* Username */}
      <FormGroup>
        <Label htmlFor="username">{t("username")}</Label>
        <InputWrapper $hasError={!!errors.username}>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={t("placeholders.username")}
            autoFocus
            disabled={loading}
          />
        </InputWrapper>
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      </FormGroup>

      {/* Email */}
      <FormGroup>
        <Label htmlFor="email">{t("email")}</Label>
        <InputWrapper $hasError={!!errors.email}>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("placeholders.email")}
            autoComplete="email"
            disabled={loading}
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
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t("placeholders.password")}
            autoComplete="new-password"
            disabled={loading}
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
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder={t("placeholders.confirmPassword")}
            autoComplete="new-password"
            disabled={loading}
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
        {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
      </FormGroup>

      {/* Terms */}
      <Terms>
        {t("agree")}{" "}
        <a href="/terms" onClick={goToTerms}>
          {t("terms")}
        </a>{" "}
        {t("and")}{" "}
        <a href="/privacy" onClick={goToPrivacy}>
          {t("privacy")}
        </a>
        .
      </Terms>

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>

      {/* Alt Action */}
      <AltAction>
        <p>
          {t("haveAccount")}{" "}
          <a href="/login" onClick={goToLogin}>
            {t("loginNow")}
          </a>
        </p>
      </AltAction>
    </Form>
  );
}

// --- Stiller burada sade tutuldu ---

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 900px) {
    padding: 16px;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 16px;
  position: relative;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 15px;
  color: #e0e0e0;
  margin-bottom: 3px;
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.58em 1em;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#e57373" : "#666")};
  background: #282828;
  border-radius: 7px;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  &:focus {
    border-color: #00fff7;
    outline: none;
  }
`;

const InputIcon = styled.div`
  color: #aaa;
  font-size: 1.1em;
  display: flex;
  align-items: center;
`;
const TogglePassword = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  font-size: 1.15em;
  display: flex;
  align-items: center;
  padding: 0 0.3em;
`;
const Error = styled.div`
  color: #d24343;
  font-size: 0.96em;
  margin: 2px 0 2px 0;
`;
const PwBar = styled.div`
  display: flex;
  gap: 4px;
  margin: 6px 0 0 0;
`;
const Bar = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: ${({ $active, $color }) => ($active ? $color : "#393939")};
  transition: background 0.23s;
`;
const Terms = styled.div`
  text-align: center;
  margin-top: 18px;
  font-size: 1rem;
  color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  a {
    color: ${({ theme }) => theme?.colors?.link || "#00FFF7"};
    font-weight: 600;
    text-decoration: underline;
    margin-left: 2px;
  }
`;
const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 1.9em 1.8em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  align-self: center;
  width: auto;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.8em 1.6em;
  }
`;

const AltAction = styled.div`
  text-align: center;
  margin-top: 22px;
  font-size: 14px;
  color: #aaa;
`;
