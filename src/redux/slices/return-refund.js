import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isReturnRefundLoading: false,
  returnRefundError: null,
  data: [],
};

const slice = createSlice({
  name: "returnRefund",
  initialState,
  reducers: {
    // START ReturnRefund
    startReturnRefundLoading(state) {
      state.isReturnRefundLoading = true;
    },

    // HAS ReturnRefund
    hasReturnRefundError(state, action) {
      state.isReturnRefundLoading = false;
      state.returnRefundError = action.payload;
    },

    // GET ReturnRefund DATA
    setReturnRefundPageData(state, action) {
      state.isReturnRefundLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.returnRefund,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startReturnRefundLoading } = slice.actions;

// GET ReturnRefund PAGE DATA
export function getReturnRefundPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startReturnRefundLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setReturnRefundPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasReturnRefundError(error));
    }
  };
}

//   -----------------------------------------
