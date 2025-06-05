import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateMyProfile } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Form,
  Label,
  Input,
  ErrorMessage,
  Button,
} from "@/modules/users/public/styles/AccountStyles";

export default function ProfileForm({ profile }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("account");

  // Zod schema (JS, not TS)
  const profileSchema = z.object({
    name: z.string().min(1, { message: t("form.errors.name") }),
    email: z
      .string()
      .min(1, { message: t("form.errors.email") })
      .email({ message: t("form.errors.emailInvalid") }),
    phone: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateMyProfile(data)).unwrap();
      toast.success(t("form.success"));
    } catch (err) {
      toast.error(err?.message || t("form.error"));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Label htmlFor="name">{t("form.name")}</Label>
      <Input
        id="name"
        {...register("name")}
        placeholder={t("form.name")}
        autoFocus
      />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <Label htmlFor="email">{t("form.email")}</Label>
      <Input
        id="email"
        type="email"
        {...register("email")}
        placeholder={t("form.email")}
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <Label htmlFor="phone">{t("form.phone")}</Label>
      <Input id="phone" {...register("phone")} placeholder={t("form.phone")} />
      {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("form.saving") : t("form.save")}
      </Button>
    </Form>
  );
}
