import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isShippingAddressLoading: false,
  shippingAddressError: null,
  shippingAddressList: [],
  defaultShippingAddress: null
};

const slice = createSlice({
  name: "shippingAdress",
  initialState,
  reducers: {
    // START Shipping Address Loading
    startShippingAddressLoading(state) {
      state.isShippingAddressLoading = true;
    },

    // HAS Shipping Address
    shippingAddressError(state, action) {
      state.isShippingAddressLoading = false;
      state.shippingAddressError = action.payload;
    },

    // GET Service DATA
    setShippingAddressList(state, action) {
      state.isShippingAddressLoading = false;
      state.shippingAddressList = action.payload;
      action.payload && action.payload.result?.length > 0 && action.payload.result.forEach((element) => {
        if (element.cad_default_yn == 'Y') {
          state.defaultShippingAddress = element
        }
      })
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.shippingAdress,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startShippingAddressLoading } = slice.actions;

// GET Service PAGE DATA
export function getShippingAddressList(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startShippingAddressLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(
          `dashboard/login_country_list_address/${params?.id}/${params?.CNISO}`,
          params
        )
      );
      dispatch(slice.actions.setShippingAddressList(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.shippingAddressError(error));
    }
  };
}
