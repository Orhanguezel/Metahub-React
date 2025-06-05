import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAccountMessages } from "@/modules/users/slice/accountSlice";
import {
  ProfileForm,
  ProfileImageUploader,
  NotificationSettingsForm,
  SocialLinksForm,
  DeleteAccountSection,
  AddressForm,
  ChangePasswordForm,
} from "@/modules/users";
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  Title,
  Success,
  ErrorMessage,
  Section,
  SectionTitle,
} from "@/modules/users/public/styles/AccountStyles";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { profile, loading, error, successMessage } = useSelector(
    (state) => state.account
  );
  const { t } = useTranslation("account");

  useEffect(() => {
    return () => {
      dispatch(clearAccountMessages());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <Title>{t("page.title")}</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <Success $success>{successMessage}</Success>}
      {loading && <p>{t("page.loading")}</p>}

      {profile && (
        <>
          <Section>
            <SectionTitle>{t("page.profileImage")}</SectionTitle>
            <ProfileImageUploader imageUrl={profile.profileImage} />
          </Section>

          <Section>
            <SectionTitle>{t("page.personalInfo")}</SectionTitle>
            <ProfileForm profile={profile} />
          </Section>

          <Section>
            <SectionTitle>{t("page.address")}</SectionTitle>
            <AddressForm />
          </Section>

          <Section>
            <SectionTitle>{t("page.notifications")}</SectionTitle>
            <NotificationSettingsForm profile={profile} />
          </Section>

          <Section>
            <SectionTitle>{t("page.social")}</SectionTitle>
            <SocialLinksForm profile={profile} />
          </Section>

          <Section>
            <SectionTitle>{t("page.password")}</SectionTitle>
            <ChangePasswordForm />
          </Section>

          <Section>
            <SectionTitle>{t("page.deleteAccount")}</SectionTitle>
            <DeleteAccountSection profile={profile} />
          </Section>
        </>
      )}
    </Wrapper>
  );
}
