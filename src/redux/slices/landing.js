import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isLandingLoading: false,
  landingError: null,
  data: [],
};

const slice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    // START LANDING
    startLandingLoading(state) {
      state.isLandingLoading = true;
    },

    // HAS LANDING
    hasLandingError(state, action) {
      state.isLandingLoading = false;
      state.landingError = action.payload;
    },

    // GET LANDING DATA
    setLandingPageData(state, action) {
      state.isLandingLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.landing,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLandingLoading } = slice.actions;

// GET LANDING PAGE DATA
export function getLandingPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startLandingLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      
      dispatch(slice.actions.setLandingPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasLandingError(error));
    }
  };
}

//   -----------------------------------------
