import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { 
  FooterLogo, 
  FooterSocialLinks, 
  FooterCopyright, 
  FooterLinks, 
  FooterCompanyInfo 
} from "@/modules/shared";
import Loading from "@/shared/Loading"; 

function getLocalizedValue(value, currentLang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLang]?.trim() || value.tr?.trim() || "";
  }
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

function extractLinks(raw, currentLang) {
  if (!raw || typeof raw !== "object") return [];
  return Object.entries(raw).map(([key, val]) => ({
    label: val?.label?.[currentLang]?.trim() || val?.label?.tr?.trim() || key,
    href: val?.url?.trim() || "#",
  }));
}

export default function FooterPublic({ showCounter = false, currentSlide = 0, totalSlides = 0 }) {
  const rawSettings = useAppSelector((state) => state.setting.settings);
  const settings = useMemo(() => rawSettings ?? [], [rawSettings]);
  const { i18n, t } = useTranslation("footer");
  const currentLang = i18n.language || "en";
  const footerRef = useRef(null);

  const settingMap = useMemo(() => {
    const map = {};
    for (const s of settings) map[s.key] = s.value;
    return map;
  }, [settings]);

  const aboutLinks = extractLinks(settingMap.footer_about_links, currentLang);
  const servicesLinks = extractLinks(settingMap.footer_services_links, currentLang);

  const socialLinksRaw = settingMap.footer_social_links;
  const socialLinks = socialLinksRaw
    ? Object.keys(socialLinksRaw).reduce((acc, key) => {
        const val = socialLinksRaw[key];
        if (val?.url) acc[key.trim().toLowerCase()] = val.url;
        return acc;
      }, {})
    : undefined;

  const rightsText = getLocalizedValue(settingMap.footer_rights, currentLang);

  if (!Array.isArray(settings) || settings.length === 0) {
  return (
    <FooterWrapper ref={footerRef}>
      <Loading />
    </FooterWrapper>
  );
}


  return (
    <FooterWrapper ref={footerRef}>
      <FooterLogo />
      <FooterGrid>
        <InfoBlock>
          <FooterCompanyInfo />
        </InfoBlock>
        <InfoBlock>
          <FooterLinks title={t("aboutUs")} links={aboutLinks} />
        </InfoBlock>
        <InfoBlock>
          <FooterLinks title={t("ourServices")} links={servicesLinks} />
        </InfoBlock>
      </FooterGrid>
      {socialLinks && Object.keys(socialLinks).length > 0 && <FooterSocialLinks links={socialLinks} />}
      <FooterCopyright rightsText={rightsText} />
      {showCounter && currentSlide > 0 && totalSlides > 0 && (
        <SliderCounter>
          <span>{currentSlide}</span>
          <span className="divider">/</span>
          <span>{totalSlides}</span>
        </SliderCounter>
      )}
    </FooterWrapper>
  );
}

// Styled Components
const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.footerBackground || theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  border-top: ${({ theme }) => theme.borders.thin} solid ${({ theme }) => theme.colors.border || theme.colors.textMuted};
  text-align: center;
  width: 100%;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: ${({ theme }) => theme.spacing.lg} auto 0 auto;
  align-items: flex-start;

  ${({ theme }) => theme.media.small} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 ${({ theme }) => theme.spacing.md};
`;

const SliderCounter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
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
