import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { find } from "lodash";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isFreeSampleLoading: false,
  freeSampleError: null,
  content: [],
  first: [],
  second: [],
  third: [],
  freeSampleProducts: [],
};

const slice = createSlice({
  name: "freeSample",
  initialState,
  reducers: {
    // START FreeSample
    startFreeSampleLoading(state) {
      state.isFreeSampleLoading = true;
    },

    // HAS FreeSample
    hasFreeSampleError(state, action) {
      state.isFreeSampleLoading = false;
      state.freeSampleError = action.payload;
    },

    // GET FreeSample DATA
    setFreeSamplePageData(state, action) {
      state.isFreeSampleLoading = false;
      state.first = action.payload;
    },
    setFreeSampleContentPageData(state, action) {
      state.isFreeSampleLoading = false;
      state.content = action.payload;
    },
    setFreeSampleMaterialSecondPageData(state, action) {
      state.isFreeSampleLoading = false;
      state.second = action.payload;
    },
    setFreeSampleMaterialThirdPageData(state, action) {
      state.isFreeSampleLoading = false;
      state.third = action.payload;
    },
    setFreeSampleProductData(state, action) {
      state.isFreeSampleLoading = false;
      state.freeSampleProducts = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.freeSample,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startFreeSampleLoading, setFreeSampleMaterialSecondPageData } =
  slice.actions;

// GET FreeSample PAGE DATA
export function getFreeSampleCategoryPageData({ params = {}, productId = {} }) {
  return async (dispatch) => {
    dispatch(slice.actions.startFreeSampleLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`freesample/category`, params)
      );

      if (productId) {
        dispatch(
          slice.actions.setFreeSampleProductData(
            find(response?.data?.result, { id: productId })
          )
        );
      } else {
        dispatch(
          slice.actions.setFreeSampleProductData(
            response?.data && response?.data?.result?.length > 0
              ? response?.data?.result[0]
              : []
          )
        );
      }

      dispatch(slice.actions.setFreeSamplePageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFreeSampleError(error));
    }
  };
}

//   -----------------------------------------

export function getFreeSampleContentPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startFreeSampleLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setFreeSampleContentPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFreeSampleError(error));
    }
  };
}

//   -----------------------------------------

export function getFreeSampleSecondMaterialPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startFreeSampleLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/filters`, params)
      );
      dispatch(
        slice.actions.setFreeSampleMaterialSecondPageData(response?.data)
      );
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFreeSampleError(error));
    }
  };
}
//   -----------------------------------------

export function getFreeSampleThirdMaterialPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startFreeSampleLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/third?`, params)
      );
      dispatch(
        slice.actions.setFreeSampleMaterialThirdPageData(response?.data)
      );
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasFreeSampleError(error));
    }
  };
}
