import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isAddressListLoading: false,
  addressListError: null,
  data: [],
};

const slice = createSlice({
  name: "addressList",
  initialState,
  reducers: {
    // START B2BRegistration
    startAddressListLoading(state) {
      state.isAddressListLoading = true;
    },

    // HAS B2BRegistration
    hasAddressListError(state, action) {
      state.isAddressListLoading = false;
      state.addressListError = action.payload;
    },

    // GET B2BRegistration DATA
    setAddressListPageData(state, action) {
      state.isAddressListLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.addressList,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startAddressListLoading } = slice.actions;

// GET B2BRegistration PAGE DATA
export function getAddressListPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startAddressListLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`dashboard/create_address`, params)
      );
      dispatch(slice.actions.setAddressListPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasAddressListError(error));
    }
  };
}

//   -----------------------------------------
