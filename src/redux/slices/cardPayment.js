import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCardPaymentLoading: false,
  cardPaymentError: null,
  cardPayment: [],
};

const slice = createSlice({
  name: "cardPayment",
  initialState,
  reducers: {
    // START Order
    startCardPaymentLoading(state) {
      state.isCardPaymentLoading = true;
    },

    // HAS Order
    hasCardPaymentError(state, action) {
      state.isCardPaymentLoading = false;
      state.cardPaymentError = action.payload;
    },

    // GET Order DATA
    setCardPayment(state, action) {
      state.isCardPaymentLoading = false;
      state.cardPayment = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cardPayment,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startCardPaymentLoading } = slice.actions;

// GET Order PAGE DATA
export function getCardPayment(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCardPaymentLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`dashboard/customerCard`, params)
      );
      dispatch(slice.actions.setCardPayment(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCardPaymentError(error));
    }
  };
}

//   -----------------------------------------
