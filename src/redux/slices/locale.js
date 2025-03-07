import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isLanguageLoading: false,
  languageError: null,
  language: null,
  themeDirection: "ltr",
  cookies: {},
  languageDropDown: [],
  currentLang: {},
  sedarGeoCountryName: {
    en: "",
    ar: "",
  },
  popup: {
    defaultCountry: "",
    show: "",
    countryPopup: 0,
  },
};

const slice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    // START LOADING
    startLanguageLoading(state) {
      state.isLanguageLoading = true;
    },

    // HAS ERROR
    hasLanguageError(state, action) {
      state.isLanguageLoading = false;
      state.languageError = action.payload;
    },

    // SET LANGUAGE DATA
    setLanguage(state, action) {
      state.isLanguageLoading = false;
      state.language = action?.payload;
    },

    setCountryName(state, action) {
      state.isLanguageLoading = false;
      state.cookies.country = action?.payload;
    },

    setLanguageName(state, action) {
      state.isLanguageLoading = false;
      state.cookies.langName = action?.payload;
    },

    setReduxCookie(state, action) {
      state.cookies = action.payload;
    },
    setThemeDirection(state, action) {
      state.themeDirection = action.payload;
    },

    setLanguageDropdown(state, action) {
      state.languageDropDown = action.payload;
    },
    setCurrentLang(state, action) {
      state.currentLang = action.payload;
    },

    setSedarGeoCountryName(state, action) {
      state.sedarGeoCountryName = action.payload;
    },

    setPopup(state, action) {
      state.popup = action.payload;
    },
    setSSGReduxCookiesReducer(state, action) {
      state.currentLang = action.payload.currentLang;
      state.languageDropDown = action.payload.languageDropDown;
      state.themeDirection = action.payload.themeDirection;
      state.cookies = action.payload.cookies || {};
    },
    setClientSideReduxCookieReducer(state, action) {
      state.currentLang = action.payload.currentLang;
      state.languageDropDown = action.payload.languageDropDown;
      state.themeDirection = action.payload.themeDirection;
      state.cookies = action.payload.cookies || {};
    },
    setSSRReduxCookieReducer(state, action) {
      state.currentLang = action.payload.currentLang;
      state.languageDropDown = action.payload.languageDropDown;
      state.themeDirection = action.payload.themeDirection;
      state.cookies = action.payload.cookies || {};
    },
    resetAuthCookies(state) {
      state.cookies = {
        ...state.cookies,
        USER_ID: 0,
      };
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.locale,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLanguageLoading,
  setLanguage,
  setReduxCookie,
  setThemeDirection,
  setLanguageDropdown,
  setCurrentLang,
  setSedarGeoCountryName,
  setPopup,
  resetAuthCookies,
  setSSGReduxCookiesReducer,
  setClientSideReduxCookieReducer,
  setSSRReduxCookieReducer,
} = slice.actions;

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
