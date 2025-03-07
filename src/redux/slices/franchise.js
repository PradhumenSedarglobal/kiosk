import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isFranchiseLoading: false,
  franchiseError: null,
  data: [],
};

const slice = createSlice({
  name: "franchise",
  initialState,
  reducers: {
    // START Franchise
    startFranchiseLoading(state) {
      state.isFranchiseLoading = true;
    },

    // HAS Franchise
    hasFranchiseError(state, action) {
      state.isFranchiseLoading = false;
      state.franchiseError = action.payload;
    },

    // GET Franchise DATA
    setFranchisePageData(state, action) {
      state.isFranchiseLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.franchise,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startFranchiseLoading } = slice.actions;

// GET Franchise PAGE DATA
export function getFranchisePageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startFranchiseLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setFranchisePageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFranchiseError(error));
    }
  };
}

//   -----------------------------------------
