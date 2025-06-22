import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { updateSocialMediaLinks } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from "styled-components"; // Stil dosyasını burada tanımlayacağız

// url kontrolü için basit regex (zod/yup olmadan)
const isValidUrl = (val) =>
  !val || /^https?:\/\/(?:www\.)?[\w-]+(\.[\w-]+)+[^\s]*$/i.test(val);

export default function SocialLinksForm({ profile }) {
  const { t } = useTranslation("account");
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setError,
  } = useForm({
    defaultValues: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
  });

  useEffect(() => {
    if (profile?.socialMedia) {
      reset({
        instagram: profile.socialMedia.instagram || "",
        facebook: profile.socialMedia.facebook || "",
        twitter: profile.socialMedia.twitter || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    // Basit validasyon
    if (!isValidUrl(data.instagram)) {
      setError("instagram", { message: t("social.errors.instagramInvalid") });
      return;
    }
    if (!isValidUrl(data.facebook)) {
      setError("facebook", { message: t("social.errors.facebookInvalid") });
      return;
    }
    if (!isValidUrl(data.twitter)) {
      setError("twitter", { message: t("social.errors.twitterInvalid") });
      return;
    }

    try {
      await dispatch(
        updateSocialMediaLinks({
          instagram: data.instagram || undefined,
          facebook: data.facebook || undefined,
          twitter: data.twitter || undefined,
        })
      ).unwrap();
      toast.success(t("social.success"));
    } catch (err) {
      toast.error(err?.message || t("social.error"));
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            {...register("instagram")}
            placeholder="https://instagram.com/yourprofile"
            autoComplete="off"
          />
          {errors.instagram && (
            <ErrorMessage>{errors.instagram.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            {...register("facebook")}
            placeholder="https://facebook.com/yourprofile"
            autoComplete="off"
          />
          {errors.facebook && (
            <ErrorMessage>{errors.facebook.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="twitter">X / Twitter</Label>
          <Input
            id="twitter"
            {...register("twitter")}
            placeholder="https://twitter.com/yourprofile"
            autoComplete="off"
          />
          {errors.twitter && (
            <ErrorMessage>{errors.twitter.message}</ErrorMessage>
          )}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("social.saving") : t("social.save")}
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

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 16px;
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
