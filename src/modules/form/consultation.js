import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { SelectMultiCheckboxAutocomplete, TextBox } from "@/components/form";
import DatePickerBox from "@/components/form/datePicker";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { AddressLocation } from "@/modules/location";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { getInterestProduct } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
import { GoogleCaptchaValidation } from "../captcha/captcha";

const Consultation = ({ formik, open, fieldRefs, handleSubmitForm }) => {
  const { isLoading } = useProgressRouter();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const { pathname, locale } = useRouter();
  const { langName, CCYCODE, site, cniso, countryName } = cookies || {};
  const minHours = -48;
  const getLocaleCountryName =
    locale != "default" ? locale.split("-")[0] : countryName;

  const [provinceDescLabel, setProvinceDescLabel] = React.useState("Province");
  const dispatch = useDispatch();
  const { interest_products, interestProductError } = useSelector(
    (state) => state.product
  );
  const ccy_code = getCookie("CCYCODE");
  const consult_type =
    pathname == "/custom-print" ? "SITE_CUSTOM_PRODUCT" : "SITE_FREE_CONSULT";

  React.useEffect(() => {
    if (formik?.values?.country?.value == "AE") {
      setProvinceDescLabel(translate("Emirates"));
    } else {
      setProvinceDescLabel(translate("Province"));
    }
  }, [formik?.values?.country?.value]);

  React.useEffect(() => {
    if (getLocaleCountryName == countryName && site && open) {
      dispatch(
        getInterestProduct({
          cunsult_type: consult_type,
        })
      );
    }
  }, [
    langName,
    countryName,
    pathname,
    CCYCODE,
    cniso,
    consult_type,
    locale,
    open,
    getLocaleCountryName,
  ]);

  const getMinDate = () => {
    if (minHours !== undefined) {
      return dayjs().subtract(minHours, "hours");
    }
    return minDate || undefined;
  };

  const isDateDisabled = (date) => {
    const currentDate = dayjs();
    const selectedDay = dayjs(date).day();
    const selectedHour = dayjs(date).hour();

    // If the current day is Saturday and it's 6 PM or later
    if (cniso == "AE" && currentDate.day() === 6 && currentDate.hour() >= 18) {
      // Disable all dates until the end of Monday
      if (
        (selectedDay === 6 && selectedHour >= 18) ||
        selectedDay === 0 ||
        selectedDay === 1
      ) {
        return true;
      }
    }

    // If the current day is Sunday or Monday, disable all dates for Monday
    if (cniso == "AE" && (currentDate.day() === 0 || currentDate.day() === 1)) {
      if (selectedDay === 0 || selectedDay === 1) {
        return true;
      }
    }

    return (
      (cniso != "AE" && date.day() === 5) || (cniso == "AE" && date.day() === 0)
    );
  };

  const getInitialDate = () => {
    let initialDate = dayjs().add(2, "day");
    while (isDateDisabled(initialDate)) {
      initialDate = initialDate.add(1, "day");
    }
    return initialDate.toDate();
  };

  React.useEffect(() => {
    formik.setFieldValue("measurement_dt", getInitialDate());
  }, []);

  const isAr =
    locale != "default" &&
    locale.split("-")?.[1] &&
    locale.split("-")?.[1] === "ar"
      ? true
      : false;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <DatePickerBox
            disablePast={true}
            fullWidth
            currentDate={true}
            label={translate("Date")}
            variant="standard"
            name="measurement_dt"
            getMinDate={getMinDate}
            shouldDisableDate={isDateDisabled}
            minHours={-48}
            value={formik.values.measurement_dt}
            onChange={(e) => {
              formik.setFieldValue(
                "measurement_dt",
                dayjs(e).format("YYYY-MM-DD")
              );
            }}
            format={isAr ? "YYYY-MMM-DD" : "DD-MMM-YYYY"}
            placeholder="DD/MM/YYYY"
            helperText={
              formik.touched.measurement_dt && formik.errors.measurement_dt
            }
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <SelectMultiCheckboxAutocomplete
            fullWidth
            label={translate("ProductsInterested")}
            type="text"
            inputRef={fieldRefs.productInterestedDesc}
            variant="standard"
            name="productInterestedDesc"
            value={formik.values.productInterestedDesc}
            onChange={(e) => {
              formik.setFieldValue("productInterestedDesc", e);
              formik.setFieldValue("productInterestedDesc11", e);
            }}
            helperText={
              formik.touched.productInterestedDesc &&
              formik.errors.productInterestedDesc
            }
            options={interest_products?.dropdown}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FullName")}
            type="text"
            variant="standard"
            inputRef={fieldRefs.long_name}
            name="long_name"
            value={formik.values.long_name}
            onChange={formik.handleChange}
            helperText={formik.touched.long_name && formik.errors.long_name}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Email")}
            type="email"
            inputRef={fieldRefs.email}
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
            defaultCountry={cniso && cniso != "XX" ? cniso.toUpperCase() : "US"}
            labels={langName == "ar" ? ar : en}
            placeholder="Enter phone number"
            label={translate("PhoneNumber")}
            variant="standard"
            inputRef={fieldRefs.phone_number}
            name="phone_number"
            value={formik.values.phone_number}
            onChange={(e) => {
              formik.setFieldValue("phone_number", e);
            }}
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
            error={formik.touched.phone_number && formik.errors.phone_number}
          />
        </Grid>

        <AddressLocation
          open={open}
          formik={formik}
          isArea={true}
          fieldRefs={fieldRefs}
        />
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
          <Box
            sx={{
              "& .google_captcha": {
                float: "right",
              },
            }}
          >
            {isLoading ? (
              <CaptchaSkeleton />
            ) : (
              <GoogleCaptchaValidation
                setIsCaptchaValid={setIsCaptchaValid}
                content="EnquiryForm"
              />
            )}
          </Box>
        </Grid>
        <Grid item md={12} sm={12} xs={12} xxs={12}>
          <Box
            sx={{
              textAlign: {
                lg: "right",
                md: "right",
                sm: "right",
                xs: "right",
                xxs: "center",
              },
              pb: 2,
            }}
          >
            <SubmitButton
              fullWidth
              variant="contained"
              color="primary"
              type="button"
              onClick={handleSubmitForm}
              title={translate("Submit")}
              disabled={!isCaptchaValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              buttonSx={(theme) => ({
                "&.MuiButton-root": {
                  borderRadius: "0px",
                  color: "common.black",
                  ...theme.typography.typography15,
                  padding: "1rem 5px!important",
                  maxWidth: {
                    lg: "300px!important",
                    md: "300px!important",
                    sm: "100%!important",
                    xs: "100%!important",
                    xxs: "100%!important",
                  },
                  background: (theme) => theme.palette.primary.light,
                  ":hover": {
                    background: (theme) => theme.palette.primary[200],
                    color: "common.white",
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
    </>
  );
};

export default Consultation;
