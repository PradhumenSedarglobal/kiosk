import {
  resetAuthCookies,
  setSSGReduxCookiesReducer,
  setSSRReduxCookieReducer,
} from "@/redux/slices/locale";
import shortid from "shortid";
import {
  countries,
  eng,
  geo,
  global,
  SEDAR_USER_DATA,
  ACCESS_TOKEN_KEY,
  SEDAR_USER_MODIFICATION_DATA,
  allLangs,
  SEDAR_NEXT_LOCALE,
  NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
  NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN,
  NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL,
  SEDAR_FIRST_GEO_DATA,
} from "./constant";
import { getCookie, setCookie } from "cookies-next";
import {
  resetJWTContext,
  setJWTContextData,
  setModificationUser,
} from "@/redux/slices/auth/jwtContext";
export async function setReduxCookies(context, store) {
  const { dispatch } = store;
  const { locale, res, req, query } = context;
  const { cookies } = req;
  const { head_sys_id } = query;

  const getAllCookies = req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES]
    ? JSON.parse(req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;


  const getLanguageDropDown = cookies[NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN]
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN])
    : [];
  const getSiteDetail = cookies[NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL]
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL])
    : {};
  const GET_SEDAR_FIRST_GEO_DATA = cookies[SEDAR_FIRST_GEO_DATA]
    ? JSON.parse(cookies[SEDAR_FIRST_GEO_DATA])
    : {};

  const USER_DATA = getAllCookies?.user ? getAllCookies?.user : null;
  const ACCESS_TOKEN_KEY = getAllCookies?.JWTAuthToken
    ? getAllCookies?.JWTAuthToken
    : null;

  const SEDAR_USER_MODIFICATION_DATA = getAllCookies?.modificationUser
    ? getAllCookies?.modificationUser
    : null;

  const parsedCookies = {
    ACCESS_TOKEN: ACCESS_TOKEN_KEY,
    USER_DATA: USER_DATA,
    USER_MODIFICATION_DATA: SEDAR_USER_MODIFICATION_DATA,
    SEDAR_FIRST_GEO_DATA: GET_SEDAR_FIRST_GEO_DATA,
    USER_ID: USER_DATA?.cust_id || 0,
    visitorId: getAllCookies?.visitorId || null,
  };

  const SITE_DETAILS_DATA = getSiteDetail || null;
  const sedar_geo = SITE_DETAILS_DATA?.primary_ref_cn_iso || geo;
  const languageName = locale !== "default" ? locale.split("-")[1] : eng;

  const defaultLocalPath = `${
    countries[sedar_geo]?.url || global
  }-${languageName}`;
  const defaultCountry = `${countries[sedar_geo]?.code || global}`;
  const detectCountry = SITE_DETAILS_DATA?.primary_ref_cn_iso || geo;
  const countryName =
    locale === "default"
      ? countries[detectCountry]?.code
      : locale.split("-")[0];
  const CNISO = countries[detectCountry]?.country_code || geo;

  // const languageDropDown = allLangs.map((element) => ({
  //   ...element,
  //   value: `${element.value}-${languageName}`,
  // }));

  const themeDirection = languageName === "ar" ? "rtl" : "ltr";

  if (parsedCookies.USER_DATA && parsedCookies.ACCESS_TOKEN) {
    dispatch(
      setJWTContextData({
        isInitialized: true,
        isAuthenticated: true,
        user: USER_DATA,
        JWTAuthToken: parsedCookies.ACCESS_TOKEN,
      })
    );
  } else {
    dispatch(resetJWTContext());
    dispatch(resetAuthCookies());
  }

  if (parsedCookies.ACCESS_TOKEN && parsedCookies.USER_MODIFICATION_DATA) {
    dispatch(
      setModificationUser(JSON.parse(parsedCookies.USER_MODIFICATION_DATA))
    );
  }

  if (
    parsedCookies.USER_MODIFICATION_DATA &&
    JSON.parse(parsedCookies.USER_MODIFICATION_DATA)?.head_sys_id !==
      head_sys_id &&
    head_sys_id
  ) {
    setCookie(SEDAR_USER_MODIFICATION_DATA, USER_MODIFICATION_DATA, {
      req,
      res,
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_MONTH,
    });
  }

  setCookie(SEDAR_NEXT_LOCALE, locale, {
    req,
    res,
    maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_MONTH,
  });

  dispatch(
    setSSRReduxCookieReducer({
      currentLang:
        getLanguageDropDown.find(({ value }) => value === locale) ||
        allLangs[3],
      languageDropDown: getLanguageDropDown,
      themeDirection,
      cookies: {
        sedarGeo: sedar_geo,
        siteDetails: SITE_DETAILS_DATA || "undefined",
        CCYDECIMALS: SITE_DETAILS_DATA?.decimals || "undefined",
        CCYCODE: SITE_DETAILS_DATA?.show_ccy_code || "undefined",
        i18next: languageName,
        defaultLocalPath,
        defaultCountry,
        cniso: CNISO,
        countryName,
        detect_country: detectCountry,
        langName: languageName,
        USER_ID: parsedCookies.USER_ID,
        visitorId: parsedCookies.visitorId,
        site: process.env.NEXT_PUBLIC_SITE_ID,
        locale,
      },
    })
  );
}

