import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthMessages } from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const [success, setSuccess] = useState("");
  const [fail, setFail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (profile) {
      if (profile.role?.toLowerCase() === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/account", { replace: true });
      }
    }
  }, [profile, navigate]);

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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setFail("");
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
        setSuccess(t("otpRequired", "Please enter your security code"));
        return;
      }
      setSuccess(t("success", "Successfully logged in!"));
      if (onAuthSuccess) onAuthSuccess();
      else onNext && onNext({ step: "done" });
    } catch (err) {
      setFail(err?.message || t("errors.default"));
    } finally {
      setLoading(false);
      dispatch(clearAuthMessages());
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onNext && onNext({ step: "forgotPassword" });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">{t("email")}</label>
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
        {errors.email && <Error>{errors.email}</Error>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">{t("password")}</label>
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
        <ToggleBtn
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? t("hidePassword") : t("showPassword")}
        >
          {showPassword ? "🙈" : "👁"}
        </ToggleBtn>
        {errors.password && <Error>{errors.password}</Error>}
      </FormGroup>

      <Options>
        <Remember>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">{t("remember")}</label>
        </Remember>
        <a href="/forgot-password" onClick={handleForgotPassword}>
          {t("forgotPassword")}
        </a>
      </Options>

      {fail && <Error>{fail}</Error>}
      {success && <Success>{success}</Success>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>

      <Alt>
        {t("noAccount")}{" "}
        <a href="/register" onClick={handleRegister}>
          {t("registerNow")}
        </a>
      </Alt>
    </Form>
  );
}

// --- Basit stiller ---

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

const ToggleBtn = styled.button`
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 45%;
`;

const Options = styled.div`
  display: flex;
  gap: 1.2em;
  align-items: center;
  justify-content: space-between;
  font-size: 0.98em;
  color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  margin: 0 0 15px 0;
`;

const Remember = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6em;
  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
    margin-right: 0.2em;
  }
  label {
    color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
    font-size: 0.99em;
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

const Error = styled.div`
  color: #d24343;
  font-size: 0.96em;
  margin: 2px 0 2px 0;
`;

const Success = styled.div`
  color: #3bb664;
  font-size: 0.96em;
  margin: 2px 0 2px 0;
`;

const Alt = styled.div`
  text-align: center;
  margin-top: 18px;
  font-size: 1em;
  color: ${({ theme }) => theme?.colors?.primary || "#0a0a0a"};
  a {
    color: ${({ theme }) => theme?.colors?.link || "#00FFF7"};
    font-weight: 600;
    text-decoration: underline;
    margin-left: 2px;
  }
`;
