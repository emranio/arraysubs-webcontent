export const brandBaseColor = "#873EFF";

export const siteColors = {
  highlight: "#EFE7FF",
  primary: brandBaseColor,
  primaryStrong: "#6F22E6",
  dark: "#12002B",
  dark2: "#26005C",
  background: "#FFFFFF",
  surface: "#F8F5FF",
  surface2: "#F0E9FF",
  foreground: "#12002B",
  muted: "#5B4778",
  faint: "#8D7AAA",
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
