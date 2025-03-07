import { SubmitButton } from "@/components/button";
import { SelectAutocomplete, SelectMultiCheckboxAutocomplete, TextBox } from "@/components/form";
import { AddressLocation } from "@/modules/location";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";

import { useAuthContext } from "@/auth/useAuthContext";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { GoogleCaptchaValidation } from "@/modules/captcha/captcha";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { getContactCategory } from "@/redux/slices/contact";
import { getInterestProduct } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";

const ProductEnquiryForm = ({ formik = {} }) => {
  
  const { interest_products } = useSelector((state) => state.product);
  const { isLoading } = useProgressRouter();
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    langName,
    site,
    CCYCODE,
    countryName,
    cniso,
  } = cookies || {};
  const theme = useTheme();
  const dispatch = useDispatch();
  const { contactPage } = useSelector((state) => state.contact);
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const [provinceDescLabel, setProvinceDescLabel] = React.useState(
    translate("Province")
  );

  React.useEffect(() => {
    if (site) {
      dispatch(getContactCategory({ content: "contact" }));
    }
  }, [dispatch, cniso, locale]);

  React.useEffect(() => {
    if (formik?.values?.country?.value == "AE") {
      setProvinceDescLabel(translate("Emirates"));
    } else {
      setProvinceDescLabel(translate("Province"));
    }
  }, [formik?.values?.country?.value]);

  React.useEffect(() => {
    if (
      site &&
      formik?.values?.category_code?.value == "002"
    ) {
      dispatch(
        getInterestProduct({
          cunsult_type: 'SITE_FREE_CONSULT',
        })
      );
    }
  }, [
    langName,
    countryName,
    CCYCODE,
    cniso,
    locale,
    formik?.values?.category_code?.value,
  ]);
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FirstName")}
            type="text"
            variant="standard"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("LastName")}
            type="text"
            variant="standard"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            helperText={formik.touched.last_name && formik.errors.last_name}
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
            labels={langName == "ar" ? ar : en}
            placeholder="Enter phone number"
            label={translate("Phonenumber")}
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

        <AddressLocation isArea={false} formik={formik} />
        {formik?.values?.enquiry_type !=
          "A" && (
            <Grid item md={6} sm={12} xs={12} xxs={12}>
              <SelectAutocomplete
                fullWidth={true}
                label={translate("selectcategory")}
                type="text"
                variant="standard"
                name="category_code"
                value={formik.values.category_code}
                options={contactPage?.dropdown}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue("category_code", e);
                  } else {
                    formik.setFieldValue("category_code", null);
                  }
                }}
                helperText={
                  formik.touched.category_code && formik.errors.category_code
                }
                inputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          )}
        {formik?.values?.enquiry_type ==
          "A" && (
            <>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("Product Type")}
                  type="text"
                  variant="standard"
                  name="producttype"
                  value={formik.values.producttype}
                  onChange={formik.handleChange}
                  readOnly= 'true'
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("Artwork")}
                  type="text"
                  variant="standard"
                  name="artwork"
                  value={formik.values.artwork}
                  onChange={formik.handleChange}
                  readOnly= 'true'

                />
              </Grid>
            </>
          )}
        {formik?.values?.category_code?.value ==
          "002" && (
            <Grid item md={6} sm={6} xs={12} xxs={12}>
              <SelectMultiCheckboxAutocomplete
                fullWidth
                label={translate("ProductsInterested")}
                type="text"
                // inputRef={fieldRefs.productInterestedDesc}
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
          )}
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
          {isLoading ? <CaptchaSkeleton /> :
            <GoogleCaptchaValidation
              setIsCaptchaValid={setIsCaptchaValid}
              content="contact"
            />
          }
        </Grid>
        <Grid item md={12} sm={12} xs={12} xxs={12}>
          <Box sx={{ textAlign: "right" }}>
            <SubmitButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              title={translate("Submit")}
              loading={formik.isSubmitting}
              disabled={!isCaptchaValid || formik.isSubmitting}
              sx={{
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
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

ProductEnquiryForm.propTypes = {
  data: PropTypes.array,
  formik: PropTypes.object,
};

export default ProductEnquiryForm;
