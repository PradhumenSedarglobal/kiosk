import { useAuthContext } from "@/auth/useAuthContext";
import useResponsive from "@/hooks/useResponsive";
import { useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

export default function ZohoSalesChat({ align, customizeInclude }) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const isDownSm = useResponsive("down", "sm");
  const ChatScript = () => {
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode:
        "siqefecae25c4292e803394e958b34a14862de3c0e7283e9bf5509ca4cb6a9b71a1",
      values: {},
      ready: function () {},
    };
    let d = document;
    let s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "zsiqscript";
    s.defer = true;
    s.strategy = "afterInteractive";
    s.async = true;
    s.src = "https://salesiq.zohopublic.com/widget";
    let t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
  };

  return (
    <div>
      <Box component="em" id="zsiqwidget">
        <MUIGlobalStyles
          styles={{
            ...(!isDownSm &&
              themeDirection == "ltr" && {
                " .zsiq_floatmain": {
                  right: customizeInclude ? "" : "20px",
                  left: customizeInclude ? "20px" : "",
                  bottom: "7rem!important",
                  zIndex: "999 !important",
                },
              }),

            ...(!isDownSm &&
              themeDirection == "rtl" && {
                " .zsiq_floatmain": {
                  right: customizeInclude ? "" : "20px",
                  left: customizeInclude ? "20px" : "unset!important",
                  bottom: "7rem!important",
                  zIndex: "999 !important",
                },
              }),

            ...(isDownSm &&
              themeDirection == "ltr" && {
                " .zsiq_floatmain": {
                  right: customizeInclude ? "20px" : "",
                  left: customizeInclude ? "unset" : "20px",
                  bottom: "7rem!important",
                  zIndex: "999 !important",
                },
              }),

            ...(isDownSm &&
              themeDirection == "rtl" && {
                " .zsiq_floatmain": {
                  right: customizeInclude ? "20px" : "",
                  left: customizeInclude ? "unset!important" : "20px",
                  bottom: "7rem!important",
                  zIndex: "999 !important",
                },
              }),
          }}
        />
        <ChatScript />
      </Box>
    </div>
  );
}
