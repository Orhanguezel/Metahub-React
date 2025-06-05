import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import { getImageSrc } from "@/shared/getImageSrc";

function resolveLogoSrc(value, themeMode) {
  if (!value) return "";

  const light = value?.light?.url || value?.light;
  const dark = value?.dark?.url || value?.dark;

  const selected = themeMode === "dark" ? dark || light : light || dark;
  return selected ? getImageSrc(selected, "setting") : "";
}

export default function Logo({ width = 80, height = 80, themeMode = "dark" }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const settings = useAppSelector((state) => state.setting.settings || []);

  const navbarLogos = settings.find((s) => s.key === "navbar_logos");
  const navbarLogoSetting = settings.find((s) => s.key === "navbar_logo_text");

  const isObj = typeof navbarLogoSetting?.value === "object";
  const title = isObj ? navbarLogoSetting?.value?.title?.[currentLang] : "RadAnOr";
  const slogan = isObj ? navbarLogoSetting?.value?.slogan?.[currentLang] : "";

  const logoSrc = resolveLogoSrc(navbarLogos?.value, themeMode);

  return (
    <LogoWrapper href="/">
      {logoSrc ? (
        <LogoImage
          src={logoSrc}
          alt={title}
          $width={width}
          $height={height}
        />
      ) : (
        <Fallback>{title}</Fallback>
      )}
      {slogan && (
        <LogoTextWrapper>
          <LogoText>{title}</LogoText>
          <LogoText2>{slogan}</LogoText2>
        </LogoTextWrapper>
      )}
    </LogoWrapper>
  );
}

const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.88;
  }
`;

const LogoImage = styled.img.attrs(({ $width, $height }) => ({
  width: $width,
  height: $height,
}))`
  display: block;
  width: ${({ $width }) => $width || 90}px;
  height: ${({ $height }) => $height || 90}px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const Fallback = styled.div`
  width: 90px;
  height: 90px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const LogoText2 = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
`;
