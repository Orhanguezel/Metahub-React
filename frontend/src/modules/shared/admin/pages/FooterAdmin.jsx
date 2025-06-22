import React from "react";
import styled from "styled-components";
import { useAppSelector } from "@/store/hooks"; // Kendi store hook'unu kullan!
import { useTranslation } from "react-i18next";

const DEFAULT_LOGO = "/default-company-logo.png"; // public/

function resolveLogoUrl(logo) {
  if (!logo) return DEFAULT_LOGO;
  const url = logo.thumbnail || logo.url || "";
  if (!url) return DEFAULT_LOGO;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  // local path için:
  return url;
}

export default function FooterAdmin() {
  const company = useAppSelector((state) => state.company.company);
  const { t } = useTranslation("footer");

  if (!company) return null;

  const logos = Array.isArray(company.logos) ? company.logos : [];

  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          {logos.length > 0 ? (
            logos.map((logo, idx) => (
              <Logo
                key={(logo.url || "") + idx}
                src={resolveLogoUrl(logo)}
                alt={t("companyLogoAlt", "Company Logo {{n}}", { n: idx + 1 })}
              />
            ))
          ) : (
            <Logo
              src={DEFAULT_LOGO}
              alt={t("defaultLogoAlt", "Default Logo")}
            />
          )}
        </LogoSection>
        <InfoSection>
          <CompanyName>{company.companyName}</CompanyName>
          {company.email && <CompanyText>{company.email}</CompanyText>}
          {company.phone && <CompanyText>{company.phone}</CompanyText>}
          {(company.address?.street || company.address?.city) && (
            <CompanyText>
              {company.address?.street || ""}
              {company.address?.city ? `, ${company.address.city}` : ""}
            </CompanyText>
          )}
        </InfoSection>
      </FooterContent>
      <CopyRight>
        &copy; {new Date().getFullYear()} {company.companyName}.{" "}
        {t("footer.rights", "All rights reserved")}.
      </CopyRight>
    </FooterContainer>
  );
}

// Styled Components
const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacings.large}
    ${({ theme }) => theme.spacings.medium};
  text-align: center;
  transition: background-color 0.23s, color 0.18s;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const LogoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.medium};
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 18px;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.backgroundAlt || "#222"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  padding: 10px;
  transition: transform 0.18s;
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  }
`;

const InfoSection = styled.div`
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
    margin-left: 32px;
  }
`;

const CompanyName = styled.h4`
  margin: 0 0 8px 0;
  font-size: ${({ theme }) => theme.fontSizes.large || "19px"};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CompanyText = styled.p`
  margin: 4px 0;
  font-size: ${({ theme }) => theme.fontSizes.small || "14px"};
  color: ${({ theme }) => theme.colors.grey || "#A0A0A0"};
  line-height: 1.6;
`;

const CopyRight = styled.div`
  margin-top: ${({ theme }) => theme.spacings.medium};
  font-size: ${({ theme }) => theme.fontSizes.xsmall || "12px"};
  color: ${({ theme }) => theme.colors.grey || "#A0A0A0"};
  opacity: 0.66;
`;
