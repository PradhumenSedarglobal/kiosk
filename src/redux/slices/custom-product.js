import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCustomProductLoading: false,
  customPrintError: null,
  data: [],
};

const slice = createSlice({
  name: "customProduct",
  initialState,
  reducers: {
    // START CustomProduct
    startCustomPrintLoading(state) {
      state.isCustomPrintLoading = true;
    },

    // HAS CustomProduct
    hasCustomPrintError(state, action) {
      state.isCustomPrintLoading = false;
      state.customPrintError = action.payload;
    },

    // GET CustomProduct DATA
    setCustomPrintPageData(state, action) {
      state.isCustomPrintLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.customProduct,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startCustomPrintLoading } = slice.actions;

// GET CustomProduct PAGE DATA
export function getCustomPrintPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCustomPrintLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setCustomPrintPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCustomPrintError(error));
    }
  };
}

//   -----------------------------------------
