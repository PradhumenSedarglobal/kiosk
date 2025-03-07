import { useAuthContext } from "@/auth/useAuthContext";
import { SelectAutocomplete } from "@/components/form";
import {
  getArea,
  getCity,
  getCountry,
  setDefaultCountry,
} from "@/redux/slices/location";
import { useDispatch, useSelector } from "@/redux/store";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const AddressLocation = ({
  formik,
  md = 6,
  isArea,
  countryKeyName,
  cityKeyName,
  cityAreaName,
  id = false,
  open = true,
  isCountryDropdownDisabled = false,
  fieldRefs,
}) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { country, city, area } = useSelector((state) => state.location);
  const { locale, pathname } = useRouter();
  const { state } = useAuthContext();
  const { cookies = {} } = state;
  const { user, cniso } = cookies || {};
  const { defaultShippingAddress } = useSelector(
    (state) => state.profileSetting
  );
  const cityUrl = (id) =>
    isArea ? `fetch/getAllCity/${id}` : `fetch/country_state_lov`;

  React.useEffect(() => {
    if (cookies?.site && open && cniso) {
      dispatch(getCountry({ cn_iso: cniso }));
    }
  }, [locale, pathname, cookies, open, cniso]);

  React.useEffect(() => {
    if (
      defaultShippingAddress &&
      user?.cust_cr_uid === "GUEST-USER" &&
      (country?.dropdown?.length > 0 ||
        city?.dropdown?.length > 0 ||
        area?.dropdown?.length > 0)
    ) {
      const getCountry = country?.dropdown.find(
        (item) => item.value == formik?.values[countryKeyName]
      );

      const getCity = city?.dropdown.find(
        (item) => item.value == formik?.values[cityKeyName]
      );

      if (getCountry) {
        formik.setFieldValue("country", getCountry);
      }
      if (getCity) {
        formik.setFieldValue(
          "state",
          isArea ? getCity?.SST_CODE : getCity?.state_code
        );
        formik.setFieldValue("province_desc", getCity?.label);
        formik.setFieldValue("city", getCity);
        if (isArea) {
          const getAreaObject = area?.dropdown.find(
            (item) => item.value == formik?.values[cityAreaName]
          );

          if (getAreaObject) {
            formik.setFieldValue("area", getAreaObject);
          }
        }
      }
    }
  }, [defaultShippingAddress, user, country, city, area]);

  React.useEffect(() => {
    if (
      (formik.values[countryKeyName] ||
        formik?.values?.country?.value ||
        country?.defaultValue?.value) &&
      cookies?.site &&
      open
    ) {
      const CountryCode =
        formik.values[countryKeyName] ||
        formik?.values?.country?.value ||
        country.defaultValue?.value;
      dispatch(
        getCity(cityUrl(CountryCode), {
          country_iso: CountryCode,
        })
      );
    }
  }, [
    formik.values[countryKeyName],
    formik.values.country,
    locale,
    pathname,
    cookies,
    open,
    country.defaultValue,
  ]);

  React.useEffect(() => {
    if (country.defaultValue?.value) {
      formik.setFieldValue("country", country.defaultValue);
    }
  }, [country.defaultValue]);

  React.useEffect(() => {
    if (
      id &&
      country?.dropdown?.length > 0 &&
      city?.dropdown?.length > 0 &&
      open
    ) {
      const getCountry = country?.dropdown.find(
        (item) => item.value == formik?.values[countryKeyName]
      );

      const getCity = city?.dropdown.find(
        (item) => item.value == formik?.values[cityKeyName]
      );

      if (getCountry) {
        formik.setFieldValue("country", getCountry);
        dispatch(setDefaultCountry(getCountry));
      }
      if (getCity) {
        formik.setFieldValue(
          "state",
          isArea ? getCity?.SST_CODE : getCity?.state_code
        );
        formik.setFieldValue("province_desc", getCity?.label);
        formik.setFieldValue("city", getCity);

        if (isArea) {
          const getAreaObject = area?.dropdown.find(
            (item) => item.value == formik?.values[cityAreaName]
          );
          if (getAreaObject) {
            formik.setFieldValue("area", getAreaObject);
          }
        }
      }
    }
  }, [country, city, id, formik?.values, open, area]);

  React.useEffect(() => {
    if (
      (formik.values[cityKeyName] || formik?.values?.city?.value) &&
      cookies?.site &&
      ((id && open) || user?.cust_cr_uid == "GUEST-USER")
    ) {
      dispatch(
        getArea({
          city_code: formik.values[cityKeyName] || formik?.values?.city?.value,
        })
      );
    }
  }, [
    formik.values[cityKeyName],
    formik.values.city,
    id,
    cookies,
    open,
    user?.cust_cr_uid,
  ]);
  return (
    <>
      <Grid item md={md} sm={12} xs={12} xxs={12}>
        <SelectAutocomplete
          fullWidth
          placeholder={translate("SelectCountry")}
          label={translate("Country")}
          type="text"
          variant="standard"
          fieldRefs={fieldRefs?.country}
          name="country"
          value={formik.values.country || country.defaultValue}
          defaultValue={formik.values.country}
          disabled={isCountryDropdownDisabled}
          onChange={(e) => {
            if (e) {
              dispatch(
                getCity(cityUrl(e.value), {
                  country_iso: e.value,
                })
              );
              formik.setFieldValue("country", e);
              if (countryKeyName) {
                formik.setFieldValue(countryKeyName, e.value);
                dispatch(setDefaultCountry(e.value));
              }
              if (cityAreaName) {
                formik.setFieldValue(cityAreaName, null);
              }
              if (cityKeyName) {
                formik.setFieldValue(cityKeyName, null);
              }
              formik.setFieldValue("city", "");
              formik.setFieldValue("area", "");
              formik.setFieldValue("state", "");
              formik.setFieldValue("province_desc", "");
            } else {
              if (countryKeyName) {
                formik.setFieldValue(countryKeyName, e);
              }
              if (cityKeyName) {
                formik.setFieldValue(cityKeyName, e);
              }
              if (cityAreaName) {
                formik.setFieldValue(cityAreaName, e);
              }
              formik.setFieldValue("country", "");
              formik.setFieldValue("state", "");
              formik.setFieldValue("province_desc", "");
              formik.setFieldValue("city", "");
              formik.setFieldValue("area", "");
              dispatch(setDefaultCountry(null));
            }
          }}
          options={country?.dropdown}
          inputLabelProps={{
            shrink: true,
          }}
          helperText={formik.touched.country && formik.errors.country}
          error={formik.touched.country && formik.errors.country}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item md={md} sm={12} xs={12} xxs={12}>
        <SelectAutocomplete
          fullWidth
          label={translate("City")}
          placeholder={translate("SelectCity")}
          type="text"
          variant="standard"
          fieldRefs={fieldRefs?.city}
          name="city"
          value={formik.values.city}
          defaultValue={formik.values.city}
          onChange={(e) => {
            if (e) {
              dispatch(
                getArea({
                  city_code: e.value,
                })
              );
              formik.setFieldValue("city", e);
              if (cityAreaName) {
                formik.setFieldValue(cityAreaName, null);
              }
              if (cityKeyName) {
                formik.setFieldValue(cityKeyName, e.value);
              }
              formik.setFieldValue("state", isArea ? e.SST_CODE : e.state_code);
              formik.setFieldValue("province_desc", e.label);
              formik.setFieldValue("area", "");
            } else {
              if (cityAreaName) {
                formik.setFieldValue(cityAreaName, e);
              }
              if (cityKeyName) {
                formik.setFieldValue(cityKeyName, e);
              }
              formik.setFieldValue("city", "");
              formik.setFieldValue("state", "");
              formik.setFieldValue("province_desc", "");
              formik.setFieldValue("area", "");
            }
          }}
          options={
            formik.values.country || country?.defaultValue?.value
              ? city?.dropdown
              : []
          }
          inputLabelProps={{
            shrink: true,
          }}
          helperText={formik.touched.city && formik.errors.city}
          error={formik.touched.city && formik.errors.city}
          onBlur={formik.handleBlur}
        />
      </Grid>
      {isArea && (
        <Grid item md={md} sm={12} xs={12} xxs={12}>
          <SelectAutocomplete
            fullWidth
            label={translate("Area")}
            placeholder={translate("SelectArea")}
            type="text"
            fieldRefs={fieldRefs?.area}
            variant="standard"
            name="area"
            value={formik.values.area}
            defaultValue={formik.values.area}
            onChange={(e) => {
              if (e) {
                formik.setFieldValue("area", e);
                if (cityAreaName) {
                  formik.setFieldValue(cityAreaName, e.value);
                }
              } else {
                formik.setFieldValue("area", "");
                if (cityAreaName) {
                  formik.setFieldValue(cityAreaName, e);
                }
              }
            }}
            options={formik.values.city ? area?.dropdown : []}
            inputLabelProps={{
              shrink: true,
            }}
            helperText={formik.touched.area && formik.errors.area}
            error={formik.touched.area && formik.errors.area}
            onBlur={formik.handleBlur}
          />
        </Grid>
      )}
    </>
  );
};

export default AddressLocation;
