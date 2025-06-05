import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { updateSocialMediaLinks } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  ErrorMessage,
} from "@/modules/users/public/styles/AccountStyles";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>{t("social.title")}</h3>

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
  );
}
