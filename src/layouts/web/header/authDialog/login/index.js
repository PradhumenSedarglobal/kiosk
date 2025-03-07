import { useAuthContext } from "@/auth/useAuthContext";
import SnackbarProvider from "@/components/snackbar";
import { useAlert } from "@/provider/alert/useAlert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles"; // Import alpha separately
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import DialogHeader from "../dialogHeader";
import LoginForm from "./form";
import SocialLogin from "./social";
const CircularProgress = styled(MuiCircularProgress)(() => ({
  marginLeft: 10,
}));

const Login = ({ handleFormOpen, handleClose }) => {
  const { t: translate } = useTranslation();
  const { MuiAlert } = useAlert();
  const { pathname, query } = useRouter();
  const { head_sys_id } = query;
  const { login, state } = useAuthContext();
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
    modificationUser,
  } = cookies || {};
  const formik = useFormik({
    initialValues: {
      pass_word: "",
      user_id: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.user_id) {
        errors.user_id = translate("Email_required");
      }
      if (!values.pass_word) {
        errors.pass_word = translate("Password_required");
      }
      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        values:
          modificationUser?.head_sys_id || head_sys_id
            ? {
              ...values,
              head_sys_id: modificationUser?.head_sys_id || head_sys_id,
              site: site,
              lang: langName,
              country: countryName,
              visitorId: visitorId,
              ccy_decimal: CCYDECIMALS,
              cn_iso: cniso,
              detect_country: detect_country,
              userId: USER_ID,
            }
            : {
              ...values,
              site: site,
              lang: langName,
              country: countryName,
              visitorId: visitorId,
              ccy_decimal: CCYDECIMALS,
              cn_iso: cniso,
              detect_country: detect_country,
              userId: USER_ID,
            },
        url: "sg_customer/login",
        formik: formik,
        handleClose: handleClose,
      };
      await login(data);
    },
  });

  return (
    <SnackbarProvider>
      <DialogTitle component="div">
        <Stack spacing={3.5}>
          <DialogHeader
            title={
              <Typography
                component="span"
                sx={(theme) => ({
                  fontSize: "19px",
                  lineHeight: "29px",
                  fontWeight: 500,
                  color: theme.palette.common.black,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                })}
              >
                {translate("login")}
              </Typography>
            }
            handleClose={handleClose}
          />
          <SnackbarProvider>
            <SocialLogin handleClose={handleClose} />
          </SnackbarProvider>
          {MuiAlert}
          <Divider
            sx={(theme) => ({
              "&.MuiDivider-root": {
                span: {
                  ...theme.typography.typography16,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontWeight: 500,
                },
              },
            })}
          >
            {translate("or")}
          </Divider>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3.5}>
            <LoginForm formik={formik} />
          </Stack>
          <Typography
            component="p"
            variant="typography16"
            color="primary"
            fontWeight={400}
            lineHeight="17px"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            mb={3}
            mt={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleFormOpen("forgetPassword")}
          >
            {translate("Forgot_password")}
          </Typography>
          <Stack spacing={1}>
            <Button
              variant="contained"
              disabled={formik.isSubmitting}
              fullWidth={true}
              type="submit"
              sx={(theme) => ({
                "&.MuiButton-root": {
                  borderRadius: "0px",
                  color: "common.black",
                  ...theme.typography.typography15,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  padding: "1rem 5px!important",
                  maxWidth: "100%important",
                  fontWeight: 200,
                  letterSpacing: 0.5,
                  background: (theme) => theme.palette.primary.light,
                  ":hover": {
                    background: (theme) => `${theme.palette.warning.dark}`,
                    backgroundColor: (theme) => theme.palette.primary.light,
                  },
                  "&.Mui-disabled": {
                    background: (theme) =>
                      alpha(theme.palette.primary.lighter, 0.65),
                  },
                },
              })}
            >
              {translate("login")}
              {formik.isSubmitting && (
                <CircularProgress color="inherit" size={20} />
              )}
            </Button>

            {pathname.split("/").indexOf("cartpage") > 0 ||
              pathname.split("/").indexOf("cartPage") > 0 ? (
              <>
                {" "}
                <Typography
                  textAlign="center"
                  component="p"
                  variant="typography16"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                >
                  {translate("or")}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleFormOpen("guest")}
                  fullWidth={true}
                  sx={(theme) => ({
                    py: 2,
                    borderRadius: 0,
                    color: theme.palette.common.black,
                    backgroundColor: theme.palette.grey[3500],
                    border: `1px solid ${theme.palette.grey[3900]}`,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    "&:hover": {
                      backgroundColor: theme.palette.grey[3500],
                      border: `1px solid ${theme.palette.grey[3900]}`,
                    },
                  })}
                >
                  {translate("Guest_Checkout")}
                </Button>
              </>
            ) : (
              ""
            )}
          </Stack>
        </form>
      </DialogContent>
      <Box textAlign="center" my={4}>
        <Typography
          component="p"
          variant="typography15"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          fontWeight={400}
          lineHeight="18px"
        >
          {translate("New_at_Sedar")}{" "}
          <Typography
            component="span"
            variant="typography16"
            lineHeight="17px"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            fontWeight={400}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => handleFormOpen("register")}
            className="Create_An_Account_Button"
          >
            {translate("Create_an_Account")}
          </Typography>
        </Typography>
      </Box>
    </SnackbarProvider>
  );
};

export default Login;
