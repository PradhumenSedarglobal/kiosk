import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { alpha } from "@mui/material/styles";
import Iconify from "../iconify";
import { FormControl } from "./index";

const QuantityBox = (props) => {
  const {
    name,
    label,
    variant,
    type,
    inputLabelProps,
    startIcon,
    endIcon,
    value,
    required,
    inputAdornmentPosition = "end",
    fullWidth,
    helperText,
    disabled,
    rows,
    onKeyDown,
    isMaxLenght,
    placeholder,
    size,
    onBlur,
    formControlSx,
    inputSx = () => { },
    readOnly,
    formLabelSx,
    color,
    decrementQuantity,
    incrementQuantity,
    textBoxDisabled,
    incrementDisabled,
    decrementDisabled,
  } = props;
  return (
    <>
      <Box component="div">
        {label && (
          <FormLabel component="div" sx={formLabelSx}>
            {label}
          </FormLabel>
        )}
        <FormControl
          key={`key${name}`}
          error={helperText ? true : false}
          fullWidth={fullWidth}
          sx={{
            mt: 0.5,
            ...formControlSx,
          }}
          disabled={disabled}
        >
          <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
            <Button
              color="dark"
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  py: "8.5px",
                  px: 1,
                  borderRadius: "0px",
                  minWidth: "auto",
                  borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
                },
              }}
              disabled={decrementDisabled}
              onClick={decrementQuantity}
            >
              <Iconify icon="material-symbols-light:remove" />
            </Button>
            <TextField
              sx={(theme) => ({
                "& .MuiOutlinedInput-input": {
                  padding: "8px 14px",
                  textAlign: "center",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0px",
                  borderRight: "0px",
                  borderLeft: "0px",
                },
                "& .Mui-focused, .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    `${alpha(theme.palette.grey[500], 0.32)}!important`,
                },
                ...inputSx(theme),
              })}
              fullWidth={fullWidth}
              error={helperText ? true : false}
              variant={variant}
              name={name}
              size={size}
              type={type}
              onKeyDown={onKeyDown}
              rows={rows}
              InputLabelProps={inputLabelProps}
              placeholder={placeholder}
              required={required}
              disabled={textBoxDisabled}
              autoComplete={"false"}
              value={value}
              onBlur={onBlur}
              color={color}
              onChange={(e) => props.onChange(e)}
              inputProps={{ maxLength: isMaxLenght ? isMaxLenght : null }}
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
              }}
            />
            <Button
              color="dark"
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  py: "8.5px",
                  px: 1,
                  borderRadius: "0px",
                  minWidth: "auto",
                  borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
                },
              }}
              onClick={incrementQuantity}
              disabled={incrementDisabled}
            >
              <Iconify icon="material-symbols-light:add" />
            </Button>
          </Stack>
          <Box sx={{ display: "flex" }}>
            {helperText && (
              <FormHelperText
                sx={{
                  "&.MuiFormHelperText-root": {
                    marginLeft: "0px",
                  },
                }}
              >
                {helperText}
              </FormHelperText>
            )}
          </Box>
          <Box>
            {isMaxLenght && (
              <FormHelperText
                sx={{
                  marginTop: "0px",
                  marginBottom: "10px",
                  color: "#637381!important",
                }}
              >
                {`Must be characters limit ${isMaxLenght}`}
              </FormHelperText>
            )}
          </Box>
        </FormControl>
      </Box>
    </>
  );
};

export default QuantityBox;
