import { useAuthContext } from "@/auth/useAuthContext";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { useRouter } from "next/router";
import React from "react";

const initialState = {
  isAddressLoading: false,
  isProfileLoading: false,
  profileError: null,
  addressError: null,
  address: [],
  profile: [],
  defaultShippingAddress: null,
};

export const ProfileContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_PROFILE_LOADING":
      return {
        ...state,
        isProfileLoading: action.payload,
      };
      break;
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
      break;
    case "IS_Address_LOADING":
      return {
        ...state,
        isAddressLoading: action.payload,
      };
      break;
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
      break;
    case "SET_DEFAULT_SHIPPING_ADDRESS":
      return {
        ...state,
        defaultShippingAddress: action.payload,
      };
    case "SET_PROFILE_ERROR":
      return {
        ...state,
        profileError: action.payload,
      };
      break;
    case "SET_ADDRESS_ERROR":
      return {
        ...state,
        addressError: action.payload,
      };
      break;
    default:
      return state;
  }
};

const ProfileProvider = ({ children }) => {
  const { locale } = useRouter();
  const { handleSetUserEditData, logout } = useAuthContext();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getAddress = async (params = {}) => {
    dispatch({ type: "IS_ADDRESS_LOADING", payload: true });
    await apiClientV2DataService
      .getAll({
        path: `dashboard/list_address/${params?.USER_ID}`,
        param: params,
        locale,
      })
      .then((response) => {
        dispatch({
          type: "SET_ADDRESS",
          payload: response?.data,
        });

        dispatch({
          type: "SET_DEFAULT_SHIPPING_ADDRESS",
          payload:
            (response?.data?.result &&
              response?.data?.result?.length > 0 &&
              response?.data?.result.find(
                (item) => item.cad_default_yn == "Y"
              )) ||
            null,
        });
        dispatch({ type: "IS_ADDRESS_LOADING", payload: false });
      })
      .catch((error) => {
        console.error("SET_ADDRESS_ERROR", error);
        dispatch({
          type: "SET_ADDRESS_ERROR",
          payload: error,
        });
        dispatch({ type: "IS_ADDRESS_LOADING", payload: false });
      });
  };

  const getProfile = async (params = {}, locale) => {
    dispatch({ type: "IS_PROFILE_LOADING", payload: true });
    await apiClientV2DataService
      .getAll({
        path: `dashboard/edit_profile/${params?.USER_ID}`,
        param: params,
        locale,
      })
      .then((response) => {
        dispatch({
          type: "SET_PROFILE",
          payload: response?.data,
        });

        handleSetUserEditData({
          user: response?.data?.result,
        });
        dispatch({ type: "IS_PROFILE_LOADING", payload: false });
      })
      .catch((error) => {
        if (error?.code == "ERR_NETWORK") {
          logout();
        }
        console.error("SET_PROFILE_ERROR", error, error?.code == "ERR_NETWORK");
        dispatch({
          type: "SET_PROFILE_ERROR",
          payload: error,
        });
        dispatch({ type: "IS_PROFILE_LOADING", payload: false });
      });
  };

  return (
    <ProfileContext.Provider
      value={{ profileState: state, getAddress, getProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
