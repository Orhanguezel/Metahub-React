import { useState } from "react";
import {
  Wrapper,
  Title,
  Description,
  UserInfo,
  Input,
  Button,
} from "@/modules/users/public/styles/AccountStyles";
import { useDispatch } from "react-redux";
import { deleteUserAccount } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      <Title>{t("delete.title")}</Title>
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
    </Wrapper>
  );
}
