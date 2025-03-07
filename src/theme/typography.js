import { Public_Sans } from "@next/font/google";
import localFont from "@next/font/local";

// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    "@media (min-width: 0px) and (max-width: 599px)": {
      fontSize: `${pxToRem(xs)}!important`,
    },
    "@media (min-width:600px) and (max-width: 899px)": {
      fontSize: `${pxToRem(sm)}!important`,
    },
    "@media (min-width:900px) and (max-width: 1199px)": {
      fontSize: `${pxToRem(md)}!important`,
    },
    "@media (min-width:1200px)": {
      fontSize: `${pxToRem(lg)}!important`,
    },
  };
}

export const Helvetica_Neue = localFont({
  src: "../pages/fonts/HelveticaNeue-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-helvetica-neue",
  display: "swap",
});

export const Helvetica_Neue_Regular = localFont({
  src: "../pages/fonts/HelveticaNeue-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Thin = localFont({
  src: "../pages/fonts/HelveticaNeue-Thin.otf",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Light = localFont({
  src: "../pages/fonts/HelveticaNeue-Light.otf",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Medium = localFont({
  src: "../pages/fonts/HelveticaNeue-Medium.otf",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "Helvetica-Neue-Medium",
});

export const Helvetica_Neue_Bold = localFont({
  src: "../pages/fonts/helvetica-neue-bold.ttf",
  weight: "600",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Light_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-55-Roman.ttf",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Bold_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-75-Bold.ttf",
  weight: "600",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-55-Roman.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-helvetica-neue",
  display: "swap",
});

export const Helvetica_Neue_Regular_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-55-Roman.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Thin_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-55-Roman.ttf",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const Helvetica_Neue_Medium_Arabic = localFont({
  src: "../pages/fonts/HelveticaNeueLT-Arabic-55-Roman.ttf",
  weight: "500",
  style: "normal",
  display: "swap",
});
// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

const typography = () => ({
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 9, sm: 52, md: 52, lg: 52 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(48),
    ...responsiveFontSizes({ xs: 40, sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 26, sm: 24, md: 24, lg: 24 }),
  },
  filter: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 19.6, sm: 19.6, md: 26, lg: 26 }),
  },
  filter1: {
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 24, sm: 24.5, md: 24.5, lg: 24.5 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 20, sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 19, sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 18, lg: 18 }),
  },
  typography6: {
    lineHeight: 1.5,
    fontSize: pxToRem(9),
    ...responsiveFontSizes({ xxs: 30, xs: 30, sm: 30, md: 44.8, lg: 44.8 }),
  },
  typography7: {
    lineHeight: 1.5,
    fontSize: pxToRem(9),
    ...responsiveFontSizes({
      xxs: 27.86,
      xs: 27.86,
      sm: 27.86,
      md: 39.2,
      lg: 39.2,
    }),
  },
  typography8: {
    fontSize: pxToRem(9),
    ...responsiveFontSizes({ xs: 25, sm: 25, md: 40, lg: 40 }),
  },
  typography9: {
    fontSize: pxToRem(9),
    ...responsiveFontSizes({ xs: 9, sm: 9, md: 9, lg: 9 }),
  },
  typography10: {
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 14.4, sm: 14.4, md: 22.4, lg: 22.4 }),
  },
  typography11: {
    fontSize: pxToRem(11),
    ...responsiveFontSizes({ xs: 11, sm: 11, md: 11, lg: 11 }),
  },
  typography12: {
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 12 }),
  },
  typography13: {
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 13, sm: 13, md: 13, lg: 13 }),
  },
  typography14: {
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 14, lg: 14 }),
  },
  typography15: {
    lineHeight: 22 / 15,
    fontSize: pxToRem(15),
    ...responsiveFontSizes({ xs: 15, sm: 15, md: 15, lg: 15 }),
  },
  typography16: {
    lineHeight: 22 / 16,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 15, md: 16, lg: 16 }),
  },
  typography17: {
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 17.78, lg: 17.78 }),
  },
  typography18: {
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 18, lg: 18 }),
  },
  typography19: {
    fontSize: pxToRem(19.2),
    ...responsiveFontSizes({ xs: 16, sm: 17, md: 19.2, lg: 19.2 }),
  },
  typography20: {
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 20, lg: 20 }),
  },
  typography21: {
    fontSize: pxToRem(21),
    ...responsiveFontSizes({ xs: 20, sm: 21, md: 21, lg: 21 }),
  },
  typography22: {
    fontSize: pxToRem(22.4),
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 22.4, lg: 22.4 }),
  },
  typography23: {
    fontSize: pxToRem(22.4),
    ...responsiveFontSizes({ xs: 17, sm: 17, md: 25, lg: 25 }),
  },
  typography24: {
    fontSize: pxToRem(22.4),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 16, lg: 16 }),
  },
  typography26: {
    // lineHeight: 2,
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ xs: 19, sm: 19, md: 26, lg: 26 }),
  },
  typography28: {
    // lineHeight: 2,
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ xs: 19.6, sm: 19.6, md: 26, lg: 28 }),
  },
  typography29: {
    // lineHeight: 2,
    fontSize: pxToRem(29),
    ...responsiveFontSizes({ xs: 29, sm: 29, md: 29, lg: 29 }),
  },
  typography31: {
    lineHeight: 1.4,
    fontSize: pxToRem(31),
    letterSpacing: ".93px",
    fontWeight: 700,
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 30, lg: 31 }),
  },
  typography32: {
    lineHeight: 1.5,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 30, lg: 32 }),
  },
  typography33: {
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 12.6, sm: 12.6, md: 14, lg: 14 }),
  },
  typography34: {
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 14.8, sm: 14.8, md: 17, lg: 17 }),
  },
  typography35: {
    lineHeight: 1.5,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 27.86, sm: 27.86, md: 35, lg: 35 }),
  },
  typography36: {
    lineHeight: 1.5,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 36, lg: 36 }),
  },
  typography37: {
    lineHeight: 1.5,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 18.4, sm: 18.4, md: 18.4, lg: 18.4 }),
  },
  typography38: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 38, lg: 38 }),
  },
  typography39: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 28, sm: 28, md: 39, lg: 39 }),
  },
  typography40: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 28, sm: 28, md: 40, lg: 40 }),
  },
  typography41: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 28.38, sm: 33.52, md: 37.36, lg: 40 }),
  },
  typography42: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 28, lg: 28 }),
  },
  typography43: {
    // lineHeight: 1.5,
    fontSize: pxToRem(43),
    ...responsiveFontSizes({ xs: 32, sm: 32, md: 39.2, lg: 39.2 }),
  },
  typography44: {
    // fontWeight: 800,
    // lineHeight: 80 / 64,
    fontSize: pxToRem(44),
    ...responsiveFontSizes({ xs: 32, sm: 32, md: 44, lg: 44 }),
  },
  typography45: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({ xxs: 17.78, xs: 17.78, sm: 18, md: 18, lg: 18 }),
  },
  typography46: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({
      xxs: 19.2,
      xs: 19.2,
      sm: 19.2,
      md: 19.2,
      lg: 19.2,
    }),
  },
  typography47: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({
      xxs: 23.35,
      xs: 23.35,
      sm: 25.4,
      md: 26.93,
      lg: 28,
    }),
  },
  typography48: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({ xxs: 28, xs: 28, sm: 28, md: 22, lg: 22 }),
  },
  typography49: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({ xxs: 28, xs: 27, sm: 28, md: 30, lg: 32 }),
  },
  typography50: {
    lineHeight: 1.5,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({ xxs: 20, xs: 20, sm: 28, md: 39.2, lg: 39.2 }),
  },
  typography60: {
    lineHeight: 1.1,
    fontSize: pxToRem(45),
    ...responsiveFontSizes({ xxs: 20, xs: 20, sm: 50, md: 60, lg: 60 }),
  },
  typography70: {
    lineHeight: 1.2,
    fontSize: pxToRem(70),
    ...responsiveFontSizes({ xxs: 70, xs: 70, sm: 70, md: 70, lg: 70 }),
  },
  subtitle: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  subtitle3: {
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 18, lg: 18 }),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 14, lg: 14 }),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 12 }),
  },
  caption1: {
    lineHeight: 1.5,
    fontSize: pxToRem(13),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 13 }),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
});

export default typography;
