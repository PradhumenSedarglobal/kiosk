import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { BlogData, BlogDetailData } from "@/utils/blog";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isBlogLoading: false,
  blogError: null,
  data: BlogData,
  blog: null,

  isBlogCategoryLoading: false,
  isBlogDetailLoading: false,
  blogCategoryError: null,
  blogDetailError: null,
  blogCategory: [],
  blogDetail: BlogDetailData,
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // START Blog
    startBlogLoading(state) {
      state.isBlogLoading = true;
    },
    startBlogDetailLoading(state) {
      state.isBlogDetailLoading = true;
    },

    startBlogCategoryLoading(state) {
      state.isBlogCategoryLoading = true;
    },

    // HAS Blog
    hasBlogError(state, action) {
      state.isBlogLoading = false;
      state.blogError = action.payload;
    },
    // HAS Blog
    hasBlogCategoryError(state, action) {
      state.isBlogCategoryLoading = false;
      state.blogCategoryError = action.payload;
    },

    hasBlogDetailError(state, action) {
      state.isBlogDetailLoading = false;
      state.blogDetailError = action.payload;
    },

    // GET Blog DATA
    setBlogPageData(state, action) {
      state.isBlogLoading = false;
      // state.data = action.payload;
      state.blog = action.payload;
    },

    setBlogCategoryData(state, action) {
      state.isBlogCategoryLoading = false;
      state.blogCategory = action.payload;
    },
    setBlogDetailData(state, action) {
      state.isBlogDetailLoading = false;
      state.blogDetail = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.blog,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startBlogLoading } = slice.actions;

// GET Blog PAGE DATA
export function getBlogPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startBlogLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );

      dispatch(slice.actions.setBlogPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasBlogError(error));
    }
  };
}

export function getBlogCategoryData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startBlogCategoryLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setBlogCategoryData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasBlogCategoryError(error));
    }
  };
}

export function getBlogDetailData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startBlogDetailLoading());
    try {
      const response = await dispatch(apiDataService.getAll(`v2/homepage/first`, params));
      dispatch(slice.actions.setBlogDetailData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasBlogDetailError(error));
    }
  };
}

//   -----------------------------------------
