import { useAuthContext } from "@/auth/useAuthContext";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const sitekey = process.env.NEXT_PUBLIC_SITE_KEY_CAPTCHA;

export const GoogleCaptchaValidation = ({ setIsCaptchaValid, content }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    langName,
    site,
    visitorId,
    countryName,
    detect_country,
    USER_ID,
    cniso,
    CCYDECIMALS,
    CCYCODE,
  } = cookies || {};
  const childRef = React.useRef(null);

  const { isLoading } = useProgressRouter();

  const checkCaptchaFun = async () => {
    let captcha_val = childRef.current.getValue();

    if (captcha_val && captcha_val.length > 10) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }

    axiosInstance
      .post("user/googleCapatchaValidate", {
        token: captcha_val,
        content: content,
        lang: langName,
        site: site,
        visitorId: visitorId,
        currency: CCYCODE,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: detect_country,
        country: countryName,
        userId: USER_ID,
      })
      .then(() => { })
      .catch((e) => {
      });
  };
  return (
    <Box
      sx={{
        "& .google_captcha": {
          float: "right",
        },
      }}
    >
      {!isLoading ? (
        <ReCAPTCHA
          sitekey={sitekey}
          ref={childRef}
          hl={langName}
          className="google_captcha"
          onChange={checkCaptchaFun}
        />
      ) : (
        ""
      )}
    </Box>
  );
};
