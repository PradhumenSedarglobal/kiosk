import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FormControl from "./formControl";

const SelectAutocomplete = ({
  value,
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
  onBlur,
  fieldRefs,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [defaultValue, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(value?.value ? value : "");
  }, [value, defaultValue]);

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
          fullWidth={fullWidth}
          name={name}
          value={defaultValue}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          onBlur={onBlur}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                component="li"
                key={key}
                {...optionProps}
                sx={{
                  fontFamily: (theme) =>
                    `${theme.fontFaces.helveticaNeue} !important`,
                }}
              >
                {option.label}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={fieldRefs}
              error={helperText ? true : false}
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
              placeholder={placeholder}
              required={required}
              variant={variant}
              InputLabelProps={inputLabelProps}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off",
              }}
              sx={(theme) => ({
                "& .MuiInputLabel-root": {
                  color: "black", // Set label color to black
                  fontFamily: theme.fontFaces.helveticaNeue,
                },
                "& .MuiInput-input::placeholder": {
                  color: "black", // Set placeholder color to black
                  fontFamily: theme.fontFaces.helveticaNeue,
                },
                "& .MuiInput-root .MuiInput-input": {
                  color: "black", // Text color black when not disabled
                  fontFamily: theme.fontFaces.helveticaNeue,
                },
                "& .Mui-disabled": {
                  color: "black !important", // Text color black when disabled
                  "-webkit-text-fill-color": "black", // For webkit browsers
                },
                fontFamily: theme.fontFaces.helveticaNeue,
              })}
            />
          )}
          disabled={disabled}
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
    </>
  );
};

export default SelectAutocomplete;
