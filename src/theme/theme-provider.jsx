import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import merge from "lodash/merge";
import themesOptionList from "./theme-options";
import { fontFaces } from "./fontFace";
import { useRouter } from "next/router";
import customShadows from "./customShadows";
import ComponentsOverrides from "./overrides";
import typography, {
  Helvetica_Neue,
  Helvetica_Neue_Arabic,
} from "./typography";
import { classes } from "./utils";
import GlobalStyles from "./globalStyles";

const ThemeProvider = ({ children }) => {
  const { locale } = useRouter();
  const isRTL =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ar"
      ? "rtl"
      : "ltr";
  const mergedThemeOptions = merge(
    {},
    {
      ...themesOptionList,
      direction: isRTL,
      fontFaces: fontFaces(isRTL),
      customShadows: customShadows(),
    }
  );
  let theme = createTheme(mergedThemeOptions);
  theme.components = {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          scrollBehavior: "smooth",
        },
        html: {
          scrollBehavior: "smooth",
          fontFamily:
            isRTL == "rtl"
              ? Helvetica_Neue_Arabic.style.fontFamily
              : Helvetica_Neue.style.fontFamily,
        },
        body: {
          fontFamily:
            isRTL == "rtl"
              ? Helvetica_Neue_Arabic.style.fontFamily
              : Helvetica_Neue.style.fontFamily,
        },
        p: {
          lineHeight: 1.75,
        },
        button: {
          fontSize: 14,
          fontFamily: typography().fontFamily,
        },
        ".MuiRating-sizeSmall": {
          fontSize: "20px",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        ul: {
          margin: 0,
          padding: 0,
          listStyle: "none",
        },
        ".bg-white": {
          backgroundColor: "white",
        },
        ...classes(),
      },
    },
    ...ComponentsOverrides(theme),
    fontFaces: fontFaces(isRTL)
  };
  // theme = responsiveFontSizes(theme);

  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
