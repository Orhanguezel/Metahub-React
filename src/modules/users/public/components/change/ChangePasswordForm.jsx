import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  clearAuthMessages,
} from "@/modules/users/slice/authSlice";
import { useTranslation } from "react-i18next";

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSubmitted(true);
      dispatch(clearAuthMessages());
      if (onNext) onNext({ step: "done" });
      if (onSwitch) onSwitch({ step: "done" });
      if (onAuthSuccess) onAuthSuccess();
    }
    if (error) {
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch, onNext, onSwitch, onAuthSuccess]);

  const validate = () => {
    const errs = {};
    if (!form.currentPassword)
      errs.currentPassword = t(
        "errors.currentRequired",
        "Please enter your current password."
      );
    if (!form.newPassword || form.newPassword.length < 8)
      errs.newPassword = t(
        "errors.newLength",
        "Password must be at least 8 characters."
      );
    if (form.newPassword !== form.confirmPassword)
      errs.confirmPassword = t(
        "errors.confirmMismatch",
        "Passwords do not match."
      );
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await dispatch(
      changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    );
    // Success/Fail handled by useEffect
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          type="password"
          name="currentPassword"
          placeholder={t("placeholders.current", "Current password")}
          value={form.currentPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="current-password"
        />
        {errors.currentPassword && <Error>{errors.currentPassword}</Error>}

        <Input
          type="password"
          name="newPassword"
          placeholder={t("placeholders.new", "New password")}
          value={form.newPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="new-password"
        />
        {errors.newPassword && <Error>{errors.newPassword}</Error>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t("placeholders.confirm", "Confirm new password")}
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          autoComplete="new-password"
        />
        {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}

        {error && <Error>{error}</Error>}
        {successMessage && submitted && <Success>{successMessage}</Success>}

        <Button type="submit" disabled={loading}>
          {loading ? t("loading", "Saving...") : t("submit", "Change Password")}
        </Button>
      </Form>
    </Wrapper>
  );
}

// ------- STYLES -------
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin.top: 220px;
  text-align: center;
  color: #333; // Sabit başlık rengi
`;

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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd; // Sabit border rengi
  border-radius: 8px;
  font-size: 1rem;
  color: #333; // Sabit text rengi
  background-color: #f9f9f9; // Sabit input background rengi
  &:focus {
    border-color: #00fff7; // Sabit primary color
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
  margin: 2px 0 2px 0;
`;

const Success = styled.div`
  color: #3bb664;
  font-size: 0.97em;
  margin: 2px 0 2px 0;
`;
