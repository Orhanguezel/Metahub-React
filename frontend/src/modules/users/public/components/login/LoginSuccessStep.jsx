import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Admin erişimi olan rolleri merkezi olarak tanımla
const ADMIN_ROLES = ["admin", "superadmin"];

export default function LoginSuccessStep({
  onAuthSuccess,
  autoRedirect = true,
  redirectDelayMs = 2000,
}) {
  const { t } = useTranslation("login");
  const user = useSelector((state) => state.auth.user);

  // Admin yetkisine sahip mi?
  const hasAdminAccess = user?.role && ADMIN_ROLES.includes(user.role);
  const redirectPath = hasAdminAccess ? "/admin" : "/account";

  useEffect(() => {
    if (!autoRedirect) return;
    const timer = setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess();
      else window.location.href = redirectPath;
    }, redirectDelayMs);
    return () => clearTimeout(timer);
  }, [autoRedirect, onAuthSuccess, redirectDelayMs, redirectPath]);

  return (
    <Wrapper>
      <Icon>
        <span role="img" aria-label="success">
          ✅
        </span>
      </Icon>
      <Title>{t("loginSuccess", "Login successful!")}</Title>
      <Desc>
        {t("welcomeUser", {
          defaultValue: "Welcome, {{name}}!",
          name: user?.name || user?.email || "",
        })}
      </Desc>
      {user?.email && <UserMail>{user.email}</UserMail>}
      <Button
        type="button"
        onClick={() =>
          onAuthSuccess
            ? onAuthSuccess()
            : (window.location.href = redirectPath)
        }
      >
        {hasAdminAccess
          ? t("goToAdminDashboard", "Go to Admin Dashboard")
          : t("goToAccount", "Go to My Account")}
      </Button>
      {autoRedirect && (
        <RedirectMsg>
          {hasAdminAccess
            ? t("redirectingToDashboard", "Redirecting to admin dashboard...")
            : t("redirectingToAccount", "Redirecting to your account...")}
        </RedirectMsg>
      )}
    </Wrapper>
  );
}

// Styled-components (örnek; seninkilerle aynı kullanılabilir)
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

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.2rem;
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

const UserMail = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1rem;
  margin-bottom: 1.5em;
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
