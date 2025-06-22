import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateMyProfile } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from "styled-components"; // Stil dosyasını burada tanımlayacağız

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
    <Wrapper>
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
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("form.phone")}
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("form.saving") : t("form.save")}
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
  margin-bottom: 8px;
  display: block;
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

const ErrorMessage = styled.div`
  color: #ef4444; // Sabit danger rengi
  font-size: 1rem;
  margin-top: 8px;
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
