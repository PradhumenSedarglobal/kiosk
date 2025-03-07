import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import FormControl from "../formControl";
import MuiPhoneInput from "./phoneNumber";

const CustomPhoneInput = (props) => {
  const {
    name,
    label,
    value,
    fullWidth = true,
    helperText,
    placeholder,
    size = "small",
    formControlSx,
    defaultCountry = "AE",
    countryCallingCodeEditable = false,
    international = true,
    variant = "standard",
    inputRef,
    onBlur,
    disabled = false,
    inputSx
  } = props;
  const { locale } = useRouter();

  // State to manage the selected country
  const [country, setCountry] = useState(defaultCountry);

  React.useEffect(() => {
    setCountry(defaultCountry);
  }, [locale, defaultCountry]);

  return (
    <FormControl
      key={`key${name}-${country}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={(theme) => ({
        ...(theme.direction == "rtl" && {
          "& .PhoneInputCountrySelectArrow": {
            marginLeft: "5px",
          },
        }),
        ...formControlSx,
      })}
      size={size}
      disabled={disabled}
    >
      <PhoneInput
        key={country}
        disabled={disabled}
        ref={inputRef}
        inputComponent={MuiPhoneInput}
        international={international}
        countryCallingCodeEditable={countryCallingCodeEditable}
        defaultCountry={country} // Ensure country remains selected
        country={country}
        placeholder={placeholder}
        variant={variant}
        value={value}
        onChange={(e) => {
          if (e) {
            props.onChange(e || "");
          } else {
            props.onChange("");
          }
        }}
        onCountryChange={(newCountry) => {
          setCountry(newCountry);
        }} // Keep track of the country
        onBlur={onBlur}
        name={name}
        inputSx={inputSx}
        size={size}
        label={
          <Typography
            sx={(theme) => ({
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              fontSize: "16px",
            })}
          >
            {label}
          </Typography>
        }
        helperText={helperText ? true : false}
        error={helperText}
      />
      {helperText && (
        <FormHelperText
          sx={(theme) => ({
            "&.MuiFormHelperText-root": {
              marginLeft: "0px",
              fontFamily: theme.fontFaces.helveticaNeueLight,
            },
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomPhoneInput;
