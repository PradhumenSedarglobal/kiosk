
import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import DragDrop from "@/components/form/dragDrop";
import CustomPhoneInput from "@/components/form/phoneInput";
import SelectBox from "@/components/form/select";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { AddressLocation } from "@/modules/location";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { projectBudgets, projectType } from "@/utils/constant";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { GoogleCaptchaValidation } from "../captcha/captcha";

const StartProject = ({ formik, open, fieldRefs, handleSubmitForm }) => {
  const { isLoading } = useProgressRouter();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const theme = useTheme();
  const childRef = React.useRef(null);
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso } = cookies || {};
  const [provinceDescLabel, setProvinceDescLabel] = React.useState("Province");
  React.useEffect(() => {
    if (formik?.values?.country?.value == "AE" && open) {
      setProvinceDescLabel(`${translate("Emirates")}`);
    } else {
      setProvinceDescLabel(`${translate("Province")}`);
    }
  }, [formik?.values?.country?.value, locale, open]);
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FullName")}
            type="text"
            variant="standard"
            name="long_name"
            inputRef={fieldRefs.long_name} // Assign ref
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
            international
            countryCallingCodeEditable={false}
            defaultCountry={cniso && cniso != "XX" ? cniso.toUpperCase() : "US"}
            labels={langName == "ar" ? ar : en}
            placeholder="Enter phone number"
            label={translate("PhoneNumber")}
            variant="standard"
            name="phone_number"
            inputRef={fieldRefs.phone_number} // Assign ref
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
        {/* {(formik?.values?.country?.value === "AE" ||
          formik?.values?.country?.value === "SA") && (
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
                    {provinceDescLabel}
                  </Typography>
                }
                type="text"
                variant="standard"
                name="province_desc"
                inputRef={fieldRefs.province_desc}
                value={formik.values.province_desc}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.province_desc && formik.errors.province_desc
                }
                inputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Grid>
          )} */}

        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <SelectBox
            fullWidth
            label={translate("ProjectType")}
            type="text"
            variant="standard"
            name="ProjectType"
            value={formik?.values?.ProjectType}
            onChange={formik.handleChange}
            options={projectType}
            isTranslate={true}
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
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <DragDrop
            fullWidth
            name="documentfile"
            inputRef={fieldRefs.documentfile} // Assign ref
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
            onSizeError={() => {
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
            name="urllink"
            inputRef={fieldRefs.urllink} // Assign ref
            value={formik.values.urllink}
            onChange={formik.handleChange}
            helperText={formik.touched.urllink && formik.errors.urllink}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Message")}
            type="text"
            variant="standard"
            name="subject"
            inputRef={fieldRefs.subject} // Assign ref
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
            {isLoading ? <CaptchaSkeleton /> :
              <GoogleCaptchaValidation
                setIsCaptchaValid={setIsCaptchaValid}
                content="EnquiryForm"
              />
            }
          </Box>
        </Grid>
        <Grid item md={12} sm={12} xs={12} xxs={12}>
          <Box sx={{ textAlign: "right" }}>
            <SubmitButton
              fullWidth
              variant="contained"
              color="primary"
              type="button"
              title={translate("Submit")}
              onClick={() => {
                handleSubmitForm();
              }}
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
    </>
  );
};

export default StartProject;