export async function setSSGReduxCookies(context, store) {
  const { dispatch, cookies } = store;
  const { locale } = context;

  const languageName =
    locale != "default" && locale?.split("-")[1] ? locale?.split("-")[1] : eng;

  const themeDirection = languageName == "ar" ? "rtl" : "ltr";

  const languageDropDown = allLangs.map((element) => ({
    ...element,
    value: `${element.value}-${languageName}`,
  }));

  await dispatch(
    setSSGReduxCookiesReducer({
      currentLang:
        languageDropDown.find(({ value }) => value == locale) || allLangs[3],
      languageDropDown: languageDropDown,
      themeDirection: themeDirection,
      cookies: {
        ...cookies,
        i18next: languageName,
        countryName: (locale !== "default" && locale?.split("-")[0]) || global,
        langName: languageName,
        locale: locale,
        site: process.env.NEXT_PUBLIC_SITE_ID,
      },
    })
  );
}

export async function setClientSideReduxCookie(props) {
  const { dispatch, router } = props;
  const { locale } = router;

  const getAllCookies = (await getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES))
    ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES))
    : null;

  const getLanguageDropDown = (await getCookie(
    NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN
  ))
    ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN))
    : [];
  const getSiteDetail = (await getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL))
    ? JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL))
    : {};
  const GET_SEDAR_FIRST_GEO_DATA = (await getCookie(SEDAR_FIRST_GEO_DATA))
    ? JSON.parse(getCookie(SEDAR_FIRST_GEO_DATA))
    : {};

  const ACCESS_TOKEN_KEY = getAllCookies?.JWTAuthToken
    ? getAllCookies?.JWTAuthToken
    : null;

  const SEDAR_USER_MODIFICATION_DATA = getAllCookies?.modificationUser
    ? getAllCookies?.modificationUser
    : null;

  const parsedCookies = {
    ACCESS_TOKEN: ACCESS_TOKEN_KEY,
    USER_DATA: getAllCookies?.user ? getAllCookies?.user : null,
    USER_MODIFICATION_DATA: SEDAR_USER_MODIFICATION_DATA,
    SEDAR_FIRST_GEO_DATA: getAllCookies?.SEDAR_FIRST_GEO_DATA
      ? getAllCookies?.SEDAR_FIRST_GEO_DATA
      : null,
    USER_ID: getAllCookies?.user?.cust_id || 0,
    visitorId: getAllCookies?.visitorId,
    SEDAR_FIRST_GEO_DATA: GET_SEDAR_FIRST_GEO_DATA,
  };

  // Batch async cookie operations
  const {
    ACCESS_TOKEN,
    USER_DATA,
    USER_MODIFICATION_DATA,
    visitorId,
    USER_ID,
  } = parsedCookies || {};

  const site = process.env.NEXT_PUBLIC_SITE_ID;

  // Generate visitorId only if necessary
  // if (!visitorId) {
  //   visitorId = shortid.generate(Date());
  //   setCookie("visitorId", visitorId, {
  //     maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_MONTH,
  //   });
  // }

  // Cached values for geo data and locale handling
  const geoData = getSiteDetail || {};
  const sedar_geo = geoData.primary_ref_cn_iso || geo;
  const languageName = locale !== "default" ? locale.split("-")[1] : eng;

  const defaultLocalPath = `${
    countries[sedar_geo]?.url || global
  }-${languageName}`;
  const defaultCountry = `${countries[sedar_geo]?.code || global}`;
  const detectCountry = geoData.primary_ref_cn_iso || geo;
  const countryName =
    locale === "default"
      ? countries[detectCountry]?.code
      : locale.split("-")[0];
  const CNISO = countries[detectCountry]?.country_code || geo;
  const themeDirection = languageName === "ar" ? "rtl" : "ltr";

  // const languageDropDown = allLangs.map((element) => ({
  //   ...element,
  //   value: `${element.value}-${languageName}`,
  // }));

  // Dispatch JWT and user data if available
  if (USER_DATA && ACCESS_TOKEN) {
    dispatch(
      setJWTContextData({
        isInitialized: true,
        isAuthenticated: true,
        user: USER_DATA,
        JWTAuthToken: ACCESS_TOKEN,
      })
    );
  } else {
    dispatch(resetJWTContext());
    dispatch(resetAuthCookies());
  }

  // Dispatch modification user data if available
  if (ACCESS_TOKEN && USER_MODIFICATION_DATA) {
    dispatch(setModificationUser(JSON.parse(USER_MODIFICATION_DATA)));
  }

  setCookie(SEDAR_NEXT_LOCALE, locale, {
    maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_MONTH,
  });

  // Set the cookies and other SSR-related data in Redux store
  dispatch(
    setSSGReduxCookiesReducer({
      currentLang:
        getLanguageDropDown.find(({ value }) => value === locale) ||
        allLangs[3],
      languageDropDown: getLanguageDropDown,
      themeDirection,
      cookies: {
        sedarGeo: sedar_geo,
        siteDetails: geoData || "undefined",
        CCYDECIMALS: geoData.decimals || "undefined",
        CCYCODE: geoData.show_ccy_code || "undefined",
        i18next: languageName,
        defaultLocalPath,
        defaultCountry,
        cniso: CNISO,
        countryName,
        detect_country: detectCountry,
        langName: languageName,
        USER_ID: USER_ID || 0,
        visitorId,
        site,
        locale,
      },
    })
  );
}

