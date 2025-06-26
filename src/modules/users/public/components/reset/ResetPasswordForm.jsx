import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";

export default function ResetPasswordForm({ token, onNext }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("resetPassword");
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (successMessage) {
      setForm({ newPassword: "", confirmPassword: "" });
      dispatch(clearAuthMessages());
      onNext?.({ step: "done" });
    }
    if (error) {
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
    await dispatch(
      resetPassword({ token, newPassword: form.newPassword })
    ).unwrap();
  };

  return (
    <PageWrapper>
      <Title>{t("title", "Set New Password")}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="newPassword"
          placeholder={t("placeholders.new", "New password")}
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && <Error>{errors.newPassword}</Error>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t("placeholders.confirm", "Confirm password")}
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}

        <Button type="submit" disabled={loading}>
          {loading ? t("loading", "Saving...") : t("submit", "Change Password")}
        </Button>
        {successMessage && <Success>{successMessage}</Success>}
        {error && <Error>{error}</Error>}
      </form>
    </PageWrapper>
  );
}

// --- Styles ---

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 120px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin.top: 220px;
  text-align: center;
  color: #333;
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

const Button = styled.button`
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

const Error = styled.div`
  color: #d24343;
  font-size: 0.97em;
  margin: 4px 0 2px 0;
`;

const Success = styled.div`
  color: #3bb664;
  font-size: 0.97em;
  margin: 4px 0 2px 0;
`;
