import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import { FormControl } from "./index";

const ToggleBox = (props) => {
  const {
    name,
    label,
    checked,
    onChange,
    value,
    color,
    fullWidth,
    helperText,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
    >

      <FormControlLabel
        control={
          <Switch
            checked={checked}
            value={value}
            onChange={onChange}
            name={name}
            color={color}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

ToggleBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
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
};

export default ToggleBox;
