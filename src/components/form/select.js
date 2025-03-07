import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { FormControl } from "./index";
const SelectBox = (props) => {
  const { t: translate } = useTranslation();
  const {
    name,
    label,
    value,
    size,
    required,
    options,
    fullWidth,
    helperText,
    isRequired,
    formSx = () => { },
    menuSx,
    variant,
    color,
    setLabel = "label",
    setValue = "value",
    defaultValue,
    isSplit = false,
    isTranslate = false,
    checkIndex = null,
    splitValue = "",
    disabled,
    onBlur,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={(theme) => ({
        width: !fullWidth ? "50%" : "100%",
        ...formSx(theme),
        "& .MuiInput-input": {
          fontFamily: theme.fontFaces.helveticaNeueMedium,
          ...theme.typography.typography15,
        },
      })}
      size={size}
      color={color}
      disabled={disabled}
    >
      {label && (
        <InputLabel
          sx={(theme) => ({
            "&.MuiInputLabel-root": {
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              ...theme.typography.typography15,
              transform: "translate(0px, -14px) scale(0.75)",
            },
          })}
        >{`${label} ${isRequired ? "*" : ""}`}</InputLabel>
      )}

      <Select
        key={name}
        color={color}
        variant={variant}
        name={name}
        label={label}
        required={required}
        value={value}
        defaultValue={defaultValue}
        size={size}
        onChange={(e) => props.onChange(e)}
        inputProps={{
          name: name,
        }}
        disabled={disabled}
        onBlur={onBlur}
        sx={{
          "& .MuiSelect-select": {
            fontFamily: (theme) => theme.fontFaces.helveticaNeue,
            letterSpacing: 0.5,
          },
        }}
      >
        {options &&
          options.map((option, index) => {
            if (isTranslate) {
              if (checkIndex && checkIndex.includes(index)) {
                return (
                  <MenuItem
                    sx={{
                      ...menuSx,
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    }}
                    key={option[setValue]}
                    value={
                      setValue && option[setValue] ? option[setValue] : index
                    }
                    disabled={option?.isDisabled || false}
                  >
                    {isSplit
                      ? option[setLabel] &&
                      option[setLabel]
                        .split(splitValue)
                        ?.map((item) => `${translate(item)} `)
                      : translate(option[setLabel])}
                  </MenuItem>
                );
              } else if (checkIndex == "all") {
                return (
                  <MenuItem
                    sx={{
                      ...menuSx,
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    }}
                    key={option[setValue]}
                    value={
                      setValue && option[setValue] ? option[setValue] : index
                    }
                    disabled={option?.isDisabled || false}
                  >
                    {isSplit
                      ? option[setLabel] &&
                      option[setLabel]
                        .split(splitValue)
                        ?.map((item) => `${translate(item)} `)
                      : translate(option[setLabel])}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem
                    sx={{
                      ...menuSx,
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    }}
                    key={option[setValue]}
                    value={
                      setValue && option[setValue] ? option[setValue] : index
                    }
                    disabled={option?.isDisabled || false}
                  >
                    {translate(option[setLabel])}
                  </MenuItem>
                );
              }
            } else {
              return (
                <MenuItem
                  sx={{
                    ...menuSx,
                    fontFamily: (theme) => theme.fontFaces.helveticaNeueLight,
                  }}
                  key={option[setValue]}
                  value={
                    setValue && option[setValue] ? option[setValue] : index
                  }
                  disabled={option?.isDisabled || false}
                >
                  {option[setLabel]}
                </MenuItem>
              );
            }
          })}
      </Select>

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

SelectBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
};
export default SelectBox;
