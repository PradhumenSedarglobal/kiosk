import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "./formControl";

const SelectMultiCheckboxAutocomplete = ({
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
  inputRef,
  variant = "standard",
  inputLabelProps,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        disabled={disabled}
        variant={variant}
        sx={(theme) => ({
          "& .MuiTextField-root": {
            "&.Mui-focused .MuiInputLabel-root": {
              color: "black",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
            "& .MuiInputLabel-root": {
              color: "black",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
          },
          "& .MuiChip-label": {
            fontFamily: theme.fontFaces.helveticaNeueLight,
          },
          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: "grey", // Set label text color to white when it shrinks
            fontFamily: theme.fontFaces.helveticaNeueMedium,
          },
          "& .MuiFormLabel-root-MuiInputLabel-root": {
            color: "black", // Set label text color to black
            fontFamily: theme.fontFaces.helveticaNeueMedium,
          },
        })}
      >
        <Autocomplete
          multiple={true}
          fullWidth={fullWidth}
          error={helperText ? "true" : "false"}
          required={required}
          name={name}
          value={value}
          variant={variant}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          options={options}
          renderOption={(props, option, { selected }) => {
            return (
              <Box
                component="li"
                {...props}
                sx={{
                  fontFamily: (theme) =>
                    `${theme.fontFaces.helveticaNeue} !important`,
                }}
              >
                <Checkbox
                  size="small"
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                />
                {option.label}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={helperText ? true : false}
              label={label}
              inputRef={inputRef}
              placeholder={placeholder}
              required={required}
              variant={variant}
              InputLabelProps={inputLabelProps}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
              sx={{
                height: "auto",
                paddingX: "4px",
                "& .MuiChip-root": {
                  margin: "4px",
                  padding: "4px",
                  height: "auto",
                  lineHeight: "1.5",
                  whiteSpace: "normal",
                },
                "& .MuiChip-label": {
                  whiteSpace: "normal",
                },
              }}
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

export default SelectMultiCheckboxAutocomplete;
