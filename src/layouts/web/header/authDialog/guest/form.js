import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const CustomPhoneInput = dynamic(() => import("@/components/form/phoneInput"), {
  ssr: false,
});

const GuestForm = ({ formik }) => {
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso } = cookies || {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FirstName")}
            type="text"
            variant="standard"
            name="cust_first_name"
            value={formik.values.cust_first_name}
            onChange={formik.handleChange}
            helperText={
              formik.touched.cust_first_name && formik.errors.cust_first_name
            }
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("LastName")}
            type="text"
            variant="standard"
            name="cust_last_name"
            value={formik.values.cust_last_name}
            onChange={formik.handleChange}
            helperText={
              formik.touched.cust_last_name && formik.errors.cust_last_name
            }
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Email")}
            type="text"
            variant="standard"
            name="cust_email_id"
            value={formik.values.cust_email_id}
            onChange={formik.handleChange}
            helperText={
              formik.touched.cust_email_id && formik.errors.cust_email_id
            }
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <CustomPhoneInput
            defaultCountry={cniso && cniso != "XX" ? cniso.toUpperCase() : "US"}
            fullWidth
            international
            countryCallingCodeEditable={false}
            labels={langName == "ar" ? ar : en}
            placeholder="Enter phone number"
            label={translate("Phonenumber")}
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
        </Grid>
      </Grid>
    </>
  );
};

export default GuestForm;
