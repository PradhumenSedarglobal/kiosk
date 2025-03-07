import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isAboutLoading: false,
  aboutError: null,
  data: [],
};

const slice = createSlice({
  name: "about",
  initialState,
  reducers: {
    // START About
    startAboutLoading(state) {
      state.isAboutLoading = true;
    },

    // HAS About
    hasAboutError(state, action) {
      state.isAboutLoading = false;
      state.aboutError = action.payload;
    },

    // GET About DATA
    setAboutPageData(state, action) {
      state.isAboutLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.about,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startAboutLoading } = slice.actions;

// GET About PAGE DATA
export function getAboutPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startAboutLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setAboutPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasAboutError(error));
    }
  };
}

//   -----------------------------------------
