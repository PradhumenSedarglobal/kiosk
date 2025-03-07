import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import FormControl from "./formControl";

const RadioBox = ({
  label,
  name,
  checked,
  value,
  onChange,
  labelPlacement,
  helperText,
  fullWidth = false,
  formSx,
  defaultValue,
  defaultChecked,
  disabled,
  formControlSx,
  onBlur,
}) => {
  return (
    <FormControl
      key={`key${name}`}
      sx={{
        "&.MuiFormControl-root": {
          mb: 0,
        },
        ...formControlSx,
      }}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      <FormControlLabel
        sx={{
          "&.MuiFormControlLabel-root": {
            justifyContent: "center",
            mr: 0.6,
            ...formSx,
          },
        }}
        value={value}
        control={<Radio />}
        onChange={onChange}
        label={label}
        checked={checked}
        defaultChecked={defaultChecked}
        defaultValue={defaultValue}
        name={name}
        labelPlacement={labelPlacement}
        disabled={disabled}
        onBlur={onBlur}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioBox;
