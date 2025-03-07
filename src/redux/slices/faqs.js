import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isFaqsLoading: false,
  faqsError: null,
  data: [],
};

const slice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    // START Faqs
    startFaqsLoading(state) {
      state.isFaqsLoading = true;
    },

    // HAS Faqs
    hasFaqsError(state, action) {
      state.isFaqsLoading = false;
      state.faqsError = action.payload;
    },

    // GET Faqs DATA
    setFaqsPageData(state, action) {
      state.isFaqsLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.faqs,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startFaqsLoading } = slice.actions;

// GET Faqs PAGE DATA
export function getFaqsPageData(params = "") {
  return async (dispatch) => {
    dispatch(slice.actions.startFaqsLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setFaqsPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFaqsError(error));
    }
  };
}

//   -----------------------------------------
