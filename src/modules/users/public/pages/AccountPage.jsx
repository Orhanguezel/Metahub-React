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
import styled from "styled-components";

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

// Başlık
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin.top: 220px;
  text-align: center;
  color: #333; // Sabit başlık rengi
`;

export const Success = styled.div`
  background-color: #10b981;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 1rem;
  margin-top: 8px;
`;

export const Section = styled.section`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 2rem 4rem;
  color: ${({ theme }) => theme.colors.black || "#0a0a0a"};
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  padding-bottom: 1rem;
`;
