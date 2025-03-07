import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isHomeLoading: false,
  homeError: null,
  homepage: {
    data: null,
  },
  homepageData: null,
};

const slice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    // START LOADING
    startHomeLoading(state) {
      state.isHomeLoading = true;
    },

    // HAS ERROR
    hasHomeError(state, action) {
      state.isHomeLoading = false;
      state.homeError = action.payload;
    },

    // GET HOMEPAGE DATA
    setHomepage(state, action) {
      state.isHomeLoading = false;
      let data = {
        error_message: action?.payload?.error_message || "Error",
        return_status: action?.payload?.return_status || 400,
        result: {
          COMPONENT: {},
          SEO: action?.payload?.result?.SEO || null,
        },
      };

      if (action?.payload?.result?.COMPONENT?.length) {
        for (let i = 0; i < action?.payload?.result?.COMPONENT?.length; i++) {
          const parentElement = action?.payload?.result?.COMPONENT[i];
          const componentTitle =
            parentElement?.PARENT?.component_title &&
            parentElement?.PARENT?.component_title.replace(/ /g, "_");
          data.result.COMPONENT[componentTitle] = parentElement;
        }
      }

      state.homepage.data = action.payload || {};
      state.homepageData = data || null;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.homepage,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startHomeLoading } = slice.actions;

// ----------------------------------------------------------------------

export function getHomepage(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startHomeLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setHomepage(response?.data));
    } catch (error) {
      console.error("HOMEPAGE ERROR", error);
      dispatch(slice.actions.hasHomeError(error));
    }
  };
}
// ----------------------------------------------------------------------
