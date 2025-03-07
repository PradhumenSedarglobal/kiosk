import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { setJWTContextData } from "./jwtContext";
import { setCookie } from "cookies-next";
import { SEDAR_USER_DATA } from "@/utils/constant";
// ----------------------------------------------------------------------

const initialState = {
  isProfileSettingLoading: false,
  isProfileAddressLoading: false,
  profileSettingError: null,
  editProfileError: null,
  addressError: null,
  setting: [],
  address: [],
  editProfile: [],
  defaultShippingAddress: null,
};

const slice = createSlice({
  name: "profileSetting",
  initialState,
  reducers: {
    // START ProfileSetting
    startProfileSettingLoading(state) {
      state.isProfileSettingLoading = true;
    },
    startProfileAddressLoading(state) {
      state.isProfileAddressLoading = true;
    },
    startEditProfileLoading(state) {
      state.isEditProfileLoading = true;
    },

    // HAS ProfileSetting
    hasProfileSettingError(state, action) {
      state.isProfileSettingLoading = false;
      state.profileSettingError = action.payload;
    },
    hasEditProfileSettingError(state, action) {
      state.isEditProfileLoading = false;
      state.editProfileError = action.payload;
    },
    hasProfileAddressError(state, action) {
      state.isProfileAddressLoading = false;
      state.addressError = action.payload;
    },
    // GET ProfileSetting DATA
    setProfileSettingPageData(state, action) {
      state.isProfileSettingLoading = false;
      state.setting = action.payload;
    },
    // GET ProfileAddress DATA
    setProfileAddressPageData(state, action) {
      state.isProfileAddressLoading = false;
      state.address = action.payload;
      state.defaultShippingAddress =
        (action.payload.result &&
          action.payload?.result?.length > 0 &&
          action.payload.result.find((item) => item.cad_default_yn == "Y")) ||
        null;
    },
    // GET EditProfile DATA
    setEditProfilePageData(state, action) {
      state.isEditProfileLoading = false;
      state.editProfile = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.profileSetting,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startProfileSettingLoading,
  startProfileAddressLoading,
  startEditProfileLoading,
} = slice.actions;

// GET ProfileSetting PAGE DATA
export function getProfileAddress(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startProfileAddressLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(
          `dashboard/list_address/${params?.USER_ID}`,
          params
        )
      );
      console.log("response?.data", response?.data);
      dispatch(slice.actions.setProfileAddressPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasProfileAddressError(error));
    }
  };
}

//   -----------------------------------------

// GET EditProfileSetting PAGE DATA
export function getEditProfile(params = {}) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startEditProfileLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(
          `dashboard/edit_profile/${params?.USER_ID}`,
          params
        )
      );
      dispatch(slice.actions.setEditProfilePageData(response?.data));
      setCookie(SEDAR_USER_DATA, JSON.stringify(response?.data?.result), {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_MONTH,
      });
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasEditProfileSettingError(error));
    }
  };
}

//   -----------------------------------------
