import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "./formControl";

const RadioGroupBox = ({
  onChange,
  name,
  headerLabel,
  fullWidth,
  data = [],
  helperText,
  value,
  size,
  formLabelSx,
  radioLabelSx,
  radioSx,
  radioGroupSx,
  disabled,
  onBlur,
  ...rest
}) => {
  return (
    <>
      <FormLabel sx={formLabelSx}>{headerLabel}</FormLabel>
      <FormControl
        key={`key${name}`}
        sx={{
          "&.MuiFormControl-root": {
            mb: 0,
          },
        }}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        disabled={disabled}
      >
        <RadioGroup
          {...rest}
          name={name}
          value={value}
          onChange={onChange}
          sx={{
            mt: 0.9,
            ...radioGroupSx,
          }}
          disabled={disabled}
        >
          {data &&
            data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <FormControlLabel
                  sx={radioLabelSx}
                  key={`${name}-${index}`}
                  value={item?.value}
                  control={<Radio sx={radioSx} size={size} />}
                  label={item?.label}
                  onBlur={onBlur}
                />
              );
            })}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default RadioGroupBox;
