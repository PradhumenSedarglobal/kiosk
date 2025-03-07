import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { MUICheckBox, SelectBox, TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import axiosInstance from "@/utils/axios";
import { franInvestmen } from "@/utils/constant";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { GoogleCaptchaValidation } from "../captcha/captcha";
import { AddressLocation } from "../location";

const FranchiseeForm = (data) => {
  const { isLoading } = useProgressRouter();
  const { push, locale } = useRouter();
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso } = cookies || {};
  const [provinceDescLabel, setProvinceDescLabel] = React.useState(
    translate("Province")
  );


  const fieldRefs = {
    long_name: React.useRef(null),
    email: React.useRef(null),
    area: React.useRef(null),
    city: React.useRef(null),
    country: React.useRef(null),
    phone: React.useRef(null),
    province_desc: React.useRef(null),
  };

  const formik = useFormik({
    initialValues: {
      long_name: "",
      email: "",
      phone: "",
      country: "",
      myCountry: "",
      area: "",
      city: "",
      budget: "100,000",
      province_desc: "",
      state: "",
      cad_country: "",
      enquiry_type: "F",
      remarks: "",
      i_agree: "Y",
    },
    validate: (value) => {
      const errors = {};
      if (!value.long_name) {
        errors.long_name = translate("Thisfieldisrequired");
      }
      if (!value.email) {
        errors.email = `${translate("Thisfieldisrequired")}`;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)
      ) {
        errors.email = `${translate("InvalidEmailAddress")}`;
      }
      if (!value.phone) {
        errors.phone = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(value.phone)) {
        errors.phone = `${translate("please_enter_a_valid_number")}`;
      }
      if (!value.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!value.area) {
        errors.area = translate("Thisfieldisrequired");
      }
      if (!value.country) {
        errors.country = translate("Thisfieldisrequired");
      }
      if (!value.province_desc) {
        errors.province_desc = translate("Thisfieldisrequired");
      }

      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("source_enquiry", getSourceCookie());
      for (var key in values) {
        if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else if (key == "myCountry") {
          formData.append("myCountry", cookies?.cniso);
        } else if (key == "cad_country") {
          formData.append("cad_country", values?.country?.value);
        } else if (key == "budget") {
          formData.append("budget", values?.budget);
        } else {
          formData.append(key, values[key]);
        }
      }

      await axiosInstance
        .post(
          `user/enquiry?lang=${cookies?.langName}&site=${cookies?.site}&country=${cookies?.countryName}&content=Franchisee&"visitorId"=${cookies?.visitorId}&currency=${cookies?.CCYCODE}&ccy_decimal=${cookies?.CCYDECIMALS}&cn_iso=${cookies?.cniso}`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status === "0") {
              enqueueSnackbar(`${translate("we_will_get_back")}`, {
                variant: "success",
              });
              push({
                pathname: "/success/franchise",
                query: { email: values.email },
              });
              const consultation_type = {
                H: "free_consultation",
                M: "free_measurement",
              };
              var con_type = consultation_type["F"]
                ? consultation_type["F"]
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

  // Watch for formik errors and scroll to the first erroneous field
  React.useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.keys(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = ["long_name", "email", "area", "city", "country"];
      for (let field of errorFields) {
        if (formik.errors[field] && fieldRefs[field]?.current) {
          // Get the element
          const element = fieldRefs[field].current;

          // Get element position relative to the viewport
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY; // Calculate element's top position relative to the document

          // Scroll to the element
          window.scrollTo({
            top: elementTop - 200, // Adjust the offset as needed
            behavior: "smooth",
          });
          setIsSubmitForm(false);
          break;
        }
      }
    }
  }, [isSubmitForm, fieldRefs, locale]);

  React.useEffect(() => {
    formik.resetForm();
  }, [locale]);

  const handleSubmitForm = () => {
    formik.handleSubmit();

    if (
      formik?.errors &&
      Object.values(formik.errors).length > 0 &&
      fieldRefs
    ) {
      setIsSubmitForm(true);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "30px" }}>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: data?.data?.PARENT?.description,
          }}
          sx={(theme) => ({
            "& h2": {
              fontWeight: "normal",
              mb: 0,
              pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 },
              letterSpacing: 0,
              ...theme.typography.typography32,
              fontWeight: "normal",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
            },
            "& h1": {
              fontWeight: "normal",
              mb: 0,
              pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 },
              letterSpacing: 0,
              ...theme.typography.typography40,
              fontWeight: "normal",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
            },
            "& p": {
              letterSpacing: 0,
              pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 },
              marginTop: "0",
              ...theme.typography.typography16,
              fontWeight: "normal",
              fontFamily: theme.fontFaces.helveticaNeue,
              color: theme.palette.grey[2800],
            },
          })}
        />
        <Box
          sx={{
            background: (theme) => theme.palette.common.white,
            borderRadius: "0px",
            marginTop: "20px",
          }}
        >
          <CardContent
            sx={{
              padding: { lg: "16px", md: "16px", sm: "0", xs: "0", xxs: "0" },
            }}
          >
            <form noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("FirstName")}
                    type="text"
                    variant="standard"
                    name="long_name"
                    inputRef={fieldRefs.long_name} // Assign ref
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
                    inputRef={fieldRefs.email} // Assign ref
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <CustomPhoneInput
                    fullWidth
                    international
                    countryCallingCodeEditable={true}
                    defaultCountry={
                      cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                    }
                    labels={langName == "ar" ? ar : en}
                    placeholder="Enter phone number"
                    label={translate("Phonenumber")}
                    variant="standard"
                    inputRef={fieldRefs.phone} // Assign ref
                    name="phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      formik.setFieldValue("phone", e);
                    }}
                    helperText={formik.touched.phone && formik.errors.phone}
                    error={formik.touched.phone && formik.errors.phone}
                  />
                
                </Grid>
                <AddressLocation
                  formik={formik}
                  isArea={true}
                  fieldRefs={fieldRefs}
                />
                {/* {["AE", "SA"].includes(formik?.values?.country?.value) && (
                  <Grid item md={6} sm={12} xs={12} xxs={12}>
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
                          {formik?.values?.country?.value == "AE"
                            ? translate("Emirates")
                            : translate("Province")}
                        </Typography>
                      }
                      type="text"
                      variant="standard"
                      name="province_desc"
                      inputRef={fieldRefs.province_desc} // Assign ref
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
                      error={
                        formik.touched.province_desc &&
                        formik.errors.province_desc
                      }
                    />
                  </Grid>
                )} */}
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <SelectBox
                    fullWidth
                    label={translate("InvestmentCapacity")}
                    type="text"
                    variant="standard"
                    name="budget"
                    value={formik.values.budget}
                    onChange={formik.handleChange}
                    options={franInvestmen(translate)}
                    helperText={formik.touched.budget && formik.errors.budget}
                    error={formik.touched.budget && formik.errors.budget}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("Message")}
                    type="text"
                    variant="standard"
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    helperText={formik.touched.remarks && formik.errors.remarks}
                    multiline={true}
                    rows="4"
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <MUICheckBox
                    fullWidth
                    isRequired
                    label={
                      <Typography
                        variant="typography16"
                        fontFamily={(theame) => theame.fontFaces.helveticaNeue}
                        color={(theame) => theame.palette.grey[2800]}
                      >
                        {translate(
                          "IagreetoreceiveothercommunicationsfromSedarInnovation"
                        )}
                      </Typography>
                    }
                    variant="standard"
                    name="i_agree"
                    value={formik.values.i_agree}
                    checked={formik.values.i_agree === "Y"}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "i_agree",
                        e.target.checked ? "Y" : "N"
                      );
                    }}
                    helperText={formik.touched.i_agree && formik.errors.i_agree}
                    error={formik.touched.i_agree && formik.errors.i_agree}
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
                      type="button"
                      onClick={handleSubmitForm}
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
    </>
  );
};

export default FranchiseeForm;
