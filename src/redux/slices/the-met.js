import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isTheMetLoading: false,
  theMetError: null,
  data: [],
};

const slice = createSlice({
  name: "theMet",
  initialState,
  reducers: {
    // START TheMet
    startTheMetLoading(state) {
      state.isTheMetLoading = true;
    },

    // HAS TheMet
    hasTheMetError(state, action) {
      state.isTheMetLoading = false;
      state.theMetError = action.payload;
    },

    // GET TheMet DATA
    setTheMetPageData(state, action) {
      state.isTheMetLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.theMet,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startTheMetLoading } = slice.actions;

// GET TheMet PAGE DATA
export function getTheMetPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startTheMetLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setTheMetPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasTheMetError(error));
    }
  };
}

//   -----------------------------------------
