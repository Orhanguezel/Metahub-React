import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  FooterLogo,
  FooterCopyright,
  FooterLinks,
  FooterCompanyInfo,
} from "@/modules/shared";
import Loading from "@/shared/Loading";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <FooterWrapper>
      <FooterLogo />
      <FooterGrid>
        <InfoBlock>
          <FooterCompanyInfo />
        </InfoBlock>
        <InfoBlock>
          <FooterLinks title={t("aboutUs")} />
        </InfoBlock>
        <InfoBlock>
          <FooterLinks title={t("ourServices")} />
        </InfoBlock>
      </FooterGrid>

      <FooterCopyright />
    </FooterWrapper>
  );
}

// Styled Components
const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacings.xl}
    ${({ theme }) => theme.spacings.md};
  background-color: ${({ theme }) =>
    theme.colors.footerBackground || theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  border-top: ${({ theme }) => theme.borders.thin} solid
    ${({ theme }) => theme.colors.border || theme.colors.textMuted};
  text-align: center;
  width: 100%;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacings.xl};
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: ${({ theme }) => theme.spacings.lg} auto 0 auto;
  align-items: flex-start;

  ${({ theme }) => theme.media.small} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacings.md};
    margin-top: ${({ theme }) => theme.spacings.md};
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 ${({ theme }) => theme.spacings.md};
`;

const SliderCounter = styled.div`
  margin-top: ${({ theme }) => theme.spacings.md};
  font-size: ${({ theme }) => theme.fontSizes.small || "14px"};
  color: ${({ theme }) => theme.colors.textSecondary || theme.colors.textMuted};
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.3em;

  .divider {
    opacity: 0.4;
  }
`;
