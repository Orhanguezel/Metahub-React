// src/styles/themes/lightTheme.js

const lightTheme = {
  templateName: "light",

  fonts: {
    main: "'Raleway', sans-serif",
    special: "'Playfair Display', serif",
    heading: "'Playfair Display', serif",
    body: "'Raleway', sans-serif",
    mono: "'Fira Code', monospace",
  },

  fontSizes: {
    xsmall: "14px",
    small: "16px",
    medium: "20px",
    large: "26px",
    xlarge: "32px",
    h1: "clamp(2.8rem, 7vw, 4.5rem)",
    h2: "2.5rem",
    h3: "2rem",
    xs: "0.8rem",
    sm: "0.9rem",
    md: "1.1rem",
    lg: "1.4rem",
    xl: "1.8rem",
    "2xl": "2.2rem",
    "3xl": "3rem",
  },

  fontWeights: {
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },

  lineHeights: {
    normal: "1.5",
    relaxed: "1.7",
    loose: "2",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
    xxxl: "56px",
  },

  radii: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    pill: "9999px",
    circle: "50%",
  },

  borders: {
    thin: "1px solid",
    thick: "2px solid",
  },

  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.04)",
    sm: "0 1px 4px rgba(0,0,0,0.06)",
    md: "0 4px 8px rgba(0,0,0,0.08)",
    lg: "0 8px 16px rgba(0,0,0,0.1)",
    xl: "0 16px 32px rgba(0,0,0,0.12)",
    form: "0 6px 20px rgba(0,0,0,0.07)",
    button: "0 2px 10px rgba(0,0,0,0.05)",
  },

  transition: {
    fast: "0.2s ease-in-out",
    normal: "0.3s ease-in-out",
    slow: "0.5s ease-in-out",
  },

  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  layout: {
    containerWidth: "1280px",
    sectionSpacing: "3rem",
  },

  zIndex: {
    dropdown: 1000,
    modal: 1100,
    overlay: 1200,
    tooltip: 1300,
  },

  opacity: {
    disabled: 0.5,
    hover: 0.9,
  },

  breakpoints: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tabletS: "600px",
    tablet: "768px",
    laptopS: "900px",
    laptop: "1024px",
    desktop: "1440px",
  },

  media: {
    xsmall: "@media (max-width: 480px)",
    small: "@media (max-width: 768px)",
    medium: "@media (max-width: 1024px)",
    large: "@media (max-width: 1440px)",
    xlarge: "@media (min-width: 1441px)",
    mobile: "@media (max-width: 768px)",
    tablet: "@media (min-width: 769px) and (max-width: 1024px)",
    desktop: "@media (min-width: 1025px)",
    landscape: "@media (orientation: landscape)",
    portrait: "@media (orientation: portrait)",
    retina: "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
  },

  colors: {
    background: "#ffffff",
    backgroundSecondary: "#fafafa",
    backgroundAlt: "#f7f7f7",
    sectionBackground: "#f9f9f9",
    inputBackground: "#ffffff",
    footerBackground: "#f8f8f8",

    text: "#171717",
    textAlt: "#333333",
    textSecondary: "#555555",
    textPrimary: "#171717",
    textMuted: "#888888",
    textLight: "#444444",

    title: "#d9a441",

    overlayStart: "rgba(255, 255, 255, 0.3)",
    overlayEnd: "rgba(255, 255, 255, 0.95)",
    overlayBackground: "rgba(0, 0, 0, 0.5)",
    skeleton: "#e5e5e5",
    skeletonBackground: "#f1f1f1",

    primary: "#d9a441",
    primaryLight: "#f1e3c0",
    primaryHover: "#b8860b",
    primaryDark: "#8B6914",
    primaryTransparent: "rgba(217, 164, 65, 0.1)",

    accent: "#d95841",
    accentHover: "#c94b35",
    accentText: "#ffffff",

    border: "#dddddd",
    borderLight: "#eeeeee",
    borderBright: "#cccccc",
    borderBrighter: "#f0f0f0",
    borderHighlight: "#d9a441",
    borderInput: "#cccccc",

    card: "#ffffff",
    cardBackground: "#ffffff",

    buttonBackground: "#d9a441",
    buttonText: "#ffffff",
    buttonBorder: "#d9a441",

    link: "#d9a441",
    linkHover: "#b8860b",

    hoverBackground: "#f0f0f0",
    shadowHighlight: "0 0 0 3px rgba(217, 164, 65, 0.2)",

    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    dangerHover: "#c82333",
    error: "#dc3545",
    info: "#17a2b8",
    muted: "#6c757d",
    disabled: "#e5e5e5",

    placeholder: "#999999",
    inputBorderFocus: "#d9a441",
    inputOutline: "#d9a441",
    inputIcon: "#555555",
    inputBackgroundLight: "#fafafa",
    inputBackgroundSofter: "#f7f7f7",

    tableHeader: "#f9f9f9",
    tagBackground: "#f0f0f0",
    grey: "#555555",
    darkGrey: "#444444",
    black: "#000000",
    white: "#ffffff",
    whiteColor: "#ffffff",
    darkColor: "#171717",
  },

  buttons: {
    primary: {
      background: "#d9a441",
      backgroundHover: "#b8860b",
      text: "#ffffff",
      textHover: "#ffffff",
    },
    secondary: {
      background: "#f0f0f0",
      backgroundHover: "#e0e0e0",
      text: "#333333",
      textHover: "#111111",
    },
    danger: {
      background: "#dc3545",
      backgroundHover: "#c82333",
      text: "#ffffff",
      textHover: "#ffffff",
    },
  },

  inputs: {
    background: "#ffffff",
    border: "#cccccc",
    borderFocus: "#d9a441",
    text: "#171717",
    placeholder: "#999999",
  },

  cards: {
    background: "#ffffff",
    hoverBackground: "#f7f7f7",
    border: "#dddddd",
    shadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
};

export default lightTheme;
