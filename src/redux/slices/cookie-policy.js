import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCookiePolicyLoading: false,
  cookiePolicyError: null,
  data: [],
};

const slice = createSlice({
  name: "cookiePolicy",
  initialState,
  reducers: {
    // START CookiePolicy
    startCookiePolicyLoading(state) {
      state.isCookiePolicyLoading = true;
    },

    // HAS CookiePolicy
    hasCookiePolicyError(state, action) {
      state.isCookiePolicyLoading = false;
      state.cookiePolicyError = action.payload;
    },

    // GET CookiePolicy DATA
    setCookiePolicyPageData(state, action) {
      state.isCookiePolicyLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cookiePolicy,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startCookiePolicyLoading } = slice.actions;

// GET CookiePolicy PAGE DATA
export function getCookiePolicyPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCookiePolicyLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setCookiePolicyPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCookiePolicyError(error));
    }
  };
}

//   -----------------------------------------
