import React from "react";
import styled from "styled-components";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";

export default function FooterCopyright({ rightsText, companyName = "" }) {
  const settings =
    useAppSelector((state) => (state.setting ? state.setting.settings : [])) ||
    [];
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "tr";

  const getLocalizedValue = (value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLang] || value.tr || "";
    }
    if (typeof value === "string") {
      return value;
    }
    return "";
  };

  const dynamicCompanyRaw = settings.find(
    (s) => s.key === "footer_company_name"
  )?.value;
  const dynamicRightsRaw = settings.find(
    (s) => s.key === "footer_rights_text"
  )?.value;

  const finalCompanyName = getLocalizedValue(dynamicCompanyRaw) || companyName;
  const finalRightsText =
    getLocalizedValue(dynamicRightsRaw) || rightsText || "";

  return (
    <Copyright>
      <span>
        &copy; {new Date().getFullYear()} <strong>{finalCompanyName}</strong>
        {finalRightsText && <>. {finalRightsText}</>}
      </span>
    </Copyright>
  );
}

const Copyright = styled.div`
  margin-top: ${({ theme }) => theme.spacings.lg};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  text-align: center;
  opacity: 0.88;
  letter-spacing: 0.02em;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    letter-spacing: 0.04em;
  }
`;
