import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCountryLoading: false,
  countryError: null,
  country: {
    data: null,
    dropdown: [],
    defaultValue: null,
  },
  city: {
    data: null,
    dropdown: [],
    defaultValue: null,
  },
  area: {
    data: null,
    dropdown: [],
    defaultValue: null,
  },
  isCityLoading: false,
  cityError: null,
  // city: null,
  isAreaLoading: false,
  areaError: null,
  // area: null,
};

const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    //  =====COUNTRY START=====
    // START LOADING
    startCountryLoading(state) {
      state.isCountryLoading = true;
    },

    // HAS ERROR
    hasCountryError(state, action) {
      state.isCountryLoading = false;
      state.countryError = action.payload;
    },

    // GET COUNTRY DATA
    setCountry(state, action) {
      const cn_iso = action?.payload?.cn_iso;
      const setDefaultValue =
        action?.payload?.data?.result &&
        action?.payload?.data?.result?.length > 0
          ? action?.payload?.data?.result.find(
              (item) => item.country_iso == cn_iso
            )
          : null;
      state.isCountryLoading = false;
      state.country.data = action.payload;
      state.country.dropdown =
        action?.payload?.data?.result?.length > 0
          ? action?.payload?.data?.result &&
            action?.payload?.data?.result?.length > 0 &&
            action?.payload?.data?.result.map((item) => ({
              label: item?.country_desc,
              value: item?.country_iso,
              ...item,
            }))
          : [];
      if (setDefaultValue?.country_desc) {
        state.country.defaultValue = {
          label: setDefaultValue?.country_desc,
          value: setDefaultValue?.country_iso,
        };
      }
    },
    setDefaultCountry(state, action) {
      const cn_iso = action?.payload;
      const setDefaultValue =
        state.country?.dropdown && state.country?.dropdown?.length > 0
          ? state.country?.dropdown.find((item) => item.country_iso == cn_iso)
          : null;
      if (setDefaultValue?.country_desc) {
        state.country.defaultValue = {
          label: setDefaultValue?.country_desc,
          value: setDefaultValue?.country_iso,
        };
      } else {
        state.country.defaultValue = null;
      }
    },
    // =====COUNTRY END=====

    // =====CITY START=====
    // START LOADING
    startCityLoading(state) {
      state.isCityLoading = true;
    },

    // HAS ERROR
    hasCityError(state, action) {
      state.isCityLoading = false;
      state.cityError = action.payload;
    },

    // GET CITY DATA
    setCity(state, action) {
      state.isCityLoading = false;
      state.city.data = action.payload;
      state.city.dropdown =
        action?.payload?.result?.length > 0
          ? action?.payload?.result &&
            action?.payload?.result?.length > 0 &&
            action?.payload?.result.map((item) => ({
              label: item?.state_desc || item?.SCT_DESC,
              value: item?.state_code || item?.SCT_CODE,
              ...item,
            }))
          : [];
    },
    // =====CITY END=====

    // =====AREA START=====
    // START LOADING
    startAreaLoading(state) {
      state.isAreaLoading = true;
    },

    // HAS ERROR
    hasAreaError(state, action) {
      state.isAreaLoading = false;
      state.areaError = action.payload;
    },

    // GET AREA DATA
    setArea(state, action) {
      state.isAreaLoading = false;
      state.area.data = action.payload;
      state.area.dropdown =
        action?.payload?.result?.length > 0
          ? action?.payload?.result &&
            action?.payload?.result?.length > 0 &&
            action?.payload?.result.map((item) => ({
              label: item?.city_desc,
              value: item?.city_code,
              ...item,
            }))
          : [];
    },
    // =====AREA END=====
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.location,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startCountryLoading,
  startCityLoading,
  startAreaLoading,
  setDefaultCountry,
} = slice.actions;

// ----------------------------------------------------------------------

export function getCountry({ params = {}, cn_iso }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startCountryLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`fetch/country_lov`, {
          params: params,
        })
      );
      let data = {
        cn_iso: cn_iso,
        data: response?.data,
      };
      dispatch(slice.actions.setCountry(data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCountryError(error));
    }
  };
}

export function getCity(url, params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCityLoading());
    try {
      const response = await dispatch(apiDataService.getAll(url, params));
      dispatch(slice.actions.setCity(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCityError(error));
    }
  };
}

export function getArea(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startAreaLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`fetch/country_area_lov`, params)
      );
      dispatch(slice.actions.setArea(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasAreaError(error));
    }
  };
}
// ----------------------------------------------------------------------
