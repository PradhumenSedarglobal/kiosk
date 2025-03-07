import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React from "react";
import Iconify from "../iconify";
import { FormControl } from "./index";

const PasswordBox = (props) => {
  const [showPassword, setShowPassword] = React.useState("");

  const {
    name,
    label,
    value,
    required,
    inputAdornmentPosition,
    fullWidth,
    helperText,
    placeholder,
    size,
    disabled,
    variant,
    inputSx,
    onBlur,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      variant={variant}
    >
      <TextField
        sx={inputSx}
        error={helperText ? true : false}
        name={name}
        label={label}
        size={size}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        required={required}
        value={value}
        disabled={disabled}
        variant={variant}
        autoComplete="new-password"
        onChange={(e) => props.onChange(e)}
        onBlur={onBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position={inputAdornmentPosition || "end"}>
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                <Iconify
                  icon={
                    showPassword ? "iconamoon:eye-thin" : "iconoir:eye-closed"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

PasswordBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PasswordBox;
