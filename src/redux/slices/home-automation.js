import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isHomeAutomationLoading: false,
  homeAutomationError: null,
  data: [],
};

const slice = createSlice({
  name: "homeAutomation",
  initialState,
  reducers: {
    // START About
    startHomeAutomationLoading(state) {
      state.isHomeAutomationLoading = true;
    },

    // HAS About
    hasHomeAutomationError(state, action) {
      state.isHomeAutomationLoading = false;
      state.homeAutomationError = action.payload;
    },

    // GET About DATA
    setHomeAutomationPageData(state, action) {
      state.isHomeAutomationLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.homeAutomation,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startHomeAutomationLoading } = slice.actions;

// GET About PAGE DATA
export function getHomeAutomationPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startHomeAutomationLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setHomeAutomationPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasHomeAutomationError(error));
    }
  };
}

//   -----------------------------------------
