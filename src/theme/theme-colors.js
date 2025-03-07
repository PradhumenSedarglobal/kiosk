// =================================================================

import { alpha } from "@mui/material/styles";

// =================================================================
export const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  1000: "#848484",
  1100: "#b1b1b1",
  1200: "#adadad",
  1300: "#e3e3e3",
  1400: "#6f6f6f",
  1500: "#fafafa",
  1600: "#989898",
  1700: "#f7f7f7",
  1800: "#777f8d",
  1900: "#f2f2f2",
  2000: "#b4b4b4",
  2100: "#d0cfd4",
  2200: "#6C757D",
  2300: "#5a5a5a",
  2400: "#4a4a4a",
  2500: "#3f3f3f",
  2600: "#42464d",
  2700: "#b2b2b2",
  2800: "#676767",
  2900: "#f5f5f5",
  3000: "#626262",
  3100: "#7070703d",
  3200: "#262626",
  3300: "#3f5671da",
  3400: "#9b927e",
  3500: "#f0f0f0",
  3600: "#f1fafa",
  3700: "#ededed",
  3800: "#7e818c",
  3900: "#9da1b1",
  4000: "#f1f3f4",
  4100: "#868686",
  4200: "#faf8f7",
  4300: "#fdca580f",
  4400: "#6a6a6a",
  4500: "#b8b8b8",
  4600: "#fffff0",
  4700: "#3E3E3E",
  4800: "rgba(187, 187, 187, 0.231372549)",
  4900: "#212529",
  5000: "#747474",
  5100: "#ececec",
  5200: "#a8a8a8",
  5300: "#8a8a8a",
  5400: "rgba(239,156,0,.129)",
  5500: "#fef8e8",
  5600: "#5F5F5F",
  5700: "#c1c9d0",
  5800: "#1A1A1A",
  5900: "#EEEEEE",
  6000: "#1A1818",
  6100: "#4B4B4B",
  6200: "#222222",
  6300: "#707070",
  6400: "#282C3F",
  6500: "#828282",
  6600: "#656565",
  6700: "#8B8885",
  6800: "#596e7e",
  6900: "#be8064",
  7000: "#b4a690",
  7100: "#8c8b8b",
  7200: "#434343",
  7300: "#656565",
  7400: "#f5f5f5",
  7500: "#3861a0",
  7600: "#895F4D",
  7700: "#CBA369",
  7800: "#7f7f7f",
  7900: "#555555",
  8000: "#282c3f",

  // GOOGLE TEXT COLORS
  google: "#00000073",

  // TEXTBOX SHRINK COLOR
  shrink: "#7d808b",
  dark: "#333333",
};

export const blog = {
  light: "#dfede4",
};

export const facebook = {
  main: "#1877f2",
};

export const google = {
  main: "#1877f2",
};

export const primary = {
  100: "#ffc107",
  200: "#EAAF60",
  300: "#ffba1f",
  iconColor: "#fff5e2",
  lighter: "#ffd560",
  light: "#fdcc5d",
  main: "#ef9c00",
  dark: "#EF8B00",
  darker: "#ff7600",
  mainLight: "#E69F23",
  contrastText: "#fff",
};
export const secondary = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
  lightPurple: "#4a419f",
  lighterBlue: "#001389",
  lightPink: "#faf0e3",
};
export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#f5ece0",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#fff",
  moreLighter: "#3861a0",
  moreLight: "#0D6EFD",
  lessLight: "#0a58ca",
  lessLighter: "#CFE2FF",
};
export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  darkerRed: "#ed0303",
  contrastText: "#fff",
  lightError: "#f7634d",
  lighterError: "#FF0000",
  moreLight: "#f8d7da",
  moreLighter: "#58151c",
};
export const success = {
  lighter: "#D8FBDE",
  light: "#86E8AB",
  main: "#36B37E",
  dark: "#1B806A",
  darker: "#0A5554",
  darkerGreen: "#008000",
  contrastText: "#fff",
  lightGreen: "#24be9b",
  darkGreen: "#1EAF65",
};

const multiColor = {
  0: "#FFDB7E",
  100: "#d2d1d2",
  200: "#dfd1c4",
  300: "#e7ddd1",
  400: "#2b2b2b",
};
const contact_multi_color = {
  0: "#FFDB7E",
  1: "#d2d1d2",
  2: "#dfd1c4",
  3: "#e7ddd1",
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#ffc700",
  main: "#fdcc5d",
  dark: "#eaaf60",
  darker: "#7A4100",
  contrastText: grey[800],
};
export const dark = {
  // light: "",
  main: "#1a1818",
  darker: "#000000",
  contrastText: "#fff",
};
export const white = {
  main: "#fff",
};

const pink = {
  // lighter: "#CAFDF5",
  light: "#cb97cf",
  main: "#78287d",
  // dark: "#006C9C",
  // darker: "#003768",
  // contrastText: "#fff",
};

const purple = {
  main: "#9e6493",
};

export const themeColors = {
  common: { black: "#000", white: "#fff" },
  primary,
  secondary,
  info,
  success,
  warning,
  multiColor,
  error,
  grey,
  contact_multi_color,
  divider: alpha(grey[500], 0.24),
  dark,
  pink,
  purple,
  facebook,
  google,
  blog,
  action: {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  background: {
    default: white,
  },
  text: {
    primary: grey[900],
    secondary: grey[800],
    disabled: grey[400],
  },
};
