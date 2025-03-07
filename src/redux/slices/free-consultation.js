import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isFreeConsultationLoading: false,
  freeConsultationError: null,
  data: [],
};

const slice = createSlice({
  name: "freeConsultation",
  initialState,
  reducers: {
    // START FreeConsultation
    startFreeConsultationLoading(state) {
      state.isFreeConsultationLoading = true;
    },

    // HAS FreeConsultation
    hasFreeConsultationError(state, action) {
      state.isFreeConsultationLoading = false;
      state.freeConsultationError = action.payload;
    },

    // GET FreeConsultation DATA
    setFreeConsultationPageData(state, action) {
      state.isFreeConsultationLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.freeConsultation,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startFreeConsultationLoading } = slice.actions;

// GET FreeConsultation PAGE DATA
export function getFreeConsultationPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startFreeConsultationLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setFreeConsultationPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFreeConsultationError(error));
    }
  };
}

//   -----------------------------------------
