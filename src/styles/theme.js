// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#0a0a0a',
    secondary: '#303030',
    text: '#ffffff',
    textLight: '#f0f0f0',
    accent: '#E0E0E0',
    black: '#000000',
    white: '#ffffff',
    grey: '#A0A0A0',
    darkGrey: '#555555',

    accentHover: "#E60073",
    accentText: "#FFFFFF",

    border: "#2C2C2C",
    borderLight: "#3A3A3A",
    borderBright: "#4A4A4A",
    borderBrighter: "#5A5A5A",
    borderHighlight: "#00FFF7",
    borderInput: "#444",

    card: "#14181F",
    cardBackground: "#14181F",

    buttonBackground: "#00FFF7",
    buttonText: "#0B0E14",
    buttonBorder: "#00FFF7",

    link: "#00FFF7",
    linkHover: "#00CCCC",

    hoverBackground: "#22272E",
    shadowHighlight: "0 0 0 3px rgba(0,255,247,0.3)",

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    dangerHover: "#DC2626",
    error: "#EF4444",
    info: "#3B82F6",
    muted: "#6B7280",
    disabled: "#2E2E2E",

    placeholder: "#666",
    inputBorderFocus: "#00FFF7",
    inputOutline: "#00FFF7",
    inputBackgroundLight: "#1C1C1C",
    inputBackgroundSofter: "#222",
    inputIcon: "#AAA",

    tableHeader: "#1C1F26",
    tagBackground: "#333",
    whiteColor: "#fff",
    darkColor: "#0B0E14",

  },
  buttons: {
    primary: {
      background: "#00FFF7",
      backgroundHover: "#00CCCC",
      text: "#0B0E14",
      textHover: "#0B0E14",
    },
    secondary: {
      background: "#1E1E1E",
      backgroundHover: "#2E2E2E",
      text: "#FFFFFF",
      textHover: "#FFFFFF",
    },
    danger: {
      background: "#EF4444",
      backgroundHover: "#DC2626",
      text: "#FFFFFF",
      textHover: "#FFFFFF",
    },
  },

  inputs: {
    background: "#1A1A1A",
    border: "#333",
    borderFocus: "#00FFF7",
    text: "#FFFFFF",
    placeholder: "#888888",
  },

  cards: {
    background: "#171C25",
    hoverBackground: "#1F2430",
    border: "#2C2C2C",
    shadow: "0 4px 24px rgba(0,255,247,0.05)",
  },

  fonts: {
    main: '"PP Neue Montreal", sans-serif',
    special: '"PP Editorial Old", "PP Neue Montreal", sans-serif',
  },
  fontSizes: {

    xsmall: '12px',
    small: '14px',
    medium: '16px',
    large: '19px',
    xlarge: '24px',
    h1: 'clamp(2.5rem, 8vw, 5rem)',
    h2: '2.5rem',
    h3: '2rem',
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.8rem",

  },
  spacings: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px"
  }
  ,
  breakpoints: {
    // Media query breakpoints
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tabletS: '600px',
    tablet: '768px',
    laptopS: '900px',
    laptop: '1024px',
    desktop: '1440px',
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 900,
  },
  lineHeights: {
    normal: "1.4",
    relaxed: "1.6",
    loose: "1.8",
  },
  radii: {
    none: "0",
    sm: "2px",
    md: "6px",
    lg: "10px",
    xl: "16px",
    pill: "500px",
    circle: "50%",
  },
  borders: {
    thin: "1px solid",
    thick: "2px solid",
  },
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.1)",
    sm: "0 2px 6px rgba(0,0,0,0.15)",
    md: "0 4px 12px rgba(0,0,0,0.2)",
    lg: "0 8px 20px rgba(0,0,0,0.25)",
    xl: "0 16px 40px rgba(0,0,0,0.3)",
    form: "0 6px 20px rgba(100,100,100,0.2)",
    button: "0 4px 14px rgba(0,255,255,0.2)",
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
    containerWidth: "1380px",
    sectionSpacing: "4rem",
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


};

