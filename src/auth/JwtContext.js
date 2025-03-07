import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
// utils
import axios from "@/utils/axios";
import localStorageAvailable from "@/utils/localStorageAvailable";
//
import { useAlert } from "@/provider/alert/useAlert";
import {
  ACCESS_TOKEN_KEY,
  NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
  NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN,
  NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL,
  SEDAR_FIRST_GEO_DATA,
} from "@/utils/constant";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { getCookie, setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { isValidToken, setSession, setSessionData, setUserId } from "./utils";
import { useDispatch } from "@/redux/store";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const getAllCookies = getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
  ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined")
  : {};

const getLanguageDropDown = getCookie(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN)
  ? JSON.parse(
      getCookie(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN) || "undefined"
    )
  : [];
const getSiteDetail = getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL)
  ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL) || "undefined")
  : {};
const GET_SEDAR_FIRST_GEO_DATA = getCookie(SEDAR_FIRST_GEO_DATA)
  ? JSON.parse(getCookie(SEDAR_FIRST_GEO_DATA) || "undefined")
  : {};

export const AuthContext = createContext(null);
const initialState = {
  isInitialized: false,
  cartPopupOpen: false,
  isAuthenticated: false,
  cookies: {
    ...getAllCookies,
    languageDropDown: getLanguageDropDown,
    siteDetails: getSiteDetail,
    SEDAR_FIRST_GEO_DATA: GET_SEDAR_FIRST_GEO_DATA,
  },
  loginPopupOpen: false,
  isRedirectCheckout: false,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    const initialState = {
      ...state,
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      cookies: action.payload.cookies,
    };
    return initialState;
  }
  if (action.type === "LOGIN") {
    setCookie(
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
      JSON.stringify(action?.payload?.cookies || "undefined")
    );
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === "LOGOUT") {
    const cookiesData = {
      ...(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
        ? JSON.parse(
            getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined"
          )
        : {}),
      user: null,
      modificationUser: null,
      JWTAuthToken: null,
      USER_ID: 0,
      isGuestUser: false,
    };
    const logoutData = {
      ...state,
      isAuthenticated: false,
      cookies: cookiesData,
    };
    setCookie(
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
      JSON.stringify(cookiesData || "undefined")
    );
    return logoutData;
  }
  if (action.type === "LOGIN_POPUP_OPEN") {
    return {
      ...state,
      loginPopupOpen: action.payload,
    };
  }
  if (action.type === "IS_REDIRECT_CHECKOUT") {
    return {
      ...state,
      isRedirectCheckout: action.payload,
    };
  }
  if (action.type === "SET_CART_POPUP_OPEN") {
    return {
      ...state,
      cartPopupOpen: action.payload,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const router = useRouter();
  const { locale } = router;
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { showAlertMessage } = useAlert();
  const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch();

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    const getAllCookies = getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
      ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined")
      : {};

    const getLanguageDropDown = getCookie(
      NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN
    )
      ? JSON.parse(
          getCookie(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN) || "undefined"
        )
      : [];

    const getSiteDetail = getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL)
      ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL) || "undefined")
      : {};
    const GET_SEDAR_FIRST_GEO_DATA = getCookie(SEDAR_FIRST_GEO_DATA)
      ? JSON.parse(getCookie(SEDAR_FIRST_GEO_DATA) || "undefined")
      : {};
    const setCookies = {
      ...getAllCookies,
      languageDropDown: getLanguageDropDown || [],
      SEDAR_FIRST_GEO_DATA: GET_SEDAR_FIRST_GEO_DATA,
      siteDetails: getSiteDetail,
    };
    try {
      if (
        getAllCookies?.JWTAuthToken &&
        isValidToken(getAllCookies?.JWTAuthToken)
      ) {
        setSession(getAllCookies?.JWTAuthToken);
        setClientSideReduxCookie({ dispatch: reduxDispatch, router: router });
        dispatch({
          type: "INITIAL",
          payload: {
            isInitialized: state?.isInitialized,
            isAuthenticated: true,
            cookies: setCookies,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isInitialized: true,
            isAuthenticated: false,
            cookies: setCookies,
          },
        });
        setClientSideReduxCookie({ dispatch: reduxDispatch, router: router });
      }
    } catch (error) {
      console.error("INITIALINITIALINITIALINITIAL", error);
      dispatch({
        type: "INITIAL",
        payload: {
          isInitialized: true,
          isAuthenticated: false,
          cookies: {
            ...getAllCookies,
            languageDropDown: getLanguageDropDown || [],
            SEDAR_FIRST_GEO_DATA: GET_SEDAR_FIRST_GEO_DATA,
            siteDetails: getSiteDetail,
          },
        },
      });
      setClientSideReduxCookie({ dispatch: reduxDispatch, router: router });
    }
  }, [storageAvailable, router, state]);

  useEffect(() => {
    initialize();
  }, [locale, router]);

  const setIsRedirectCheckout = useCallback(
    (value) => {
      dispatch({
        type: "IS_REDIRECT_CHECKOUT",
        payload: value,
      });
    },
    [state]
  );

  const setLoginPopupOpen = useCallback(
    (value) => {
      dispatch({
        type: "LOGIN_POPUP_OPEN",
        payload: value,
      });
    },
    [state]
  );

  const handleSetUserEditData = useCallback(
    (userDetail) => {
      const userDetailData = getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
        ? {
            ...state.cookies,
            ...JSON.parse(
              getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined"
            ),
            ...userDetail,
          }
        : {};

      dispatch({
        type: "LOGIN",
        payload: {
          isInitialized: true,
          isAuthenticated: true,
          cookies: userDetailData,
        },
      });
      setCookie(
        NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
        JSON.stringify(userDetailData || "undefined")
      );
    },
    [state]
  );

  const setCartPopupOpen = useCallback(
    (value) => {
      dispatch({
        type: "SET_CART_POPUP_OPEN",
        payload: value,
      });
    },
    [state]
  );

  // LOGIN
  const login = useCallback(
    async (data) => {
      const { values, url, formik, handleClose } = data;

      const formData = new FormData();

      for (let key in values) {
        formData.append(key, values[key]);
      }

      axios
        .post(`${url}`, formData)
        .then((response) => {
          if (response?.data?.return_status == 0) {
            const { auth_token, user_detail, modification_user_info } =
              response?.data?.result;
            const userDetail =
              user_detail && user_detail?.length > 0
                ? user_detail?.[0]
                : "undefined";
            // setSession(auth_token);
            // setSessionData(user_detail ? JSON.stringify(userDetail) : null);

            // setSessionModificationData(
            //   modification_user_info
            //     ? JSON.stringify(modification_user_info)
            //     : null
            // );

            // setUserId(userDetail ? userDetail?.cust_id : null);

            // dispatch(setModificationUser(modification_user_info));

            dispatch({
              type: "LOGIN",
              payload: {
                isInitialized: true,
                isAuthenticated: true,
                cookies: getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
                  ? {
                      ...JSON.parse(
                        getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) ||
                          "undefined"
                      ),
                      user: userDetail ? userDetail : null,
                      USER_ID: userDetail && userDetail?.cust_id,
                      JWTAuthToken: auth_token,
                      modificationUser: modification_user_info
                        ? modification_user_info
                        : null,
                      isGuestUser: false,
                    }
                  : {},
              },
            });

            // setClientSideReduxCookie({ dispatch: dispatch, router: router });
            // setTimeout(() => {
            //   setIsRedirectCheckout(true);
            // }, 500);

            showAlertMessage({
              color: "success",
              message:
                response.data?.error_message || `${translate("Success")}`,
              variant: "standard",
              severity: "success",
            });
            enqueueSnackbar(
              response.data?.error_message || `${translate("Success")}`,
              {
                variant: "success",
              }
            );
            handleClose();
          } else {
            showAlertMessage({
              color: "error",
              severity: "error",
              message:
                response.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
              variant: "standard",
            });
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.result) {
                if (key === "user_id") {
                  formik.setFieldError(
                    "user_id",
                    response?.data?.result?.cust_mobile_no
                  );
                } else {
                  formik.setFieldError(key, response.data.result[key]);
                }
              }
            }

            enqueueSnackbar(
              response.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
              {
                variant: "error",
              }
            );
          }
        })
        .catch((error) => {});
    },
    [router, state]
  );

  const guestLogin = useCallback(
    async (data) => {
      const { values, url, formik, handleClose } = data;

      const formData = new FormData();

      for (let key in values) {
        formData.append(key, values[key]);
      }

      axios
        .post(`${url}`, formData)
        .then((response) => {
          if (response?.data?.return_status == 0) {
            const { auth_token, user_detail, modification_user_info } =
              response?.data?.result;
            handleClose();
            setSession(auth_token);
            setSessionData(
              user_detail && user_detail ? JSON.stringify(user_detail) : null
            );
            setUserId(user_detail ? user_detail?.cust_id : null);

            dispatch({
              type: "LOGIN",
              payload: {
                isInitialized: true,
                isAuthenticated: true,
                cookies: {
                  ...JSON.parse(
                    getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined"
                  ),
                  user: user_detail ? user_detail : null,
                  USER_ID: user_detail?.cust_id,
                  JWTAuthToken: auth_token,
                  modificationUser: modification_user_info
                    ? modification_user_info
                    : null,
                  isGuestUser: true,
                },
              },
            });

            // setTimeout(() => {
            //   setIsRedirectCheckout(true);
            // }, 500);

            setClientSideReduxCookie({ dispatch: dispatch, router: router });

            enqueueSnackbar(
              response.data?.error_message || `${translate("Success")}`,
              {
                variant: "success",
              }
            );
          } else {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.result) {
                if (key === "user_id") {
                  formik.setFieldError(
                    "user_id",
                    response?.data?.result?.cust_mobile_no
                  );
                } else {
                  formik.setFieldError(key, response.data.result[key]);
                }
              }
            }
            enqueueSnackbar(
              response.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
              {
                variant: "error",
              }
            );
          }
        })
        .catch((error) => {});
    },
    [router, state]
  );

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    setCookie(ACCESS_TOKEN_KEY, accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      method: "jwt",
      login,
      register,
      logout,
      guestLogin,
      state,
      setIsRedirectCheckout,
      setLoginPopupOpen,
      handleSetUserEditData,
      setCartPopupOpen,
    }),
    [
      login,
      logout,
      register,
      guestLogin,
      state,
      handleSetUserEditData,
      setIsRedirectCheckout,
      setLoginPopupOpen,
      setCartPopupOpen,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
