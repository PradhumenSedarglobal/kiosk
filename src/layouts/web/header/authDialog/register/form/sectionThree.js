import { useAuthContext } from "@/auth/useAuthContext";
import { MUICheckBox, TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const SectionThree = ({ formik }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { t: translate } = useTranslation();
  const { langName, cniso } = cookies || {};
  const { locale } = useRouter();
  return (
    <>
      <Stack spacing={4}>
        <TextBox
          fullWidth
          placeholder="Enter First Name"
          isRequired
          label={translate("FirstName")}
          variant="standard"
          name="cust_first_name"
          value={formik.values.cust_first_name}
          onChange={(e) => {
            formik.setFieldValue("cust_first_name", e.target.value);
          }}
          inputSx={(theme) => {
            return {
              "&.MuiTextField-root": {
                "& .MuiInputLabel-root": {
                  letterSpacing: ".3px",
                  ...theme.typography.typography15,
                  ...(!Boolean(
                    formik.touched.cust_first_name &&
                    formik.errors.cust_first_name
                  ) && {
                    color: theme.palette.common.black,
                  }),
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                },
                "& .MuiInputLabel-shrink": {
                  color: theme.palette.error.main,
                  ...(!Boolean(
                    formik.touched.cust_first_name &&
                    formik.errors.cust_first_name
                  ) && {
                    color: theme.palette.grey["shrink"],
                  }),
                },
              },
            };
          }}
          helperText={
            formik.touched.cust_first_name && formik.errors.cust_first_name
          }
          error={
            formik.touched.cust_first_name && formik.errors.cust_first_name
          }
        />

        <TextBox
          fullWidth
          placeholder="Enter Last Name"
          isRequired
          label={translate("LastName")}
          variant="standard"
          name="cust_last_name"
          value={formik.values.cust_last_name}
          onChange={(e) => {
            formik.setFieldValue("cust_last_name", e.target.value);
          }}
          inputSx={(theme) => {
            return {
              "&.MuiTextField-root": {
                "& .MuiInputLabel-root": {
                  letterSpacing: ".3px",
                  ...theme.typography.typography15,
                  ...(!Boolean(
                    formik.touched.cust_last_name &&
                    formik.errors.cust_last_name
                  ) && {
                    color: theme.palette.common.black,
                  }),
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                },
                "& .MuiInputLabel-shrink": {
                  color: theme.palette.error.main,
                  ...(!Boolean(
                    formik.touched.cust_last_name &&
                    formik.errors.cust_last_name
                  ) && {
                    color: theme.palette.grey["shrink"],
                  }),
                },
              },
            };
          }}
          helperText={
            formik.touched.cust_last_name && formik.errors.cust_last_name
          }
          error={formik.touched.cust_last_name && formik.errors.cust_last_name}
        />

        {locale && ["ksa-en"].includes(locale) ? (
          <CustomPhoneInput
            fullWidth
            international
            defaultCountry={cniso && cniso != "XX" ? cniso.toUpperCase() : "US"}
            labels={langName == "ar" ? ar : en}
            placeholder="Enter phone number"
            label={translate("YourMobileNumber")}
            variant="standard"
            name="cust_mobile_no"
            value={formik.values.cust_mobile_no}
            onChange={(e) => {
              formik.setFieldValue("cust_mobile_no", e);
            }}
            helperText={
              formik.touched.cust_mobile_no && formik.errors.cust_mobile_no
            }
            error={
              formik.touched.cust_mobile_no && formik.errors.cust_mobile_no
            }
          />
        ) : (
          <TextBox
            fullWidth
            placeholder="Enter Email"
            isRequired
            label={translate("Email")}
            variant="standard"
            name="cust_email_id"
            value={formik.values.cust_email_id}
            onChange={(e) => {
              formik.setFieldValue("cust_email_id", e.target.value);
            }}
            inputSx={(theme) => {
              return {
                "&.MuiTextField-root": {
                  "& .MuiInputLabel-root": {
                    letterSpacing: ".3px",
                    ...theme.typography.typography15,
                    ...(!Boolean(
                      formik.touched.cust_email_id &&
                      formik.errors.cust_email_id
                    ) && {
                      color: theme.palette.common.black,
                    }),
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                  },
                  "& .MuiInputLabel-shrink": {
                    color: theme.palette.error.main,
                    ...(!Boolean(
                      formik.touched.cust_email_id &&
                      formik.errors.cust_email_id
                    ) && {
                      color: theme.palette.grey["shrink"],
                    }),
                  },
                },
              };
            }}
            helperText={
              formik.touched.cust_email_id && formik.errors.cust_email_id
            }
            error={formik.touched.cust_email_id && formik.errors.cust_email_id}
          />
        )}

        <MUICheckBox
          fullWidth
          isRequired
          label={translate("IagreetoreceiveothercommunicationsfromSedar")}
          variant="standard"
          name="i_agree"
          value={formik.values.i_agree}
          onChange={(e) => {
            if (e.target.checked) {
              formik.setFieldValue("i_agree", "Y");
            } else {
              formik.setFieldValue("i_agree", "N");
            }
          }}
          helperText={formik.touched.i_agree && formik.errors.i_agree}
          error={formik.touched.i_agree && formik.errors.i_agree}
        />
      </Stack>
    </>
  );
};

export default SectionThree;
