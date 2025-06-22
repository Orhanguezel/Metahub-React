import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

// Sade PwStrengthBar (isteğe bağlı)
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

export default function RegisterFormStep({ onNext }) {
  const { t } = useTranslation("register");
  const dispatch = useDispatch();

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
      await dispatch(
        registerUser({
          name: form.username,
          email: form.email,
          password: form.password,
        })
      ).unwrap();
      onNext({ step: "verifyEmail", payload: { email: form.email } });
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.message || err?.response?.data?.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  const pwScore = form.password ? zxcvbn(form.password).score : 0;

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <FormGroup>
        <Label htmlFor="username">{t("username")}</Label>
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
      <Terms>
        {t("agree")} <a href="/terms">{t("terms")}</a> {t("and")}{" "}
        <a href="/privacy">{t("privacy")}</a>.
      </Terms>
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </Form>
  );
}

// ---- STILLER ----

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
  font-size: 20px;
  color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
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
  font-size: 1.13em;
  display: flex;
  align-items: center;
  padding: 0 0.3em;
`;
const ErrorMessage = styled.div`
  color: #e57373;
  font-size: 13px;
  margin-top: 3px;
`;
const PwBar = styled.div`
  display: flex;
  gap: 4px;
  margin: 5px 0 0 0;
`;
const Bar = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: ${({ $active, $color }) => ($active ? $color : "#393939")};
  transition: background 0.23s;
`;
const Terms = styled.div`
  font-size: 13px;
  color: #bbb;
  text-align: center;
  margin: 2px 0 11px 0;
  a {
    color: #81c784;
    text-decoration: underline;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 0;
  background: linear-gradient(90deg, #0a0a0a, #303030);
  color: #fff;
  border: none;
  border-radius: 9px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-top: 7px;
  transition: background 0.15s, color 0.12s;
  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(90deg, #303030, #0a0a0a);
    color: #fff;
    transform: translateY(-2px) scale(1.012);
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
