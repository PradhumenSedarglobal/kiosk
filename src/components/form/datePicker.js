// import { useAuthContext } from "@/auth/useAuthContext";
import useResponsive from "@/hooks/useResponsive";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import en from "date-fns/locale/en-US";
import dayjs from "dayjs";
import ar from "dayjs/locale/ar";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import FormControl from "./formControl";

// const PickersModalDialogRoot = styled(DatePicker);
const DatePickerBox = (props) => {
  const {
    name,
    label,
    fullWidth,
    disablePast = false,
    disableFriday = false,
    value,
    error,
    helperText,
    getMinDate,
    disableUae,
    format = "DD-MM-YYYY",
    placeholder,
    maxDate,
    maxHours,
    minDate,
    minHours,
    variant,
    currentDate,
    shouldDisableDate,
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false); // Boolean to control popup visibility
  const { locale } = useRouter();
  // const { state } = useAuthContext();
  // const { cookies } = state;
  // const { themeDirection } = cookies || {};
  const isUpMd = useResponsive("up", "md");

  const [defaultValue, setDefaultValue] = React.useState(null);

  const newDate = new Date();

  React.useEffect(() => {
    if (value) {
      setDefaultValue(dayjs(value));
    } else {
      setDefaultValue(null);
    }
  }, [value]);

  const isAr =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ar"
      ? true
      : false;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider
      adapterLocale={isAr ? ar : en}
      dateAdapter={AdapterDayjs}
    >
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        variant="standard"
        onClick={handleOpen} // Handle click event to open DatePicker
        sx={{
          "& .MuiPickersPopper-root": {
            display: "none!important",
            "&.MuiPickersDay-root:not(.Mui-selected)": {
              border: "1px solid !important",
            },
          },
        }}
      >
        <DatePicker
          {...rest}
          {...(isUpMd && {
            open: open,
            onClose: handleClose,
            onOpen: handleOpen,
          })}
          disablePast={disablePast}
          minDateMessage=" "
          defaultValue={currentDate && newDate}
          format={format}
          minDate={getMinDate ? getMinDate() : ""}
          inputFormat={format}
          label={label}
          variant="standard"
          // slots={{

          // }}
          sx={(theme) => ({
            "&.Mui-disabled:not(.Mui-selected)": {
              // Your custom styles here
              color: "red", // Example override
            },
            "& .MuiInputLabel-root": {
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
            "& .MuiInput-input": {
              fontFamily: theme.fontFaces.helveticaNeue,
              ":hover": {
                cursor: "pointer",
              },
            },
            "& .MuiInput-input::placeholder": {
              color: "black",
              fontFamily: theme.fontFaces.helveticaNeue,
            },
            "& .Mui-disabled": {
              fontFamily: theme.fontFaces.helveticaNeueLight,
              border: "none",
            },
          })}
          componentsProps={{
            day: {
              sx: {
                "&.Mui-disabled:not(.Mui-selected)": {
                  border: "0px solid !important",
                },
              },
            },
          }}
          value={defaultValue}
          onChange={(newValue) => props.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder,
              }}
            />
          )}
          shouldDisableDate={shouldDisableDate}
          slotProps={{ textField: { variant: "standard" } }}
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
    </LocalizationProvider>
  );
};

DatePickerBox.defaultProps = {
  formik: {},
  name: "datetime",
  label: "Datetime",
  fullWidth: false,
};

DatePickerBox.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};
export default DatePickerBox;
