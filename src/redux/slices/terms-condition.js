import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isTermsConditionsLoading: false,
  termsConditionsError: null,
  data: [],
};

const slice = createSlice({
  name: "termsConditions",
  initialState,
  reducers: {
    // START TermsConditions
    startTermsConditionsLoading(state) {
      state.isTermsConditionsLoading = true;
    },

    // HAS TermsConditions
    hasTermsConditionsError(state, action) {
      state.isTermsConditionsLoading = false;
      state.termsConditionsError = action.payload;
    },

    // GET TermsConditions DATA
    setTermsConditionsPageData(state, action) {
      state.isTermsConditionsLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.termsConditions,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startTermsConditionsLoading } = slice.actions;

// GET TermsConditions PAGE DATA
export function getTermsConditionsPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startTermsConditionsLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setTermsConditionsPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasTermsConditionsError(error));
    }
  };
}

//   -----------------------------------------
