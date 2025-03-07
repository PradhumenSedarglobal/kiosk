import { useAuthContext } from "@/auth/useAuthContext";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Script from "next/script";
import React, { useEffect } from "react";

const TamaraWidget = (props) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso, CCYCODE, langName } = cookies || {};
  const theme = useTheme();

  React.useEffect(() => {
    if (["AE", "SA"].indexOf(cniso) >= 0) {
      if (typeof window != "undefined") {
        window.tamaraWidgetConfig = {
          lang:
            langName && ["en", "ar"].indexOf(langName) >= 0 ? langName : "en",
          country: cniso ? cniso : "AE",
          publicKey: "97c7ced2-7d9a-4129-bbe0-b3053a3d832e",
          style: {
            fontFamily: `Helvetica-Neue-Medium !important`,
            color: "red",
          },
        };
        window.tamaraBundleWidget = {
          ...window.tamaraBundleWidget,
          style: {
            fontFamily: `Helvetica-Neue-Medium !important`,
            color: "red",
          },
        };
      }
    }
  }, [langName, cniso, CCYCODE, window, theme]);

  useEffect(() => {
    if (typeof window != "undefined" && window.TamaraWidgetV2) {
      window.TamaraWidgetV2.refresh();
    }
  }, [props.amount, langName, window]);

  if (
    props.amount == 0 ||
    props.amount == "" ||
    ["AE", "SA"].indexOf(cniso) == -1 ||
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }

  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
        defer
      />
      <Box
        id="tamara-widget-custom"
        data-lang="en"
        data-inject-template="true"
        component="tamara-widget"
        type="tamara-summary"
        amount={props.amount}
        inline-type={props.inline_type ? props.inline_type : 2}
        fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
        sx={{
          fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
          color: "blue",
        }}
      />
    </>
  );
};

export default TamaraWidget;

// class="tamara-summary-widget__container tamara-summary-widget__medium tamara-summary-widget--inline-outlined tamara-summary-widget__inline-template-2"
