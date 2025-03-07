import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const MuiPhoneInput = (props, ref) => {
  return (
    <TextField
      {...props}
      error={props.helperText ? true : false}
      inputRef={ref}
      fullWidth={props.fullWidth}
      InputLabelProps={props.inputLabelProps}
      size={props.size}
      label={props.label}
      variant={props.variant}
      name={props.name}
      sx={props.inputSx}
    />
  );
};
export default forwardRef(MuiPhoneInput);
