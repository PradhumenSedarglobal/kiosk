import { ReTagCartPage, admitadOrderedItem } from "@/admitad/AdmitadIndex";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  cartPopupOpen: false,
  isCartPageLoading: false,
  isDeliveryPolicyFunLoading: false,
  deliveryPolicyFunError: null,
  cartPageError: null,
  isCartOpenLoading: false,
  cartPageData: {},
  cartPagePopupData: {},
  deliveryPolicyFun: {
    policyDataList: null,
    checkoutPolicy: null,
    data: null,
  },
  cartCityList: null,
  isCartCityListLoading: false,
  hasCartCityListError: null,
  shipping_price: "",
  cartRemarkVal: "",
  deliveryCount: {},
};

const slice = createSlice({
  name: "cartPage",
  initialState,
  reducers: {
    // START Brands
    startCartPageLoading(state) {
      state.isCartPageLoading = true;
    },
    startCartCityListLoading(state) {
      state.isCartCityListLoading = true;
    },

    // HAS Brands
    hasCartPageError(state, action) {
      state.isCartPageLoading = false;
      state.cartPageError = action.payload;
    },
    hasCartCityListError(state, action) {
      state.isCartCityListLoading = false;
      state.hasCartCityListError = action.payload;
    },

    // GET Brands DATA
    setCartPageData(state, action) {
      let cartDatas = {
        ...action.payload,
        complete: [],
        free_sample: [],
      };

      action.payload?.complete &&
        action.payload?.complete?.length > 0 &&
        action.payload?.complete.forEach((element, index) => {
          state.deliveryCount[element?.SOL_SYS_ID] = index + 1;
          if (element?.SOL_ITEM_LABEL != "SAMPLE") {
            cartDatas.complete.push(element);
          } else if (element?.SOL_ITEM_LABEL == "SAMPLE") {
            cartDatas.free_sample.push(element);
          }
        });

      state.cartPageData = cartDatas;
      state.cartPagePopupData = action?.payload || null;
      state.isCartOpenLoading = true;
      state.isCartPageLoading = false;
    },
    // START Brands
    startDeliveryPolicyFunLoading(state) {
      state.isDeliveryPolicyFunLoading = true;
    },

    // HAS Brands
    hasDeliveryPolicyFunError(state, action) {
      state.isDeliveryPolicyFunLoading = false;
      state.deliveryPolicyFunError = action.payload;
    },

    // GET Brands DATA
    setDeliveryPolicyFunData(state, action) {
      state.isDeliveryPolicyFunLoading = false;
      state.deliveryPolicyFun.policyDataList = action.payload?.policyDataList;
      state.deliveryPolicyFun.checkoutPolicy = action.payload?.checkoutPolicy;
      state.deliveryPolicyFun.data = action.payload;
    },
    setCartCityList(state, action) {
      state.isCartCityListLoading = false;
      state.cartCityList = action.payload;
    },
    setCartPopupOpen(state, action) {
      state.cartPopupOpen = action.payload;
    },
    setShippingPrice(state, action) {
      state.shipping_price = action.payload;
    },
    setCartRemarkVal(state, action) {
      state.cartRemarkVal = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cartPage,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startCartPageLoading,
  setCartPageData,
  setCartPopupOpen,
  setShippingPrice,
  setCartRemarkVal,
} = slice.actions;

// GET Brands PAGE DATA
export function getCartPageData(params = {}, isGoogleAnalytics) {
  return async (dispatch) => {
    dispatch(slice.actions.startCartPageLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/order/list`, params)
      );

      dispatch(slice.actions.setCartPageData(response?.data));
      dispatch(
        slice.actions.setShippingPrice(
          response?.data?.header_info?.SOH_SHIP_VALUE || 0
        )
      );
      dispatch(
        slice.actions.setCartRemarkVal(
          response?.data?.header_info?.SOH_DESC || ""
        )
      );
      if (isGoogleAnalytics) {
        GoogleAnalytics && GoogleAnalytics.viewCart(
          response?.data?.complete,
          response?.data?.total_price
        );
        var ad_products = [];
        response?.data?.complete &&
          response?.data?.complete.length > 0 &&
          response?.data?.complete.forEach((item, index) => {
            admitadOrderedItem(item); //ADMITAD Order add
            ad_products.push({
              id: item.brand_info.SII_CODE,
              number: item.SOL_QTY,
            });
          });

        if (ad_products.length > 0) {
          ReTagCartPage(ad_products);
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCartPageError(error));
    }
  };
}

export function getCityList(props) {
  const { country = {}, params = {} } = props;
  return async (dispatch) => {
    dispatch(slice.actions.startCartCityListLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(
          `shipping/getClickAndCollectShowroomList/${country}`,
          params
        )
      );

      dispatch(slice.actions.setCartCityList(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCartCityListError(error));
    }
  };
}

export function getDeliveryPolicyFun(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startDeliveryPolicyFunLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );

      let delivery_policy =
        response?.data?.result &&
        response?.data?.result?.COMPONENT?.length > 0 &&
        response?.data?.result?.COMPONENT[0]
          ? response?.data?.result &&
            response?.data?.result?.COMPONENT?.length > 0 &&
            response?.data?.result?.COMPONENT?.[0]["PARENT"]["CHILD"]
          : [];
      let checkout_policy =
        response?.data?.result &&
        response?.data?.result?.COMPONENT?.length > 0 &&
        response?.data?.result?.COMPONENT[1]["PARENT"]["CHILD"]
          ? response?.data?.result &&
            response?.data?.result?.COMPONENT?.length > 0 &&
            response?.data?.result?.COMPONENT?.[1]["PARENT"]["CHILD"][0]
          : [];

      dispatch(
        slice.actions.setDeliveryPolicyFunData({
          checkoutPolicy: checkout_policy || [],
          policyDataList: delivery_policy || null,
        })
      );
    } catch (error) {
      // console.error(error);
      dispatch(
        slice.actions.hasDeliveryPolicyFunError(JSON.stringify(error) || null)
      );
    }
  };
}

//   -----------------------------------------
