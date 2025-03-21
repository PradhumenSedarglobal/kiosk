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

  console.log("Middleware triggered");

  // Skip Next.js internals, API routes, and public files
  if (pathname.startsWith("/_next") || pathname.includes("/api/") || PUBLIC_FILE.test(pathname)) {
    return;
  }

  try {
    console.log("Request Headers:", headers);

    // Get the client IP, defaulting to a placeholder IP for testing
    // const ip = headers.get("True-Client-IP")?.split(",")[0] || "217.165.59.84";
    const ip = headers.get('x-forwarded-for') || '217.165.59.84';

    const response = NextResponse.next();

    // Fetch geo data if not already present in cookies
    let firstGeoData = null;
    try {
      console.log("Fetching Geo data for IP:", ip);
      console.log("Dataaaa", `https://api.sedarglobal.com/geolocation?geo=&client_ip=${ip}&locale=${locale}`);
      const geoResponse = await fetch(
        `https://api.sedarglobal.com/geolocation?geo=&client_ip=${ip}&locale=${locale}`
      );
      firstGeoData = await geoResponse.json();
      console.log("Geo data received:", firstGeoData);
    } catch (error) {
      console.error("Failed to fetch geo data:", error);
    }

    // Get cookies
    const requestGetAllCookies = request.cookies.get("NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES")?.value;
    const getAllCookies = requestGetAllCookies ? JSON.parse(requestGetAllCookies) : {};

    const head_sys_id = searchParams.get("head_sys_id");
    console.log("Parsed Cookies:", getAllCookies);

    // Parse cookies to extract required values
    const parsedCookies = {
      ACCESS_TOKEN: getAllCookies?.JWTAuthToken || null,
      USER_DATA: getAllCookies?.user || null,
      SEDAR_FIRST_GEO_DATA: firstGeoData || null,
      USER_ID: getAllCookies?.user?.cust_id || 0,
      visitorId: getAllCookies?.visitorId || shortid.generate(),
      USER_MODIFICATION_DATA: getAllCookies?.modificationUser || null,
      SITE_DETAILS_DATA: firstGeoData?.site_details?.[0] || null,
    };

    // Extract site details, geo, language, and country info
    const siteDetails = parsedCookies?.SITE_DETAILS_DATA || null;
    const sedar_geo = siteDetails?.primary_ref_cn_iso || "geo";
    const detectCountry = siteDetails?.primary_ref_cn_iso || "geo";
    const languageName = locale !== "default" ? locale.split("-")[1] : "eng";
    const CNISO = siteDetails?.primary_ref_cn_iso || "geo";
    const countryName = locale === "default" ? countries[CNISO]?.code || "global" : locale.split("-")[0] || "global";
    const themeDirection = languageName === "ar" ? "rtl" : "ltr";

    // Head system ID
    const getHeadSysId = head_sys_id && parsedCookies?.USER_MODIFICATION_DATA?.head_sys_id !== head_sys_id
      ? head_sys_id
      : parsedCookies?.USER_MODIFICATION_DATA?.head_sys_id;

    // Prepare language dropdown options
    const languageDropDown = allLangs.map((element) => ({
      ...element,
      value: `${element.value}-${languageName}`,
    }));

    // Construct all cookies data to set
    const allCookiesData = {
      sedarGeo: sedar_geo,
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
        ? { ...parsedCookies.USER_MODIFICATION_DATA, head_sys_id: getHeadSysId || 0 }
        : null,
      JWTAuthToken: parsedCookies?.ACCESS_TOKEN,
      user: parsedCookies?.USER_DATA,
      currentLang: languageDropDown.find((value) => value.value === locale) || allLangs[3],
    };

    // Store cookies
    const stringifyData = JSON.stringify(allCookiesData);
    response.cookies.set(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, stringifyData, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });

    response.cookies.set(SEDAR_FIRST_GEO_DATA, JSON.stringify(parsedCookies?.SEDAR_FIRST_GEO_DATA?.siteDetails || null), {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });

    response.cookies.set(NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL, JSON.stringify(siteDetails || null), {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });

    response.cookies.set(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN, JSON.stringify(languageDropDown || null), {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
    });

    response.cookies.set("i18next", languageName, {
      maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK,
    });

    // Handle redirection logic
    const URLS = `${countryName}-${languageName}`;
    if (pathname !== "/" && !url.href.includes(URLS) && locale === "default") {
      const validURL = !url.href.includes(URLS);
      if (validURL) {
        return NextResponse.redirect(new URL(`/${URLS}${nextUrl.pathname}${nextUrl.search}`, url), 301);
      }
    }

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}
export const config = {
  matcher: [
    "/",
    "/((?!api|styles|_next/data|_next/static|_next/image|favicon|.well-known|auth|sitemap|robots.txt|files).*)",
  ],
};
