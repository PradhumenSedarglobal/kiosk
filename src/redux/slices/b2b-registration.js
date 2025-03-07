import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isB2BRegistrationLoading: false,
  b2BRegistrationError: null,
  data: [],
};

const slice = createSlice({
  name: "b2BRegistration",
  initialState,
  reducers: {
    // START B2BRegistration
    startB2BRegistrationLoading(state) {
      state.isB2BRegistrationLoading = true;
    },

    // HAS B2BRegistration
    hasB2BRegistrationError(state, action) {
      state.isB2BRegistrationLoading = false;
      state.b2BRegistrationError = action.payload;
    },

    // GET B2BRegistration DATA
    setB2BRegistrationPageData(state, action) {
      state.isB2BRegistrationLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.b2BRegistration,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startB2BRegistrationLoading } = slice.actions;

// GET B2BRegistration PAGE DATA
export function getB2BRegistrationPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startB2BRegistrationLoading());
    try {
      const response = await dispatch(apiDataService.getAll(`v2/homepage/first`,params));
      dispatch(slice.actions.setB2BRegistrationPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasB2BRegistrationError(error));
    }
  };
}

//   -----------------------------------------
