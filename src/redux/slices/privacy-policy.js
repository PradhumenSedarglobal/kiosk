import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isPrivacyPolicyLoading: false,
  privacyPolicyError: null,
  data: [],
};

const slice = createSlice({
  name: "privacyPolicy",
  initialState,
  reducers: {
    // START PrivacyPolicy
    startPrivacyPolicyLoading(state) {
      state.isPrivacyPolicyLoading = true;
    },

    // HAS PrivacyPolicy
    hasPrivacyPolicyError(state, action) {
      state.isPrivacyPolicyLoading = false;
      state.privacyPolicyError = action.payload;
    },

    // GET PrivacyPolicy DATA
    setPrivacyPolicyPageData(state, action) {
      state.isPrivacyPolicyLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.privacyPolicy,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startPrivacyPolicyLoading } = slice.actions;

// GET PrivacyPolicy PAGE DATA
export function getPrivacyPolicyPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startPrivacyPolicyLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setPrivacyPolicyPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasPrivacyPolicyError(error));
    }
  };
}

//   -----------------------------------------
