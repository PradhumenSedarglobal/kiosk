import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isBrandsLoading: false,
  brandsError: null,
  data: [],
};

const slice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    // START Brands
    startBrandsLoading(state) {
      state.isBrandsLoading = true;
    },

    // HAS Brands
    hasBrandsError(state, action) {
      state.isBrandsLoading = false;
      state.brandsError = action.payload;
    },

    // GET Brands DATA
    setBrandsPageData(state, action) {
      state.isBrandsLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.brands,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startBrandsLoading } = slice.actions;

// GET Brands PAGE DATA
export function getBrandsPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startBrandsLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setBrandsPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasBrandsError(error));
    }
  };
}

//   -----------------------------------------
