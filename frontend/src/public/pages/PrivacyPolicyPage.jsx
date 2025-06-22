import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation("privacy");

  return (
    <PageWrapper>
      <MainContent>
        <Title>{t("title")}</Title>

        <ContentSection>
          <h2>{t("section1Title")}</h2>
          <p>{t("section1Text")}</p>
        </ContentSection>

        <ContentSection>
          <h2>{t("section2Title")}</h2>
          <p>{t("section2Text")}</p>
        </ContentSection>

        <ContentSection>
          <h2>{t("section3Title")}</h2>
          <p>{t("section3Text")}</p>
        </ContentSection>

        <ContentSection>
          <h2>{t("section4Title")}</h2>
          <p>{t("section4Text")}</p>
        </ContentSection>
      </MainContent>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;

// Styled Components (Aynı kalabilir)
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey || "#f0f0f0"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  color: ${({ theme }) => theme.colors.black || "#000"};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const ContentSection = styled.section`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  p {
    line-height: 1.7;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.darkGrey || "#333"};
  }
`;
