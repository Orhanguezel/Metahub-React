import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function LoginFormStep({ onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("login");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation
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
    <StyledForm onSubmit={handleSubmit} autoComplete="off">
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
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </StyledForm>
  );
}

// --- Styles (hepsi tek dosyada, sade ve responsive) ---
const StyledForm = styled.form`
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

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 0.9em 1.8em;
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

const InputIcon = styled.div`
  color: #aaa;
  font-size: 1.1em;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: #e57373;
  font-size: 13px;
  margin-top: 4px;
`;
