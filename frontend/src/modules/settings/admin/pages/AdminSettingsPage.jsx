import React, { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchSettings } from "@/modules/settings/slice/settingSlice";
import {
  AdminSettingsList,
  AdminSettingsForm,
  ThemeManager,
} from "@/modules/settings";
import Modal from "@/shared/Modal";
import styled from "styled-components";
import { SUPPORTED_LOCALES } from "@/i18n";

export default function AdminSettingsPage() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const { settings, loading, error } = useAppSelector((state) => state.setting);

  // -- Helper'lar üstte!
  const availableThemesSetting = settings.find(
    (s) => s.key === "available_themes"
  );
  const getAvailableThemes = useCallback(() => {
    if (Array.isArray(availableThemesSetting?.value)) {
      return availableThemesSetting.value;
    }
    if (typeof availableThemesSetting?.value === "string") {
      return availableThemesSetting.value.split(",").map((v) => v.trim());
    }
    return [];
  }, [availableThemesSetting]);

  // useMemo ile her değişimde tekrar hesaplanır
  const availableThemes = useMemo(
    () => getAvailableThemes(),
    [getAvailableThemes]
  );
  const siteTemplateSetting = settings.find((s) => s.key === "site_template");
  const selectedTheme = siteTemplateSetting?.value || "";

  const [selectedSetting, setSelectedSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Açma-Kapama
  const handleCreate = () => {
    setSelectedSetting(null);
    setIsModalOpen(true);
  };

  const handleEdit = (setting) => {
    setSelectedSetting(setting);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSetting(null);
    setIsModalOpen(false);
    setTimeout(() => dispatch(fetchSettings()), 500);
  };

  return (
    <Wrapper>
      <TopBar>
        <Title>{t("title", "Settings")}</Title>
        <AddButton onClick={handleCreate}>
          ➕ {t("addSetting", "Add Setting")}
        </AddButton>
      </TopBar>

      {/* Tema Yönetimi */}
      <ThemeManager
        availableThemes={availableThemes}
        selectedTheme={selectedTheme}
        onThemesChange={() => dispatch(fetchSettings())}
        onSelectedThemeChange={() => dispatch(fetchSettings())}
      />

      {loading && <EmptyMessage>{t("loading", "Loading...")}</EmptyMessage>}
      {error && <EmptyMessage style={{ color: "red" }}>{error}</EmptyMessage>}

      {!Array.isArray(settings) || settings.length === 0 ? (
        <EmptyMessage>{t("noSettings", "No settings found.")}</EmptyMessage>
      ) : (
        <AdminSettingsList
          settings={settings}
          onEdit={handleEdit}
          supportedLocales={SUPPORTED_LOCALES}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AdminSettingsForm
          editingSetting={selectedSetting}
          availableThemes={availableThemes}
          onAvailableThemesUpdate={() => dispatch(fetchSettings())}
          onSave={handleCloseModal}
          supportedLocales={SUPPORTED_LOCALES}
        />
      </Modal>
    </Wrapper>
  );
}

// --- Styled Components ---
const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacings.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.lg};
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;

  ${({ theme }) => theme.media.small} {
    padding: ${({ theme }) => theme.spacings.sm};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.media.small} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings.sm};

  ${({ theme }) => theme.media.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AddButton = styled.button`
  padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.md}`};
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }

  ${({ theme }) => theme.media.small} {
    width: 100%;
    text-align: center;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacings.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};

  ${({ theme }) => theme.media.small} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
