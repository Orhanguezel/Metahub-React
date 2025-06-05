// src/styles/themes/classicTheme.js

const classicTheme = {
  templateName: "classic",

  fonts: {
    main: "'Inter', sans-serif",
    special: "'Georgia', serif",
    heading: "'Georgia', serif",
    body: "'Inter', sans-serif",
    mono: "'Courier New', monospace",
  },

  fontSizes: {
    xsmall: "12px",
    small: "14px",
    medium: "16px",
    large: "20px",
    xlarge: "26px",
    h1: "clamp(2.5rem, 5vw, 4rem)",
    h2: "2.2rem",
    h3: "1.8rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
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
    relaxed: "1.65",
    loose: "1.8",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },

  radii: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "18px",
    pill: "500px",
    circle: "50%",
  },

  borders: {
    thin: "1px solid",
    thick: "2px solid",
  },

  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    sm: "0 2px 4px rgba(0,0,0,0.08)",
    md: "0 4px 8px rgba(0,0,0,0.1)",
    lg: "0 8px 16px rgba(0,0,0,0.12)",
    xl: "0 16px 32px rgba(0,0,0,0.15)",
    form: "0 4px 12px rgba(0,0,0,0.06)",
    button: "0 2px 6px rgba(0,0,0,0.08)",
  },

  transition: {
    fast: "0.2s ease-in",
    normal: "0.3s ease-out",
    slow: "0.5s ease-in-out",
  },

  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "600ms",
  },

  layout: {
    containerWidth: "1200px",
    sectionSpacing: "3rem",
  },

  zIndex: {
    dropdown: 1000,
    modal: 1100,
    overlay: 1200,
    tooltip: 1300,
  },

  opacity: {
    disabled: 0.4,
    hover: 0.85,
  },

  breakpoints: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tabletS: "600px",
    tablet: "768px",
    laptopS: "1024px",
    laptop: "1280px",
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
    background: "#fdfdfd",
    backgroundSecondary: "#f6f6f6",
    backgroundAlt: "#ffffff",
    sectionBackground: "#ffffff",
    inputBackground: "#ffffff",
    footerBackground: "#f2f2f2",

    text: "#1a1a1a",
    textAlt: "#2a2a2a",
    textSecondary: "#5a5a5a",
    textPrimary: "#1a1a1a",
    textMuted: "#888888",
    textLight: "#2f2f2f",

    title: "#2b4c7e",

    overlayStart: "rgba(255, 255, 255, 0.1)",
    overlayEnd: "rgba(255, 255, 255, 0.96)",
    overlayBackground: "rgba(0, 0, 0, 0.4)",
    skeleton: "#e6e6e6",
    skeletonBackground: "#f4f4f4",

    primary: "#3b5773",
    primaryLight: "#e8edf5",
    primaryHover: "#2f4864",
    primaryDark: "#1f2f3f",
    primaryTransparent: "rgba(59, 87, 115, 0.08)",

    accent: "#007BFF",
    accentHover: "#0056b3",
    accentText: "#ffffff",

    border: "#dcdcdc",
    borderLight: "#efefef",
    borderBright: "#c2c2c2",
    borderBrighter: "#e0e0e0",
    borderHighlight: "#2b4c7e",
    borderInput: "#bdbdbd",

    card: "#ffffff",
    cardBackground: "#ffffff",

    buttonBackground: "#3b5773",
    buttonText: "#ffffff",
    buttonBorder: "#3b5773",

    link: "#007BFF",
    linkHover: "#0056b3",

    hoverBackground: "#f0f0f0",
    shadowHighlight: "0 0 0 3px rgba(0, 123, 255, 0.3)",

    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    dangerHover: "#c82333",
    error: "#dc3545",
    info: "#17a2b8",
    muted: "#6c757d",
    disabled: "#dddddd",

    placeholder: "#888888",
    inputBorderFocus: "#2b4c7e",
    inputOutline: "#2b4c7e",
    inputBackgroundLight: "#ffffff",
    inputBackgroundSofter: "#f6f6f6",
    inputIcon: "#5a5a5a",

    tableHeader: "#f6f6f6",
    tagBackground: "#e0e0e0",
    grey: "#999999",
    darkGrey: "#333333",
    black: "#000000",
    white: "#ffffff",
    whiteColor: "#ffffff",
    darkColor: "#1a1a1a",
  },

  buttons: {
    primary: {
      background: "#3b5773",
      backgroundHover: "#2f4864",
      text: "#ffffff",
      textHover: "#ffffff",
    },
    secondary: {
      background: "#f6f6f6",
      backgroundHover: "#eaeaea",
      text: "#1a1a1a",
      textHover: "#1a1a1a",
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
    border: "#bdbdbd",
    borderFocus: "#2b4c7e",
    text: "#1a1a1a",
    placeholder: "#888888",
  },

  cards: {
    background: "#ffffff",
    hoverBackground: "#f6f6f6",
    border: "#dcdcdc",
    shadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
};

export default classicTheme;
