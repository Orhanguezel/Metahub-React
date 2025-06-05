// src/styles/themes/minimalTheme.js

const minimalTheme = {
  templateName: "minimal",

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
    backgroundSecondary: "#f9f9f9",
    backgroundAlt: "#ffffff",
    sectionBackground: "#ffffff",
    inputBackground: "#ffffff",
    footerBackground: "#f5f5f5",

    text: "#222222",
    textAlt: "#444444",
    textSecondary: "#555555",
    textPrimary: "#222222",
    textMuted: "#999999",
    textLight: "#666666",

    title: "#111111",

    overlayStart: "rgba(255, 255, 255, 0.2)",
    overlayEnd: "rgba(255, 255, 255, 0.95)",
    overlayBackground: "rgba(0, 0, 0, 0.3)",
    skeleton: "#e8e8e8",
    skeletonBackground: "#f3f3f3",

    primary: "#111111",
    primaryLight: "#333333",
    primaryHover: "#000000",
    primaryDark: "#000000",
    primaryTransparent: "rgba(17, 17, 17, 0.05)",

    accent: "#444444",
    accentHover: "#222222",
    accentText: "#ffffff",

    border: "#e0e0e0",
    borderLight: "#f0f0f0",
    borderBright: "#d4d4d4",
    borderBrighter: "#eaeaea",
    borderHighlight: "#cccccc",
    borderInput: "#cccccc",

    card: "#ffffff",
    cardBackground: "#ffffff",

    buttonBackground: "#222222",
    buttonText: "#ffffff",
    buttonBorder: "#222222",

    link: "#333333",
    linkHover: "#111111",

    hoverBackground: "#f7f7f7",
    shadowHighlight: "0 0 0 3px rgba(34, 34, 34, 0.1)",

    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    dangerHover: "#c82333",
    error: "#dc3545",
    info: "#17a2b8",
    muted: "#6c757d",
    disabled: "#eeeeee",

    placeholder: "#999999",
    inputBorderFocus: "#222222",
    inputOutline: "#222222",
    inputIcon: "#555555",
    inputBackgroundLight: "#fbfbfb",
    inputBackgroundSofter: "#f7f7f7",

    tableHeader: "#f9f9f9",
    tagBackground: "#eeeeee",
    grey: "#555555",
    darkGrey: "#333333",
    black: "#000000",
    white: "#ffffff",
    whiteColor: "#ffffff",
    darkColor: "#111111",
  },

  buttons: {
    primary: {
      background: "#222222",
      backgroundHover: "#111111",
      text: "#ffffff",
      textHover: "#ffffff",
    },
    secondary: {
      background: "#f0f0f0",
      backgroundHover: "#e0e0e0",
      text: "#222222",
      textHover: "#000000",
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
    borderFocus: "#222222",
    text: "#222222",
    placeholder: "#999999",
  },

  cards: {
    background: "#ffffff",
    hoverBackground: "#fafafa",
    border: "#eeeeee",
    shadow: "0 2px 4px rgba(0,0,0,0.03)",
  },
};

export default minimalTheme;
