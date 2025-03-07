import axiosInstance from "@/utils/axios";
const qs = require("qs");
import { eng, global } from "./constant";
async function getAll({ path, param = "", asPath, cookies = {}, locale }) {
  try {
    const {
      CCYDECIMALS,
      CCYCODE,
      cniso,
      detect_country,
      USER_ID,
      visitorId,
      site,
    } = cookies || {};

    const userId = USER_ID;
    const localeParam = locale == "default" ? `${global}-en` : locale;
    const langName = localeParam ? localeParam.split("-")[1] : eng;
    const countryName = localeParam ? localeParam.split("-")[0] : global;
    const country = countryName;

    let path_url = `${path}?lang=${langName || ""}&site=${site || ""}&country=${country || ""
      }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
      }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""
      }&detect_country=${detect_country}&locale=${localeParam}&country_iso=${cniso}`;
    if (param != "") {
      path_url = `${path}?lang=${langName || ""}&site=${site || ""}&country=${country || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${cniso || ""
        }&detect_country=${detect_country || ""}&locale=${localeParam || ""
        }&${qs.stringify(param)}`;
    }
    if (asPath) {
      path_url = `${path}?lang=${langName || ""}&site=${site || ""}&country=${country || ""
        }&visitorId=${visitorId || ""}&userId=${userId || 0}&currency=${CCYCODE || ""
        }&ccy_decimal=${CCYDECIMALS || ""}&cn_iso=${cniso || ""}&country_iso=${cniso || ""
        }&detect_country=${detect_country || ""}&locale=${localeParam || ""
        }&${asPath}`;
    }
    console.log("getStatcicPath V@SSR", path_url, param);
    const response = await axiosInstance.get(path_url);
    return response?.data;
  } catch (error) {
    console.error("getAll Error", error);
  }
}

function post({ path, data = "", cookies }) {
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
      country_iso: cniso,
    };
    let param = { ...data, ...config };

    return axiosInstance.post(path, qs.stringify(param));
  } catch (error) {
    console.error("Post Error", error);
  }
}

function Delete({ path, param = "", cookies = {} }) {
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
}

export const apiSSRV2DataService = {
  getAll,
  post,
  Delete,
};
