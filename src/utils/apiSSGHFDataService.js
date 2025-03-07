import axiosInstance from "@/utils/axiosHF";
const qs = require("qs");
import { global } from "./constant";
function getAll(path, param = "", asPath) {
  // v2/homepage/first?lang=en&site=100001&country=global&visitorId=&userId=0&currency=&ccy_decimal=&cn_iso=&country_iso=&detect_country=&locale=global-en&content=landing_page
  try {
    let path_url = `${path}`;
    if (param != "") {
      const localePathURL =
        param?.locale && param?.locale != "default"
          ? `${param?.locale}`
          : `${global}-en`;
      path_url = `${path}?site=${
        process.env.NEXT_PUBLIC_SITE_ID
      }&${qs.stringify({
        ...param,
        locale: localePathURL,
        lang: localePathURL?.split("-")[1],
        country: localePathURL?.split("-")[0],
      })}`;
    }

    if (asPath) {
      path_url = `${path}?${asPath}`;
    }
    console.log(path_url, 'ddddd');
    
    return axiosInstance.get(path_url);
  } catch (error) {
    console.log("apiSSGV2DataServiceapiSSGV2DataService", param?.locale);
    console.error("getAll Error", error);
  }
}

export const apiSSGHFDataService = {
  getAll,
};
