import AuthProvider from "../auth/JwtContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import RTL from "@/components/rtl/RTL";
import Dial from "@/components/speedDial/dial";
import CookiePolicyPopup from "@/modules/cookiePolicyPopup";
import AlertProvider from "@/provider/alert/alertProvider";
import ProgressRouterProvider from "@/provider/router/progressRouterProvider";
import { wrapper } from "@/redux/store";
import "@/styles/globals.scss";
import ThemeProvider from "@/theme/theme-provider";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-phone-number-input/style.css";
import { Provider } from "react-redux";
import "simplebar/dist/simplebar.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import dynamic from "next/dynamic";
import CartProvider from "@/provider/cart/cartProvider";
import ToastProvider from "@/app/components/ToastProvider";
// import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
// import { GTM_ID } from "./_document";

// const AuthProvider = dynamic(() => import("@/auth/JwtContext"), { ssr: true });

const clientSideEmotionCache = createEmotionCache();
function App(data) {
  const { Component, ...rest } = data;
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const { locale } = useRouter();
  const isRu =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ru"
      ? true
      : false;
  return (
    <>
      <AppCacheProvider emotionCache={emotionCache} {...data}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Provider store={store}>
            <ThemeProvider>
              <AlertProvider>
                <AuthProvider>
                  <CartProvider>
                    <ErrorBoundary>
                      <ProgressRouterProvider>
                        <ProgressBar />
                        {/* {locale != "default" && <Dial />} */}
                        {/* <CookiePolicyPopup /> */}
                        <RTL>
                        <ToastProvider>
                          <Component isRu={isRu} {...pageProps} />
                          </ToastProvider>
                        </RTL>
                      </ProgressRouterProvider>
                    </ErrorBoundary>
                  </CartProvider>
                </AuthProvider>
              </AlertProvider>
            </ThemeProvider>
          </Provider>
        </CacheProvider>
      </AppCacheProvider>
      {/* <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId="G-20ZHK7ZNYB" /> */}
    </>
  );
}
export default appWithTranslation(App);
