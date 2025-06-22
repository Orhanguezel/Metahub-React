import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

export default function RegisterSuccessStep({
  onAuthSuccess,
  autoRedirect = false,
  redirectDelayMs = 3000,
}) {
  const { t } = useTranslation("register");
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        else navigate("/login");
      }, redirectDelayMs);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, onAuthSuccess, redirectDelayMs, navigate]);

  const handleClick = () => {
    if (onAuthSuccess) onAuthSuccess();
    else navigate("/login");
  };

  return (
    <Wrapper>
      <IconWrap>
        <FaCheckCircle size={52} />
      </IconWrap>
      <Title>{t("successTitle", "Registration Complete!")}</Title>
      <Desc>
        {t(
          "successDesc",
          "Your account has been created and verified. You can now log in."
        )}
      </Desc>
      <Button type="button" onClick={handleClick}>
        {t("goToLogin", "Go to Login")}
      </Button>
      {autoRedirect && (
        <RedirectMsg>
          {t(
            "redirectingToLogin",
            "Redirecting you to the login page shortly..."
          )}
        </RedirectMsg>
      )}
    </Wrapper>
  );
}

// ---- Styles ----

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 120px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const IconWrap = styled.div`
  color: #4caf50;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary || "#333"};
  margin-bottom: 0.8rem;
`;

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 1.5em;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 1em 2.5em;
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

const RedirectMsg = styled.div`
  margin-top: 1em;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;
