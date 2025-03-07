import React from "react";
import { ProgressRouterContext } from "./progressRouterContext";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useAuthContext } from "@/auth/useAuthContext";

const ProgressRouterProvider = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { setCartPopupOpen } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState(false);
  NProgress.configure({ showSpinner: false });

  React.useEffect(() => {
    const handleStart = () => {
      if (!["/free-sample"].includes(pathname)) {
        window.scrollTo({
          behavior: "smooth",
          top: 0,
        });
      }
      setCartPopupOpen(false);
      NProgress.start();
      setIsLoading(true);
    };
    const handleStop = () => {
      NProgress.done();
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <ProgressRouterContext.Provider value={{ isLoading }}>
        {children}
      </ProgressRouterContext.Provider>
    </>
  );
};

export default ProgressRouterProvider;
