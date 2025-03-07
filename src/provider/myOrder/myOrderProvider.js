import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { useRouter } from "next/router";
import React, { createContext } from "react";

const initialState = {
  isMyOrderLoading: false,
  myOrderError: null,
  myOrderData: [],
};

export const MyOrderContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_MY_ORDER_LOADING": {
      return { ...state, isMyOrderLoading: true, myOrderError: null };
    }
    case "HAS_MY_ORDER_ERROR": {
      return {
        ...state,
        isMyOrderLoading: false,
        myOrderError: action.payload,
      };
    }
    case "SET_MY_ORDER_DATA": {
      return {
        ...state,
        isMyOrderLoading: false,
        myOrderData: action.payload,
      };
    }
    default:
      return state;
  }
};

const MyOrderData = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { locale } = useRouter();
  const getMyOrderData = async (params = {}) => {
    dispatch({ type: "IS_MY_ORDER_LOADING" });
    await apiClientV2DataService
      .getAll({
        path: `dashboard/orderLineList`,
        param: params,
        locale,
      })
      .then((response) => {
        dispatch({
          type: "SET_MY_ORDER_DATA",
          payload: response?.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "HAS_MY_ORDER_ERROR",
          payload: error,
        });
      });
  };

  return (
    <MyOrderContext.Provider value={{ myOrderState: state, getMyOrderData }}>
      {children}
    </MyOrderContext.Provider>
  );
};

export default MyOrderData;
