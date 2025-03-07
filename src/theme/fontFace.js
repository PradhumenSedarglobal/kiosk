import {
  Helvetica_Neue,
  Helvetica_Neue_Arabic,
  Helvetica_Neue_Bold,
  Helvetica_Neue_Bold_Arabic,
  Helvetica_Neue_Light,
  Helvetica_Neue_Light_Arabic,
  Helvetica_Neue_Medium,
  Helvetica_Neue_Medium_Arabic,
  Helvetica_Neue_Regular,
  Helvetica_Neue_Regular_Arabic,
  Helvetica_Neue_Thin,
  Helvetica_Neue_Thin_Arabic,
} from "./typography";

export const fontFaces = (themeDirection) => {
  // if (themeDirection == "ltr") {
  //   return {
  //     helveticaNeue: "Helvetica-Neue",
  //     helveticaNeueRegular: "Helvetica-Neue-Regular",
  //     helveticaNeueThin: "Helvetica-Neue-Thin",
  //     helveticaNeueLight: "Helvetica-Neue-Light",
  //     helveticaNeueMedium: "Helvetica-Neue-Medium",
  //     helveticaNeueBold: "Helvetica-Neue-Bold",
  //     porter: "Porter",
  //     helveticaNeueLightArabic: "Helvetica-Neue-Light-Arabic",
  //     helveticaNeueBoldArabic: "Helvetica-Neue-Bold-Arabic",
  //   };
  // } else {
  //   return {
  //     helveticaNeue: "Helvetica-Neue-Arabic",
  //     helveticaNeueRegular: "Helvetica-Neue-Regular-Arabic",
  //     helveticaNeueThin: "Helvetica-Neue-Thin-Arabic",
  //     helveticaNeueLight: "Helvetica-Neue-Light-Arabic",
  //     helveticaNeueMedium: "Helvetica-Neue-Medium-Arabic",
  //     helveticaNeueBold: "Helvetica-Neue-Bold-Arabic",
  //     porter: "Porter",
  //     helveticaNeueLightArabic: "Helvetica-Neue-Light-Arabic",
  //     helveticaNeueBoldArabic: "Helvetica-Neue-Bold-Arabic",
  //   };
  // }
  // if (themeDirection == "ltr") {
  //   return {
  //     helveticaNeue: `${Helvetica_Neue.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueRegular: `${Helvetica_Neue_Regular.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueThin: `${Helvetica_Neue_Thin.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueLight: `${Helvetica_Neue_Light.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueMedium: `${Helvetica_Neue_Medium.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueBold: `${Helvetica_Neue_Bold.style.fontFamily}, "Arial", "sans-serif"`,
  //     // porter: `${"Porter"}, "Arial", "sans-serif"`,
  //     helveticaNeueLightArabic: `${Helvetica_Neue_Light_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueBoldArabic: `${Helvetica_Neue_Bold_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //   };
  // } else {
  //   return {
  //     helveticaNeue: `${Helvetica_Neue_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueRegular: `${Helvetica_Neue_Regular_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueThin: `${Helvetica_Neue_Thin_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueLight: `${Helvetica_Neue_Light_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueMedium: `${Helvetica_Neue_Medium_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueBold: `${Helvetica_Neue_Bold_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     // porter: `${"Porter"}, "Arial", "sans-serif"`,
  //     helveticaNeueLightArabic: `${Helvetica_Neue_Light_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //     helveticaNeueBoldArabic: `${Helvetica_Neue_Bold_Arabic.style.fontFamily}, "Arial", "sans-serif"`,
  //   };
  // }
  if (themeDirection == "ltr") {
    return {
      helveticaNeue: Helvetica_Neue.style.fontFamily,
      helveticaNeueRegular: Helvetica_Neue_Regular.style.fontFamily,
      helveticaNeueThin: Helvetica_Neue_Thin.style.fontFamily,
      helveticaNeueLight: Helvetica_Neue_Light.style.fontFamily,
      helveticaNeueMedium: Helvetica_Neue_Medium.style.fontFamily,
      helveticaNeueBold: Helvetica_Neue_Bold.style.fontFamily,
      helveticaNeueLightArabic: Helvetica_Neue_Light_Arabic.style.fontFamily,
      helveticaNeueArabic: Helvetica_Neue_Arabic.style.fontFamily,
      helveticaNeueBoldArabic: Helvetica_Neue_Bold_Arabic.style.fontFamily,
    };
  } else {
    return {
      helveticaNeue: Helvetica_Neue_Arabic.style.fontFamily,
      helveticaNeueRegular: Helvetica_Neue_Regular_Arabic.style.fontFamily,
      helveticaNeueThin: Helvetica_Neue_Thin_Arabic.style.fontFamily,
      helveticaNeueLight: Helvetica_Neue_Light_Arabic.style.fontFamily,
      helveticaNeueMedium: Helvetica_Neue_Medium_Arabic.style.fontFamily,
      helveticaNeueBold: Helvetica_Neue_Bold_Arabic.style.fontFamily,
      helveticaNeueLightArabic: Helvetica_Neue_Light_Arabic.style.fontFamily,
      helveticaNeueBoldArabic: Helvetica_Neue_Bold_Arabic.style.fontFamily,
      helveticaNeueArabic: Helvetica_Neue_Arabic.style.fontFamily,
    };
  }
};
