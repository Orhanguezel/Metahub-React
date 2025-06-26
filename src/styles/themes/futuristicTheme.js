// src/styles/themes/futuristicTheme.js

const futuristicTheme = {
  templateName: "futuristic",

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
    background: "#0D0D0D",
    backgroundSecondary: "#1A1A1A",
    backgroundAlt: "#161616",
    sectionBackground: "#1A1A1A",
    inputBackground: "#2B2B2B",
    footerBackground: "#0D0D0D",

    text: "#E0E0E0",
    textAlt: "#BFBFBF",
    textSecondary: "#999999",
    textPrimary: "#F5F5F5",
    textMuted: "#777777",
    textLight: "#CCCCCC",

    title: "#00FFF7",

    overlayStart: "rgba(0, 0, 0, 0.7)",
    overlayEnd: "rgba(0, 0, 0, 0.95)",
    overlayBackground: "rgba(0, 0, 0, 0.6)",
    skeleton: "#444444",
    skeletonBackground: "#333333",

    primary: "#00FFF7",
    primaryLight: "#66FFF9",
    primaryHover: "#00CCCC",
    primaryDark: "#007777",
    primaryTransparent: "rgba(0, 255, 247, 0.1)",

    accent: "#7D00FF",
    accentHover: "#A366FF",
    accentText: "#FFFFFF",

    border: "#444444",
    borderLight: "#555555",
    borderBright: "#888888",
    borderBrighter: "#999999",
    borderHighlight: "#00FFF7",
    borderInput: "#666666",

    card: "#1A1A1A",
    cardBackground: "#1A1A1A",

    buttonBackground: "#00FFF7",
    buttonText: "#0D0D0D",
    buttonBorder: "#00FFF7",

    link: "#7D00FF",
    linkHover: "#B266FF",

    hoverBackground: "#222222",
    shadowHighlight: "0 0 0 3px rgba(0,255,247,0.4)",

    success: "#28a745",
    warning: "#ffc107",
    danger: "#ff0033",
    dangerHover: "#cc0022",
    error: "#ff0033",
    info: "#17a2b8",
    muted: "#666666",
    disabled: "#444444",

    placeholder: "#888888",
    inputBorderFocus: "#00FFF7",
    inputOutline: "#00FFF7",
    inputIcon: "#FFFFFF",
    inputBackgroundLight: "#1A1A1A",
    inputBackgroundSofter: "#2A2A2A",

    tableHeader: "#1F1F1F",
    tagBackground: "#2E2E2E",
    grey: "#666666",
    darkGrey: "#444444",
    black: "#000000",
    white: "#FFFFFF",
    whiteColor: "#FFFFFF",
    darkColor: "#000000",
  },

  buttons: {
    primary: {
      background: "#00FFF7",
      backgroundHover: "#00CCCC",
      text: "#0D0D0D",
      textHover: "#0D0D0D",
    },
    secondary: {
      background: "#2B2B2B",
      backgroundHover: "#3A3A3A",
      text: "#E0E0E0",
      textHover: "#FFFFFF",
    },
    danger: {
      background: "#ff0033",
      backgroundHover: "#cc0022",
      text: "#ffffff",
      textHover: "#ffffff",
    },
  },

  inputs: {
    background: "#2B2B2B",
    border: "#444444",
    borderFocus: "#00FFF7",
    text: "#E0E0E0",
    placeholder: "#888888",
  },

  cards: {
    background: "#1A1A1A",
    hoverBackground: "#292929",
    border: "#333333",
    shadow: "0 2px 12px rgba(0, 255, 247, 0.08)",
  },
};

export default futuristicTheme;
