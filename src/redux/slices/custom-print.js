import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCustomPrintLoading: false,
  customPrintError: null,
  data: [],
};

const slice = createSlice({
  name: "customPrint",
  initialState,
  reducers: {
    // START Custom Print LOADING
    startCustomPrintLoading(state) {
      state.isCustomPrintLoading = true;
    },

    // HAS CUSTOM PRINT ERROR
    hasCustomPrintError(state, action) {
      state.isCustomPrintLoading = false;
      state.customPrintError = action.payload;
    },

    // GET CUSTOM PRINT DATA
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
        ...action.payload.customPrint,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setCustomPrintPageData } = slice.actions;

// GET CUSTOM PRINT PAGE DATA
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
