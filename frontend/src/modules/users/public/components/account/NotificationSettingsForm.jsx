import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateNotificationSettings } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  Title,
  Form,
  Label,
  Checkbox,
  Button,
} from "@/modules/users/public/styles/AccountStyles";
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
      <Title>{t("notifications.title")}</Title>
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
