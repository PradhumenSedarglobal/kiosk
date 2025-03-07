import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { useAlert } from "@/provider/alert/useAlert";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { isValidPhoneNumber } from "react-phone-number-input";
import DialogHeader from "../dialogHeader";
import ForgetPasswordForm from "./form";

const ForgotPassword = ({
  handleClose,
  handleFormOpen,
  handlePreviousStep,
  handleNextStep,
  sectionStep,
  handleResetSectionStep,
}) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { MuiAlert, showAlertMessage } = useAlert();
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
          }
        }
      }

      if (sectionStep === 1) {
        if (!values.otp_value) {
          errors.otp_value = "OTP is required";
        }

        if (
          values?.otp_value &&
          values?.otp_value?.length &&
          !values?.cust_pwd
        ) {
          errors.cust_pwd = "Reset password is required";
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      let data = modificationUser?.head_sys_id
        ? {
          ...values,
          head_sys_id: modificationUser?.head_sys_id,
          cust_nationality: cniso,
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
            .post(`sg_customer/request_pwd_reset`, formData)
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
              enqueueSnackbar(
                response.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                }
              );
            });
          break;

        case 1:
          await axiosInstance
            .post(`sg_customer/change_the_password`, formData)
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
              enqueueSnackbar(
                response.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                }
              );
            });
          break;

        case 2:
          handleClose();
          break;
      }
    },
  });

  async function resendOTP() {
    let data = {
      ...formik.values,
      cust_nationality: cniso,
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
    await axiosInstance
      .post(`sg_customer/request_pwd_reset`, formData)
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
              variant: "error",
            }
          );
        }
      })
      .catch((error) => {
        enqueueSnackbar(error || `${translate("SomethingWentWrong")}`, {
          variant: "error",
        });
      });
  }

  return (
    <>
      <DialogTitle component="div">
        <DialogHeader
          title={
            <Typography
              fontSize="19px"
              lineHeight="29px"
              fontWeight={500}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("ForgotPassword")}
            </Typography>
          }
          handleClose={handleClose}
        />
      </DialogTitle>

      <DialogContent>
        {MuiAlert}
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3.5} mb={3} mt={1}>
            <ForgetPasswordForm
              formik={formik}
              handlePreviousStep={handlePreviousStep}
              sectionStep={sectionStep}
              resendOTP={resendOTP}
            />
          </Stack>
          <SubmitButton
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
            fullWidth={true}
            buttonSx={(theme) => ({
              "&.MuiButton-root": {
                fontWeight: 200,
                height: "50px",
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontSize: "15px",
                color: "common.black",
                borderRadius: "0px!important",
                background: (theme) => theme.palette.primary.light,
                ":hover": {
                  background: (theme) =>
                    `${theme.palette.primary[200]}!important`,
                },
              },
            })}
            title={
              sectionStep === 2 ? translate("Login_Now") : translate("Continue")
            }
            maxWidth="100%"
          />
        </form>
      </DialogContent>
      <Box textAlign="center" my={4}>
        <Typography
          component="p"
          variant="typography15"
          color={(theme) => theme.palette.common.black}
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          fontWeight={400}
          lineHeight="18px"
        >
          {translate("already_member_Login")}{" "}
          <Typography
            component="span"
            variant="typography16"
            lineHeight="17px"
            fontWeight={400}
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleFormOpen("login");
              handleResetSectionStep();
            }}
          >
            {translate("Login")}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default ForgotPassword;
