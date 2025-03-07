import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isDeliveryLoading: false,
  deliveryError: null,
  deliveryData: [],
  measurementServiceInfo: [],
  countryInfo: {},
};

const slice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    // START Delivery
    startDeliveryLoading(state) {
      state.isDeliveryLoading = true;
    },
    // HAS Delviery
    hasDeliveryError(state, action) {
      state.isDeliveryLoading = false;
      state.deliveryError = action.payload;
    },

    // GET Delivery DATA
    setDeliveryPageData(state, action) {
      state.isDeliveryLoading = false;
      state.deliveryData = action.payload;
      action?.payload?.shipment_list &&
        Object.keys(action?.payload?.shipment_list)?.length > 0 &&
        Object.keys(action?.payload?.shipment_list).map((val, i) => {
          if (
            action?.payload?.shipment_list[val] &&
            action?.payload?.shipment_list[val]["delivery_with_installation"] &&
            action?.payload?.shipment_list[val][
              "delivery_with_installation"
            ][0]["SOL_MEASUREMENT_REQD_YN"]
          )
            state.measurementServiceInfo[val] = {
              SOL_CARRIER_CODE:
                action?.payload?.shipment_list[val][
                  "delivery_with_installation"
                ][0]["SOL_CARRIER_CODE"],
              SOL_MEASUREMENT_REQD_YN:
                action?.payload?.shipment_list[val][
                  "delivery_with_installation"
                ][0]["SOL_MEASUREMENT_REQD_YN"],
            };
        });
      state.countryInfo = action?.payload?.country_info || "";
    },
    setZonePricePageData(state, action) {
      state.isZonePriceLoading = false;
      state.zonePrice = action.payload;
    },
    setMeasurementServiceInfo(state, action) {
      state.measurementServiceInfo[action.payload.key]["SOL_CARRIER_CODE"] =
        action.payload.SOL_CARRIER_CODE;
      state.measurementServiceInfo[action.payload.key][
        "SOL_MEASUREMENT_REQD_YN"
      ] = action.payload.SOL_MEASUREMENT_REQD_YN;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.delivery,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startDeliveryLoading, setMeasurementServiceInfo } =
  slice.actions;

// GET Brands PAGE DATA
export function getDeliveryPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startDeliveryLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`shipping/getZonePrice`, params)
      );
      console.log("DELIVERY PAGE DATA REDUX REDUX", response?.data);
      dispatch(slice.actions.setDeliveryPageData(response?.data));
    } catch (error) {
      console.log("DELIVERY PAGE DATA REDUX ERROR", error);
      console.error(error);
      dispatch(slice.actions.hasDeliveryError(error));
    }
  };
}

//   -----------------------------------------
