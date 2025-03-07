import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isToolGuidesLoading: false,
  toolGuidesError: null,
  data: [],
};

const slice = createSlice({
  name: "toolGuides",
  initialState,
  reducers: {
    // START ToolGuides
    startToolGuidesLoading(state) {
      state.isToolGuidesLoading = true;
    },

    // HAS ToolGuides
    hasToolGuidesError(state, action) {
      state.isToolGuidesLoading = false;
      state.toolGuidesError = action.payload;
    },

    // GET ToolGuides DATA
    setToolGuidesPageData(state, action) {
      state.isToolGuidesLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.toolGuides,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startToolGuidesLoading } = slice.actions;

// GET ToolGuides PAGE DATA
export function getToolGuidesPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startToolGuidesLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setToolGuidesPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasToolGuidesError(error));
    }
  };
}

//   -----------------------------------------
