import { OTPBox, PasswordBox, TextBox } from "@/components/form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const SectionTwo = ({ formik, handlePreviousStep, resendOTP }) => {
  const { locale } = useRouter();
  const { t: translate } = useTranslation();
  return (
    <>
      <Stack spacing={6}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
          >
            <Typography
              variant="typography13"
              letterSpacing={0.3}
              sx={(theme) => ({ color: theme.palette.grey["shrink"] })}
            >
              {locale && !["ksa-en"].includes(locale)
                ? translate("YourMobileNumber")
                : translate("Email")}
            </Typography>

            <Typography
              component="span"
              variant="typography15"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              fontWeight={500}
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                formik.setFieldValue("otp_value", "");
                formik.setFieldValue("cust_pwd", "");
                handlePreviousStep();
              }}
            >
              {translate("Change")}
            </Typography>
          </Stack>
          <TextBox
            readOnly
            disabled
            fullWidth
            variant="standard"
            name={
              locale && !["ksa-en"].includes(locale)
                ? "cust_mobile_no"
                : "cust_email_id"
            }
            value={
              locale && !["ksa-en"].includes(locale)
                ? formik.values.cust_mobile_no
                : formik.values.cust_email_id
            }
            inputSx={(theme) => ({
              "& .Mui-disabled": {
                WebkitTextFillColor: theme.palette.common.black,
              },
            })}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
          >
            <Typography
              variant="typography13"
              letterSpacing={0.3}
              sx={(theme) => ({ color: theme.palette.common.black })}
            >
              {translate(
                locale && !["ksa-en"].includes(locale)
                  ? "OTPsendtoMobile"
                  : "OTPsendtoEmail"
              )}
            </Typography>

            <Typography
              component="span"
              variant="typography15"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              fontWeight={500}
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => resendOTP()}
            >
              {translate("resend_code")}
            </Typography>
          </Stack>
        </Box>

        <Box>
          <OTPBox
            fullWidth
            variant="standard"
            name="otp_value"
            formik={formik}
            numInputs={6}
            label="Enter OTP"
          />
        </Box>
      </Stack>

      {formik?.values?.otp_value?.length === 6 && (
        <PasswordBox
          fullWidth
          label={translate("SetPassword")}
          variant="standard"
          name="cust_pwd"
          value={formik.values.cust_pwd}
          onChange={formik.handleChange}
          helperText={formik.touched.cust_pwd && formik.errors.cust_pwd}
          onBlur={formik.handleBlur}
          inputSx={(theme) => ({
            "&.MuiTextField-root": {
              "& .MuiInputLabel-root": {
                letterSpacing: ".3px",
                ...theme.typography.typography15,
                ...(!Boolean(
                  formik.touched.cust_pwd && formik.errors.cust_pwd
                ) && {
                  color: theme.palette.common.black,
                }),
                fontFamily: theme.fontFaces.helveticaNeueMedium,
              },
              "& .MuiInputLabel-shrink": {
                color: theme.palette.error.main,
                ...(!Boolean(
                  formik.touched.cust_pwd && formik.errors.cust_pwd
                ) && {
                  color: theme.palette.grey["shrink"],
                }),
              },
            },
          })}
        />
      )}
    </>
  );
};

export default SectionTwo;
