import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCategoryLoading: false,
  isContactLoading: false,
  categoryError: null,
  contactError: null,
  contactPage: {
    data: null,
    dropdown: [],
    defaultValue: null,
  },
  contactPageData: {
    data: null,
    defaultValue: null,
  },
};

const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // START LOADING
    startCategoryLoading(state) {
      state.isCategoryLoading = true;
    },
    startContactLoading(state) {
      state.isContactLoading = true;
    },

    // HAS ERROR
    hasCategoryError(state, action) {
      state.isCategoryLoading = false;
      state.categoryError = action.payload;
    },
    hasContactError(state, action) {
      state.isContactLoading = false;
      state.contactError = action.payload;
    },

    // GET CONTACT CATEGORY LIST DATA
    setContactPageCategory(state, action) {
      state.isCategoryLoading = false;
      state.contactPage.data = action.payload;
      state.contactPage.dropdown =
        action?.payload?.result?.length > 0
          ? action?.payload?.result &&
            action?.payload?.result?.length > 0 &&
            action?.payload?.result.map((item) => ({
              label: item?.desc,
              value: item?.code,
              ...item,
            }))
          : [];
    },

    // GET CONTACT PAGE DATA
    setContactPageData(state, action) {
      state.isContactLoading = false;
      state.contactPageData.data = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.contact,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startCategoryLoading, startContactLoading } = slice.actions;

// ----------------------------------------------------------------------

// GET CATEGORY
export function getContactCategory(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCategoryLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/content/fetch_enquiry`, params)
      );
      dispatch(slice.actions.setContactPageCategory(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCategoryError(error));
    }
  };
}
// ----------------------------------------------------------------------

// GET CONTACT PAGE DATA
export function getContactPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startContactLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setContactPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasContactError(error));
    }
  };
}

//   -----------------------------------------
