import {
  ACCESS_TOKEN_KEY,
  SEDAR_USER_DATA,
  SEDAR_USER_MODIFICATION_DATA,
} from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  modificationUser: null,
  isJWTContextLoading: false,
  JWTContextError: null,
  JWTAuthToken: null,
  loginPopupOpen: false,
  isRedirectCheckout: false,
};

const slice = createSlice({
  name: "jwtContext",
  initialState,
  reducers: {
    // START JWTContext
    startJWTContextLoading(state) {
      state.isJWTContextLoading = true;
    },

    // HAS JWTContext
    hasJWTContextError(state, action) {
      state.isJWTContextLoading = false;
      state.JWTContextError = action.payload;
      state.user = initialState.user;
      state.isAuthenticated = initialState.isAuthenticated;
      state.isInitialized = initialState.isInitialized;
      state.JWTAuthToken = initialState.JWTAuthToken;
    },

    // GET JWTContext DATA
    setJWTContextData(state, action) {
      state.isJWTContextLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isInitialized = action.payload.isInitialized;
      state.JWTAuthToken = action.payload.JWTAuthToken;
    },
    resetJWTContext(state) {
      state.isInitialized = true
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
      state.isJWTContextLoading = initialState.isJWTContextLoading;
      state.JWTContextError = initialState.JWTContextError;
      state.JWTAuthToken = initialState.JWTAuthToken;
      state.modificationUser = null;
      setCookie("USER_ID", "0", {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      });
      setCookie(ACCESS_TOKEN_KEY, "", {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      });
      setCookie(SEDAR_USER_DATA, "", {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      });
      setCookie(SEDAR_USER_MODIFICATION_DATA, "", {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      });
    },
    setLoginPopupOpen(state, action) {
      state.loginPopupOpen = action.payload;
    },
    setModificationUser(state, action) {
      state.modificationUser = action.payload;
    },
    setIsRedirectCheckout(state, action) {
      state.isRedirectCheckout = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.jwtContext,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startJWTContextLoading,
  setJWTContextData,
  resetJWTContext,
  setLoginPopupOpen,
  setModificationUser,
  setIsRedirectCheckout
} = slice.actions;

//   -----------------------------------------
