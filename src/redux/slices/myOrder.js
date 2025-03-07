import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isMyOrderLoading: false,
  myOrderError: null,
  myOrderData: [],
};

const slice = createSlice({
  name: "myOrder",
  initialState,
  reducers: {
    // START Order
    startMyOrderLoading(state) {
      state.isMyOrderLoading = true;
    },

    // HAS Order
    hasMyOrderError(state, action) {
      state.isMyOrderLoading = false;
      state.myOrderError = action.payload;
    },

    // GET Order DATA
    setMyOrderPageData(state, action) {
      state.isMyOrderLoading = false;
      state.myOrderData = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.myOrder,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startMyOrderLoading } = slice.actions;

// GET Order PAGE DATA
export function getMyOrderData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startMyOrderLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`dashboard/orderLineList`, params)
      );
      dispatch(slice.actions.setMyOrderPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasMyOrderError(error));
    }
  };
}

//   -----------------------------------------
