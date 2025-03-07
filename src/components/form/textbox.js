import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { FormControl } from "./index";

const TextBox = (props) => {
  const { t: translate } = useTranslation();
  const {
    autoComplete,
    name,
    label,
    accept,
    variant,
    type,
    inputLabelProps,
    startIcon,
    endIcon,
    value,
    required,
    multiline,
    inputAdornmentPosition = "end",
    fullWidth,
    helperText,
    disabled,
    rows,
    onKeyDown,
    isDocumentText = false,
    isMaxLenght,
    placeholder,
    inputRef,
    size,
    onBlur,
    formControlSx,
    inputSx = () => { },
    readOnly,
    bottomText,
    bottomTextSx,
    maxLength,
    inputMode,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={{
        ...formControlSx,
        "& .MuiTextField-root": {
          "&.Mui-focused .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
        },
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
          color: "grey", // Set label text color to white when it shrinks
        },
        "& .MuiFormLabel-root-MuiInputLabel-root": {
          color: "black", // Set label text color to black
        },
      }}
    >
      <TextField
        inputRef={inputRef}
        inputMode={inputMode}
        sx={(theme) => ({
          "& .MuiInputLabel-root": {
            fontFamily: theme.fontFaces.helveticaNeueMedium,
          },
          "& .MuiInput-input::placeholder": {
            color: "black", // Set placeholder color to black
            fontFamily: theme.fontFaces.helveticaNeue,
          },
          "& .Mui-disabled": {
            fontFamily: theme.fontFaces.helveticaNeueLight,
          },
          ...inputSx(theme),
        })}
        error={helperText ? true : false}
        variant={variant}
        name={name}
        size={size}
        label={label}
        type={type}
        onKeyDown={onKeyDown}
        rows={rows}
        InputLabelProps={inputLabelProps}
        placeholder={placeholder}
        multiline={multiline}
        required={required}
        disabled={disabled}
        value={value}
        onBlur={onBlur}
        autoComplete={autoComplete}
        onChange={(e) => props.onChange(e)}
        inputProps={{
          maxLength: isMaxLenght ? isMaxLenght : maxLength ? maxLength : null,
          accept: accept,
        }}
        InputProps={{
          endAdornment: endIcon && (
            <InputAdornment position={inputAdornmentPosition}>
              {endIcon}
            </InputAdornment>
          ),
          startAdornment: startIcon && (
            <InputAdornment position={inputAdornmentPosition}>
              {startIcon}
            </InputAdornment>
          ),
          readOnly: readOnly,
          autoComplete: autoComplete,
        }}
      />
      {isDocumentText && (
        <FormHelperText
          sx={(theme) => ({
            marginTop: "0px",
            marginBottom: "10px",
            color: (theme) => theme.palette.grey[2800],
            letterSpacing: "0.28px",
            ...theme.typography.typography16,
            fontFamily: theme.fontFaces.helveticaNeue,
          })}
        >
          {translate("MaximumFileMBFileFormatTSVorXLS")}
        </FormHelperText>
      )}
      <Typography sx={{ ...bottomTextSx }}>{bottomText}</Typography>
      <Box sx={{ display: "flex" }}>
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
      </Box>
      <Box>
        {isMaxLenght && (
          <FormHelperText
            sx={(theme) => ({
              marginTop: "0px",
              marginBottom: "10px",
              color: "#637381!important",
              letterSpacing: "0.28px",
              ...theme.typography.typography16,
              fontFamily: theme.fontFaces.helveticaNeue,
            })}
          >
            {`Must be characters limit ${isMaxLenght}`}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  );
};

TextBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  inputLabelProps: PropTypes.object,
  icon: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  rows: PropTypes.string,
  onKeyDown: PropTypes.func,
  isDocumentText: PropTypes.bool,
};

export default TextBox;
