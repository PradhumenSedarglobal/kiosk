import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isContractLoading: false,
  contractError: null,
  data: [],
};

const slice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    // START Contract
    startContractLoading(state) {
      state.isContractLoading = true;
    },

    // HAS Contract
    hasContractError(state, action) {
      state.isContractLoading = false;
      state.contractError = action.payload;
    },

    // GET Contract DATA
    setContractPageData(state, action) {
      state.isContractLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.contract,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startContractLoading } = slice.actions;

// GET Contract PAGE DATA
export function getContractPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startContractLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setContractPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasContractError(error));
    }
  };
}

//   -----------------------------------------
