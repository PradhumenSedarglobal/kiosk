import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isServiceLoading: false,
  serviceError: null,
  data: [],
};

const slice = createSlice({
  name: "service",
  initialState,
  reducers: {
    // START Service
    startServiceLoading(state) {
      state.isServiceLoading = true;
    },

    // HAS Service
    hasServiceError(state, action) {
      state.isServiceLoading = false;
      state.serviceError = action.payload;
    },

    // GET Service DATA
    setServicePageData(state, action) {
      state.isServiceLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.service,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startServiceLoading } = slice.actions;

// GET Service PAGE DATA
export function getServicePageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startServiceLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setServicePageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasServiceError(error));
    }
  };
}

//   -----------------------------------------