export async function setMiddlewareCookies(response, request, firstGeoData) {
  const { nextUrl } = request;
  const { locale, searchParams } = nextUrl;
  const head_sys_id = searchParams.get("head_sys_id");
  const { cookies } = response;

  const parsedCookies = {
    ACCESS_TOKEN: cookies[ACCESS_TOKEN_KEY] || null,
    USER_DATA: cookies[SEDAR_USER_DATA] || null,
    SEDAR_FIRST_GEO_DATA: firstGeoData || null,
    USER_ID: cookies["USER_ID"] || 0,
    visitorId: cookies["visitorId"],
    USER_MODIFICATION_DATA: cookies[SEDAR_USER_MODIFICATION_DATA]
      ? JSON.parse(cookies[SEDAR_USER_MODIFICATION_DATA])
      : null,
    SITE_DETAILS_DATA: firstGeoData?.site_details?.[0] || null,
  };

  const siteDetails = parsedCookies.SITE_DETAILS_DATA;
  const sedar_geo = siteDetails?.primary_ref_cn_iso || geo;
  const languageName = locale !== "default" ? locale.split("-")[1] : "eng";
  const detectCountry = siteDetails?.primary_ref_cn_iso || geo;
  const countryName =
    locale === "default"
      ? countries[detectCountry]?.code
      : locale.split("-")[0];
  const CNISO = countries[detectCountry]?.country_code || geo;
  const themeDirection = languageName === "ar" ? "rtl" : "ltr";

  const getHeadSysId =
    parsedCookies.USER_MODIFICATION_DATA?.head_sys_id !== head_sys_id
      ? head_sys_id
      : parsedCookies.USER_MODIFICATION_DATA?.head_sys_id;

  cookies.set(
    NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
    JSON.stringify({
      sedarGeo: sedar_geo,
      siteDetails: siteDetails || "undefined",
      CCYDECIMALS: siteDetails?.decimals || "undefined",
      CCYCODE: siteDetails?.show_ccy_code || "undefined",
      i18next: languageName,
      defaultCountry: countries[sedar_geo]?.code || "global",
      cniso: CNISO,
      countryName,
      detect_country: detectCountry,
      langName: languageName,
      USER_ID: parsedCookies.USER_ID,
      visitorId: parsedCookies.visitorId,
      site: process.env.NEXT_PUBLIC_SITE_ID,
      locale,
      themeDirection,
      [SEDAR_USER_MODIFICATION_DATA]: parsedCookies.USER_MODIFICATION_DATA
        ? {
            ...parsedCookies.USER_MODIFICATION_DATA,
            head_sys_id: getHeadSysId || 0,
          }
        : null,
      ACCESS_TOKEN: parsedCookies.ACCESS_TOKEN,
      USER_DATA: parsedCookies.USER_DATA,
      SEDAR_FIRST_GEO_DATA: firstGeoData,
    })
  );

  return response;
}

export const getKeysValuesData = (data) => {
  let previousData = {};
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      previousData[key] = value.split("|");
    }
  }
  return previousData;
};
export const getQueryKeysValuesStringUrl = (isServer = true, data) => {
  let previousData = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      if (isServer) {
        previousData.push(`${key}=${value.split(",").join("|")}`);
      } else {
        previousData.push(
          `${key}=${value?.length > 1 ? value.join("|") : value}`
        );
      }
    }
  }

  return previousData.join("&");
};
export const getQueryKeysValuesObject = (isServer = true, data) => {
  let previousData = {};
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      if (isServer) {
        previousData[key] = value;
      } else {
        previousData[key] = value;
      }
    }
  }

  return previousData || {};
};

export const getQueryKeysStringUrl = (data) => {
  let keys = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      keys.push(key);
    }
  }
  return keys.join(",");
};

export const getQueryValuesStringUrl = (data) => {
  let values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      values.push(value);
    }
  }
  return values.join(",");
};

export const getQueryString = (data) => {
  let previousData = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "slug" && value && value.length > 0) {
      previousData.push(`${key}=${value}`);
    }
  }
  return previousData.join("&");
};
