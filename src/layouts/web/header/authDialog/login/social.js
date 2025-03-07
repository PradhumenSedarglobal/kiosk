import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import { FacebookButton, GoogleButton } from "@/styles/layouts";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { createButton } from "react-social-login-buttons";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

const SocialLogin = ({ handleClose }) => {
  const { locale } = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { handleSetUserEditData } = useAuthContext();
  const googleConfig = {
    text: translate("Continue_With_Google"),
    icon: () => <Iconify icon="flat-color-icons:google" width={30} />,
    className: "google_btn",
  };
  const MyGoogleLoginButton = createButton(googleConfig);

  const facebookConfig = {
    text: translate("Continue_With_Facebook"),
    icon: () => <Iconify icon="ei:sc-facebook" width={40} />,
    className: "fb_btn",
  };
  const MyFacebookLoginButton = createButton(facebookConfig);

  const socialLogin = (post_data, type, cust_cr_uid) => {
    post_data["cust_cr_uid"] = cust_cr_uid;
    apiClientV2DataService
      .post({ path: "sg_customer/socialLoginFun/" + type, data: post_data, locale })
      .then((response) => {
        let data = response?.data;
        if (data.return_status == 0) {
          const { auth_token, user_detail } = data?.result;
          handleClose();
          let updateUserData = {
            user: user_detail,
            JWTAuthToken: auth_token,
          };
          handleSetUserEditData(updateUserData);

          enqueueSnackbar(data?.error_message || `${translate("Success")}`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(
            data?.error_message || `${translate("SomethingWentWrong")}`,
            {
              variant: "error",
            }
          );
        }
      })
      .catch((error) => {
        if (typeof error === "string") {
          enqueueSnackbar(error || `${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        } else {
          const { response } = error;
          enqueueSnackbar(
            response?.data?.error_message ||
            `${translate("SomethingWentWrong")}`,
            {
              variant: "error",
            }
          );
        }
      });
  };

  return (
    <Stack
      direction={{ md: "row", sm: "column", xs: "column", xxs: "column" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Box sx={{ width: "100%" }} component="div">
        <FacebookButton
          component={LoginSocialFacebook}
          appId={process.env.NEXT_PUBLIC_FB_APP_ID || ""}
          fieldsProfile={
            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
          }
          onLoginStart={() => {
          }}
          redirect_uri={"/"}
          onResolve={({ provider, data }) => {
            socialLogin(data, "FACEBOOK", "SOCIAL-FACEBOOK");
          }}
          onReject={(err) => { }}
        >
          <MyFacebookLoginButton />
        </FacebookButton>
      </Box>
      <Box sx={{ width: "100%" }} component="div">
        <GoogleButton
          component={LoginSocialGoogle}
          isOnlyGetToken
          client_id={process.env.NEXT_PUBLIC_GG_APP_ID || ""}
          scope="openid profile email"
          onLoginStart={() => {
          }}
          redirect_uri={"/"}
          onResolve={({ provider, data }) => {
            if (data && data.access_token) {
              fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${data.access_token}` },
              })
                .then((res) => res.json())
                .then((response) => {
                  socialLogin(response, "GOOGLE", "SOCIAL-GOOGLE");
                });
            }
          }}
          onReject={(err) => { }}
          cookiePolicy={"single_host_origin"}
        >
          <MyGoogleLoginButton />
        </GoogleButton>
      </Box>
    </Stack>
  );
};

export default SocialLogin;
