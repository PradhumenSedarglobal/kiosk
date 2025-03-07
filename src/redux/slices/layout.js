import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isLayoutLoading: false,
  layoutError: null,
  layout: {
    HEADER: {
      TOPBAR: null,
      MIDMENU: null,
      CATEGORIES: null,
      LOGO: null,
      data: null,
    },
    FOOTER: {
      firstSection: null,
      secondSection: null,
      thirdSection: null,
      fourthSection: null,
    },
    SEO: null,
  },
};

const slice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // START LOADING
    startLayoutLoading(state) {
      state.isLayoutLoading = true;
    },

    // HAS ERROR
    hasLayoutError(state, action) {
      state.isLayoutLoading = false;
      state.layoutError = JSON.stringify(action.payload);
    },

    // GET LAYOUT DATA
    setLayout(state, action) {
      // HEADER START
      state.isLayoutLoading = false;
      state.layout.HEADER.TOPBAR =
        action?.payload?.result?.HEADER?.SG_TOP_BAR || [];
      state.layout.HEADER.MIDMENU =
        action?.payload?.result?.HEADER?.SGMIDSEC || [];
      state.layout.HEADER.CATEGORIES =
        action?.payload?.result?.HEADER?.SGMEGAMENU || [];
      state.layout.HEADER.LOGO = action?.payload?.result?.HEADER?.LOGO || null;
      // state.layout.HEADER.data = action?.payload || null;
      state.layout.SEO = action?.payload?.result?.SEO || null;
      // HEADER END

      // FOOTER START
      state.layout.FOOTER.firstSection =
        action?.payload?.result?.FOOTER?.SG_FOOTER_1 || [];
      state.layout.FOOTER.secondSection =
        action?.payload?.result?.FOOTER?.SG_FOOTER_2 || [];
      state.layout.FOOTER.thirdSection =
        action?.payload?.result?.FOOTER?.SG_FOOTER_3 || [];
      state.layout.FOOTER.fourthSection =
        action?.payload?.result?.FOOTER?.SG_FOOTER_4 || [];
      // FOOTER END
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.layout,
      };
    });
  },
});

// Reducer
export default slice.reducer;

const actions = slice.actions;
// Actions
export const { startLayoutLoading } = actions;

// ----------------------------------------------------------------------

export function getLayout(params = {}) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/header`, params)
      );
      dispatch(actions.setLayout(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(actions.hasLayoutError(error));
    }
  };
}

export function getProductLayout(params = {}) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/header`, params)
      );
      return response?.data;
      // dispatch(actions.setLayout(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(actions.hasLayoutError(error));
    }
  };
}

// ----------------------------------------------------------------------
