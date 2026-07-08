export const brandBaseColor = "#873EFF";
export const secondaryBaseColor = "#18A554";

export const siteColors = {
  highlight: "#EFE7FF",
  primary: brandBaseColor,
  primaryStrong: "#6F22E6",
  secondary: secondaryBaseColor,
  secondaryStrong: "#128443",
  dark: "#12002B",
  dark2: "#321167",
  background: "#FFFFFF",
  surface: "#F0E9FF",
  card: "#F0E9FF",
  foreground: "#12002B",
  muted: "#3F2A5C",
  faint: "#6A548A",
  darkEdge: "#5F32A8",
  border: "#DED2F4",
  borderStrong: "#C5ADEF",
  danger: "#B83A7A",
  success: "#6040DB",
  gold: brandBaseColor,
  onDark: "#F6F0FF",
  onDarkMuted: "#CBB8EE",
  onDarkBorder: "#3C1A72",
} as const;

export const scrollBackgroundThemes = {
  light: { bg: siteColors.background, fg: siteColors.foreground },
  surface: { bg: siteColors.surface, fg: siteColors.foreground },
  dark: { bg: siteColors.dark, fg: siteColors.onDark },
  highlight: { bg: siteColors.highlight, fg: siteColors.dark },
} as const;
