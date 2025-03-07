import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isAccessibilityLoading: false,
  accessibilityError: null,
  data: [],
};

const slice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    // START Accessibility
    startAccessibilityLoading(state) {
      state.isAccessibilityLoading = true;
    },

    // HAS Accessibility
    hasAccessibilityError(state, action) {
      state.isAccessibilityLoading = false;
      state.accessibilityError = action.payload;
    },

    // GET Accessibility DATA
    setAccessibilityPageData(state, action) {
      state.isAccessibilityLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.accessibility,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startAccessibilityLoading } = slice.actions;

// GET Accessibility PAGE DATA
export function getAccessibilityPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startAccessibilityLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setAccessibilityPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasAccessibilityError(error));
    }
  };
}

//   -----------------------------------------
