// src/pages/ShippingReturnsPage.jsx
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ShippingReturnsPage = () => {
  const { t } = useTranslation("return");

  return (
    <PageWrapper>
      <MainContent>
        <Title>{t("title", "Shipping & Returns")}</Title>

        <ContentSection>
          <h2>{t("shippingPolicyTitle", "Shipping Policy")}</h2>
          <p>{t("shippingPolicy1")}</p>
          <ul>
            <li>
              <strong>{t("shippingPolicy2").split(":")[0]}:</strong>{" "}
              {t("shippingPolicy2").split(":").slice(1).join(":").trim()}
            </li>
            <li>
              <strong>{t("shippingPolicy3").split(":")[0]}:</strong>{" "}
              {t("shippingPolicy3").split(":").slice(1).join(":").trim()}
            </li>
            <li>
              <strong>{t("shippingPolicy4").split(":")[0]}:</strong>{" "}
              {t("shippingPolicy4").split(":").slice(1).join(":").trim()}
            </li>
          </ul>
        </ContentSection>

        <ContentSection>
          <h2>{t("returnPolicyTitle", "Return Policy")}</h2>
          <p>{t("returnPolicy1")}</p>
          <ul>
            <li>
              <strong>{t("returnPolicy2").split(":")[0]}:</strong>{" "}
              {t("returnPolicy2").split(":").slice(1).join(":").trim()}
            </li>
            <li>
              <strong>{t("returnPolicy3").split(":")[0]}:</strong>{" "}
              {t("returnPolicy3").split(":").slice(1).join(":").trim()}
            </li>
            <li>
              <strong>{t("returnPolicy4").split(":")[0]}:</strong>{" "}
              {t("returnPolicy4").split(":").slice(1).join(":").trim()}
            </li>
          </ul>
        </ContentSection>
      </MainContent>
    </PageWrapper>
  );
};

export default ShippingReturnsPage;

// --- Styled Components (değişmedi) ---
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
  margin-bottom: 3rem;
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  p,
  li {
    line-height: 1.7;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.darkGrey || "#333"};
  }
  ul {
    padding-left: 20px;
  }
`;
