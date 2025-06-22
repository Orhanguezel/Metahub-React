import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "@/store/hooks";
import { themes } from "@/styles/themes/index";
import { useThemeMode } from "@/hooks/useThemeMode";

const ThemeContext = createContext({
  toggle: () => {},
  isDark: false,
  mode: "light",
  themeName: "classic",
});

export function ThemeProviderWrapper({ children }) {
  const settings = useAppSelector((state) => state.setting.settings) || [];

  const [themeMode, toggleThemeMode] = useThemeMode();
  const isDark = themeMode === "dark";

  // Site teması ayarı (ör: "classic", "modern", "radanor", vs)
  const siteTemplateSetting = settings.find((s) => s.key === "site_template");
  const selectedTemplate = siteTemplateSetting?.value || "classic";

  // Temayı themes objesinden seç
  const baseTheme = themes[selectedTemplate] || themes["classic"];

  // Dark mod override renkleri ekle
  const finalTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: isDark ? "#121212" : baseTheme.colors.background,
      text: isDark ? "#ffffff" : baseTheme.colors.text,
      backgroundSecondary: isDark
        ? "#1e1e1e"
        : baseTheme.colors.backgroundSecondary,
      backgroundAlt: isDark ? "#2c2c2c" : baseTheme.colors.backgroundAlt,
      sectionBackground: isDark
        ? "#2c2c2c"
        : baseTheme.colors.sectionBackground,
      inputBackground: isDark ? "#2c2c2c" : baseTheme.colors.inputBackground,
      textAlt: isDark ? "#bbbbbb" : baseTheme.colors.textAlt,
      textSecondary: isDark ? "#cccccc" : baseTheme.colors.textSecondary,
      textPrimary: isDark ? "#ffffff" : baseTheme.colors.textPrimary,
      border: isDark ? "#333333" : baseTheme.colors.border,
      cardBackground: isDark ? "#1e1e1e" : baseTheme.colors.cardBackground,
      buttonBackground: isDark ? "#333333" : baseTheme.colors.buttonBackground,
      buttonText: isDark ? "#ffffff" : baseTheme.colors.buttonText,
      hoverBackground: isDark ? "#2c2c2c" : baseTheme.colors.hoverBackground,
      // Diğer renkler olduğu gibi kalır
      primary: baseTheme.colors.primary,
      primaryLight: baseTheme.colors.primaryLight,
      primaryHover: baseTheme.colors.primaryHover,
      primaryDark: baseTheme.colors.primaryDark,
      accent: baseTheme.colors.accent,
      secondary: baseTheme.colors.secondary,
      whiteColor: baseTheme.colors.whiteColor,
      darkColor: baseTheme.colors.darkColor,
      success: baseTheme.colors.success,
      warning: baseTheme.colors.warning,
      danger: baseTheme.colors.danger,
      error: baseTheme.colors.error,
      info: baseTheme.colors.info,
      muted: baseTheme.colors.muted,
      disabled: baseTheme.colors.disabled,
      link: baseTheme.colors.link,
      linkHover: baseTheme.colors.linkHover,
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        toggle: toggleThemeMode,
        isDark,
        mode: themeMode,
        themeName: selectedTemplate,
      }}
    >
      <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
