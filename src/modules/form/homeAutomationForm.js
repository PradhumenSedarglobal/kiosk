import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { GoogleCaptchaValidation } from "../captcha/captcha";
import { AddressLocation } from "../location";

const HomeAutomationForm = ({ data = {} }) => {
  const { isLoading } = useProgressRouter();
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso } = cookies || {};
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [provinceDescLabel, setProvinceDescLabel] = React.useState(
    translate("Province")
  );
  const formik = useFormik({
    initialValues: {
      enquiry_type: "C",
      myCountry: "",
      email: "",
      long_name: "",
      phone: "",
      urllink: "home-automation",
      remarks: "",
      country: "",
      city: "",
      area: "",
      province_desc: "",
      state: "",
      cad_country: "",
      content: "EnquiryForm",
    },
    validate: (value) => {
      const errors = {};
      if (!value.long_name) {
        errors.long_name = translate("Thisfieldisrequired");
      }
      if (!value.email) {
        errors.email = translate("Email_required");
      }
      if (!value.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!value.area) {
        errors.area = translate("Thisfieldisrequired");
      }
      if (!value.phone) {
        errors.phone = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.phone)) {
        errors.phone = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("source_enquiry", getSourceCookie());
      for (var key in values) {
        if (key == "documentfile") {
          formData.append("documentfile", values.documentfile);
        } else if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else if (key == "myCountry") {
          formData.append("myCountry", cookies?.cniso);
        } else if (key == "cad_country") {
          formData.append("cad_country", values?.country?.value);
        } else if (key == "remarks") {
          formData.append("remarks", values?.subject);
        } else if (key == "phone") {
          formData.append("phone", values?.phone_number);
        } else {
          formData.append(key, values[key]);
        }
      }
      await axiosInstance
        .post(
          `user/enquiry?lang=${cookies?.langName}&site=${cookies?.site}&country=${cookies?.countryName}&content=EnquiryForm&"visitorId"=${cookies?.visitorId}&currency=${cookies?.CCYCODE}&ccy_decimal=${cookies?.CCYDECIMALS}&cn_iso=${cookies?.cniso}`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status == "0") {
              enqueueSnackbar(`${translate("we_will_get_back")}`, {
                variant: "success",
              });
              router.push({
                pathname: "/success/contact",
                query: { email: values.email },
              });
              const consultation_type = {
                H: "free_consultation",
                M: "free_measurement",
              };
              var con_type = consultation_type["C"]
                ? consultation_type["C"]
                : "Lets Connect";
              let consult_type = {
                PRODUCT_DESC: con_type,
                SOL_ITEM_LABEL: "Non_Product",
                SOH_TXN_NO: response.sysid ? response.sysid : 111111,
              };
              admitadOrderedItem(consult_type, con_type); //ADMITAD Order add
              admitadInvoice(consult_type, values?.email); //ADMITAD.Invoice
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        });
    },
  });
  React.useEffect(() => {
    if (formik?.values?.country?.value == "AE") {
      setProvinceDescLabel(translate("Emirates"));
    } else {
      setProvinceDescLabel(translate("Province"));
    }
  }, [formik?.values?.country?.value]);
  return (
    <Box id="homeAutomationForm">
      <Container
        maxWidth="xl"
        sx={{
          pt: 10,
          marginTop: "150px",
          backgroundColor: (theme) => theme.palette.grey[2900],
        }}
      >
        <Typography
          sx={(theme) => ({
            pl: 3,
            letterSpacing: 0,
            ...theme.typography.typography43,
            fontWeight: "normal",
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            mb: 0,
            color: theme.palette.common.black,
          })}
        >
          {translate("MakeanInquiry")}
        </Typography>
        <Typography
          sx={(theme) => ({
            pl: 3,
            letterSpacing: 0.5,
            ...theme.typography.typography16,
            fontFamily: theme.fontFaces.helveticaNeue,
            color: theme.palette.grey[2800],
            lineHeight: "1.8",
          })}
        >
          {translate(
            "StartaconversationorToContactusviaemailPleasefillouttheform"
          )}
        </Typography>
        <Box
          sx={{
            background: (theme) => theme.palette.grey[2900],
            borderRadius: "0px",
            marginTop: "20px",
          }}
        >
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("FirstName")}
                    type="text"
                    variant="standard"
                    name="long_name"
                    value={formik.values.long_name}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.long_name && formik.errors.long_name
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("Email")}
                    type="email"
                    variant="standard"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <CustomPhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={
                      cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                    }
                    placeholder="Enter phone number"
                    label={translate("MobileNo")}
                    variant="standard"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={(e) => {
                      formik.setFieldValue("phone_number", e);
                    }}
                    helperText={
                      formik.touched.phone_number && formik.errors.phone_number
                    }
                    error={
                      formik.touched.phone_number && formik.errors.phone_number
                    }
                  />
                </Grid>
                <AddressLocation formik={formik} isArea={true} />
                {/* <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={
                      <Typography
                        sx={(theme) => ({
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          fontSize: theme.typography.typography16,
                          color: "common.black",
                          lineHeight: "24px",
                          fontWeight: 400,
                        })}
                      >
                        {provinceDescLabel}
                      </Typography>
                    }
                    type="text"
                    variant="standard"
                    name="province_desc"
                    value={formik.values.province_desc}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.province_desc &&
                      formik.errors.province_desc
                    }
                    inputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid> */}
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("Message")}
                    type="text"
                    variant="standard"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    helperText={formik.touched.subject && formik.errors.subject}
                    multiline={true}
                    rows="4"
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formik.values.i_agree}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue("i_agree", true);
                          } else {
                            formik.setFieldValue("i_agree", false);
                          }
                        }}
                        name="i_agree"
                        defaultChecked={formik.values.i_agree}
                      />
                    }
                    label={
                      <Typography
                        component="p"
                        variant="subtitle1"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                        color={(theme) => theme.palette.grey[2800]}
                      >
                        {translate(
                          "IagreetoreceiveothercommunicationsfromSedarInnovation"
                        )}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  {isLoading ? (
                    <CaptchaSkeleton />
                  ) : (
                    <GoogleCaptchaValidation
                      setIsCaptchaValid={setIsCaptchaValid}
                      content="contact"
                    />
                  )}
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <Box sx={{ textAlign: "right" }}>
                    <SubmitButton
                      fullWidth
                      variant="contained"
                      color="primary"
                      title={translate("Submit")}
                      loading={formik.isSubmitting}
                      disabled={!isCaptchaValid || formik.isSubmitting}
                      sx={(theme) => ({
                        "&.MuiButton-root": {
                          borderRadius: "0px",
                          color: "common.black",
                          ...theme.typography.typography15,
                          padding: "1rem 5px!important",
                          maxWidth: "300px!important",
                          background: (theme) => theme.palette.primary.light,
                          ":hover": {
                            background: (theme) => theme.palette.primary.main,
                          },
                          "&.Mui-disabled": {
                            background: (theme) =>
                              alpha(theme.palette.primary.lighter, 0.65),
                          },
                        },
                      })}
                    />
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Box>
      </Container>
    </Box>
  );
};

HomeAutomationForm.propTypes = {
  data: PropTypes.object,
};

export default HomeAutomationForm;
