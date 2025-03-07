import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { useRouter } from "next/router";
import React, { createContext } from "react";

const initialState = {
  isCardPaymentLoading: false,
  cardPaymentError: null,
  cardPayment: [],
};

export const SaveCardContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_Card_Payment_LOADING": {
      return { ...state, isCardPaymentLoading: true, cardPaymentError: null };
    }
    case "Has_Card_Payment_Error": {
      return {
        ...state,
        isCardPaymentLoading: false,
        cardPaymentError: action.payload,
      };
    }
    case "Set_Card_Payment_Data": {
      return {
        ...state,
        isCardPaymentLoading: false,
        cardPayment: action.payload,
      };
    }
    default:
      return state;
  }
};

const SaveCardProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { locale } = useRouter();
  const getCardPayment = async (params = {}) => {
    dispatch({ type: "IS_Card_Payment_LOADING" });
    await apiClientV2DataService
      .getAll({
        path: `dashboard/customerCard`,
        param: params,
        locale,
      })
      .then((response) => {
        dispatch({
          type: "Set_Card_Payment_Data",
          payload: response?.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "Has_Card_Payment_Error",
          payload: error,
        });
      });
  };

  return (
    <SaveCardContext.Provider value={{ saveCardState: state, getCardPayment }}>
      {children}
    </SaveCardContext.Provider>
  );
};

export default SaveCardProvider;
