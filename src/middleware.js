import { NextResponse } from "next/server";
import {
  allLangs,
  countries,
  eng,
  geo,
  global,
  NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
  NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN,
  NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL,
  SEDAR_FIRST_GEO_DATA,
} from "./utils/constant";
import shortid from "shortid";
// import { getCookie } from "cookies-next";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request) {
  const { nextUrl, headers } = request;
  const { locale, pathname, searchParams } = nextUrl;
  const url = nextUrl.clone();

  // Skip next.js internals, API routes, and public files
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  try {
    const ip = headers.get("True-Client-IP")?.split(",")[0] || "217.165.59.84";
    const response = NextResponse.next();

    // Fetch geo data if not already present in cookies
    let firstGeoData = null;
    try {
      const geoResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}geolocation?geo=&client_ip=${ip}&locale=${locale}`
      );
      firstGeoData = await geoResponse.json();
    } catch (error) {
      console.error("Failed to fetch geo data:", error);
    }

    const requestGetAllCookies = request.cookies.get(
      "NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES"
    )
      ? request.cookies.get("NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES")
      : null;

    const getAllCookies = requestGetAllCookies?.value
      ? JSON.parse(requestGetAllCookies?.value)
      : {};
    const head_sys_id = searchParams.get("head_sys_id");

    const parsedCookies = {
      ACCESS_TOKEN: getAllCookies?.JWTAuthToken
        ? getAllCookies?.JWTAuthToken
        : null,
      USER_DATA: getAllCookies?.user ? getAllCookies?.user : null,
      SEDAR_FIRST_GEO_DATA: firstGeoData || null,
      USER_ID:
        (getAllCookies?.user?.cust_id && getAllCookies?.user?.cust_id) || 0,
      visitorId: getAllCookies?.visitorId || shortid.generate(),
      USER_MODIFICATION_DATA: getAllCookies?.modificationUser
        ? getAllCookies?.modificationUser
        : null,
      SITE_DETAILS_DATA:
        (firstGeoData?.site_details && firstGeoData?.site_details?.[0]) || null,
    };

    const siteDetails = parsedCookies?.SITE_DETAILS_DATA || null;
    const sedar_geo = siteDetails?.primary_ref_cn_iso || geo;
    const detectCountry = siteDetails?.primary_ref_cn_iso || geo;
    const languageName = locale != "default" ? locale.split("-")[1] : eng;
    const CNISO = siteDetails?.primary_ref_cn_iso || geo;
    const countryName =
      locale == "default"
        ? countries[CNISO]?.code || global
        : locale?.split("-")[0] || global;

    const themeDirection = languageName == "ar" ? "rtl" : "ltr";

    const getHeadSysId = head_sys_id && parsedCookies?.USER_MODIFICATION_DATA?.head_sys_id !== head_sys_id ? head_sys_id
      : parsedCookies?.USER_MODIFICATION_DATA?.head_sys_id;

    const languageDropDown = allLangs.map((element) => ({
      ...element,
      value: `${element.value}-${languageName}`,
    }));

    const allCookiesData = {
      sedarGeo: sedar_geo,
      // siteDetails: siteDetails || "undefined",
      CCYDECIMALS: siteDetails?.decimals || "undefined",
      CCYCODE: siteDetails?.show_ccy_code || "undefined",
      i18next: languageName,
      defaultCountry: countries[sedar_geo]?.code || "global",
      cniso: CNISO,
      countryName,
      detect_country: detectCountry,
      langName: languageName,
      USER_ID: parsedCookies.USER_ID || 0,
      visitorId: parsedCookies.visitorId,
      site: process.env.NEXT_PUBLIC_SITE_ID,
      locale,
      themeDirection,
      modificationUser: parsedCookies.USER_MODIFICATION_DATA
        ? {
          ...parsedCookies.USER_MODIFICATION_DATA,
          // head_sys_id: getHeadSysId || 0,
        }
        : null,
      JWTAuthToken: parsedCookies?.ACCESS_TOKEN,
      user: parsedCookies?.USER_DATA,
      // languageDropDown: languageDropDown,
      currentLang:
        languageDropDown.find((value) => value.value === locale) || allLangs[3],
      // SEDAR_FIRST_GEO_DATA: parsedCookies?.SEDAR_FIRST_GEO_DATA,
    };
    const stringifyData = JSON.stringify(allCookiesData);

    response.cookies.set(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, stringifyData, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      // path: "/" + locale,
    });

    // console.log("THIS IS IS THE ERROR MIFFLE", parsedCookies?.SEDAR_FIRST_GEO_DATA);
    response.cookies.set(
      SEDAR_FIRST_GEO_DATA,
      JSON.stringify(parsedCookies?.SEDAR_FIRST_GEO_DATA?.siteDetails || null),
      {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
        // path: "/" + locale,
      }
    );

    response.cookies.set(
      NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL,
      JSON.stringify(siteDetails || null),
      {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
        // path: "/" + locale,
      }
    );

    response.cookies.set(
      NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN,
      JSON.stringify(languageDropDown || null),
      {
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
        // path: "/" + locale,
      }
    );
    // Set language and IP-related cookies
    response.cookies.set("i18next", languageName, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK,
      // path: "/" + locale,
    });

    // response.headers.set("x-ipAddress", firstGeoData?.ipAddress || ip);
    // response.headers.set("isARLang", languageName);

    // Handling redirection logic
    const URLS = `${countryName}-${languageName}`;
    if (pathname === "/" && locale === "default") {
      // Fallback to English if no language detected
      const redirectLang = languageName || "en";
      const redirectPath = `uae-${redirectLang}`;
      return NextResponse.redirect(new URL(`/${redirectPath}${nextUrl.search}`, url), 301);
    }
    

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
  }
}
export const config = {
  matcher: [
    "/",
    "/((?!api|styles|_next/data|_next/static|_next/image|favicon|.well-known|auth|sitemap|robots.txt|files).*)",
  ],
};
