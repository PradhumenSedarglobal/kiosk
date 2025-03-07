// utils
import axios from "@/utils/axios";
import {
  ACCESS_TOKEN_KEY,
  SEDAR_USER_DATA,
  SEDAR_USER_MODIFICATION_DATA,
} from "@/utils/constant";
import { deleteCookie, setCookie } from "cookies-next";

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  return true;
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(SEDAR_USER_DATA);
    delete axios.defaults.headers.common.Authorization;
  }
};

export const setSessionData = (data) => {
  if (data) {
    setCookie(SEDAR_USER_DATA, data, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });
  } else {
    deleteCookie(SEDAR_USER_DATA);
  }
};
export const setSessionModificationData = (data) => {
  if (data) {
    setCookie(SEDAR_USER_MODIFICATION_DATA, data, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });
  } else {
    deleteCookie(SEDAR_USER_MODIFICATION_DATA);
  }
};
export const setUserId = (data) => {
  if (data) {
    setCookie("USER_ID", data, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });
  } else {
    deleteCookie("USER_ID");
  }
};
