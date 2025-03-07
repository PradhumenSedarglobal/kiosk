import { FormHelperText } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "./formControl";

const SelectMultiAutocomplete = ({
  value = [],
  onChange,
  label,
  name,
  options = [],
  fullWidth,
  disabled,
  placeholder,
  helperText,
  required,
  variant = "standard",
  inputLabelProps,
}) => {
  return (
    <>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        disabled={disabled}
        variant={variant}
      >
        <Autocomplete
          multiple={true}
          filterSelectedOptions={true}
          fullWidth={fullWidth}
          error={helperText ? true : false}
          required={required}
          name={name}
          value={value}
          variant={variant}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          options={options}
          InputLabelProps={inputLabelProps}
          renderInput={(params) => (
            <TextField
              {...params}
              error={helperText ? true : false}
              label={label}
              placeholder={placeholder}
              required={required}
              variant={variant}
              InputLabelProps={inputLabelProps}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          )}
          disabled={disabled}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default SelectMultiAutocomplete;
