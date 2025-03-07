import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isProductSlugLoading: false,
  productSlugError: null,
  data: [],
};

const slice = createSlice({
  name: "productSlug",
  initialState,
  reducers: {
    // START About
    startProductSlugLoading(state) {
      state.isProductSlugLoading = true;
    },

    // HAS About
    hasProductSlugError(state, action) {
      state.isProductSlugLoading = false;
      state.productSlugError = action.payload;
    },

    // GET About DATA
    setProductSlugPageData(state, action) {
      state.isProductSlugLoading = false;
      state.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.productSlug,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startProductSlugLoading } = slice.actions;

// GET About PAGE DATA
export function getProductSlugPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startProductSlugLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/product/third`, params)
      );

      dispatch(slice.actions.setProductSlugPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasProductSlugError(error));
    }
  };
}

//   -----------------------------------------
