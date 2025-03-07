import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isProjectLoading: false,
  projectError: null,
  data: [],
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // START Project
    startProjectLoading(state) {
      state.isProjectLoading = true;
    },

    // HAS Project
    hasProjectError(state, action) {
      state.isProjectLoading = false;
      state.projectError = action.payload;
    },

    // GET Project DATA
    setProjectPageData(state, action) {
      state.isProjectLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.project,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startProjectLoading } = slice.actions;

// GET Project PAGE DATA
export function getProjectPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startProjectLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setProjectPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasProjectError(error));
    }
  };
}

//   -----------------------------------------
