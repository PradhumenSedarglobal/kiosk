import axiosInstance from "@/utils/axios";
const qs = require("qs");
import { eng, global, NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "./constant";
import { getCookie } from "cookies-next";
async function getAll({ path, param = "", asPath, locale }) {
  try {
    const {
      CCYDECIMALS,
      CCYCODE,
      cniso,
      detect_country,
      USER_ID,
      visitorId,
      site,
    } =
      (getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) &&
        JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES))) ||
      {};
    console.log("THIS IS FIRST LOCALE", locale);

    const userId = USER_ID;
    const localeParam = locale && locale == "default" ? `${global}-en` : locale;
    const country =
      localeParam == "default" ? global : localeParam.split("-")[0];
    const langName = localeParam == "default" ? eng : localeParam.split("-")[1];


    let path_url = `${path}?lang=${langName}&country=${country || ""}&site=${site || ""
      }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
      }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""
      }&detect_country=${detect_country}&locale=${localeParam}&country_iso=${cniso}`;
    if (param != "") {
      path_url = `${path}?lang=${langName}&country=${country || ""}&site=${site || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${cniso || ""
        }&detect_country=${detect_country || ""}&locale=${localeParam || ""
        }&${qs.stringify(param)}`;
    }
    if (asPath) {
      path_url = `${path}?lang=${langName}&country=${country || ""}&site=${site || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${cniso || ""
        }&detect_country=${detect_country || ""}&locale=${localeParam || ""
        }&${asPath}`;
    }

    return axiosInstance.get(path_url);
  } catch (error) {
    console.error("getAll Error", error);
  }
}

function post({ path, data = "", locale, isCountry = true }) {
  try {
    const {
      CCYDECIMALS,
      CCYCODE,
      cniso,
      detect_country,
      USER_ID,
      visitorId,
      site,
    } =
      (getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) &&
        JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES))) ||
      {};
    const localeParam = locale && locale == "default" ? `${global}-en` : locale;
    const countryName =
      localeParam == "default" ? global : localeParam.split("-")[0];
    const langName = localeParam == "default" ? eng : localeParam.split("-")[1];

    console.log("THIS IS FIRST SECOND LOCALE", localeParam, countryName, langName);
    const config = {
      site: site,
      lang: langName,
      ...(isCountry && { country: countryName }),
      visitorId: visitorId,
      currency: CCYCODE,
      ccy_decimal: CCYDECIMALS,
      cn_iso: cniso,
      detect_country: detect_country,
      locale: localeParam,
      userId: USER_ID,
      country_iso: cniso,
    };
    let param = { ...data, ...config };

    return axiosInstance.post(path, qs.stringify(param));
  } catch (error) {
    console.error("Post Error", error);
  }
}

function Delete({ path, param = "", locale }) {
  try {
    const {
      CCYDECIMALS,
      CCYCODE,
      cniso,
      countryName,
      detect_country,
      langName,
      USER_ID,
      visitorId,
      site,
    } =
      (getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) &&
        JSON.parse(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES))) ||
      {};

    const country = countryName;
    const userId = USER_ID;
    const localeParam = locale == "default" ? `${global}-en` : locale;

    let path_url = `${path}?lang=${langName}&site=${site}&country=${country}&visitorId=${visitorId}&userId=${userId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}&detect_country=${detect_country}&locale=${localeParam}`;
    if (param != "") {
      path_url = `${path}?lang=${langName}&site=${site}&country=${country}&visitorId=${visitorId}&userId=${userId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}&detect_country=${detect_country}&locale=${localeParam}&${qs.stringify(
        param
      )}`;
    }

    return axiosInstance.delete(path_url);
  } catch (error) {
    console.error("Delete Error", error);
  }
}

export const apiClientV2DataService = {
  getAll,
  post,
  Delete,
};
