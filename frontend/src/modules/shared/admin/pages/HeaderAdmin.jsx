import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { ThemeToggle, AvatarMenu } from "@/modules/shared";
import { FaBars } from "react-icons/fa";
import { getImageSrc } from "@/shared/getImageSrc";
import {
  clearSettings,
  fetchSettings,
} from "@/modules/settings/slice/settingSlice";
import {
  clearCompany,
  fetchCompanyInfo,
} from "@/modules/company/slice/companySlice";
import {
  clearAdminMessages,
  clearSelectedModule,
  fetchAdminModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import { setSelectedTenant } from "@/modules/tenants/slice/tenantSlice";

import { clearBikes } from "@/modules/bikes/slices/bikeSlice";
import { SUPPORTED_LOCALES } from "@/i18n";

function getLocaleLabel(locale) {
  return SUPPORTED_LOCALES[locale] || locale.toUpperCase();
}

export default function HeaderAdmin({ onToggleSidebar }) {
  const dispatch = useAppDispatch();
  const { profile: user } = useAppSelector((state) => state.account);
  const settings = useAppSelector((state) => state.setting.settings) || [];
  // --- TENANT STATE ---
  const tenantList = useAppSelector((state) => state.tenants.tenants) || []; // redux'ta tenant listesi
  const selectedTenant =
    useAppSelector((state) => state.adminModule.selectedTenant) || "";

  const { t, i18n } = useTranslation("header");
  const apiKeySetting = settings.find((s) => s.key === "api_key");
  const hasApiKey = !!apiKeySetting?.value;
  const [showDropdown, setShowDropdown] = useState(false);

  // Tenant selector ile çalış
  useEffect(() => {
    // Eğer localStorage'da tenant seçiliyse, otomatik olarak onu seç
    const savedTenant = localStorage.getItem("selectedTenant");
    if (
      savedTenant &&
      savedTenant !== selectedTenant &&
      tenantList.some((t) => t._id === savedTenant)
    ) {
      dispatch(setSelectedTenant(savedTenant));
      dispatch(fetchSettings());
      dispatch(fetchCompanyInfo());
      dispatch(fetchAdminModules(savedTenant));
    }
    // eslint-disable-next-line
  }, [tenantList.length]);

  // Profil resmi çözümü (değişmedi)
  const resolvedProfileImage = (() => {
    if (!user?.profileImage) return "/default-avatar.png";
    if (typeof user.profileImage === "object" && user.profileImage !== null) {
      if (user.profileImage.thumbnail?.startsWith("http"))
        return user.profileImage.thumbnail;
      if (user.profileImage.url?.startsWith("http"))
        return user.profileImage.url;
      if (user.profileImage.thumbnail?.startsWith("/"))
        return getImageSrc(user.profileImage.thumbnail, "profile");
      if (user.profileImage.url?.startsWith("/"))
        return getImageSrc(user.profileImage.url, "profile");
      return "/default-avatar.png";
    }
    if (typeof user.profileImage === "string") {
      if (user.profileImage.trim() === "") return "/default-avatar.png";
      if (user.profileImage.startsWith("http")) return user.profileImage;
      return getImageSrc(user.profileImage, "profile");
    }
    return "/default-avatar.png";
  })();

  // --- Tenant değiştirici ---
  const handleTenantChange = (e) => {
    const tenantId = e.target.value;
    dispatch(setSelectedTenant(tenantId));
    localStorage.setItem("selectedTenant", tenantId);

    // Slice'ları temizle ve fetch işlemlerini yap
    dispatch(clearSettings());
    dispatch(clearCompany());
    dispatch(clearAdminMessages());
    dispatch(clearSelectedModule());
    dispatch(clearBikes());

    dispatch(fetchSettings());
    dispatch(fetchCompanyInfo());
    dispatch(fetchAdminModules(tenantId));
  };

  // --- Dil değiştirici ---
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <HeaderWrapper>
      <LeftSection>
        {onToggleSidebar && (
          <HamburgerButton onClick={onToggleSidebar}>
            <FaBars />
          </HamburgerButton>
        )}
        <Welcome>
          👋 {t("welcome", "Hoş geldiniz")},{" "}
          <strong>{user?.name || t("defaultUser", "Admin")}</strong>
        </Welcome>
        {hasApiKey && (
          <ApiKeyInfo>
            ✅ {t("apiKeyLoaded", "API Key başarıyla yüklendi.")}
          </ApiKeyInfo>
        )}
        {/* --- Dinamik Tenant Selector --- */}
        <TenantSelector>
          <label>{t("tenant", "Kiracı seç:")}</label>
          <select value={selectedTenant} onChange={handleTenantChange}>
            {tenantList.length > 0 ? (
              tenantList.map((tenant) => (
                <option key={tenant._id} value={tenant._id}>
                  {tenant.name?.[i18n.language] ||
                    tenant.name?.en ||
                    tenant.slug}
                </option>
              ))
            ) : (
              <option disabled>{t("noTenants", "Kiracı bulunamadı")}</option>
            )}
          </select>
        </TenantSelector>
      </LeftSection>

      <RightSection>
        <LangSelect
          value={i18n.language}
          onChange={handleLangChange}
          aria-label={t("selectLanguage", "Select Language")}
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {getLocaleLabel(locale)}
            </option>
          ))}
        </LangSelect>

        <ThemeToggle />
        <AvatarMenu
          isAuthenticated={!!user}
          profileImage={resolvedProfileImage}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      </RightSection>
    </HeaderWrapper>
  );
}

// ---- Styled Components (hiçbir değişiklik gerekmez) ----

const HeaderWrapper = styled.header`
  width: 100%;
  min-height: 80px;
  background: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacings.large};
  color: ${({ theme }) => theme.colors.text};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.small};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.small};
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 768px) {
    display: block;
  }
`;

const Welcome = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ApiKeyInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.accent};
`;

const LangSelect = styled.select`
  background: ${({ theme }) => theme.colors.background || "#222"};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: ${({ theme }) => theme.spacings.xsmall}
    ${({ theme }) => theme.spacings.small};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background || "#222"};
  }
`;

const TenantSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.xsmall};

  label {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  select {
    padding: ${({ theme }) => theme.spacings.xsmall};
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.small};
    background: ${({ theme }) => theme.colors.background || "#222"};
    color: ${({ theme }) => theme.colors.text};
  }
`;
