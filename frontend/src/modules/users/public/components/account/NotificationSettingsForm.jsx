import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateNotificationSettings } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import styled from "styled-components"; // Stilleri burada tanımlayacağız
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

// Yup schema
const schema = yup.object({
  emailNotifications: yup.boolean().required(),
  smsNotifications: yup.boolean().required(),
});

// profile prop: { notifications: { emailNotifications, smsNotifications } }
export default function NotificationSettingsForm({ profile }) {
  const { t } = useTranslation("account");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  useEffect(() => {
    if (profile?.notifications) {
      reset({
        emailNotifications: !!profile.notifications.emailNotifications,
        smsNotifications: !!profile.notifications.smsNotifications,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateNotificationSettings(data)).unwrap();
      toast.success(t("notifications.success"));
    } catch (err) {
      toast.error(err?.message || t("notifications.error"));
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          <Checkbox type="checkbox" {...register("emailNotifications")} />
          {t("notifications.email")}
        </Label>
        <Label>
          <Checkbox type="checkbox" {...register("smsNotifications")} />
          {t("notifications.sms")}
        </Label>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("notifications.saving") : t("notifications.save")}
        </Button>
      </Form>
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

const Label = styled.label`
  font-size: 1rem;
  color: #333; // Sabit text rengi
  margin-bottom: 16px;
  display: block;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  accent-color: #00fff7; // Sabit primary color
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
