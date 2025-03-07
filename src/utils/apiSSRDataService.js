import axiosInstance from "@/utils/axios";
const qs = require("qs");
import { global } from "./constant";
function getAll(path, param = "", asPath) {
  return async (dispatch, getState) => {
    const reduxData = await getState();
    try {
      const { cookies } = reduxData.locale;
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
        locale,
      } = cookies || {};

      const { country: countryList } = await getState().location;
      const country_iso = countryList?.defaultValue?.value || "";
      const country = countryName;
      const userId = USER_ID;
      const localeParam = locale == "default" ? `${global}-en` : locale;

      let path_url = `${path}?lang=${langName || ""}&site=${
        site || ""
      }&country=${country || ""}&visitorId=${visitorId || ""}&userId=${
        userId || 0
      }&currency=${CCYCODE || ""}&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${
        cniso || ""
      }&detect_country=${detect_country}&locale=${localeParam}&country_iso=${
        country_iso || cniso
      }`;
      if (param != "") {
        path_url = `${path}?lang=${langName || ""}&site=${site || ""}&country=${
          country || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${
          CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${
          country_iso || cniso || ""
        }&detect_country=${detect_country || ""}&locale=${
          localeParam || ""
        }&${qs.stringify(param)}`;
      }
      if (asPath) {
        path_url = `${path}?lang=${langName || ""}&site=${site || ""}&country=${
          country || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${
          CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${
          country_iso || cniso || ""
        }&detect_country=${detect_country || ""}&locale=${
          localeParam || ""
        }&${asPath}`;
      }
      console.log("getStatcicPath", path_url);
      return axiosInstance.get(path_url);
    } catch (error) {
      console.error("getAll Error", error);
    }
  };
}

function post(path, data = "") {
  return async (dispatch, getState) => {
    const reduxData = await getState();
    try {
      const { cookies } = reduxData.locale;
      const { country: countryList } = await getState().location;
      const country_iso = countryList?.defaultValue?.value;
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
        locale,
      } = cookies || {};
      const localeParam = locale == "default" ? `${global}-en` : locale;
      const config = {
        site: site,
        lang: langName,
        country: countryName,
        visitorId: visitorId,
        currency: CCYCODE,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: detect_country,
        locale: localeParam,
        userId: USER_ID,
        country_iso: country_iso || cniso,
      };
      let param = { ...data, ...config };

      return axiosInstance.post(path, qs.stringify(param));
    } catch (error) {
      console.error("Post Error", error);
    }
  };
}

function Delete(path, param = "") {
  return async (dispatch, getState) => {
    const reduxData = getState();
    try {
      const { cookies } = reduxData.locale;
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
        locale,
      } = cookies || {};

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
  };
}

export const apiSSRDataService = {
  getAll,
  post,
  Delete,
};
