import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const SectionOne = ({ formik }) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { t: translate } = useTranslation();
  const { langName, cniso } = cookies || {};
  return (
    <>
      {locale && !["ksa-en"].includes(locale) ? (
        <CustomPhoneInput
          fullWidth
          international
          countryCallingCodeEditable={false}
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
          error={formik.touched.cust_mobile_no && formik.errors.cust_mobile_no}
        />
      ) : (
        <TextBox
          fullWidth
          placeholder="Email"
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
                    formik.touched.cust_email_id && formik.errors.cust_email_id
                  ) && {
                    color: theme.palette.common.black,
                  }),
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                },
                "& .MuiInputLabel-shrink": {
                  color: theme.palette.error.main,
                  ...(!Boolean(
                    formik.touched.cust_email_id && formik.errors.cust_email_id
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
    </>
  );
};

export default SectionOne;
