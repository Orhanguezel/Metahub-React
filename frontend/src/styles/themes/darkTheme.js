// src/styles/themes/darkTheme.js

const darkTheme = {
  templateName: "dark",

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
    background: "#0a0a0a",
    backgroundSecondary: "#111111",
    backgroundAlt: "#181818",
    sectionBackground: "#121212",
    inputBackground: "#1a1a1a",
    footerBackground: "#121212",

    text: "#ededed",
    textAlt: "#f5f5f5",
    textSecondary: "#aaaaaa",
    textPrimary: "#ededed",
    textMuted: "#888888",
    textLight: "#cccccc",

    title: "#d9a441",

    overlayStart: "rgba(0, 0, 0, 0.5)",
    overlayEnd: "rgba(0, 0, 0, 0.95)",
    overlayBackground: "rgba(0, 0, 0, 0.7)",
    skeleton: "#333333",
    skeletonBackground: "#222222",

    primary: "#d9a441",
    primaryLight: "#f1e3c0",
    primaryHover: "#cfa832",
    primaryDark: "#b8860b",
    primaryTransparent: "rgba(217, 164, 65, 0.1)",

    accent: "#d95841",
    accentHover: "#c94b35",
    accentText: "#ffffff",

    border: "#444444",
    borderLight: "#555555",
    borderBright: "#666666",
    borderBrighter: "#777777",
    borderHighlight: "#d9a441",
    borderInput: "#555555",

    card: "#1a1a1a",
    cardBackground: "#1a1a1a",

    buttonBackground: "#d9a441",
    buttonText: "#ffffff",
    buttonBorder: "#d9a441",

    link: "#d9a441",
    linkHover: "#cfa832",

    hoverBackground: "#333333",
    shadowHighlight: "0 0 0 3px rgba(217, 164, 65, 0.2)",

    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    dangerHover: "#c82333",
    error: "#dc3545",
    info: "#17a2b8",
    muted: "#6c757d",
    disabled: "#444444",

    placeholder: "#888888",
    inputBorderFocus: "#d9a441",
    inputOutline: "#d9a441",
    inputIcon: "#aaaaaa",
    inputBackgroundLight: "#2c2c2c",
    inputBackgroundSofter: "#272727",

    tableHeader: "#222222",
    tagBackground: "#333333",
    grey: "#555555",
    darkGrey: "#444444",
    black: "#000000",
    white: "#ffffff",
    whiteColor: "#ffffff",
    darkColor: "#0a0a0a",
  },

  buttons: {
    primary: {
      background: "#d9a441",
      backgroundHover: "#cfa832",
      text: "#ffffff",
      textHover: "#ffffff",
    },
    secondary: {
      background: "#333333",
      backgroundHover: "#444444",
      text: "#ededed",
      textHover: "#ffffff",
    },
    danger: {
      background: "#dc3545",
      backgroundHover: "#c82333",
      text: "#ffffff",
      textHover: "#ffffff",
    },
  },

  inputs: {
    background: "#1a1a1a",
    border: "#555555",
    borderFocus: "#d9a441",
    text: "#ededed",
    placeholder: "#888888",
  },

  cards: {
    background: "#1a1a1a",
    hoverBackground: "#252525",
    border: "#333333",
    shadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
};

export default darkTheme;
