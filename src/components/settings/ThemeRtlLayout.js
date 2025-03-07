import PropTypes from "prop-types";
import { useEffect } from "react";
// rtl
// import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
// @mui
import { useRouter } from "next/router";
import { useSelector } from "@/redux/store";
import { useAuthContext } from "@/auth/useAuthContext";
// import { getCookie } from "cookies-next";

// ----------------------------------------------------------------------

ThemeRtlLayout.propTypes = {
  children: PropTypes.node,
};

export default function ThemeRtlLayout({ children }) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { pathname, locale } = useRouter();

  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection, pathname, locale]);

  const cacheRtl = createCache({
    key: themeDirection === "rtl" ? "rtl" : "css",
    stylisPlugins: themeDirection === "rtl" ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
