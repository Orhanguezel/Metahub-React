import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAccount } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Stil dosyasını burada tanımlayacağız

export default function DeleteAccountSection({ profile }) {
  const { t } = useTranslation("account");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmation.trim().toLowerCase() !== "delete") {
      toast.error(t("delete.confirmationError"));
      return;
    }

    setLoading(true);
    try {
      await dispatch(deleteUserAccount({ password })).unwrap();
      toast.success(t("delete.success"));
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || t("delete.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Border>
        <Description>{t("delete.warning")}</Description>

        {profile?.email && (
          <UserInfo>
            {t("delete.loggedInAs")} <strong>{profile.email}</strong>
          </UserInfo>
        )}

        <Input
          type="password"
          placeholder={t("delete.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={loading}
        />

        <Input
          type="text"
          placeholder={t("delete.confirmation")}
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          disabled={loading}
        />

        <Button type="button" onClick={handleDelete} disabled={loading}>
          {loading ? t("delete.loading") : t("delete.button")}
        </Button>
      </Border>
    </Wrapper>
  );
}

// Stiller Sayfa Altında
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Border = styled.div`
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

const Description = styled.p`
  font-size: 1rem;
  color: #888; // Sabit description rengi
  text-align: center;
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;

  strong {
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  &:focus {
    border-color: #00fff7;
    outline: none;
  }

  &:disabled {
    background-color: #cccccc;
  }
`;

const Button = styled.button`
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
