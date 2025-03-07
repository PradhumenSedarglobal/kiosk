import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useEffect } from "react";
import stylisRTLPlugin from "stylis-plugin-rtl";
// GLOBAL CUSTOM HOOKS
import { useRouter } from "next/router";
export default function RTL({ children }) {
  const { locale } = useRouter();
  const isRTL =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ar"
      ? "rtl"
      : "ltr";
  useEffect(() => {
    document.dir = isRTL;
  }, [locale]);

  const cacheRtl = createCache({
    key: isRTL === "rtl" ? "rtl" : "css",
    prepend: true,
    stylisPlugins: isRTL === "rtl" ? [stylisRTLPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
