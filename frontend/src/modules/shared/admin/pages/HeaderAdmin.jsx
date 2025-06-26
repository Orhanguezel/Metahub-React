import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { ThemeToggle, AvatarMenu } from "@/modules/shared";
import { FaBars } from "react-icons/fa";
import { getImageSrc } from "@/shared/getImageSrc";
import { SUPPORTED_LOCALES } from "@/i18n";

// --- Slices ---
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
} from "@/modules/adminmodules/slices/adminModuleSlice";
import { setSelectedTenant } from "@/modules/tenants/slice/tenantSlice";
import { clearBikes } from "@/modules/bikes/slices/bikeSlice";
// (gelişen modüllere göre buraya yeni slice'lar ekleyebilirsin)

function getLocaleLabel(locale) {
  return SUPPORTED_LOCALES[locale] || locale.toUpperCase();
}

/**
 * --- Tenant Switch Logic ---
 * Tüm tenant state, ayar ve slice’ları otomatik olarak reset+fetch eder!
 */
const useTenantSwitcher = () => {
  const dispatch = useAppDispatch();

  return React.useCallback(
    async (tenantId) => {
      // --- Bütün tenant bağımlı slice’ları temizle ve yeniden yükle ---
      dispatch(setSelectedTenant(tenantId));
      localStorage.setItem("selectedTenant", tenantId);

      // 1. Global ayarları temizle ve fetch et
      dispatch(clearSettings());
      dispatch(fetchSettings());

      // 2. Şirket info
      dispatch(clearCompany());
      dispatch(fetchCompanyInfo());

      // 3. Admin module meta/settings
      dispatch(clearAdminMessages());
      dispatch(clearSelectedModule());
      dispatch(fetchAdminModules(tenantId));

      // 4. Diğer slice'lar (örn: bikes)
      dispatch(clearBikes());
      // dispatch(clearBlog()); dispatch(fetchBlog()); ...
      // Yeni tenant bağlı modül geldikçe ekleyebilirsin

      // 5. Eğer UI’de başka şeyler (örn: navigasyon reset) gerekiyorsa burada yapılabilir
      // router.push("/admin") vs...
    },
    [dispatch]
  );
};

export default function HeaderAdmin({ onToggleSidebar }) {
  //const dispatch = useAppDispatch();
  const { profile: user } = useAppSelector((state) => state.account);
  const tenantList = useAppSelector((state) => state.tenants.tenants) || [];
  const selectedTenant =
    useAppSelector((state) => state.tenants.selectedTenant) || "";
  const { t, i18n } = useTranslation("header");
  const [showDropdown, setShowDropdown] = useState(false);

  const switchTenant = useTenantSwitcher();

  // --- Sadece superadmin tenant değiştirebilir! ---
  const isSuperAdmin = user?.role === "superadmin";

  useEffect(() => {
    // İlk açılışta localStorage'daki tenant geçerli ise onu seç
    const savedTenant = localStorage.getItem("selectedTenant");
    if (
      savedTenant &&
      savedTenant !== selectedTenant &&
      tenantList.some((t) => t._id === savedTenant)
    ) {
      switchTenant(savedTenant);
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
    localStorage.setItem("selectedTenant", tenantId);
    localStorage.setItem("selectedTenantOverride", tenantId);
    switchTenant(tenantId); // zinciri tetikle
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

        {/* --- Tenant Selector: SADECE SuperAdmin’e göster! --- */}
        {isSuperAdmin && (
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
        )}
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
