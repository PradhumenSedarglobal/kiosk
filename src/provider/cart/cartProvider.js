import { admitadOrderedItem, ReTagCartPage } from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import { setCartPageData } from "@/redux/slices/cartPage";
import { useDispatch } from "@/redux/store";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { getDeliveryPolicyFunData } from "@/utils/cart";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { useRouter } from "next/router";
import React, { createContext } from "react";

const initialState = {
  isCartLoading: false,
  isCartCityListLoading: false,
  isDeliveryPolicyFunLoading: false,
  deliveryPolicyFunError: null,
  cartCityListError: null,
  cartError: null,
  cart: null,
  deliveryCount: {},
  cartPopupData: null,
  cartRemarkVal: null,
  shipping_price: null,
  cartCityList: null,
  deliveryPolicyFun: {
    policyDataList: null,
    checkoutPolicy: null,
    data: null,
  },
};

export const CartContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_CART_LOADING": {
      return { ...state, isCartLoading: true, cartError: null };
    }
    case "IS_CART_CITY_LIST_LOADING": {
      return { ...state, isCartCityListLoading: true, cartCityListError: null };
    }

    case "IS_DELIVERY_POLICY_FUN_LOADING": {
      return {
        ...state,
        isDeliveryPolicyFunLoading: true,
        deliveryPolicyFunError: null,
      };
    }
    case "SET_CART_DATA": {
      let cartDatas = {
        ...action.payload,
        complete: [],
        free_sample: [],
      };
      const deliveryCounts = {};
      action.payload?.complete &&
        action.payload?.complete?.length > 0 &&
        action.payload?.complete.forEach((element, index) => {
          deliveryCounts[element?.SOL_SYS_ID] = index + 1;
          if (element?.SOL_ITEM_LABEL != "SAMPLE") {
            cartDatas.complete.push(element);
          } else if (element?.SOL_ITEM_LABEL == "SAMPLE") {
            cartDatas.free_sample.push(element);
          }
        });

      return {
        ...state,
        isCartLoading: false,
        cart: cartDatas,
        deliveryCount: deliveryCounts,
      };
    }
    case "SET_CART_POP_UP_DATA": {
      return {
        ...state,
        isCartLoading: false,
        cartPopupData: action.payload,
      };
    }
    case "SET_CART_REMARK_VAL": {
      return { ...state, cartRemarkVal: action.payload };
    }
    case "SET_SHIPPING_PRICE": {
      return { ...state, shipping_price: action.payload };
    }
    case "SET_CART_CITY_LIST": {
      return {
        ...state,
        isCartCityListLoading: false,
        cartCityList: action.payload,
      };
    }
    case "SET_DELIVERY_POLICY_FUN": {
      return {
        ...state,
        deliveryPolicyFun: {
          policyDataList: action?.payload?.policyDataList,
          checkoutPolicy: action?.payload?.checkoutPolicy,
          data: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { state: authState } = useAuthContext();
  const { cookies } = authState || {};
  const { JWTAuthToken } = cookies || {};
  const router = useRouter();
  const { locale, query } = router;
  const { head_sys_id } = query;
  const getMyCartData = async (props) => {
    const { isGoogleAnalytics, params } = props || {};
    dispatch({ type: "IS_CART_LOADING" });
    await apiClientV2DataService
      .getAll({
        path: `kiosk/order/orderList`,
        param: {
          soh_sys_id: head_sys_id || 0,
          ...((params && params) || {}),
        },
        locale,
      })
      .then((response) => {
        dispatch({
          type: "SET_CART_DATA",
          payload: response?.data,
        });
        dispatch({
          type: "SET_CART_POP_UP_DATA",
          payload: response?.data,
        });
        dispatch({
          type: "SET_SHIPPING_PRICE",
          payload: response?.data?.header_info?.SOH_SHIP_VALUE || 0,
        });
        dispatch({
          type: "SET_CART_REMARK_VAL",
          payload: response?.data?.header_info?.SOH_DESC || "",
        });
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
      })
      .catch((error) => {
        dispatch({
          type: "HAS_MY_ORDER_ERROR",
          payload: error,
        });
      });
  };

  const setCartRemarkVal = (value) => {
    dispatch({
      type: "SET_CART_REMARK_VAL",
      payload: value,
    });
  };

  const setShippingPrice = (value) => {
    dispatch({
      type: "SET_SHIPPING_PRICE",
      payload: value,
    });
  };

  const setCartData = (response) => {
    dispatch({
      type: "SET_CART_DATA",
      payload: response,
    });
    dispatch({
      type: "SET_CART_POP_UP_DATA",
      payload: response,
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (locale && locale != "default") {
        getMyCartData();
      }
    }, 500);
  }, [locale, router, head_sys_id, JWTAuthToken]);

  const getCityList = async (props) => {
    const { country = {}, params = {} } = props;
    dispatch({
      type: "IS_CART_CITY_LIST_LOADING",
    });
    await apiClientV2DataService
      .getAll({
        path: `shipping/getClickAndCollectShowroomList/${country}`,
        param: params,
        locale,
      })
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "SET_CART_CITY_LIST",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.error("IS_CART_CITY__LIST_ERROR", error);
      });
  };
  const setDeliveryPolicyFun = async ({ data = {} }) => {
    let delivery_policy =
      data?.result &&
      data?.result?.COMPONENT?.length > 0 &&
      data?.result?.COMPONENT[0]
        ? data?.result &&
          data?.result?.COMPONENT?.length > 0 &&
          data?.result?.COMPONENT?.[0]["PARENT"]["CHILD"]
        : [];
    let checkout_policy =
      data?.result &&
      data?.result?.COMPONENT?.length > 0 &&
      data?.result?.COMPONENT[1]["PARENT"]["CHILD"]
        ? data?.result &&
          data?.result?.COMPONENT?.length > 0 &&
          data?.result?.COMPONENT?.[1]["PARENT"]["CHILD"][0]
        : [];

    dispatch({
      type: "SET_DELIVERY_POLICY_FUN",
      payload: {
        checkoutPolicy: checkout_policy || [],
        policyDataList: delivery_policy || null,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState: state,
        getMyCartData,
        setCartData,
        setCartRemarkVal,
        setShippingPrice,
        getCityList,
        setDeliveryPolicyFun,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
