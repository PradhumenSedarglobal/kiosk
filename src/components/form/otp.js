import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import OTPInput from "react-otp-input";

// e.target.value.replace(/\D/g, "")

const MUITextField = styled("input", {
  shouldForwardProp: (props) => props !== "error",
})(({ theme, error }) => ({
  borderColor: alpha(theme.palette.grey[500], 0.56),
  borderStyle: "solid",
  borderWidth: "0px",
  borderBottomWidth: "1px",
  borderRadius: "0px!important",
  ":focus-visible": {
    borderColor: theme.palette.grey[800],
    outline: "unset",
  },
  ...(error && {
    borderColor: theme.palette.error.main,
  }),
}));

const OTPBox = ({
  label,
  fullWidth,
  formik,
  numInputs,
  name,
  variant,
  isRequired,
}) => {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
        <FormControl
          fullWidth={fullWidth}
          error={formik?.errors[name] ? true : false}
        >
          {label && (
            <Box
              component={InputLabel}
              sx={(theme) => ({
                "&.MuiInputLabel-root": {
                  ...theme.typography.typography15,
                  transform: "translate(0px, -14px) scale(0.75)",
                  marginTop: "-10px",
                },
              })}
            >{`${label} ${isRequired ? "*" : ""}`}</Box>
          )}
          <OTPInput
            fullWidth
            name={name}
            containerStyle={{ justifyContent: "space-between" }}
            inputStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
            value={formik?.values[name]}
            inputType="number"
            isInputNum={true}
            onChange={(e) => formik.setFieldValue(name, e)}
            error={formik?.touched[name] && formik?.errors[name]}
            helperText={formik?.touched[name] && formik?.errors[name]}
            numInputs={numInputs}
            renderSeparator={<span style={{ marginRight: "5px" }}></span>}
            renderInput={(props) => {
              return (
                <MUITextField
                  {...props}
                  fullWidth={fullWidth}
                  variant={variant}
                  error={
                    formik?.touched[name] && formik?.errors[name] ? true : false
                  }
                  onBlur={formik.handleBlur}
                />
              );
            }}
          />
          {formik.errors[name] && (
            <FormHelperText
              sx={{
                color: (theme) => theme.palette.error.main,
                "&.MuiFormHelperText-root": {
                  marginLeft: "0px",
                },
              }}
            >
              {formik.errors[name]}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </React.Fragment>
  );
};
export default OTPBox;
