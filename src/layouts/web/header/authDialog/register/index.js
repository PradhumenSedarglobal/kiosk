import { useAuthContext } from "@/auth/useAuthContext";
import { useAlert } from "@/provider/alert/useAlert";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { isValidPhoneNumber } from "react-phone-number-input";

const DialogHeader = dynamic(() => import("../dialogHeader"), {
  ssr: false,
});

const RegisterForm = dynamic(() => import("./form"), {
  ssr: false,
});

const Register = ({
  handleClose,
  handleFormOpen,
  handlePreviousStep,
  handleNextStep,
  sectionStep,
  handleResetSectionStep,
}) => {
  const { locale, query } = useRouter();
  const { head_sys_id } = query;
  const { state, login } = useAuthContext();
  const { cookies } = state;
  const { enqueueSnackbar } = useSnackbar();
  const { MuiAlert, showAlertMessage } = useAlert();
  const { t: translate } = useTranslation();

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
      cust_mobile_no: "",
      otp_value: "",
      cust_pwd: "",
      cust_first_name: "",
      cust_last_name: "",
      cust_email_id: "",
      cust_city: "",
      i_agree: "",
      request_id: "",
    },
    validate: (values) => {
      const errors = {};
      if (sectionStep === 0) {
        if (!["ksa-en"].includes(locale)) {
          if (!values.cust_mobile_no) {
            errors.cust_mobile_no = translate("Thisfieldisrequired");
          } else if (!isValidPhoneNumber(values.cust_mobile_no)) {
            errors.cust_mobile_no = `${translate(
              "please_enter_a_valid_number"
            )}`;
          }
        } else {
          if (!values.cust_email_id) {
            errors.cust_email_id = translate("Thisfieldisrequired");
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cust_email_id)
          ) {
            errors.cust_email_id = translate("InvalidEmailAddress");
          }
        }
      }

      if (sectionStep === 1) {
        if (!values.otp_value) {
          errors.otp_value = "OTP is required";
        }

        if (
          values?.otp_value &&
          values?.otp_value?.length == 6 &&
          !values?.cust_pwd
        ) {
          errors.cust_pwd = translate("Password_required");
        }
      }

      if (sectionStep === 2) {
        if (!values.cust_first_name) {
          errors.cust_first_name = translate("Thisfieldisrequired");
        }

        if (!values.cust_last_name) {
          errors.cust_last_name = translate("Thisfieldisrequired");
        }

        if (["ksa-en"].includes(locale)) {
          if (!values.cust_mobile_no) {
            errors.cust_mobile_no = translate("Thisfieldisrequired");
          } else if (!isValidPhoneNumber(values.cust_mobile_no)) {
            errors.cust_mobile_no = `${translate(
              "please_enter_a_valid_number"
            )}`;
          }
        }

        if (!values.cust_email_id) {
          errors.cust_email_id = translate("Thisfieldisrequired");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cust_email_id)
        ) {
          errors.cust_email_id = translate("InvalidEmailAddress");
        }

        if (!values.i_agree) {
          errors.i_agree = translate("Thisfieldisrequired");
        }
      }

      return errors;
    },
    onSubmit: async (values, { setErrors, setFieldTouched }) => {
      let data = modificationUser?.head_sys_id
        ? {
          ...values,
          head_sys_id: modificationUser?.head_sys_id,
          cust_nationality: cniso,
          cust_city: "",
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
          cust_nationality: cniso,
          cust_city: "",
          site: site,
          lang: langName,
          country: countryName,
          visitorId: visitorId,
          ccy_decimal: CCYDECIMALS,
          cn_iso: cniso,
          detect_country: detect_country,
          userId: USER_ID,
        };
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }

      switch (sectionStep) {
        case 0:
          await axiosInstance
            .post(`sg_customer/send_otp`, formData)
            .then((response) => {
              if (response?.data?.return_status == 0) {
                showAlertMessage({
                  color: "success",
                  message:
                    response.data?.error_message || `${translate("Success")}`,
                  variant: "standard",
                  severity: "success",
                });
                enqueueSnackbar(
                  response.data?.error_message || `${translate("Success")}`,
                  {
                    variant: "success",
                  }
                );
                formik.setFieldValue(
                  "request_id",
                  response?.data?.result?.requestId
                );
                setErrors({});
                setFieldTouched("cust_pwd", false);
                handleNextStep();
              } else {
                for (const [key, value] of Object.entries(values)) {
                  if (response.data.result[key]) {
                    formik.setFieldError(key, response.data.result[key]);
                  }
                }
                showAlertMessage({
                  color: "error",
                  severity: "error",
                  message:
                    response.data?.error_message ||
                    `${translate("SomethingWentWrong")}`,
                  variant: "standard",
                });
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              }
            })
            .catch((error) => {
              if (error?.response) {
                const { response } = error;
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              } else {
                enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
                  variant: "error",
                });
              }
            });
          break;

        case 1:
          await axiosInstance
            .post(`sg_customer/verify_otp`, formData)
            .then((response) => {
              if (response?.data?.return_status == 0) {
                enqueueSnackbar(
                  response.data?.error_message || `${translate("Success")}`,
                  {
                    variant: "success",
                  }
                );
                handleNextStep();
              } else {
                for (const [key, value] of Object.entries(values)) {
                  if (response.data.result[key]) {
                    formik.setFieldError(key, response.data.result[key]);
                  }
                }
                if (response?.data?.return_status == -"0101") {
                  formik.setFieldError(
                    "otp_value",
                    `${translate("OTP_entered_is_invalid_Please_try_again")}`
                  );
                }
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              }
            })
            .catch((error) => {
              if (error?.response) {
                const { response } = error;
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              } else {
                enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
                  variant: "error",
                });
              }
            });
          break;

        case 2:
          await axiosInstance
            .post(`sg_customer/sign_up`, formData)
            .then(async (response) => {
              if (response?.data?.return_status == 0) {
                enqueueSnackbar(
                  response.data?.error_message || `${translate("Success")}`,
                  {
                    variant: "success",
                  }
                );
                handleClose();
                const loginData = {
                  values:
                    modificationUser?.head_sys_id || head_sys_id
                      ? {
                        pass_word: values.cust_pwd,
                        user_id: values.cust_email_id,
                        head_sys_id:
                          modificationUser?.head_sys_id || head_sys_id,
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
                        pass_word: values.cust_pwd,
                        user_id: values.cust_email_id,
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
                };
                await login(loginData);
              } else {
                for (const [key, value] of Object.entries(values)) {
                  if (response.data.result[key]) {
                    formik.setFieldError(key, response.data.result[key]);
                  }
                }
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              }
            })
            .catch((error) => {
              if (error?.response) {
                const { response } = error;
                enqueueSnackbar(
                  response.data?.error_message ||
                  `${translate("SomethingWentWrong")}`,
                  {
                    variant: "error",
                  }
                );
              } else {
                enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
                  variant: "error",
                });
              }
            });
          break;
      }
    },
  });

  async function resendOTP() {
    const formData = new FormData();
    let data = modificationUser?.head_sys_id
      ? {
        ...formik.values,
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
        ...formik.values,
        site: site,
        lang: langName,
        country: countryName,
        visitorId: visitorId,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: detect_country,
        userId: USER_ID,
      };

    for (let key in data) {
      formData.append(key, data[key]);
    }

    await axiosInstance
      .post(`sg_customer/send_otp`, formData)
      .then((response) => {
        if (response?.data?.return_status == 0) {
          enqueueSnackbar(
            response.data?.error_message || `${translate("Success")}`,
            {
              variant: "success",
            }
          );
          formik.setFieldValue("request_id", response?.data?.result?.requestId);
        } else {
          for (const [key, value] of Object.entries(formik.values)) {
            if (response.data.result[key]) {
              formik.setFieldError(key, response.data.result[key]);
            }
          }
          enqueueSnackbar(
            response.data?.error_message ||
            `${translate("SomethingWentWrong")}`,
            {
              color: "error",
              severity: "error",
              variant: "error",
            }
          );
        }
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.error_message ||
          `${translate("SomethingWentWrong")}`,
          {
            variant: "error",
          }
        );
      });
  }

  return (
    <>
      <DialogTitle component="div">
        <DialogHeader
          title={translate("SignUp")}
          subtitle={sectionStep === 0 && translate("sign_up_otp_password")}
          handleClose={handleClose}
        />
      </DialogTitle>

      <DialogContent>
        {MuiAlert}
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3.5} mb={3} mt={1}>
            <RegisterForm
              formik={formik}
              handlePreviousStep={handlePreviousStep}
              sectionStep={sectionStep}
              resendOTP={resendOTP}
            />
          </Stack>
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
                    alpha(theme.palette.primary[200], 0.65),
                  fontWeight: 200,
                },
              },
            })}
          >
            {translate("Continue")}
            {formik.isSubmitting && (
              <CircularProgress color="inherit" size={20} />
            )}
          </Button>
        </form>
      </DialogContent>
      <Box textAlign="center" my={4}>
        <Typography
          component="p"
          variant="typography15"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          fontWeight={200}
          letterSpacing={0.5}
        >
          {translate("already_member_Login")}{" "}
          <Typography
            component="span"
            variant="typography15"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            fontWeight={200}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleFormOpen("login");
              handleResetSectionStep();
            }}
            letterSpacing={0.5}
          >
            {translate("login")}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default Register;
