import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { SelectAutocomplete, SelectBox, TextBox } from "@/components/form";
import DragDrop from "@/components/form/dragDrop";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import axiosInstance from "@/utils/axios";
import { projectBudgets, projectType } from "@/utils/constant";
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
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { GoogleCaptchaValidation } from "../captcha/captcha";
import { AddressLocation } from "../location";

const ContractsForm = () => {
  const { isLoading } = useProgressRouter();
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso } = cookies || {};
  const { locale } = router;
  const { enqueueSnackbar } = useSnackbar();
  const [provinceDescLabel, setProvinceDescLabel] = React.useState(
    translate("Province")
  );

  // Initialize refs for each form field
  const fieldRefs = {
    long_name: React.useRef(null),
    email: React.useRef(null),
    area: React.useRef(null),
    city: React.useRef(null),
    country: React.useRef(null),
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
      ProjectType: "Hospitality",
      budget: "100,000$",
      documentfile: "",
      province_desc: "",
      state: "",
      cad_country: "",
      i_agree: "true",
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
        } else {
          formData.append(key, values[key]);
        }
      }
      await axiosInstance
        .post(
          `user/enquiry?lang=${cookies?.langName}&site=${cookies?.site}&country=${cookies?.countryName}&content=contracts&"visitorId"=${cookies?.visitorId}&currency=${cookies?.CCYCODE}&ccy_decimal=${cookies?.CCYDECIMALS}&cn_iso=${cookies?.cniso}`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status == "0") {
              enqueueSnackbar(`${translate("we_will_get_back")}`, {
                variant: "success",
              });
              router.push({
                pathname: "/success/contracts",
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
    <Box id="StartProjectContract">
      <Container
        maxWidth="xl"
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[1700],
          paddingTop: "25px",
        })}
      >
        <Typography
          component="p"
          variant="typography7"
          sx={(theme) => ({
            pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 },
            letterSpacing: 0,
            fontWeight: "normal",
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            color: theme.palette.common.black,
            mb: 0,
            pb: 2,
          })}
        >
          {translate("Startaproject")}
        </Typography>
        <Typography
          component="label"
          variant="typography24"
          sx={(theme) => ({
            pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 },
            fontWeight: "normal",
            fontFamily: theme.fontFaces.helveticaNeueLight,
            color: theme.palette.grey[7900],
            letterSpacing: 0.5,
          })}
        >
          {translate(
            "StartaconversationorToContactusviaemailPleasefillouttheform1"
          )}
          <Typography
            component="a"
            href="mailto:projects@sedarglobal.com"
            variant="typography15"
            sx={(theme) => ({
              pl: 0.2,
              letterSpacing: 0,
              fontWeight: 400,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
              textDecoration: "none",
            })}
          >
            projects@sedarglobal.com
          </Typography>
        </Typography>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.grey[1700],
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
                    label={translate("FullName")}
                    type="text"
                    variant="standard"
                    name="long_name"
                    inputRef={fieldRefs.long_name}
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
                    inputRef={fieldRefs.email} // Assign ref
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={formik.touched.email && formik.errors.email}
                  // required
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <CustomPhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={
                      cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                    }
                    labels={langName == "ar" ? ar : en}
                    placeholder="Enter phone number"
                    label={translate("MobileNo")}
                    variant="standard"
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
                {/* <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={provinceDescLabel}
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
                    accept
                    disabled
                  />
                </Grid> */}
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <SelectAutocomplete
                    fullWidth
                    label={translate("ProjectType")}
                    type="text"
                    variant="standard"
                    name="ProjectType"
                    value={formik.values.ProjectType}
                    onChange={(e) => {
                      formik.setFieldValue("ProjectType", e.value);
                    }}
                    options={projectType}
                    inputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      formik.touched.ProjectType && formik.errors.ProjectType
                    }
                    error={
                      formik.touched.ProjectType && formik.errors.ProjectType
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <SelectBox
                    fullWidth
                    label={translate("Doyouhavebudgetinmind")}
                    type="text"
                    variant="standard"
                    name="budget"
                    value={formik.values.budget}
                    onChange={formik.handleChange}
                    options={projectBudgets}
                    isTranslate={true}
                    checkIndex={[0, 4]}
                    splitValue={" "}
                    isSplit={true}
                    helperText={formik.touched.budget && formik.errors.budget}
                    error={formik.touched.budget && formik.errors.budget}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <DragDrop
                    fullWidth
                    name="documentfile"
                    value={formik.values.documentfile}
                    onChange={(e) => {
                      formik.setFieldValue("documentfile", e);
                    }}
                    helperText={
                      formik.touched.documentfile && formik.errors.documentfile
                    }
                    label={translate("UploadYourfile")}
                    documentText={translate("MaximumFileMBFileFormatTSVorXLS")}
                    maxSize={5}
                    onSizeError={(file) => {
                      formik.setFieldError(
                        "documentfile",
                        translate("Youneedtoprovideafilevalidsize")
                      );
                    }}
                    accept={["csv", "CSV", "tsv", "TSV", "xls", "XLS"]}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("YourURLLink")}
                    type="text"
                    variant="standard"
                    name="url"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    helperText={formik.touched.url && formik.errors.url}
                  />
                </Grid>
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
                        checked={formik.values.i_agree}
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
                  <Box sx={{ textAlign: langName == "ar" ? "left" : "right" }}>
                    <SubmitButton
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={handleSubmitForm}
                      title={translate("Submit")}
                      loading={formik.isSubmitting}
                      disabled={!isCaptchaValid || formik.isSubmitting}
                      sx={(theme) => ({
                        "&.MuiButton-root": {
                          borderRadius: "0px",
                          color: "common.black",
                          ...theme.typography.typography15,
                          padding: "1rem 5px!important",
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

export default ContractsForm;
