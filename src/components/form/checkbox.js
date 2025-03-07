import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { FormControl } from "./index";
import PropTypes from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";

const MUICheckBox = (props) => {
  const {
    name,
    label,
    checked,
    onChange,
    value,
    color,
    fullWidth,
    helperText,
    size,
  } = props;

  return (
    <FormControl
      size={size}
      key={`key-${name}`}
      error={Boolean(helperText)}
      fullWidth={fullWidth}
      sx={(theme) => ({
        "& .MuiFormControlLabel-root": {
          fontFamily: theme.fontFaces.helveticaNeue,
          "& .MuiFormControlLabel-label": {
            fontFamily: theme.fontFaces.helveticaNeue,
            letterSpacing: 0.5,
            color: theme.palette.common.black,
          },
        },
      })}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            value={value}
            onChange={onChange}
            name={name}
            color={color}
            size={size}
          />
        }
        label={label}
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

MUICheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.string,
  type: PropTypes.string,
  // InputLabelProps: PropTypes.string,
  icon: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  rows: PropTypes.string,
  onKeyDown: PropTypes.func,
  checked: PropTypes.bool.isRequired,
};

export default MUICheckBox;
