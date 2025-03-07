import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import useCartContext from "@/provider/cart/cartContext";
import useProfileContext from "@/provider/profile/useProfileContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { AddressLocation } from "../location";

const AddressListForm = ({
  isRedirect = true,
  newAddress,
  handleClose2,
  updateShippingPrice,
  submitButtonName,
  textAlign = {
    lg: "start",
    md: "start",
    sm: "center",
    xs: "center",
    xxs: "center",
  },
  type = "OTHER",
}) => {
  const dispatch = useDispatch();
  const { cartState } = useCartContext();
  const { shipping_price } = cartState;
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);

  const { defaultShippingAddress } = useSelector(
    (state) => state.profileSetting
  );
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale, push, pathname } = useRouter();
  const { getAddress } = useProfileContext();
  const {
    USER_ID,
    cniso,
    visitorId,
    site,
    langName,
    CCYCODE,
    CCYDECIMALS,
    countryName,
    detect_country,
    JWTAuthToken,
    user,
  } = cookies || {};

  const defaultCheck = pathname == "/cart/shippingAddress";

  const fieldRefs = {
    country: React.useRef(null),
    city: React.useRef(null),
    area: React.useRef(null),
    cad_building_name_no: React.useRef(null),
    cad_first_name: React.useRef(null),
    cad_last_name: React.useRef(null),
  };

  const formik = useFormik({
    initialValues: {
      cad_address_type: "HOME",
      cad_first_name: "",
      cad_last_name: "",
      cad_contact_number: "",
      cad_country: "",
      cad_active_yn: "Y",
      cad_default_yn:
        user?.cust_cr_uid === "GUEST-USER" || defaultCheck ? "Y" : "N",
      cad_city: "",
      cad_city_area: "",
      province_desc: "",
      cad_state: "",
      cad_floor_no: "",
      cad_postal_code: "",
      cad_building_name_no: "",
      cad_nearest_landmark: "",
      cad_shipping_note: "",
      country: "",
      cust_user_id: user?.cust_email_id,
      auth_token: JWTAuthToken,
      cad_id: "",
      detect_country: detect_country,
      city: "",
      area: "",
      state: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.cad_first_name) {
        errors.cad_first_name = translate("Thisfieldisrequired");
      }
      if (!values.cad_last_name) {
        errors.cad_last_name = translate("Thisfieldisrequired");
      }
      if (!values.country) {
        errors.country = translate("Thisfieldisrequired");
      }
      if (!values.cad_contact_number) {
        errors.cad_contact_number = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.cad_contact_number)) {
        errors.cad_contact_number = `${translate(
          "please_enter_a_valid_number"
        )}`;
      }
      if (!values.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!values.area) {
        errors.area = translate("Thisfieldisrequired");
      }
      if (!values.cad_building_name_no) {
        errors.cad_building_name_no = translate("Thisfieldisrequired");
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      let url, method;
      if (
        Boolean(type == "OTHER") &&
        Boolean(newAddress?.id) &&
        newAddress?.id != "new"
      ) {
        url = `dashboard/update_address/${newAddress?.cad_id || newAddress?.data?.cad_id
          }/${USER_ID}`;
        method = "POST";
      } else {
        url = `dashboard/create_address/${USER_ID}`;
        method = "POST";
      }
      const formData = new FormData();

      for (var key in values) {
        if (key == "cad_country") {
          formData.append("cad_country", values?.country?.value);
        } else if (key == "cad_city") {
          formData.append("cad_state", values?.state);
        } else if (key == "cad_state") {
          formData.append("cad_city", values?.city?.value);
        } else if (key == "cad_city_area") {
          formData.append("cad_city_area", values?.area?.value);
        } else if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("cad_active_yn", "Y");
      formData.append("cust_user_id", user?.cust_email_id);
      formData.append("auth_token", JWTAuthToken);
      formData.append("site", site);
      formData.append("lang", langName);
      formData.append("country", countryName);
      formData.append("visitorId", visitorId);
      formData.append("currency", CCYCODE);
      formData.append("ccy_decimal", CCYDECIMALS);
      formData.append("cn_iso", cniso);
      formData.append("userId", USER_ID);
      await axiosInstance
        .request({ url, method, data: formData })
        .then(async (response) => {
          if (response?.status === 200) {
            let res_data = response.data;
            enqueueSnackbar(
              response?.data?.error_message || `${translate("Success")}`,
              {
                variant: "success",
              }
            );
            if (isRedirect) {
              let shipping_id =
                res_data?.result && res_data?.result?.CAD_SYS_ID
                  ? res_data?.result?.CAD_SYS_ID
                  : false;

              let ship_price = shipping_price ? shipping_price : 0;
              if (user?.cust_cr_uid === "GUEST-USER") {
                push("/cart/delivery");
              }
              push("/cart/delivery");
              if (updateShippingPrice) {
                updateShippingPrice(shipping_id, ship_price, false, false);
              }
              resetForm();
            }
            if (user) {
              getAddress({
                USER_ID,
                cust_user_id: user?.cust_email_id,
                auth_token: JWTAuthToken,
              });
              dispatch(
                getProfileAddress({
                  USER_ID: USER_ID,
                  cust_user_id: user.cust_email_id,
                  auth_token: JWTAuthToken,
                })
              );
            }

            if (handleClose2) {
              handleClose2();
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar(
            res_data.error_message || `${translate("SomethingWentWrong")}`,
            {
              variant: "error",
            }
          );
        });
    },
  });
  const bindData = () => {
    const data = newAddress?.data || defaultShippingAddress;
    for (const [key] of Object.entries(formik.values)) {
      formik.setFieldValue([key], data?.[key] || "");
    }
    if (data?.cad_country) {
      formik.setFieldValue("cad_country", data?.cad_country);
    }
    if (data?.cad_city) {
      formik.setFieldValue("cad_city", data?.cad_city);
    }
    if (data?.cad_city_area) {
      formik.setFieldValue("cad_city_area", data?.cad_city_area);
    }
  };

  React.useEffect(() => {
    if (
      (defaultShippingAddress && user?.cust_cr_uid == "GUEST-USER") ||
      newAddress?.id != "new"
    ) {
      bindData();
    }
  }, [defaultShippingAddress, newAddress?.id, newAddress?.data]);

  React.useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.keys(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = [
        "country",
        "city",
        "area",
        "cad_first_name",
        "cad_last_name",
        "cad_building_name_no",
      ];
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
    if (user && newAddress.id == "new") {
      formik.setFieldValue("cad_first_name", user?.cust_first_name);
      formik.setFieldValue("cad_last_name", user?.cust_last_name);
      formik.setFieldValue("cad_mobile_no", user?.cust_mobile_no);
      formik.setFieldValue("cad_phone_no", user?.cust_phone_no);
      formik.setFieldValue("cad_photo", user?.cust_photo);
      formik.setFieldValue("cad_user_id", user?.cust_user_id);
      formik.setFieldValue("cad_contact_number", user?.cust_mobile_no);
    }
  }, [user?.cust_cr_uid, newAddress.open]);

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
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              inputRef={fieldRefs.cad_first_name}
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("FirstName")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_first_name"
              value={formik.values.cad_first_name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_first_name && formik.errors.cad_first_name
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              inputRef={fieldRefs.cad_last_name}
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("LastName")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_last_name"
              value={formik.values.cad_last_name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_last_name && formik.errors.cad_last_name
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <CustomPhoneInput
              international
              countryCallingCodeEditable={false}
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("MobileNo")}
                </Typography>
              }
              variant="standard"
              name="cad_contact_number"
              value={formik.values.cad_contact_number}
              onChange={(e) => {
                formik.setFieldValue("cad_contact_number", e);
              }}
              helperText={
                formik.touched.cad_contact_number &&
                formik.errors.cad_contact_number
              }
              error={
                formik.touched.cad_contact_number &&
                formik.errors.cad_contact_number
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <AddressLocation
            countryKeyName="cad_country"
            cityAreaName="cad_city_area"
            cityKeyName="cad_city"
            formik={formik}
            isArea={true}
            id={newAddress.id}
            open={newAddress.open}
            isCountryDropdownDisabled={true}
            fieldRefs={fieldRefs}
          />
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("FloorNo")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_floor_no"
              value={formik.values.cad_floor_no}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_floor_no && formik.errors.cad_floor_no
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("Zipcode")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_postal_code"
              value={formik.values.cad_postal_code}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_postal_code && formik.errors.cad_postal_code
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            <TextBox
              inputRef={fieldRefs.cad_last_name}
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("AddressFull")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_building_name_no"
              value={formik.values.cad_building_name_no}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_building_name_no &&
                formik.errors.cad_building_name_no
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("Landmark")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_nearest_landmark"
              value={formik.values.cad_nearest_landmark}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_nearest_landmark &&
                formik.errors.cad_nearest_landmark
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.common.black,
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  })}
                >
                  {translate("Shippingnote")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="cad_shipping_note"
              value={formik.values.cad_shipping_note}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_shipping_note &&
                formik.errors.cad_shipping_note
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            <FormControl fullWidth>
              <Stack
                direction="row"
                alignItems="center"
                spacing={8}
                width="100%"
              >
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <Typography
                    sx={(theme) => ({
                      fontSize: "15px",
                      fontWeight: 500,
                      color: theme.palette.common.black,
                      fontFamily: theme.fontFaces.helveticaNeue,
                    })}
                  >
                    {translate("SaveAddressAs")}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formik.values.cad_address_type}
                  onChange={(e) => {
                    formik.setFieldValue("cad_address_type", e.target.value);
                  }}
                >
                  <FormControlLabel
                    sx={(theme) => ({
                      "& .MuiFormControlLabel-label": {
                        fontFamily: theme.fontFaces.helveticaNeue,
                      },
                    })}
                    value="HOME"
                    control={<Radio />}
                    label={translate("home")}
                  />
                  <FormControlLabel
                    sx={(theme) => ({
                      "& .MuiFormControlLabel-label": {
                        fontFamily: theme.fontFaces.helveticaNeue,
                      },
                    })}
                    value="WORK"
                    control={<Radio />}
                    label={translate("Work")}
                  />
                </RadioGroup>
              </Stack>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            {user?.cust_cr_uid !== "GUEST-USER" && (
              <FormControlLabel
                sx={{ color: (theme) => theme.palette.grey[2200], ml: 1 }}
                control={
                  <Checkbox
                    color="primary"
                    checked={formik.values.cad_default_yn === "Y"}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "cad_default_yn",
                        e.target.checked ? "Y" : "N"
                      );
                    }}
                    name="cad_default_yn"
                  />
                }
                label={
                  <Typography
                    fontSize="15px"
                    fontWeight="500"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("Makethismydefaultaddress")}
                  </Typography>
                }
              />
            )}
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            xxs={12}
            mb={3}
            textAlign={textAlign}
          >
            <SubmitButton
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              title={submitButtonName}
              fullWidth
              type="button"
              onClick={handleSubmitForm}
              maxWidth="500px!important"
              fontWeight={200}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddressListForm;
