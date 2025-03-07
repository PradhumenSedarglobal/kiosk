import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch } from "@/redux/store";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { browserName, browserVersion } from "react-device-detect";


const CookiePolicyPopup = () => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { state } = useAuthContext();
  const { cookies } = state;
  const [cookieVal, setCookieVal] = useState();
  const [cookie_data, setCookie_data] = useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [show, setShow] = useState(false);
  const [showDeviceDetect, setShowDeviceDetect] = useState(false);
  const { site } = cookies || {};

  React.useEffect(() => {
    setCookieVal("");
  }, [locale]);

  const getCookiesData = async () => {
    setIsLoading(true);
    await apiClientV2DataService
      .getAll({
        path: `content/first`,
        param: {
          content: "cookie_policy",
        },
        locale,
      })

      .then((response) => {
        let res_data = response.data;
        let len =
          res_data.result && res_data.result.COMPONENT
            ? res_data.result.COMPONENT.length
            : 0;
        if (len > 0 && res_data.result && res_data.result.COMPONENT) {
          setCookie_data(res_data.result.COMPONENT[len - 1]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  // Create cookie
  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  // Delete cookie
  const deleteCookie = (cname) => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
  };

  // Read cookie
  const getCookie = (cname) => {
    try {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie?.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          // return c.substring(name.length, c.length);
          return false;
        }
      }
      return true;
    } catch (err) {
      console.log(err, "decodeURIComponent");
      deleteCookie(cname);
      return true;
    }
  };

  // Set cookie consent
  const acceptCookieConsent = () => {
    deleteCookie("sedarGlobal_cookie_consent");
    setCookie("sedarGlobal_cookie_consent", 1, 30);
    setCookieVal(false);
  };

  React.useEffect(() => {
    if (
      site &&
      !cookieVal &&
      getCookie("sedarGlobal_cookie_consent") &&
      !isEmpty(cookies) == true
    ) {
      getCookiesData();
      setCookieVal(getCookie("sedarGlobal_cookie_consent"));
    }
  }, [cookies, cookieVal, locale]);

  React.useEffect(() => {
    if (cookieVal && cookie_data && cookie_data.PARENT) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [cookieVal, cookie_data, locale]);

  React.useEffect(() => {
    if (browserName == "Chrome" && browserVersion < 32) {
      setShowDeviceDetect(true);
    } else if (browserName == "Edge" && browserVersion < 18) {
      setShowDeviceDetect(true);
    } else if (browserName == "Safari" && browserVersion < 16) {
      setShowDeviceDetect(true);
    } else if (browserName == "Firefox" && browserVersion < 65) {
      setShowDeviceDetect(true);
    } else if (browserName == "Opera" && browserVersion < 19) {
      setShowDeviceDetect(true);
    } else if (browserName == "IE") {
      setShowDeviceDetect(true);
    } else {
      setShowDeviceDetect(false);
    }
  }, []);

  return (
    <>
      <Drawer variant="persistent" anchor="bottom" open={show && !isLoading}>
        <CardContent>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              component="div"
              variant="typography15"
              sx={(theme) => ({
                fontFamily: theme?.fontFaces?.helveticaNeueLight,
              })}
            >
              {cookie_data && cookie_data.PARENT
                ? parse(cookie_data.PARENT.description)
                : ""}
            </Typography>
            <Button
              variant="contained"
              sx={(theme) => ({
                mt: 0.1,
                mb: 2,
                width: "180px",
                height: "48px",
                color: theme.palette.grey[4900],
                fontWeight: 400,
                backgroundColor: theme.palette.primary.lighter,
                borderRadius: "0px",
                fontFamily: theme?.fontFaces?.helveticaNeue,
                fontSize: theme.typography.typography16,
                ":hover": {
                  backgroundColor: theme.palette.primary.lighter,
                },
              })}
              onClick={acceptCookieConsent}
            >
              {cookie_data &&
                cookie_data.PARENT &&
                cookie_data.PARENT.link_title
                ? parse(cookie_data.PARENT.link_title)
                : translate("Accept_Close")}
            </Button>
          </Stack>
        </CardContent>
      </Drawer>
      <Drawer variant="persistent" anchor="bottom" open={showDeviceDetect}>
        <CardContent>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              component="div"
              variant="typography15"
              sx={(theme) => ({
                fontFamily: theme?.fontFaces?.helveticaNeueLight,
              })}
            >
              {translate("your_current_browser_may_be_outdated")}
            </Typography>
            <Button
              variant="contained"
              sx={(theme) => ({
                mt: 0.1,
                mb: 2,
                width: "180px",
                height: "48px",
                color: theme.palette.grey[4900],
                fontWeight: 400,
                backgroundColor: theme.palette.primary.lighter,
                borderRadius: "0px",
                fontFamily: theme?.fontFaces?.helveticaNeue,
                fontSize: theme.typography.typography16,
                ":hover": {
                  backgroundColor: theme.palette.primary.lighter,
                },
              })}
              onClick={() => setShowDeviceDetect(false)}
            >
              {translate("Close")}
            </Button>
          </Stack>
        </CardContent>
      </Drawer>
    </>
  );
};

export default CookiePolicyPopup;
