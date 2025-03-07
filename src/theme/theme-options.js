import customShadows from "./customShadows";
import shadows from "./shadows";
import { themeColors } from "./theme-colors";
import typography from "./typography";
const breakpoints = {
  values: {
    xxs: 0,
    xs: 600,
    sm: 800,
    md: 960,
    lg: 1200,
    xl: 1400,
    xxl: 1920,
  },
};
/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/

const themesOptionList = {
  typography: typography(),
  breakpoints,
  shape: { borderRadius: 8 },
  shadows: shadows(),
  customShadows: customShadows(),
  palette: themeColors,
};
export default themesOptionList;
